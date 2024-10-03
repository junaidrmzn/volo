import { useFilteringPanel } from "../hooks/filtering/useFilteringPanel";
import { FilteringPanelContext } from "./FilteringPanelContext";

export const FilteringPanelProvider: FCC = (props) => {
    const { children } = props;

    const useDataFilterProps = useFilteringPanel();

    return (
        <FilteringPanelContext.Provider value={{ ...useDataFilterProps }}>{children}</FilteringPanelContext.Provider>
    );
};
