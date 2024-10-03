import { anySoftwareConfig } from "../../software-configuration/mocks/msw/SoftwareConfigMock";
import { anyAircraft } from "./msw/AircraftMock";
import { anyCrewMember } from "./msw/CrewMemberMock";
import { anyLocation } from "./msw/LocationMock";
import { anyLogbookFile } from "./msw/LogbookFileMock";
import { setupServiceMockHandlers } from "./msw/ServiceMock";

const {
    database: {
        aircraft: aircraftDatabase,
        crewMember: crewMemberDatabase,
        location: locationDatabase,
        log: logDatabase,
        file: fileDatabase,
        softwareConfig: softwareConfigDatabase,
    },
} = setupServiceMockHandlers();

export const initializeLogbookData = () => {
    for (let index = 0; index < 5; index++) {
        logDatabase.create({
            id: `log-${index}`,
            files: [fileDatabase.create(anyLogbookFile({ id: `file${index}` }))],
            date: new Date().toISOString(),
            location: locationDatabase.create(anyLocation({ id: `loc${index}`, icaoCode: "NYC" })),
            fcSoftware: "ervetbe3454gf34",
            aircraft: aircraftDatabase.create(
                anyAircraft({
                    id: `AC-${index}`,
                    aircraftType: `VC-${Math.floor(Math.random() * 10)}`,
                    msn: `${Math.floor(Math.random() * 1000)}`,
                })
            ),
            crew: [
                crewMemberDatabase.create(
                    anyCrewMember({
                        id: `CREW-${index}`,
                        firstName: "Tony",
                        lastName: "Stark",
                    })
                ),
            ],
            remarks: "no remarks",
            createTime: new Date().toISOString(),
            updateTime: new Date().toISOString(),
        });

        softwareConfigDatabase.create(
            anySoftwareConfig({
                id: `SC-${index}`,
                createTime: new Date().toISOString(),
                updateTime: new Date().toISOString(),
                configType: "FC",
                gitHash: `hash${Math.floor(Math.random() * 1000)}`,
            })
        );
    }
};
