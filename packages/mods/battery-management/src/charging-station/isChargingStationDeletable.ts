export const isChargingStationDeletable = (chargingStationSlots: number) => {
    if (chargingStationSlots > 0) {
        return false;
    }
    return true;
};
