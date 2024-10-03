import { fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useStatelessKeyPress } from "./useStatelessKeyPress";

test("returns true only when right key is pressed", () => {
    const { result } = renderHook(() => useStatelessKeyPress("Control"));

    fireEvent.keyDown(window, { key: "Control" });
    expect(result.current.isKeyPressed()).toBe(true);

    fireEvent.keyUp(window, { key: "Control" });
    expect(result.current.isKeyPressed()).toBe(false);

    fireEvent.keyDown(window, { key: "Shift" });
    expect(result.current.isKeyPressed()).toBe(false);
});
