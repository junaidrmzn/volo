type Depth = [never, 0, 1, 2, 3, 4];

type Primitive = string | number | boolean;

type FlattenPairs<T, D extends Depth[number] = 4> = [D] extends [never]
    ? never
    : {
          [K in keyof T]: T[K] extends Primitive ? [K, T[K]] : FlattenPairs<T[K], Depth[D]>;
      }[keyof T] &
          [PropertyKey, Primitive];

type RemoveArray<Type> = {
    [Property in keyof Required<Type>]: Required<Type>[Property] extends unknown[]
        ? RemoveArray<Required<Type>[Property][number]>
        : Required<Type>[Property] extends object
        ? RemoveArray<Required<Type>[Property]>
        : Required<Type>[Property];
};

type Flatten<T> = { [P in FlattenPairs<RemoveArray<T>> as P[0]]: P[1] };

export type FilterBaseProps<FilterType, EntityType> = {
    type: FilterType;
    propertyName: Extract<keyof Flatten<EntityType>, string> | string;
    /**
     * An optional function to customize the serialization of the propertyName
     */
    propertyNameSerializer?: (propertyName: string) => string;
    displayName: string;
    isActive: boolean;
    comparisonOperator?: string;
    isNull?: boolean;
};
