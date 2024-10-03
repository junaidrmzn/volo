import { useGetEsu } from "../../api-hooks/useEsuService";
import { ServiceStateBoundary } from "../../components";
import { EsuPreviewContent } from "./EsuPreviewContent";

export type EsuPreviewProps = {
    esuId: string;
    refetch: () => void;
};

export const EsuPreview = (props: EsuPreviewProps) => {
    const { esuId, refetch } = props;
    const { data: esu, error, state } = useGetEsu(esuId);

    return (
        <ServiceStateBoundary state={state} error={error}>
            {esu && <EsuPreviewContent esu={esu} refetch={refetch} />}
        </ServiceStateBoundary>
    );
};
