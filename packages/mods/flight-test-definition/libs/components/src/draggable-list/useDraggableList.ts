import { useEffect, useState } from "react";

type UseDraggableListOptions<T> = {
    items: (T & { id: string | number })[];
};

export const useDraggableList = <T extends {}>(options: UseDraggableListOptions<T>) => {
    const { items } = options;

    const [values, setValues] = useState(items.map((item) => item.id));

    useEffect(() => {
        setValues(items.map((item) => item.id));
    }, [items]);

    return {
        values,
        onReorder: setValues,
    };
};
