import { ExpandableCard } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { ProcedureRead } from "@voloiq/flight-test-definition-api/v1";
import { DetailsButton, ProcedureIdentifier } from "@voloiq/flight-test-definition-components";
import { useNavigate } from "@voloiq/routing";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useProceduresTranslation } from "./translations/useProceduresTranslation";

export type ProcedureCardProps = {
    procedure: Pick<ProcedureRead, "id" | "title" | "objectives" | "procedureId" | "testPointCount" | "status">;
    procedureIndex: number;
};

export const ProcedureCard = (props: ProcedureCardProps) => {
    const { procedure, procedureIndex } = props;
    const { id, title, objectives, procedureId, testPointCount, status } = procedure;

    const { t } = useProceduresTranslation();
    const navigate = useNavigate();

    return (
        <ExpandableCard cardLabel={t("Procedure {title}", { title })} variant="gray">
            <ExpandableCard.Title>
                <ProcedureIdentifier
                    procedureId={procedureId}
                    testPointCount={testPointCount}
                    status={status}
                    title={title}
                    procedureIndex={procedureIndex}
                />
            </ExpandableCard.Title>
            <ExpandableCard.ActionButton>
                <DetailsButton
                    onClick={() => navigate(`procedures/${id}?entityType=procedure&procedureIndex=${procedureIndex}`)}
                />
            </ExpandableCard.ActionButton>
            <ExpandableCard.Content>
                <TextWithLabel
                    label={t("Objectives")}
                    text={<EditorTextDisplay document={objectives} />}
                    size="small"
                    unknownValueText="-"
                />
            </ExpandableCard.Content>
        </ExpandableCard>
    );
};
