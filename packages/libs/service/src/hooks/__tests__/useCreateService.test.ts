import { act } from "@testing-library/react-hooks";
import { anyResource } from "./testdata/Resource";
import { setupResourceServiceMock } from "./testdata/ResourceServiceMock";
import { useCreateResource } from "./testdata/useResource";
import { expectToBeDefined, renderHook } from "./utils";

const { listen, resetHandlers, close, database } = setupResourceServiceMock();
beforeAll(listen);
afterEach(resetHandlers);
afterAll(() => {
    close();
    database.clear();
});

test("Resource can be created", async () => {
    const { result, waitFor, rerender } = renderHook(() => useCreateResource());

    expect(result.current.state).toBe("idle");
    rerender();
    expect(result.current.state).toBe("idle");

    const resource = anyResource();
    act(() => {
        result.current.sendRequest({
            data: resource,
        });
    });
    await waitFor(() => expect(result.current.state).toBe("pending"));
    await waitFor(() => expect(result.current.state).toBe("success"));

    const { data } = result.current;
    expectToBeDefined(data);
    const { id } = data;

    expect(database.get()).toEqual([
        expect.objectContaining({
            id,
            ...resource,
        }),
    ]);
});
