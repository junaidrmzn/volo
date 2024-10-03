import { Box, Button, Spinner, Text } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useGetMission } from "@voloiq/network-schedule-management-api/v1";
import { useParams } from "@voloiq/routing";
import { MassandBalanceCalculations } from "../mission-detail/aircraft-tab/mass-and-balance";
import { useGetAircraftData } from "../mission-detail/aircraft-tab/useGetAircraftData";
import { Page } from "./Page";
import { FlightManifest } from "./pages/FlightManifest";
import { FlightPlan } from "./pages/FlightPlan";
import { Intro } from "./pages/Intro";
import { usePrintPdf } from "./usePrintPdf";

export function OperationalFlightPlan() {
    const { missionId } = useParams();
    if (missionId === undefined) {
        throw new Error("parameters must be defined");
    }
    const { data: mission, state } = useGetMission({ missionId });
    const { aircraft } = useGetAircraftData({ aircraftId: mission?.assignments?.aircraftId });

    const pages = mission
        ? [
              <Intro key="intro" />,
              <FlightManifest key="flightManifest" mission={mission} />,
              <MassandBalanceCalculations key="massAndBalanceCalculations" mission={mission} aircraft={aircraft} />,
              <FlightPlan key="payloadComputation" mission={mission} />,
          ]
        : [];

    const { handlePrint, printableRef } = usePrintPdf(mission?.flightNumber ?? "");

    return (
        <Box backgroundColor="white">
            {match(state)
                .with("pending", "idle", () => <Spinner />)
                .with("error", () => <Text>An Error Occurred</Text>)
                .with("success", () => (
                    <>
                        <Button onClick={handlePrint}>Print</Button>
                        <Box ref={printableRef}>
                            <Box backgroundColor="white">
                                {pages.map((page, index) => (
                                    <Page pageNumber={index + 1} totalPages={pages.length} key={page.key}>
                                        {page}
                                    </Page>
                                ))}
                            </Box>
                        </Box>
                    </>
                ))
                .exhaustive()}
        </Box>
    );
}
