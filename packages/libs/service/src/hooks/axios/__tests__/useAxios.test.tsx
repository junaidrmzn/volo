import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { ServiceProvider } from "../../context/ServiceProvider";
import { useAxios } from "../useAxios";

jest.mock("uuid", () => ({
    v4: () => "00000000-0000-0000-0000-000000000000",
}));

const getHandler = rest.get("http://localhost:8080/api", (request, response, context) =>
    response(context.status(200), context.json({ success: true }))
);
const thirdpartyAPIGetHandler = rest.get("http://api.github.com/users", (request, response, context) =>
    response(context.status(200), context.json({ success: true }))
);

const { listen, close } = setupServer(getHandler, thirdpartyAPIGetHandler);

beforeAll(() => {
    listen();
});

afterAll(() => {
    close();
});

test("Outgoing requests to the API have logging headers", async () => {
    const mockInterceptorFunction = jest.fn().mockImplementation((request) => request);

    const { result, waitForNextUpdate } = renderHook(
        () =>
            useAxios({
                baseURL: "http://localhost:8080",
            }),
        {
            // eslint-disable-next-line destructuring/in-params
            wrapper: ({ children }) => (
                <LocalAuthenticationProvider>
                    <ServiceProvider
                        baseUrl="http://localhost:8080"
                        requestInterceptors={[mockInterceptorFunction]}
                        logging={{
                            teamName: "TelePort",
                            serviceName: "LogbookFrontend",
                        }}
                    >
                        {children}
                    </ServiceProvider>
                </LocalAuthenticationProvider>
            ),
        }
    );
    const [, sendRequest] = result.current;

    act(() => {
        sendRequest({
            url: "/api",
            headers: {
                filter: `aircraftId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "msn:asc",
            },
        });
    });

    await waitForNextUpdate();

    expect(mockInterceptorFunction).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: expect.objectContaining({
                filter: `aircraftId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "msn:asc",
                "X-VOLO-CRMID": "00000000-0000-0000-0000-000000000000",
                "X-VOLO-SESSIONID": "00000000-0000-0000-0000-000000000000",
            }),
        })
    );
});

test("Outgoing requests to third party APIs do not have logging headers", async () => {
    const mockInterceptorFunction = jest.fn().mockImplementation((request) => request);

    const { result, waitForNextUpdate } = renderHook(
        () =>
            useAxios({
                baseURL: "http://api.github.com",
            }),
        {
            // eslint-disable-next-line destructuring/in-params
            wrapper: ({ children }) => (
                <LocalAuthenticationProvider>
                    <ServiceProvider
                        baseUrl="http://localhost:8080"
                        requestInterceptors={[mockInterceptorFunction]}
                        logging={{
                            teamName: "TelePort",
                            serviceName: "LogbookFrontend",
                        }}
                    >
                        {children}
                    </ServiceProvider>
                </LocalAuthenticationProvider>
            ),
        }
    );
    const [, sendRequest] = result.current;

    act(() => {
        sendRequest({
            url: "/users",
            headers: {
                filter: `userId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "creationDate:desc",
            },
        });
    });

    await waitForNextUpdate();

    const mockInterceptorReceivedHeaders = mockInterceptorFunction.mock.calls[0][0].headers;
    expect(mockInterceptorReceivedHeaders).not.toHaveProperty("X-VOLO-CRMID");
    expect(mockInterceptorReceivedHeaders).not.toHaveProperty("X-VOLO-SESSIONID");
    expect(mockInterceptorReceivedHeaders).not.toHaveProperty("X-VOLO-TRACEID");
    expect(mockInterceptorFunction).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: expect.objectContaining({
                filter: `userId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "creationDate:desc",
            }),
        })
    );
});

test("Outgoing requests to the API have a token in the Authorization header", async () => {
    const mockInterceptorFunction = jest.fn().mockImplementation((request) => request);

    const { result, waitForNextUpdate } = renderHook(
        () =>
            useAxios({
                baseURL: "http://localhost:8080",
            }),
        {
            // eslint-disable-next-line destructuring/in-params
            wrapper: ({ children }) => (
                <LocalAuthenticationProvider>
                    <ServiceProvider
                        baseUrl="http://localhost:8080"
                        requestInterceptors={[mockInterceptorFunction]}
                        withAuth
                    >
                        {children}
                    </ServiceProvider>
                </LocalAuthenticationProvider>
            ),
        }
    );
    const [, sendRequest] = result.current;
    act(() => {
        sendRequest({
            url: "/api",
            headers: {
                filter: `aircraftId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "msn:asc",
            },
        });
    });

    await waitForNextUpdate();

    expect(mockInterceptorFunction).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: expect.objectContaining({
                Authorization: expect.any(String),
                filter: `aircraftId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "msn:asc",
            }),
        })
    );
});

