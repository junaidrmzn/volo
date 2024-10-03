import { AircraftAssignment } from "@voloiq/network-schedule-management-api/v1";
import { BASE_URL } from "./regex";

export const scheduledMissionListInterceptor = (aircrafts: AircraftAssignment[], scheduledDate: string) =>
    cy
        .intercept(
            "GET",
            new RegExp(`${BASE_URL}/v1/network-scheduling-management/missions/schedule/${scheduledDate}$`),
            {
                statusCode: 200,
                body: {
                    data: aircrafts,
                },
            }
        )
        .as("getScheduledMissions");
