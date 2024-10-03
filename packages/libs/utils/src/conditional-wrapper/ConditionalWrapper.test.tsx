import { render, screen } from "@testing-library/react";
import { ConditionalWrapper } from "./ConditionalWrapper";

const Wrapper: FCC = (props) => {
    const { children } = props;
    return (
        <>
            <div>Wrapper</div>
            <div>{children}</div>
        </>
    );
};

test("Renders wrapper if condition is true", () => {
    render(
        <ConditionalWrapper Wrapper={Wrapper} condition>
            Children
        </ConditionalWrapper>
    );

    expect(screen.getByText("Wrapper")).toBeVisible();
    expect(screen.getByText("Children")).toBeVisible();
});

test("Does not render wrapper if condition is false", () => {
    render(
        <ConditionalWrapper Wrapper={Wrapper} condition={false}>
            Children
        </ConditionalWrapper>
    );

    expect(screen.queryByText("Wrapper")).not.toBeInTheDocument();
    expect(screen.getByText("Children")).toBeVisible();
});
