import { Table, Tbody, Td, Th, Thead, Tr } from "@volocopter/design-library-react";

export type TableColumnsType = (
    | { [key: string]: string }
    | { [key: string]: { colSpan?: number; value: string | JSX.Element; backgroundColor?: string } }
)[];

type TableProps = {
    headers: { name: string; key: string }[];
    data: TableColumnsType;
};

export const DataTable = (props: TableProps) => {
    const { headers, data } = props;

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    {headers.map((header) => (
                        <Th
                            wordWrap="break-word"
                            whiteSpace="normal"
                            paddingY={3}
                            textAlign="center"
                            backgroundColor="#d1d1d1"
                            key={header.name}
                        >
                            {header.name}
                        </Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((row, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <Tr borderBottomWidth={index !== data.length - 1 ? 1 : 0} borderBottomColor="#d1d1d1">
                        {headers.map((header) => {
                            const cell = row[header.key];
                            if (typeof cell === "string") {
                                return (
                                    <Td
                                        paddingY={3}
                                        height="-webkit-fit-content"
                                        textAlign="center"
                                        key={row[header.key]?.toString()}
                                    >
                                        {cell}
                                    </Td>
                                );
                            }
                            return (
                                <Td
                                    colSpan={cell?.colSpan ?? 1}
                                    paddingY={3}
                                    display={cell?.value ? "table-cell" : "none"}
                                    height="-webkit-fit-content"
                                    textAlign="center"
                                    key={row[header.key]?.toString()}
                                    backgroundColor={cell?.backgroundColor ?? "transparent"}
                                >
                                    {cell?.value}
                                </Td>
                            );
                        })}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
