export interface BugReport {
  id?: string
  title: string
  description: string
  images?: File[]
  userId?: string
  createdAt?: string
  status?: "PENDING" | "IN_PROGRESS" | "RESOLVED"
}

export interface BugReportRequest {
  title: string
  description: string
  images?: File[]
}

export interface BugReportResponse {
  id: string
  title: string
  description: string
  imageUrls?: string[]
  userId: string
  createdAt: string
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED"
}
