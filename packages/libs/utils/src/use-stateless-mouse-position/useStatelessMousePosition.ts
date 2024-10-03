import { useCallback, useEffect, useRef } from "react";

const defaultMousePosition = { x: 0, y: 0 };
export type MousePosition = typeof defaultMousePosition;

export const useStatelessMousePosition = () => {
    const mousePositionRef = useRef(defaultMousePosition);

    useEffect(() => {
        const mouseMoveHandler = (mouseEvent: MouseEvent) => {
            const { x, y } = mouseEvent;
            mousePositionRef.current = { x, y };
        };

        window.addEventListener("mousemove", mouseMoveHandler);
        return () => {
            window.removeEventListener("mousemove", mouseMoveHandler);
        };
    });

    const getMousePosition = useCallback(() => mousePositionRef.current, [mousePositionRef]);

    return { getMousePosition };
};
