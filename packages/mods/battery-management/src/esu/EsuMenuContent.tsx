import { useIdSelectionContext } from "../hooks";
import { EsuPreview } from "./preview/EsuPreview";

type EsuMenuContentProps = {
    refetch: () => void;
};

export const EsuMenuContent = (props: EsuMenuContentProps) => {
    const { selectedId } = useIdSelectionContext();
    const { refetch } = props;

    return selectedId ? <EsuPreview esuId={selectedId} refetch={refetch} /> : null;
};
