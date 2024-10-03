import type { CsflSite } from "@voloiq-typescript-api/flight-planning-types";
import { useCsflMarker } from "./useCsflMarker";

type CsflMarkerProps = {
    csflData: CsflSite;
    selected?: boolean;
    onClick?: (site: CsflSite) => void;
};

export const CsflMarker: FCC<CsflMarkerProps> = (props) => {
    const { csflData, selected = false, onClick } = props;
    useCsflMarker({ csflData, selected, onClick });
    return null;
};
