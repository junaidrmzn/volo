import { CheckListCategory, Service } from "@voloiq-typescript-api/network-scheduling-types";
import { useEffect, useState } from "react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetMission } from "@voloiq/network-schedule-management-api/v1";
import { useLocation, useNavigate } from "@voloiq/routing";

export const useMissionDetail = () => {
    const { pathname } = useLocation();
    const pathnameArray = pathname.split("/");
    const missionId = pathnameArray[pathnameArray.indexOf("overview") + 1];
    if (missionId === undefined) {
        throw new Error("parameters must be defined");
    }
    const { data: mission, refetchData } = useGetMission({ missionId });
    const [activeTab, setActiveTab] = useState<CheckListCategory>(CheckListCategory.GENERAL);
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const messageCategories = [
        CheckListCategory.GENERAL,
        CheckListCategory.AIRCRAFT,
        CheckListCategory.CREW,
        ...(isFeatureFlagEnabled("vao-1207") ? [CheckListCategory.GROUND_OPERATION] : []),
        ...(isFeatureFlagEnabled("vao-1596") ? [CheckListCategory.FLIGHT_PLAN] : []),
        ...(isFeatureFlagEnabled("vao-1808") ? [CheckListCategory.NOTAMS] : []),
        ...(isFeatureFlagEnabled("vao-1806") ? [CheckListCategory.WEATHER] : []),
    ];

    if (mission?.service === Service.PASSENGER) {
        messageCategories.splice(1, 0, CheckListCategory.PASSENGER);
    }

    const handleTabChange = (index: number) => {
        const selectedTab = messageCategories[index];
        if (selectedTab) {
            setActiveTab(selectedTab);
        } else {
            setActiveTab(CheckListCategory.UNKNOWN);
        }
    };

    const navigate = useNavigate();
    const navigateBack = () =>
        navigate({
            pathname: `/air-operations/mission-management/missions/overview`,
        });

    const [messageSubmitted, setMessageSubmitted] = useState(false);

    useEffect(() => {
        if (messageSubmitted) {
            refetchData();
            setMessageSubmitted(false);
        }
    }, [messageSubmitted, refetchData]);
    return { navigateBack, mission, refetchData, setMessageSubmitted, activeTab, handleTabChange };
};
