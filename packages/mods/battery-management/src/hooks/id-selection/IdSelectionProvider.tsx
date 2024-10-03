import { IdSelectionContext } from "./IdSelectionContext";
import { useIdSelection } from "./useIdSelection";

export const IdSelectionProvider: FCC = (props) => {
    const { children } = props;
    const useIdSelectionProps = useIdSelection();

    return <IdSelectionContext.Provider value={{ ...useIdSelectionProps }}>{children}</IdSelectionContext.Provider>;
};
