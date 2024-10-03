import { useMemo } from "react";
import type { Query } from "@voloiq/utils";
import type { LayoutPresets } from "./layoutPresets";
import { layoutPresets } from "./layoutPresets";

export type ReturnProps = {
    gridProps: { gridTemplateAreas: string; templateColumns?: string };
    additionalContentProps?: { justifyContent: string };
};
export const useGridPropsQuery = (withAdditionalContent: boolean, layout: LayoutPresets) =>
    useMemo(() => {
        const query: Query<ReturnProps> = withAdditionalContent
            ? {
                  0: {
                      gridProps: {
                          gridTemplateAreas: "'identifier status' 'additional-content status'",
                          templateColumns: undefined,
                      },
                      additionalContentProps: {
                          justifyContent: "flex-start",
                      },
                  },
                  562: {
                      gridProps: {
                          gridTemplateAreas: "'identifier additional-content status'",
                          templateColumns: layoutPresets[layout],
                      },
                      additionalContentProps: {
                          justifyContent: "center",
                      },
                  },
              }
            : {
                  0: {
                      gridProps: {
                          gridTemplateAreas: "'identifier status'",
                      },
                  },
              };

        return query;
    }, [layout, withAdditionalContent]);
