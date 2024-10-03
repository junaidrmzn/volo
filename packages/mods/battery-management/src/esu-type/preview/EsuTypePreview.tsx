import { useGetEsuType } from "../../api-hooks/useEsuTypeService";
import { ServiceStateBoundary } from "../../components";
import { EsuTypePreviewContent } from "./EsuTypePreviewContent";

export type EsuTypePreviewProps = {
    esuTypeId: string;
    refetch: () => void;
};

export const EsuTypePreview = (props: EsuTypePreviewProps) => {
    const { esuTypeId, refetch } = props;
    const { data: esuType, error, state } = useGetEsuType(esuTypeId);

    return (
        <ServiceStateBoundary state={state} error={error}>
            <EsuTypePreviewContent esuType={esuType} refetch={refetch} />
        </ServiceStateBoundary>
    );
};
