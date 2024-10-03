import { vertiportDatabaseOperations } from "./VertiportManagementDatabase";
import { anyVertiport } from "./anyVertiport";

const vertiports = ["Leningrad", "Paris", "Hamburg"].map((code) => anyVertiport({ name: code }));

export const initializeVertiportSelectionManagementData = () => {
    for (const vertiport of vertiports) {
        vertiportDatabaseOperations.add(vertiport);
    }
};
