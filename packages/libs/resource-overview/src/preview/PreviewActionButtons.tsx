import { Button } from "@volocopter/design-library-react";
import type { ReactElement, ReactNode } from "react";
import { match } from "ts-pattern";
import type { BaseResource } from "../state-machine/BaseResource";
import { createCompoundComponent } from "../utils/createCompoundComponent";

type PreviewActionButtonProps = {
    onClick: () => void;
    children: ReactNode;
} & (
    | {
          variant: "primary";
          icon?: undefined;
      }
    | {
          variant: "ghost";
          icon: ReactElement;
      }
);

export const PreviewActionButton = (props: PreviewActionButtonProps) => {
    const { children, icon, onClick, variant } = props;

    return match(variant)
        .with("primary", () => <Button onClick={onClick}>{children}</Button>)
        .with("ghost", () => (
            <Button variant="ghost" size="lg" leftIcon={icon} onClick={onClick}>
                {children}
            </Button>
        ))
        .exhaustive();
};

export const {
    CompoundComponent: PreviewActionButtons,
    getCompoundComponentOptionalProps: getPreviewActionButtonsProps,
} = createCompoundComponent();

export type PreviewActionButtonsProps<Resource extends BaseResource> = {
    children: (resource: Resource) => ReactElement | null;
};
