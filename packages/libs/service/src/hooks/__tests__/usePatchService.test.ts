import { act } from "@testing-library/react-hooks";
import { anyResourceWithId } from "./testdata/Resource";
import { setupResourceServiceMock } from "./testdata/ResourceServiceMock";
import { usePatchResource } from "./testdata/useResource";
import { expectToBeDefined, renderHook } from "./utils";

const { listen, resetHandlers, close, database } = setupResourceServiceMock();
beforeAll(listen);
afterEach(resetHandlers);
afterAll(() => {
    close();
    database.clear();
});

test("Resource can be patched", async () => {
    const resource = anyResourceWithId({ width: 100 });
    database.add(resource);

    const { result, waitFor, rerender } = renderHook(() => usePatchResource(resource.id));

    expect(result.current.state).toBe("idle");
    rerender();
    expect(result.current.state).toBe("idle");

    const patchResource = anyResourceWithId({ ...resource, width: 120 });

    act(() => {
        result.current.sendRequest({
            data: patchResource,
        });
    });

    await waitFor(() => expect(result.current.state).toBe("pending"));
    await waitFor(() => expect(result.current.state).toBe("success"));

    const { data } = result.current;
    expectToBeDefined(data);

    expect(data).toEqual(patchResource);
});
