import { useMemo } from "react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";

type EnvelopeEntry = [number, number];

type Envelope<T extends string> = { [K in T]: EnvelopeEntry };

type MassConfigurationKeys = "bem" | "bom" | "tom" | "tom1" | "tom2";

type Configuration = { cgX?: number; cgY?: number; totalWeight?: number };

export type LongitudinalEnvelope = Envelope<MassConfigurationKeys>;
export type LateralEnvelope = Envelope<MassConfigurationKeys>;

export type Envelopes = {
    longitudinalEnvelope: LongitudinalEnvelope;
    lateralEnvelope: LateralEnvelope;
};

type UseGetEnvelopesDataOptions = {
    mission: Mission;
};

const getEnvelopeEntry = (config?: Configuration, axis: "cgX" | "cgY" = "cgX"): EnvelopeEntry => [
    config?.[axis] ?? 0,
    config?.totalWeight ?? 0,
];

export const useGetEnvelopesData = (options: UseGetEnvelopesDataOptions): Envelopes => {
    const { mission } = options;

    return useMemo((): Envelopes => {
        const { bem, bom, tom, tom1, tom2 } = mission.massAndBalanceLoadingConfigurationCollection ?? {};

        const longitudinalEnvelope = {
            bem: getEnvelopeEntry(bem, "cgX"),
            bom: getEnvelopeEntry(bom, "cgX"),
            tom: getEnvelopeEntry(tom, "cgX"),
            tom1: getEnvelopeEntry(tom1, "cgX"),
            tom2: getEnvelopeEntry(tom2, "cgX"),
        };

        const lateralEnvelope = {
            bem: getEnvelopeEntry(bem, "cgY"),
            bom: getEnvelopeEntry(bom, "cgY"),
            tom: getEnvelopeEntry(tom, "cgY"),
            tom1: getEnvelopeEntry(tom1, "cgY"),
            tom2: getEnvelopeEntry(tom2, "cgY"),
        };

        return { longitudinalEnvelope, lateralEnvelope };
    }, [mission]);
};
