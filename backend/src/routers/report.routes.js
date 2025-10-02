import { Router } from 'express';
import {
    createReport,
    getUserReports,
    updateReport,
    deleteReport,
    getAllReports
} from "../controller/report.controller.js"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"



const router = Router();
router.use(verifyJWT); 
    

router.route("/")
    .post(upload.single("file"), createReport) // 🔥 Image will now be received
    .get(getAllReports);
router.route("/user/:userId").get(getUserReports);
router.route("/:reportId").put(updateReport).delete(deleteReport);
// patch for updating one field and put for updating  2 or more field

export default router