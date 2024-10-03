import { useGetAllService } from "@voloiq/service";
import { PLAN_BASE_URL } from "../../serviceEndpoints";
import type { Plan } from "./apiModels";

export const useGetPlans = () => useGetAllService<Plan>({ params: { page: 1, size: 10 }, route: PLAN_BASE_URL });
