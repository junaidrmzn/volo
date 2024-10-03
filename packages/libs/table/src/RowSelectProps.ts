export type RowSelectProps<Data extends object> =
    | {
          isRowSelectable: true;
          toggleRowSelectLabel: string;
          toggleAllRowsSelectLabel: string;
          onRowSelect?: (selectedData: Data[]) => void;
          initialSelectAllRows?: boolean;
          initialSelectedIds?: Data[keyof Data][];
          uniqueIdentifier?: keyof Data;
      }
    | {
          isRowSelectable?: false;
          toggleRowSelectLabel?: never;
          toggleAllRowsSelectLabel?: never;
          onRowSelect?: never;
          initialSelectAllRows?: never;
          initialSelectedIds?: never;
          uniqueIdentifier?: never;
      };

export const defaultRowSelectProps: RowSelectProps<{}> = {
    isRowSelectable: false,
};
