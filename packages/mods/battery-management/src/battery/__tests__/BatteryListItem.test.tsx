import { Tag } from "@volocopter/design-library-react";
import { render } from "@voloiq/testing";
import { IdSelectionProvider } from "../../hooks";
import { BatteryListItem } from "../list/BatteryListItem";
import { TagColor, useGetBatteryStatusTagColor } from "../list/useGetBatteryStatusTagColor";
import { mockedBattery } from "./MockedBattery";

describe("Battery List Item Test", () => {
    const { batteryStatusTagColor } = useGetBatteryStatusTagColor(mockedBattery);
    it("should render BatteryListItem without crashing", () => {
        render(
            <IdSelectionProvider>
                <BatteryListItem battery={mockedBattery} />
            </IdSelectionProvider>
        );
    });

    it("should render Tag without crashing", () => {
        render(
            <Tag data-testid="battery-status-Tag" colorScheme={batteryStatusTagColor}>
                TEST WITH STATUS TAG COLOR FROM HOOK
            </Tag>
        );
    });

    it("should render red Tag", () => {
        render(
            <Tag data-testid="battery-status-Tag" colorScheme={TagColor.ErrorSubtle}>
                TEST - RED TAG
            </Tag>
        );
    });

    it("should render yellow Tag", () => {
        render(
            <Tag data-testid="battery-status-Tag" colorScheme={TagColor.WarningSubtle}>
                TEST - YELLOW TAG
            </Tag>
        );
    });

    it("should render turquoise Tag", () => {
        render(
            <Tag data-testid="battery-status-Tag" colorScheme={TagColor.Teal}>
                TEST - TEAL TAG
            </Tag>
        );
    });
});
