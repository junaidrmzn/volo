import { match } from "ts-pattern";
import type { FilterSet } from "@voloiq/filter-panel";

type Params = {
    [key: string]: string | number;
};

export const getFlightPlanningApiParams = <GetDTO>(filterSet?: FilterSet<GetDTO>): { filterParams: Params } => {
    const filterParams: Params = {};

    if (filterSet) {
        for (const filter of filterSet.filters)
            match(filter)
                .with({ type: "range" }, (props) => {
                    if (props.fromDate) {
                        filterParams[`${props.propertyName}From`] = props.fromDate;
                    }
                    if (props.toDate) {
                        filterParams[`${props.propertyName}To`] = props.toDate;
                    }
                })
                .with({ type: "numberRange" }, (props) => {
                    if (props.fromValue) {
                        filterParams[`${props.propertyName}Min`] = props.fromValue;
                    }
                    if (props.toValue) {
                        filterParams[`${props.propertyName}Max`] = props.toValue;
                    }
                })
                .with({ type: "select" }, (props) => {
                    filterParams[String(props.propertyName)] = props.value.value;
                })
                .with({ type: "multiSelect" }, (props) => {
                    filterParams[String(props.propertyName)] = props.values
                        .map((selectOption) => selectOption.value)
                        .join("|");
                })
                .with({ type: "boolean" }, (props) => {
                    filterParams[String(props.propertyName)] = String(props.value);
                })
                .with({ type: "text" }, (props) => {
                    filterParams[String(props.propertyName)] = props.value;
                })
                .with({ type: "number" }, (props) => {
                    filterParams[String(props.propertyName)] = String(props.value);
                })
                .exhaustive();
    }

    return { filterParams };
};
