import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type SelectedRouteSequenceIndexContextProps = {
    selectedRouteSequenceIndex?: number;
    setSelectedRouteSequenceIndex: Dispatch<SetStateAction<number | undefined>>;
};

const SelectedRouteSequenceIndexContext = createContext<SelectedRouteSequenceIndexContextProps>({
    selectedRouteSequenceIndex: undefined,
    setSelectedRouteSequenceIndex: () => {},
});

export const SelectedRouteSequenceIndexProvider: FCC = (props) => {
    const { children } = props;
    /* eslint-disable-next-line use-encapsulation/prefer-custom-hooks */
    const [selectedRouteSequenceIndex, setSelectedRouteSequenceIndex] = useState<number | undefined>(undefined);

    return (
        <SelectedRouteSequenceIndexContext.Provider
            value={{ selectedRouteSequenceIndex, setSelectedRouteSequenceIndex }}
        >
            {children}
        </SelectedRouteSequenceIndexContext.Provider>
    );
};

export const useSelectedRouteSequenceIndex = () => useContext(SelectedRouteSequenceIndexContext);
