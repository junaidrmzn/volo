import { IdSelectionContext } from "./IdSelectionContext";
import { useHibobIdent } from "./useHibobIdent";
import { useIdSelection } from "./useIdSelection";

export const IdSelectionProvider: FCC = (props) => {
    const { children } = props;
    const useIdSelectionProps = useIdSelection();
    const useHibobIdentProps = useHibobIdent();

    return (
        <IdSelectionContext.Provider value={{ ...useIdSelectionProps, ...useHibobIdentProps }}>
            {children}
        </IdSelectionContext.Provider>
    );
};
