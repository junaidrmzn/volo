import { useState } from "react";
import { Offer } from "@voloiq/commercial-scheduling-api/v1";

type UseCommentsOptions = {
    offer: Offer;
};

export const useComments = (options: UseCommentsOptions) => {
    const { offer } = options;
    const { comments: initalValue } = offer;
    const [comments, setComments] = useState(initalValue ?? "");

    return { comments, setComments };
};
