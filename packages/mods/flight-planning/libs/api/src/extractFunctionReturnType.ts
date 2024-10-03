// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractFunctionReturnType<FunctionType extends (...args: any) => any> = Awaited<ReturnType<FunctionType>>;
