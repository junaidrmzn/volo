import type { TagProps } from "@volocopter/design-library-react";
import { useTestPointCardTranslation } from "./translations/useTestPointCardTranslation";

type TestPointStatus = "READY" | "IN WORK";

export const useTestpointStatus = (status: TestPointStatus) => {
    const { t } = useTestPointCardTranslation();

    const colorMappings: Record<TestPointStatus, TagProps["colorScheme"]> = {
        READY: "blue-subtle",
        "IN WORK": "gray",
    };

    return { colorScheme: colorMappings[status], label: t(`status.${status}`) };
};
