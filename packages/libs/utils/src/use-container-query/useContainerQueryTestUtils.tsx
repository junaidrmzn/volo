import { act, render, screen } from "@testing-library/react";
import { mockResizeObserver } from "jsdom-testing-mocks";
import type { UseContainerQueryResult } from "./useContainerQuery";

type RenderHook<T extends {}> = () => UseContainerQueryResult<T>;
type ResultRef<T extends {}> = { current?: T };
export const TestComponent = <T extends {}>(props: { renderHook: RenderHook<T>; resultRef: ResultRef<T> }) => {
    const { renderHook, resultRef } = props;
    const [ref, value] = renderHook();
    resultRef.current = value;

    return <div data-testid="test-component" ref={ref} />;
};

const resizeObserver = mockResizeObserver();

export const renderUseContainerQuery = <T extends {}>(renderHook: RenderHook<T>) => {
    const resultRef: ResultRef<T> = {};
    render(<TestComponent renderHook={renderHook} resultRef={resultRef} />);

    const testComponent = screen.getByTestId("test-component");
    const triggerResize = (width: number) => {
        resizeObserver.mockElementSize(testComponent, {
            contentBoxSize: { inlineSize: width },
        });
        act(() => {
            resizeObserver.resize(testComponent);
        });
    };

    return { triggerResize, result: resultRef };
};
