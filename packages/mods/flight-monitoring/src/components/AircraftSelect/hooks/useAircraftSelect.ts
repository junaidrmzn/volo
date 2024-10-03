import { useEffect, useState } from "react";
import { useActiveVtols } from "../../../api-hooks";

export const useAircraftSelect = () => {
    const { getActiveVtols } = useActiveVtols();
    const [vtolOptions, setVtolOptions] = useState<{ value: string; label: string }[]>([]);
    const [vtolFetch, setVtolFetch] = useState<boolean>(false);

    const triggerVtolFetch = () => {
        setVtolFetch((currentValue) => !currentValue);
    };

    useEffect(() => {
        getActiveVtols().then((vtols) => setVtolOptions(vtols.map((vtol) => ({ value: vtol, label: vtol }))));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vtolFetch]);

    return { vtolOptions, triggerVtolFetch };
};
