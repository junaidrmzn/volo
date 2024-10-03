import { act } from "@testing-library/react-hooks";
import { anyResourceWithId } from "./testdata/Resource";
import { setupResourceServiceMock } from "./testdata/ResourceServiceMock";
import { useDeleteResource } from "./testdata/useResource";
import { renderHook } from "./utils";

const { listen, resetHandlers, close, database } = setupResourceServiceMock();
beforeAll(listen);
afterEach(resetHandlers);
afterAll(() => {
    close();
    database.clear();
});

test("Resource can be deleted", async () => {
    const resource = anyResourceWithId({ location: "Munich" });
    database.add(resource);

    const { id } = resource;
    const { result, waitFor, rerender } = renderHook(() => useDeleteResource());

    expect(result.current.state).toBe("idle");
    rerender();
    expect(result.current.state).toBe("idle");

    act(() => {
        result.current.sendRequestById(id);
    });
    await waitFor(() => expect(result.current.state).toBe("pending"));
    await waitFor(() => expect(result.current.state).toBe("success"));

    expect(database.get()).toEqual([]);
});
