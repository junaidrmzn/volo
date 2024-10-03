import { CardList, EmptyState } from "@volocopter/design-library-react";
import type { Aircraft } from "@voloiq/aircraft-management-api/v1";
import { useIdSelectionContext } from "../../hooks";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";
import { AircraftListItem } from "./aircraft-list-item/AircraftListItem";

type AircraftListProps = {
    aircraftList: Aircraft[];
};
export const AircraftList = (props: AircraftListProps) => {
    const { t } = useAircraftTranslation();
    const { aircraftList } = props;
    const { selectedId, setSelectedId } = useIdSelectionContext();
    const isSelectedId = (id: string) => selectedId === id;

    return (
        <CardList width="100%">
            {aircraftList.length === 0 ? (
                <EmptyState title={t("emptyState.title")} description={t("emptyState.description")} />
            ) : (
                aircraftList.map((aircraftEntry) => (
                    <AircraftListItem
                        isSelected={isSelectedId(aircraftEntry.id)}
                        key={aircraftEntry.id}
                        onClick={() => setSelectedId(aircraftEntry.id)}
                        ariaLabel={aircraftEntry.msn}
                        aircraft={aircraftEntry}
                    />
                ))
            )}
        </CardList>
    );
};
