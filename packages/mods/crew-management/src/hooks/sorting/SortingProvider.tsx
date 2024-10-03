import { SortingContext } from "./SortingContext";
import { useSorting } from "./useSorting";

export const SortingProvider: FCC = (props) => {
    const { children } = props;
    const sortingProps = useSorting();
    return <SortingContext.Provider value={sortingProps}>{children}</SortingContext.Provider>;
};
