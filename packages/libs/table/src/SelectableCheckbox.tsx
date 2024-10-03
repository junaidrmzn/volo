import { Checkbox } from "@volocopter/design-library-react";
import type { ForwardedRef } from "react";
import { forwardRef, useEffect, useRef } from "react";
import type { TableToggleRowsSelectedProps } from "react-table";

export const SelectableCheckbox = forwardRef(
    (props: TableToggleRowsSelectedProps, ref: ForwardedRef<HTMLInputElement>) => {
        const { indeterminate, checked, ...rest } = props;
        const defaultRef = useRef<HTMLInputElement>(null);
        const resolvedRef: ForwardedRef<HTMLInputElement> = ref || defaultRef;

        useEffect(() => {
            if (typeof resolvedRef === "object" && resolvedRef.current && indeterminate !== undefined) {
                resolvedRef.current.indeterminate = indeterminate;
            } else {
                throw new Error("SelectableCheckbox does not expect function refs");
            }
        }, [resolvedRef, indeterminate]);

        return (
            <Checkbox
                ref={resolvedRef}
                {...rest}
                isIndeterminate={indeterminate}
                isChecked={checked}
                size="sm"
                verticalAlign="center"
                pl="3"
                ml="2"
            />
        );
    }
);
