export type PadInfo = {
    id: string;
    padKey: string;
    validTo: string;
    validFrom: string;
};

export type GroundEvent = {
    id: string;
    startTime: string;
    endTime: string;
    inboundMissionId?: string;
    outboundMissionId?: string;
    inboundFato?: PadInfo;
    outboundFato?: PadInfo;
    inboundStand?: PadInfo;
    outboundStand?: PadInfo;
    vertiportCode: string;
};
