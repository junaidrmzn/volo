import { Box, Button, Divider, Header, Radio, RadioGroup, VStack } from "@volocopter/design-library-react";
import type { SortingOrder } from "./sortingPanelReducer";
import type { UseSortingPanelProps } from "./useSortingPanel";
import { useSortingPanel } from "./useSortingPanel";

export type SortingConfiguration = {
    selectedOption: string;
    selectedOrder: SortingOrder;
};

export type SortingOrderOption = {
    value: SortingOrder;
    label: string;
};

export type SortingPanelProps = {
    applyButtonLabel: string;
    ascendingLabel: string;
    backButtonAriaLabel: string;
    cancelButtonLabel: string;
    descendingLabel: string;
    title: string;
    onCancel: () => void;
    onClose: () => void;
    onChange: (sortingConfiguration: SortingConfiguration) => void;
} & UseSortingPanelProps;

export const SortingPanel: FCC<SortingPanelProps> = (props) => {
    const {
        applyButtonLabel,
        ascendingLabel,
        backButtonAriaLabel,
        cancelButtonLabel,
        descendingLabel,
        defaultOption,
        defaultOrder,
        options,
        title,
        onCancel,
        onClose,
        onChange,
    } = props;
    const { selectedOption, selectedOrder, dispatch } = useSortingPanel({
        defaultOption,
        defaultOrder,
        options,
    });

    const sortingOrderOptions: SortingOrderOption[] = [
        {
            value: "ASC",
            label: ascendingLabel,
        },
        {
            value: "DESC",
            label: descendingLabel,
        },
    ];

    const handleCancel = () => {
        dispatch({ type: "CANCEL" });
        onCancel();
    };

    const handleApply = () => {
        dispatch({ type: "APPLY" });
        onChange({
            selectedOption,
            selectedOrder,
        });
    };

    return (
        <VStack align="stretch" paddingX="9" paddingY="6" spacing="10" height="full" overflowY="auto">
            <Header>
                <Header.Title
                    hasReturnMarker
                    returnMarkerAriaLabel={backButtonAriaLabel}
                    title={title}
                    onClick={onClose}
                />
                <Header.Controls>
                    <Button onClick={handleCancel}>{cancelButtonLabel}</Button>
                    <Button variant="primary" onClick={handleApply}>
                        {applyButtonLabel}
                    </Button>
                </Header.Controls>
            </Header>
            <Divider my={6} />
            <Box flex={1} overflow="auto">
                <RadioGroup
                    onChange={(option: string) => dispatch({ type: "CHANGE", selectedOrder, selectedOption: option })}
                    value={selectedOption}
                >
                    <VStack alignItems="start">
                        {options.map((option) => (
                            <Radio key={option.id} value={option.id} size="sm">
                                {option.label}
                            </Radio>
                        ))}
                    </VStack>
                </RadioGroup>
                <Divider my={6} />
                <RadioGroup
                    onChange={(order: SortingOrder) =>
                        dispatch({ type: "CHANGE", selectedOrder: order, selectedOption })
                    }
                    value={selectedOrder}
                >
                    <VStack alignItems="start">
                        {sortingOrderOptions.map((option) => (
                            <Radio key={option.value} value={option.value} size="sm">
                                {option.label}
                            </Radio>
                        ))}
                    </VStack>
                </RadioGroup>
                <Divider mt={6} />
            </Box>
        </VStack>
    );
};
