import { vertiportDatabaseOperations } from "./VertiportManagementDatabase";
import { anyVertiport } from "./anyVertiport";

const vertiports = ["BRU", "KAR", "MUC", "BER", "FRA"].map((code) => anyVertiport({ code }));

export const initializeVertiportManagementData = () => {
    for (const vertiport of vertiports) {
        vertiportDatabaseOperations.add(vertiport);
    }
};
