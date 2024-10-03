import { VStack } from "@volocopter/design-library-react";
import type { SpecialComment } from "@voloiq/flight-test-definition-api/v1";
import { SpecialCommentCard } from "./SpecialCommentsCard";

export type SpecialCommentsCardListProps = {
    specialComments: SpecialComment[];
};

export const SpecialCommentsCardList = (props: SpecialCommentsCardListProps) => {
    const { specialComments } = props;

    return (
        <VStack w="full" spacing={3}>
            {specialComments.map((specialComment) => (
                <SpecialCommentCard key={specialComment.id} specialComment={specialComment} />
            ))}
        </VStack>
    );
};
