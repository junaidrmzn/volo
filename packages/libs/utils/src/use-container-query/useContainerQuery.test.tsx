import { useContainerQuery } from "./useContainerQuery";
import { renderUseContainerQuery } from "./useContainerQueryTestUtils";

it("returns correct value for given query and container size", () => {
    const { triggerResize, result } = renderUseContainerQuery(() =>
        useContainerQuery({ 0: "small", 100: "medium", 200: "large" })
    );

    triggerResize(50);
    expect(result.current).toEqual("small");

    triggerResize(150);
    expect(result.current).toEqual("medium");

    triggerResize(250);
    expect(result.current).toEqual("large");

    triggerResize(1);
    expect(result.current).toEqual("small");
});
