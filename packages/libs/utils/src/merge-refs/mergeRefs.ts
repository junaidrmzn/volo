// eslint-disable-next-line unicorn/prevent-abbreviations
export const mergeRefs =
    <T extends {}>(references: React.MutableRefObject<T | null>[]): React.RefCallback<T> =>
    (value) => {
        for (const ref of references) {
            if (ref != null) {
                ref.current = value;
            }
        }
    };
