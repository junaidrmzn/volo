// This is required because otherwise the WebpackModuleFederation plugin would load our source code before
// loading the React bundle, which causes an error: https://www.linkedin.com/pulse/uncaught-error-shared-module-available-eager-rany-elhousieny-phd%E1%B4%AC%E1%B4%AE%E1%B4%B0/
import("./bootstrap");
