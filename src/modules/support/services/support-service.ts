import axiosInstance from "@/lib/axios/interceptors/axios-interceptor";
import type { BugReportRequest, BugReportResponse } from "../models/support-model";
import { axiosRequest } from "@/lib/axios/config/axios-config";

const BASE_URL = "/support/report-a-problem";

class SupportService {

  reportProblem = async (bugReportRequest: BugReportRequest): Promise<void> => {
    const formData = new FormData();

    const info = {
      title: bugReportRequest.title,
      description: bugReportRequest.description,
    };

    const blob = new Blob([JSON.stringify(info)], { type: "application/json" });

    formData.append("info", blob, "info.json")

    if (bugReportRequest.images?.length) {
      bugReportRequest.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    return await axiosRequest.post(`${BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}

export const supportService = new SupportService();