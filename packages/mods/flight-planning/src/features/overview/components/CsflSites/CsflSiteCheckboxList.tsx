import { Box, Checkbox, EmptyState, HStack, Tag, Text } from "@volocopter/design-library-react";
import type { RouteCsflSitesLink } from "@voloiq-typescript-api/flight-planning-types";
import { CsflSite } from "@voloiq-typescript-api/flight-planning-types";
import { LoadingSpinner } from "../../../../components";
import { useFlightPlanningTranslation } from "../../../../translations";

type CsflSitesModalProps = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkedItems: RouteCsflSitesLink[];
    allCsflSitesData: CsflSite[];
    isFetching: boolean;
};

export const CsflSiteCheckboxList = (props: CsflSitesModalProps) => {
    const { checkedItems, handleChange, allCsflSitesData, isFetching } = props;
    const { t } = useFlightPlanningTranslation();

    return (
        <Box>
            {isFetching ? (
                <LoadingSpinner />
            ) : allCsflSitesData.length > 0 ? (
                allCsflSitesData.map((csflSite) => {
                    return (
                        <HStack key={csflSite.id} justifyContent="space-between" my={2} data-testid="checkbox-listItem">
                            <Checkbox
                                value={csflSite.id}
                                onChange={handleChange}
                                isChecked={checkedItems?.some(
                                    (selected: RouteCsflSitesLink) => csflSite.id === selected.csflSiteId
                                )}
                            >
                                <Text fontSize="sm">{csflSite.name}</Text>
                            </Checkbox>
                            {csflSite.isDeleted && <Tag colorScheme="error-subtle">{t("csfl.status.deleted")}</Tag>}
                        </HStack>
                    );
                })
            ) : (
                <EmptyState title={t("csfl.error.noCsflSitesFound")} description="" />
            )}
        </Box>
    );
};
