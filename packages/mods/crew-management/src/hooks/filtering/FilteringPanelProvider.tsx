import { FilteringPanelContext } from "./FilteringPanelContext";
import { useFilteringPanel } from "./useFilteringPanel";

export const FilteringPanelProvider: FCC = (props) => {
    const { children } = props;

    const useDataFilterProps = useFilteringPanel();

    return (
        <FilteringPanelContext.Provider value={{ ...useDataFilterProps }}>{children}</FilteringPanelContext.Provider>
    );
};
