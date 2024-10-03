const isDefined = <T extends {}>(object: T | undefined): object is T => object !== undefined;
export const mergeReferences = <T>(
    references: (React.MutableRefObject<T | null> | undefined)[]
): React.RefCallback<T> => {
    return (value) => {
        for (const ref of references.filter(isDefined)) {
            ref.current = value;
        }
    };
};
