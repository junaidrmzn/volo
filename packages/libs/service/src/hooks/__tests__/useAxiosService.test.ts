import { useAxiosService } from "../useAxiosService";
import type { Resource, ResourceCreate, ResourceUpdate } from "./testdata/Resource";
import { anyResource, anyResourceWithId } from "./testdata/Resource";
import { setupResourceServiceMock } from "./testdata/ResourceServiceMock";
import { expectToBeDefined, renderHook } from "./utils";

const { listen, resetHandlers, close, database } = setupResourceServiceMock();
beforeAll(listen);
afterEach(() => {
    resetHandlers();
    database.clear();
});
afterAll(() => {
    close();
});

test("Resource can be created (post)", async () => {
    const { result } = renderHook(() => useAxiosService());
    const resource = anyResource();

    const response = await result.current.axiosPost<Resource, ResourceCreate>({ path: "/resources", data: resource });

    expectToBeDefined(response.data);
    const { id } = response.data;

    expect(database.get()).toEqual([
        expect.objectContaining({
            id,
            ...resource,
        }),
    ]);
});

test("Resource can be deleted (delete)", async () => {
    const resource = anyResourceWithId({ location: "Munich" });
    database.add(resource);
    const { id } = resource;

    const { result } = renderHook(() => useAxiosService());

    await result.current.axiosDelete({ path: `/resources/${id}` });

    expect(database.get()).toEqual([]);
});

test("Resources can be retrieved (getAll)", async () => {
    const resource = anyResourceWithId();
    database.add(resource);

    const { result } = renderHook(() => useAxiosService());

    const response = await result.current.axiosGet<Resource[]>({ path: `/resources` });

    expect(response.data).toEqual([resource]);
});

test("Resource can be retrieved (get)", async () => {
    const resource = anyResourceWithId();
    database.add(resource);
    const { id } = resource;

    const { result } = renderHook(() => useAxiosService());

    const response = await result.current.axiosGet<Resource>({ path: `/resources/${id}` });

    expect(response.data).toEqual(resource);
});

test("Resource can be patched (patch)", async () => {
    const resource = anyResourceWithId();
    database.add(resource);
    const { id } = resource;

    const { result } = renderHook(() => useAxiosService());

    const patchResource = anyResourceWithId({ ...resource, width: 120 });

    const response = await result.current.axiosPatch<Resource, ResourceCreate>({
        path: `/resources/${id}`,
        data: patchResource,
    });

    expect(response.data).toEqual(patchResource);
});

test("Resource can be updated (put)", async () => {
    const resource = anyResourceWithId();
    database.add(resource);
    const { id } = resource;

    const { result } = renderHook(() => useAxiosService());

    const response = await result.current.axiosPut<Resource, ResourceUpdate>({
        path: `/resources/${id}`,
        data: { location: "Bruchsal" },
    });

    expectToBeDefined(response.data);

    expect(database.get()).toEqual([
        expect.objectContaining({
            ...resource,
            location: "Bruchsal",
        }),
    ]);
});
