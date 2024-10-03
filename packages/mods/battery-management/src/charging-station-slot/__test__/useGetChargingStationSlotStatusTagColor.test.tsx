import { renderHook } from "@testing-library/react-hooks";
import { TagColor, useGetChargingStationSlotStatusTagColor } from "../list/useGetChargingStationSlotStatusTagColor";
import { deactivatedChargingStationSlot } from "./testdata/deactivatedChargingStationSlot";
import { defectChargingStationSlot } from "./testdata/defectChargingStationSlot";
import { nonConformChargingStationSlot } from "./testdata/nonConformChargingStationSlot";
import { operationalChargingStationSlot } from "./testdata/operationalChargingStationSlot";
import { turnedOffChargingStationSlot } from "./testdata/turnedOffChargingStationSlot";

describe("Tag Colors of the Charging Station Slot Status", () => {
    it('Teal TagColor is returned if chargingStationSlotStatus is "IN_OPERATION"', () => {
        const chargingStationSlotStatus = operationalChargingStationSlot;
        const { result } = renderHook(() => useGetChargingStationSlotStatusTagColor(chargingStationSlotStatus));
        expect(result.current.chargingStationSlotStatusTagColor).toBe(TagColor.Teal);
    });
    it('Sunrise TagColor is returned if chargingStationSlotStatus is "OFF"', () => {
        const chargingStationSlotStatus = turnedOffChargingStationSlot;
        const { result } = renderHook(() => useGetChargingStationSlotStatusTagColor(chargingStationSlotStatus));
        expect(result.current.chargingStationSlotStatusTagColor).toBe(TagColor.WarningSubtle);
    });
    it('Red TagColor is returned if chargingStationSlotStatus is "DEACTIVATED"', () => {
        const chargingStationSlotStatus = deactivatedChargingStationSlot;
        const { result } = renderHook(() => useGetChargingStationSlotStatusTagColor(chargingStationSlotStatus));
        expect(result.current.chargingStationSlotStatusTagColor).toBe(TagColor.ErrorSubtle);
    });
    it('Red TagColor is returned if chargingStationSlotStatus is "DEFECT"', () => {
        const chargingStationSlotStatus = defectChargingStationSlot;
        const { result } = renderHook(() => useGetChargingStationSlotStatusTagColor(chargingStationSlotStatus));
        expect(result.current.chargingStationSlotStatusTagColor).toBe(TagColor.ErrorSubtle);
    });
    it("Red TagColor is returned if chargingStationSlotStatus is not provided", () => {
        const chargingStationSlotStatus = nonConformChargingStationSlot;
        const { result } = renderHook(() => useGetChargingStationSlotStatusTagColor(chargingStationSlotStatus));
        expect(result.current.chargingStationSlotStatusTagColor).toBe(TagColor.ErrorSubtle);
    });
});
