import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import {Report} from "../models/report.models.js"
import {User} from "../models/user.models.js"
import mongoose,{ isValidObjectId } from "mongoose"
import { uploadOnCloudinary,deleteCloudinaryFile } from "../utils/cloudinary.js"
import { sendEmail } from "../utils/mailer.js"


const createReport = asyncHandler(async (req, res) => {
    const { title, content, location, status } = req.body;

    if (!title || !content || !location || !status) {
        throw new ApiError(400, "Title, content, status, and location are required");
    }

    const user = await User.findById(req.user?._id).select("username number");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    let cloudinaryImage = null;

    if (req.file) {
        // ✅ Upload to Cloudinary from buffer
        cloudinaryImage = await uploadOnCloudinary(req.file.buffer);
    }

    const report = await Report.create({
        title,
        content,
        location,
        owner: req.user?._id,
        number: user.number,
        status,
        image: cloudinaryImage?.secure_url || null, // ✅ Save Cloudinary image URL
    });

    if (!report) {
        throw new ApiError(500, "Error while creating report");
    }
     // ✅ Send email to all users (except the one who reported)
    try {
      const users = await User.find({}).select("username email");
      const allEmails = users
         .map((u) => u.email)
        .filter((email) => email && typeof email === "string" && email.includes("@") && email !== user.email
        );


        await sendEmail({
            to: allEmails,
            subject: `📢 New ${status} Item Reported`,
            html: `
                <h3>New Report on Lost No More</h3>
                <p><strong>${user.username}</strong> has reported a <strong>${status}</strong> item:</p>
                <ul>
                    <li><strong>Title:</strong> ${title}</li>
                    <li><strong>Location:</strong> ${location}</li>
                </ul>
                <p><a href="https://lost-and-found-murex-five.vercel.app/">View it on the dashboard</a></p>
            `
        });
    } catch (emailError) {
        console.error("Failed to send report notification email:", emailError);
    }
    
    return res
        .status(201)
        .json(new ApiResponse(201, report, "Report created successfully"));    
});

const getUserReports = asyncHandler(async (req, res) => {
   
    const {userId} = req.params
    
    if(!isValidObjectId(userId)){
        throw new ApiError(401,"Not valid userId")
    }

    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(401,"No user found")
    }

    const reports = await Report.find({owner:userId})

    return res.status(200).json(new ApiResponse(
        200,
        reports,
        "Successfully Fetched Reports")
    )



})

const updateReport = asyncHandler(async (req, res) => {
    
    const {content,status} = req.body
    const {reportId}  = req.params

    if(!isValidObjectId(reportId)){
        throw new ApiError(401,"Not valid userId")
    }
    if(!content && !status){
        throw new ApiError(401,"Enter content")

    }
        const report = await Report.findOneAndUpdate(
            {
                _id:reportId,
                owner: req.user?._id
            },
            {   
                $set:{
                content : content,
                status : status
            }
            },
            {
                new:true
            }
        )
        if(!report){
            throw new ApiError(401,"No report found ")
        }   

        return res
        .status(200)
        .json(new ApiResponse(201, report, "Successfully updated the report"));
    

})

const deleteReport = asyncHandler(async (req, res) => {
    const { reportId } = req.params;

    if (!isValidObjectId(reportId)) {
        throw new ApiError(401, "Not valid reportId");
    }

    const report = await Report.findOne({
        _id: reportId,
        owner: req.user?._id,
    });

    if (!report) {
        throw new ApiError(404, "No report found or not owned by user");
    }

    // ✅ If report has image, delete it from Cloudinary
    if (report.image) {
        // Extract public ID from Cloudinary URL
        const publicId = report.image.split("/").pop().split(".")[0];
        await deleteCloudinaryFile(`Lost-and-found/${publicId}`);
    }

    await report.deleteOne(); // ✅ Clean way to delete document

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Successfully deleted the report"));
});


const getAllReports = asyncHandler(async (req, res) => {
    const reports = await Report.find({})
        .populate("owner", "name email number")
        .sort({ createdAt: -1 }); // optional: latest first

    if (!reports || reports.length === 0) {
        throw new ApiError(404, "No reports found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, reports, "Fetched all reports successfully"));
});

export {
    createReport,
    getUserReports,
    updateReport,
    deleteReport,
    getAllReports
}