import { useState } from "react";

export const useRoutesPanel = () => {
    const [isRouteCreation, setIsRouteCreation] = useState<boolean>(false);

    return { isRouteCreation, setIsRouteCreation };
};
