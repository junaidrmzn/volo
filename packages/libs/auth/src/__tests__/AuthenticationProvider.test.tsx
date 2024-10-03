import { renderHook } from "@testing-library/react-hooks";
import log from "loglevel";
import { parseAuthConfiguration, useParsedAuthConfiguration } from "../authConfig";
import { AuthenticationProvider } from "../authentication/AuthenticationProvider";
import { useAuthentication } from "../authentication/useAuthentication";
import msalAuthConfiguration from "./mock-auth-configuration-msal.json";
import staticInvalidAuthConfiguration from "./mock-auth-configuration-static-invalid.json";
import staticAuthConfigurationUnknownGroup from "./mock-auth-configuration-static-unknown-group.json";
import staticAuthConfiguration from "./mock-auth-configuration-static.json";

jest.mock("../providers/MsalProvider", () => {
    // eslint-disable-next-line global-require
    const { StaticProvider } = require("../providers/StaticProvider");
    return { MsalProviderWrapper: StaticProvider };
});
const errorLogger = jest.spyOn(log, "error");
errorLogger.mockImplementation(() => {});

const warningLogger = jest.spyOn(log, "warn");
warningLogger.mockImplementation(() => {});

beforeEach(() => {
    errorLogger.mockReset();
    warningLogger.mockReset();
});

type MockedAuthConfigType = "static" | "msal" | "invalid" | "unknownGroup";

const getAuthConfigJson = (type: MockedAuthConfigType) => {
    const config = {
        static: staticAuthConfiguration,
        unknownGroup: staticAuthConfigurationUnknownGroup,
        msal: msalAuthConfiguration,
        invalid: staticInvalidAuthConfiguration,
    }[type];
    return JSON.stringify(config);
};

test("that the AuthenticationProvider provides a token with the static auth config", async () => {
    const authConfiguration = getAuthConfigJson("static");
    const { result } = renderHook(useAuthentication, {
        wrapper: AuthenticationProvider,
        initialProps: { authConfiguration: parseAuthConfiguration(authConfiguration), children: null },
    });

    result.current.getAccessToken().then((token) => expect(token).toEqual("volomockedtoken"));
});

test("that the AuthenticationProvider provides a token with the msal auth config", async () => {
    const authConfiguration = getAuthConfigJson("msal");

    const { result } = renderHook(useAuthentication, {
        wrapper: AuthenticationProvider,
        initialProps: { authConfiguration: parseAuthConfiguration(authConfiguration), children: null },
    });

    result.current.getAccessToken().then((token) => expect(token).toEqual("volomockedtoken"));
});

test("that an invalid auth config reports errors", async () => {
    const authConfiguration = getAuthConfigJson("invalid");

    const { waitFor, result } = renderHook(useParsedAuthConfiguration, { initialProps: authConfiguration });

    expect(result.error?.message).toBe("The auth configuration didn't match the schema");
    await waitFor(() => expect(errorLogger).toHaveBeenCalledWith("domain is a required field"));
});

test("that a valid auth config does not report errors", async () => {
    const authConfiguration = getAuthConfigJson("static");

    renderHook(useParsedAuthConfiguration, { initialProps: authConfiguration });

    expect(errorLogger).not.toHaveBeenCalled();
});

test("that an auth config with an unknown group logs a warning and does not report errors", async () => {
    const authConfiguration = getAuthConfigJson("unknownGroup");

    const { waitFor, result } = renderHook(useParsedAuthConfiguration, { initialProps: authConfiguration });

    await waitFor(() =>
        expect(warningLogger).toHaveBeenCalledWith(
            "The following target group name is not defined in the authorization.ts file and will be ignored: Unknown"
        )
    );
    expect(result.error).toBeUndefined();
});
