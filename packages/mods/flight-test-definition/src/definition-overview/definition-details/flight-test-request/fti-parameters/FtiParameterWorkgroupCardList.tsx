import { VStack } from "@volocopter/design-library-react";
import { FtiParameterWorkgroupCard } from "./FtiParameterWorkgroupCard";
import type { FtiParametersPerWorkgroup } from "./useFtiParametersPerWorkgroup";

export type FtiParameterWorkgroupCardListProps = {
    ftiParameterPerWorkgroup: FtiParametersPerWorkgroup;
};

export const FtiParameterWorkgroupCardList = (props: FtiParameterWorkgroupCardListProps) => {
    const { ftiParameterPerWorkgroup } = props;

    return (
        <VStack spacing={2} alignItems="stretch">
            {ftiParameterPerWorkgroup.map(([workgroup, resolvedFtiLinks]) => (
                <FtiParameterWorkgroupCard key={workgroup} workgroup={workgroup} resolvedFtiLinks={resolvedFtiLinks} />
            ))}
        </VStack>
    );
};
