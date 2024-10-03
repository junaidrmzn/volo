import React from "react";
import type { Pad } from "@voloiq/vertiport-management-api/v1";
import { PadProvider } from "../../pad-context/PadProvider";
import { PadEventsProvider } from "../pad-events-context/PadEventsProvider";
import { AddPadEventModal } from "./AddPadEventModal";

type AddPadEventModalProps = {
    pad: Pad;
    isOpen: boolean;
    onClose: () => void;
};

export const AddPadEvent = (props: AddPadEventModalProps) => {
    const { isOpen, onClose, pad } = props;

    return (
        <PadProvider pad={pad}>
            <PadEventsProvider>
                <AddPadEventModal isOpen={isOpen} onClose={onClose} />
            </PadEventsProvider>
        </PadProvider>
    );
};
