import { useMemo } from "react";
import { createI18n } from "./createI18n";

export const useCreateI18n = () => useMemo(() => createI18n(), []);
