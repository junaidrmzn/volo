import { fireEvent } from "@testing-library/react";

type FakeMouseEventInit = {
    x: number;
    y: number;
};

class FakeMouseEvent extends MouseEvent {
    x: number;

    y: number;

    constructor(type: string, values: Partial<FakeMouseEventInit>) {
        const { x = 0, y = 0 } = values;
        super(type);

        this.x = x;
        this.y = y;
    }
}

export const fireAbsoluteMouseMove = (fakeMouseEventInit: Partial<FakeMouseEventInit> = {}) =>
    fireEvent(window, new FakeMouseEvent("mousemove", fakeMouseEventInit));
