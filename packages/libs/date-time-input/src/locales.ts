// eslint-disable-next-line no-restricted-imports
import { German as de } from "flatpickr/dist/l10n/de";
// eslint-disable-next-line no-restricted-imports
import { english as en } from "flatpickr/dist/l10n/default";

export const locales = {
    de,
    en,
};

export type LocaleName = keyof typeof locales;
