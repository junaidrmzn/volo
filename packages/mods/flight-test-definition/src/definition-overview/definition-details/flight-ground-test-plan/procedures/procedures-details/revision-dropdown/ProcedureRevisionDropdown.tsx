import { Box, Select } from "@volocopter/design-library-react";
import { RevisionOptionLabel } from "../../../../revisions/RevisionOptionLabel";
import { useProcedureDetailsTranslation } from "../translations/useProcedureDetailsTranslation";
import { useProcedureRevisionDropdown } from "./useProcedureRevisionDropdown";

type ProcedureRevisionDropdownProps = {
    definitionId: string;
    procedureId: string;
    activeRevision?: string;
};

export const ProcedureRevisionDropdown = (props: ProcedureRevisionDropdownProps) => {
    const { definitionId, procedureId, activeRevision } = props;
    const { t } = useProcedureDetailsTranslation();
    const { navigateToRevision, procedureRevisions } = useProcedureRevisionDropdown({ definitionId, procedureId });

    const revisionOptions = procedureRevisions?.map((revision) => ({
        label: (
            <RevisionOptionLabel isReleased={revision.released} label={revision.ftdId} revision={revision.revision} />
        ),
        value: revision.revision,
        isDisabled: !revision.available,
    }));

    const selectedOption = revisionOptions?.find((option) => option.value === activeRevision);

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
