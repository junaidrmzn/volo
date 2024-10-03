import { useIdSelectionContext } from "../hooks";
import { EsuTypePreview } from "./preview/EsuTypePreview";

type EsuTypeMenuContentProps = {
    refetch: () => void;
};

export const EsuTypeMenuContent = (props: EsuTypeMenuContentProps) => {
    const { selectedId } = useIdSelectionContext();
    const { refetch } = props;

    return selectedId ? <EsuTypePreview esuTypeId={selectedId} refetch={refetch} /> : null;
};
