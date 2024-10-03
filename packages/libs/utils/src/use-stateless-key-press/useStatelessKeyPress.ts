import { useEffect, useRef } from "react";

export const useStatelessKeyPress = (key: string) => {
    const isKeyPressedRef = useRef(false);

    useEffect(() => {
        const keydownHandler = (keyboardEvent: KeyboardEvent) => {
            const { key: eventKey } = keyboardEvent;
            if (eventKey === key) {
                isKeyPressedRef.current = true;
            }
        };
        const keyupHandler = (keyboardEvent: KeyboardEvent) => {
            const { key: eventKey } = keyboardEvent;
            if (eventKey === key) {
                isKeyPressedRef.current = false;
            }
        };
        window.addEventListener("keydown", keydownHandler);
        window.addEventListener("keyup", keyupHandler);

        return () => {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
        };
    });

    const isKeyPressed = () => isKeyPressedRef.current;

    return { isKeyPressed };
};
