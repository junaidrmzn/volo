import { Text } from "@volocopter/design-library-react";
import { FlightTestOrder } from "@voloiq/flight-test-definition-api/v2";
import { SubSection } from "@voloiq/flight-test-definition-components";
import { LinkedDefinitions } from "./LinkedDefinitions";
import { useGeneralInformationTranslation } from "./translations/useGeneralInformationTranslation";

export type GeneralInformationBodySubSectionsProps = {
    flightTestOrder?: FlightTestOrder;
};

export const GeneralInformationBodySubSections = (props: GeneralInformationBodySubSectionsProps) => {
    const { flightTestOrder } = props;
    const { t } = useGeneralInformationTranslation();
    if (flightTestOrder === undefined) {
        return null;
    }
    return (
        <>
            <SubSection
                headerLabel={t("Flight Test Definition")}
                bodyContent={<LinkedDefinitions linkedDefinitions={flightTestOrder?.linkedDefinitions} />}
            />
            <SubSection
                headerLabel={t("Selected Test Points")}
                bodyContent={
                    <Text fontSize="xs" lineHeight={6}>
                        {`${flightTestOrder?.testPointCounter} ${t("Test Points")} | ${
                            flightTestOrder?.testPointSequenceCounter
                        }
                        ${t("Test Point Sequence")}`}
                    </Text>
                }
            />
        </>
    );
};
