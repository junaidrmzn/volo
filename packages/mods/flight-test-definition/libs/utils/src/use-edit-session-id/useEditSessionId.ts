import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

export const useEditSessionId = () => {
    const [editSessionId] = useState<string>(uuidV4());

    return { editSessionId };
};
