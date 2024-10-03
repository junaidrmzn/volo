import { useRef } from "react";

export const useTestPointsFormRef = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const triggerFormSubmit = () => {
        formRef?.current?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    };

    return { triggerFormSubmit, formRef };
};
