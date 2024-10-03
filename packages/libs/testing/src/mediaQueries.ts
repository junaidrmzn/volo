/**
 * Simulates a mobile device by activating all media queries below the mobile breakpoint
 */
export const mockMobileMediaQuery = () =>
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: query.includes("(max-width: 47.99rem)"),
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

/**
 * Simulates a desktop device by activating all media queries above the mobile breakpoint
 */
export const mockDesktopMediaQuery = () =>
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: query.includes("(min-width: 48rem)"),
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
