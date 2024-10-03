import { useState } from "react";
import { useGetPlan } from "@voloiq/commercial-scheduling-api/v1";
import { useNavigate, useParams } from "@voloiq/routing";

export const usePlanDetail = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { planId } = useParams();
    const { data: plan, refetchDataWithResponseEnvelope } = useGetPlan(planId ?? "-1");
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate({ pathname: `/commercial-scheduling/plan/overview` });
    };

    const refetchPlan = () => {
        refetchDataWithResponseEnvelope();
    };

    const onTabIndexChange = (index: number) => {
        setActiveTabIndex(index);
        navigate("");
    };

    return { activeTabIndex, plan, onTabIndexChange, refetchPlan, navigateBack };
};
