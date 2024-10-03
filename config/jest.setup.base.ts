import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

// the window.matchMedia API is not available outside of browsers, therefore we mock it and by default say that media queries never matches
// this behavior can be overridden as needed in tests (e.g. to simulate a mobile device)
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

expect.extend(toHaveNoViolations);
