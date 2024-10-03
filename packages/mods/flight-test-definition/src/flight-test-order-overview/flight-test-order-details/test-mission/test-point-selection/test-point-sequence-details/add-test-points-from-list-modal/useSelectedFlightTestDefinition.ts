import { useState } from "react";

export type SelectedFlightTestDefinition = {
    id: string;
    ftdId: string;
};

export const useSelectedFlightTestDefinition = () => {
    const [selectedDefinition, selectDefinition] = useState<SelectedFlightTestDefinition | null>(null);

    const onSelectDefinition = (id: string, ftdId: string) => {
        selectDefinition({ id, ftdId });
    };

    return { selectedDefinition, onSelectDefinition };
};
