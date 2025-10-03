import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, User } from "lucide-react"

interface ReportUser {
  _id: string
  name: string
  email: string
  username: string
  number: string
}

interface Report {
  _id: string
  title: string
  content: string
  status: "Lost" | "Found" | "Returned"
  location: string
  image?: string
  number: string
  owner: ReportUser
  createdAt: string
}

interface ReportCardProps {
  report: Report
}

export function ReportCard({ report }: ReportCardProps) {
  const statusColor = {
    Lost: "destructive",
    Found: "success",
    Returned: "default",
  } as const

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{report.title}</CardTitle>
          <Badge variant= "destructive">{report.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {report.image && (
          <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
            <img
              src={report.image || "/placeholder.svg"}
              alt={report.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=200&width=400"
              }}
            />
          </div>
        )}
        <p className="text-sm text-gray-500 mb-4">{report.content}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
            <span>{report.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="mr-2 h-4 w-4 text-gray-500" />
            <span>{report.owner.name}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="mr-2 h-4 w-4 text-gray-500" />
            <span>{report.number}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500 pt-2">
        {report.createdAt && (
          <time dateTime={report.createdAt}>
            {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
          </time>
        )}
      </CardFooter>
    </Card>
  )
}
