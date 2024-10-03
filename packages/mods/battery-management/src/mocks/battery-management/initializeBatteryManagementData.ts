import { esuDatabaseOperations, esuTypeDatabaseOperations } from "./BatteryManagementDatabase";
import { anyEsuResource } from "./EsuResource";
import { anyEsuTypeResource } from "./EsuTypeResource";

export const initializeBatteryManagementData = () => {
    for (let index = 0; index < 25; index++) {
        esuTypeDatabaseOperations.add(anyEsuTypeResource({ id: index.toString() }));
    }

    for (let index = 0; index < 25; index++) {
        esuDatabaseOperations.add(anyEsuResource());
    }
};
