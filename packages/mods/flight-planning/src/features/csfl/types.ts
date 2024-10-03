import type { CsflSite } from "@voloiq-typescript-api/flight-planning-types";

export type CsflDetailsSidebarContext = {
    selectedSite: CsflSite;
    closeRightSidebar: () => void;
};

export type csflProperties = {
    selected?: boolean;
} & CsflSite;
