import { useCustomMutation } from "@/lib/react-query/custom/custom-query";
import { toast } from "sonner";
import type { BugReportRequest } from "../models/support-model";
import { supportService } from "../services/support-service";

const QUERY_KEY = "support";

export const useReportProblem = () => {
  return useCustomMutation<void, { bugReportRequest: BugReportRequest }>(
    [QUERY_KEY],
    ({ bugReportRequest }) => supportService.reportProblem(bugReportRequest),
    {
      onSuccess: () => {
        toast.success("Problem reported successfully");
      },
      onError: () => {
        toast.error("Error reporting problem");
      },
    }
  );
};
