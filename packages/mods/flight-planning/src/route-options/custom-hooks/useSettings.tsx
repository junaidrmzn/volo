import { useState } from "react";

export const useSettings = () => {
    const [parameterValue, setParameterValue] = useState<string | null>();

    return { parameterValue, setParameterValue };
};
