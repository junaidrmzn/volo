import { Box, Select } from "@volocopter/design-library-react";
import { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { RevisionOptionLabel } from "./RevisionOptionLabel";
import { useRevisionTranslation } from "./translations/useRevisionTranslation";
import { useRevisionsDropdown } from "./useRevisionsDropdown";

export type RevisionsDropDownProps = {
    activeRevision: string;
    definition: FlightTestDefinitionResponseBody;
};

export const RevisionsDropdown = (props: RevisionsDropDownProps) => {
    const { activeRevision, definition } = props;
    const { t } = useRevisionTranslation();

    const { navigateToRevision, revisions } = useRevisionsDropdown({ definitionId: definition.id });

    const revisionOptions = revisions?.map((revision) => ({
        label: (
            <RevisionOptionLabel isReleased={revision.released} label={revision.ftdId} revision={revision.revision} />
        ),
        value: revision.revision,
    }));

    const selectedOption = revisionOptions.find((option) => option.value === activeRevision);

    if (!revisionOptions || !selectedOption) return null;

    return (
        <Box minW={96} aria-label={t("Revision Dropdown Aria-label")}>
            <Select
                defaultValue={[selectedOption]}
                onChange={(revision) => navigateToRevision(revision?.value)}
                options={revisionOptions}
            />
        </Box>
    );
};
