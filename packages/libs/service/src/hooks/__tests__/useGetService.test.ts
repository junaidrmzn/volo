import { rest } from "msw";
import * as toast from "../toast/useErrorToast";
import { anyResourceWithId } from "./testdata/Resource";
import { setupResourceServiceMock } from "./testdata/ResourceServiceMock";
import { useGetResource } from "./testdata/useResource";
import { renderHook } from "./utils";

const mockDisplayErrorToast = jest.fn();
jest.spyOn(toast, "useErrorToast").mockImplementation(() => ({ displayErrorToast: mockDisplayErrorToast }));
jest.mock("uuid", () => ({
    v4: () => "00000000-0000-0000-0000-000000000000",
}));

const { listen, resetHandlers, close, database, use } = setupResourceServiceMock();
beforeAll(listen);
afterEach(resetHandlers);
afterAll(() => {
    close();
    database.clear();
});
const date = new Date().toISOString();

const getResourceErrorHandler = rest.get(
    "https://api.voloiq.com/resources/:resourceId",
    (request, response, context_) => {
        const { resourceId } = request.params;
        if (!resourceId || resourceId === "1") {
            return response(
                context_.status(401),
                context_.json({
                    error: {
                        id: "test",
                        timestamp: date,
                        code: 401,
                        message: "Bad Request",
                        status: "UNKNOWN",
                    },
                })
            );
        }
        if (!resourceId || resourceId === "2") {
            return response(context_.status(500));
        }
        return response.networkError("Error");
    }
);

test("Resource can be retrieved", async () => {
    const resource = anyResourceWithId();
    database.add(resource);

    const { result, waitFor } = renderHook(() => useGetResource(resource.id));

    await waitFor(() => expect(result.current.data).toEqual(resource));
});

test("Client error returns an error object", async () => {
    use(getResourceErrorHandler);
    mockDisplayErrorToast.mockReset();

    const { result, waitFor } = renderHook(() => useGetResource("1"));

    await waitFor(() => expect(result.current.state).toEqual("error"));
    expect(result.current.error).toEqual({
        id: "test",
        timestamp: date,
        code: 401,
        message: "Bad Request",
        status: "UNKNOWN",
    });
    expect(result.current.data).toBeUndefined();
    expect(result.current.statusCode).toEqual(401);

    expect(mockDisplayErrorToast).toHaveBeenCalledTimes(0);
});

test("Server error returns no error object", async () => {
    use(getResourceErrorHandler);
    mockDisplayErrorToast.mockReset();

    const { result, waitFor } = renderHook(() => useGetResource("2"));

    await waitFor(() => expect(result.current.state).toEqual("error"));
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.statusCode).toEqual(500);

    expect(mockDisplayErrorToast).toHaveBeenCalledTimes(1);
    expect(mockDisplayErrorToast.mock.calls[0]).toEqual([
        "Error",
        "The service is currently not available.\nError code: VoloIQ-MISSING-MISSING-00000000-0000-0000-0000-000000000000.",
    ]);
});

test("Network error returns no error and error code 503", async () => {
    use(getResourceErrorHandler);
    mockDisplayErrorToast.mockReset();

    const { result, waitFor } = renderHook(() => useGetResource("3"));

    await waitFor(() => expect(result.current.state).toEqual("error"));
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.statusCode).toEqual(503);

    expect(mockDisplayErrorToast).toHaveBeenCalledTimes(1);
    expect(mockDisplayErrorToast.mock.calls[0]).toEqual([
        "Error",
        "An unknown error occurred.\nError code: VoloIQ-MISSING-MISSING-00000000-0000-0000-0000-000000000000.",
    ]);
});
