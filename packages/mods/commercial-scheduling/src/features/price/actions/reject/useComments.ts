import { useState } from "react";
import { Price } from "@voloiq/commercial-scheduling-api/v1";

type UseCommentsOptions = {
    price: Price;
};

export const useComments = (options: UseCommentsOptions) => {
    const { price } = options;
    const { comments: initalValue } = price;
    const [comments, setComments] = useState(initalValue ?? "");

    return { comments, setComments };
};
