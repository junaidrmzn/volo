import { useState } from "react";

export const useCounter = () => {
    const [count, setCount] = useState(0);
    return { count, increment: () => setCount((currentCount) => currentCount + 1) };
};
