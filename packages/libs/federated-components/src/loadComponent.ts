export type LoadComponentOptions = {
    scope: string;
    componentPath: string;
    componentName: string;
};

export const loadComponent = (options: LoadComponentOptions) => {
    const { componentName, componentPath, scope } = options;
    return async () => {
        await __webpack_init_sharing__("default");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const container = (window as any)[scope];

        await container.init(__webpack_share_scopes__.default);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const factory = await (window as any)[scope].get(componentPath);

        const Module = factory();

        return { default: Module[componentName] };
    };
};
