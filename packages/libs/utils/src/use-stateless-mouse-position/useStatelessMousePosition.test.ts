import { renderHook } from "@testing-library/react-hooks";
import { fireAbsoluteMouseMove } from "./fireAbsoluteMouseMove";
import { useStatelessMousePosition } from "./useStatelessMousePosition";

test("returns mouse position", () => {
    const { result } = renderHook(() => useStatelessMousePosition());

    fireAbsoluteMouseMove({ x: 100, y: 100 });
    expect(result.current.getMousePosition()).toEqual({ x: 100, y: 100 });

    fireAbsoluteMouseMove({ x: 50, y: 0 });
    expect(result.current.getMousePosition()).toEqual({ x: 50, y: 0 });
});
