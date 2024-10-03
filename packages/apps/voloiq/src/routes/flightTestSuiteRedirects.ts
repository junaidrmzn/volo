import { Redirects } from "./useRerouting";

// These redirects are required to stay backward compatible with any URLs that have been bookmarked before updating the URL schema in scope of VTE-1596
export const flightTestSuiteRedirects: Redirects = [
    {
        from: "/logbook/overview",
        to: "/flight-test-suite/logs",
    },
    {
        from: "/logbook/software-configurations",
        to: "/flight-test-suite/software-configs",
    },
    {
        from: "/flight-test-instrumentation/overview",
        to: "/flight-test-suite/fti-parameters",
    },
    {
        from: "/flight-test-definition/overview",
        to: "/flight-test-suite/definitions",
    },
    {
        from: "/flight-test-definition/test-hazard-analysis/overview",
        to: "/flight-test-suite/test-hazards",
    },
    {
        from: "/flight-test-definition/parameter/overview",
        to: "/flight-test-suite/test-point-parameters",
    },
    {
        from: "/flight-test-definition/test-points/overview",
        to: "/flight-test-suite/test-points",
    },
    {
        from: "/flight-test-definition/flight-test-orders/overview",
        to: "/flight-test-suite/orders",
    },
];