test("Outgoing requests to third party APIs do not have a token in the Authorization header", async () => {
    const mockInterceptorFunction = jest.fn().mockImplementation((request) => request);

    const { result, waitForNextUpdate } = renderHook(
        () =>
            useAxios({
                baseURL: "http://api.github.com",
            }),
        {
            // eslint-disable-next-line destructuring/in-params
            wrapper: ({ children }) => (
                <LocalAuthenticationProvider>
                    <ServiceProvider
                        baseUrl="http://localhost:8080"
                        requestInterceptors={[mockInterceptorFunction]}
                        withAuth
                    >
                        {children}
                    </ServiceProvider>
                </LocalAuthenticationProvider>
            ),
        }
    );
    const [, sendRequest] = result.current;
    act(() => {
        sendRequest({
            url: "/users",
            headers: {
                filter: `userId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "creationDate:desc",
            },
        });
    });

    await waitForNextUpdate();

    const mockInterceptorReceivedHeaders = mockInterceptorFunction.mock.calls[0][0].headers;
    expect(mockInterceptorReceivedHeaders).not.toHaveProperty("Authorization");
    expect(mockInterceptorFunction).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: expect.objectContaining({
                filter: `userId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "creationDate:desc",
            }),
        })
    );
});

test("Authentication interceptor is unused when the withAuth prop is not given", async () => {
    const mockInterceptorFunction = jest.fn().mockImplementation((request) => request);
    const { result, waitForNextUpdate } = renderHook(
        () =>
            useAxios({
                baseURL: "http://localhost:8080",
            }),
        {
            // eslint-disable-next-line destructuring/in-params
            wrapper: ({ children }) => (
                <LocalAuthenticationProvider>
                    <ServiceProvider baseUrl="http://localhost:8080" requestInterceptors={[mockInterceptorFunction]}>
                        {children}
                    </ServiceProvider>
                </LocalAuthenticationProvider>
            ),
        }
    );
    const [, sendRequest] = result.current;
    act(() => {
        sendRequest({
            url: "/api",
            headers: {
                filter: `aircraftId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "msn:asc",
            },
        });
    });
    await waitForNextUpdate();

    const mockInterceptorReceivedHeaders = mockInterceptorFunction.mock.calls[0][0].headers;
    expect(mockInterceptorReceivedHeaders).not.toHaveProperty("Authorization");
    expect(mockInterceptorFunction).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: expect.objectContaining({
                filter: `aircraftId EQ "00000000-0000-0000-0000-000000000000"`,
                orderBy: "msn:asc",
            }),
        })
    );
});

test("traceId should be returned by useAxios hook and it should be present in the headers", async () => {
    const mockInterceptorFunction = jest.fn().mockImplementation((request) => request);
    const { result, waitForNextUpdate } = renderHook(
        () =>
            useAxios({
                baseURL: "http://localhost:8080",
            }),
        {
            // eslint-disable-next-line destructuring/in-params
            wrapper: ({ children }) => (
                <LocalAuthenticationProvider>
                    <ServiceProvider baseUrl="http://localhost:8080" requestInterceptors={[mockInterceptorFunction]}>
                        {children}
                    </ServiceProvider>
                </LocalAuthenticationProvider>
            ),
        }
    );
    const [, sendRequest, , traceId] = result.current;

    expect(traceId).toEqual("VoloIQ-MISSING-MISSING-00000000-0000-0000-0000-000000000000");

    act(() => {
        sendRequest({
            url: "/api",
            headers: {
                orderBy: "msn:asc",
            },
        });
    });
    await waitForNextUpdate();

    expect(mockInterceptorFunction.mock.calls[0][0].headers).toHaveProperty("X-VOLO-TRACEID");
    expect(mockInterceptorFunction).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: expect.objectContaining({
                "X-VOLO-TRACEID": "VoloIQ-MISSING-MISSING-00000000-0000-0000-0000-000000000000",
            }),
        })
    );
});
