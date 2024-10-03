import { useCreateService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import { PlanProcess } from "../plan-process";

export const useUploadSsim = () => useCreateService<FormData, PlanProcess>({ route: `${PLAN_BASE_URL}/upload-ssim` });
