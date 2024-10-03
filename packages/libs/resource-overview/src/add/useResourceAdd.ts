import { useState } from "react";

export const useResourceAdd = () => {
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

    return {
        isSaveButtonDisabled,
        setIsSaveButtonDisabled,
    };
};
