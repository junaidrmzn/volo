import { useState } from "react";

export const useHibobIdent = () => {
    const [isHibob, setIsHibob] = useState<boolean>(false);

    return { isHibob, setIsHibob };
};
