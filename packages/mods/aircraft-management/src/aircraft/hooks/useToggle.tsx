import { useState } from "react";

export const useToggle = () => {
    const [isToggled, setToggle] = useState(false);

    return { isToggled, setToggle };
};
