import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { useAxiosInstance } from "../useAxiosInstance";

const getHandler = rest.get("http://localhost:8080/api", (request, response, context) =>
    response(context.status(200), context.json({ success: true }))
);

const { listen, close } = setupServer(getHandler);

beforeAll(() => {
    listen();
});

afterAll(() => {
    close();
});

test("Rerendering should not duplicate interceptors", async () => {
    const mockInterceptorFunction = jest.fn().mockImplementation((request) => request);

    const { result, rerender } = renderHook(
        () =>
            useAxiosInstance({
                requestInterceptors: [mockInterceptorFunction],
            }),
        {
            // eslint-disable-next-line destructuring/in-params
            wrapper: ({ children }) => <LocalAuthenticationProvider>{children}</LocalAuthenticationProvider>,
        }
    );
    const { axiosInstance } = result.current;

    await axiosInstance.get("http://localhost:8080/api");

    expect(mockInterceptorFunction).toHaveBeenCalledTimes(1);

    rerender();

    await axiosInstance.get("http://localhost:8080/api");

    expect(mockInterceptorFunction).toHaveBeenCalledTimes(2);
});
