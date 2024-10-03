import { act } from "@testing-library/react-hooks";
import { anyResourceWithId } from "./testdata/Resource";
import { setupResourceServiceMock } from "./testdata/ResourceServiceMock";
import { useUpdateResource } from "./testdata/useResource";
import { expectToBeDefined, renderHook } from "./utils";

const { listen, resetHandlers, close, database } = setupResourceServiceMock();
beforeAll(listen);
afterEach(resetHandlers);
afterAll(() => {
    close();
    database.clear();
});

test("Resource can be updated", async () => {
    const resource = anyResourceWithId({ location: "Munich" });
    database.add(resource);

    const { id } = resource;

    const { result, waitFor, rerender } = renderHook(() => useUpdateResource());

    expect(result.current.state).toBe("idle");
    rerender();
    expect(result.current.state).toBe("idle");

    act(() => {
        result.current.sendRequestById(id, {
            data: {
                location: "Bruchsal",
            },
        });
    });

    await waitFor(() => expect(result.current.state).toBe("pending"));
    await waitFor(() => expect(result.current.state).toBe("success"));
    expectToBeDefined(result.current.data);

    expect(database.get()).toEqual([
        expect.objectContaining({
            ...resource,
            location: "Bruchsal",
        }),
    ]);
});
