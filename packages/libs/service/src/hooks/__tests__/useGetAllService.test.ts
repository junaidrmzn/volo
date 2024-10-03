import { anyResourceWithId } from "./testdata/Resource";
import { setupResourceServiceMock } from "./testdata/ResourceServiceMock";
import { useGetAllResources } from "./testdata/useResource";
import { renderHook } from "./utils";

const { listen, resetHandlers, close, database } = setupResourceServiceMock();
beforeAll(listen);
afterEach(resetHandlers);
afterAll(() => {
    close();
    database.clear();
});

test("Resources can be retrieved", async () => {
    const resource = anyResourceWithId();
    database.add(resource);

    const { result: getResult, waitFor } = renderHook(() => useGetAllResources());

    await waitFor(() => expect(getResult.current.data).toEqual([resource]));
});
