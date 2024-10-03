import { Box, Button, Input, InputGroup, Text, VStack } from "@volocopter/design-library-react";
import type { ChangeEvent } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import type { TimeSchedulerTranslations } from "@voloiq/time-scheduler";
import {
    TimeSchedulerNew,
    TimeSchedulerRowContentNew,
    TimeSchedulerRowItemNew,
    TimeSchedulerRowLabelNew,
    TimeSchedulerRowNew,
} from "@voloiq/time-scheduler";
import { toLocalDate } from "@voloiq/utils";
import { useCrewApiTranslation } from "../translations/useCrewApiTranslation";
import { CrewMemberLabel } from "./CrewMemberLabel";
import { PlaceholderLabel } from "./PlaceholderLabel";
import { EventItem } from "./events/EventItem";
import { ExpandedEventItem } from "./events/ExpandedEventItem";
import { useCrewMemberSelection } from "./useCrewMemberSelection";

export const CrewTimeScheduler = () => {
    const {
        name,
        setName,
        CrewMembersCalendars,
        setSearchname,
        crewMemberMails,
        setCrewMemberMails,
        error,
        setError,
        init,
        setInit,
        refetchCrewMembersCalendars,
        onRangeUpdate,
    } = useCrewMemberSelection();
    const { t } = useCrewApiTranslation();
    const canReadCrewSensitiveInformation = useIsAuthorizedTo(["read"], ["CrewInformation"]);
    const translations: TimeSchedulerTranslations = {
        scrollLeftButtonLabel: t("calendar.Scroll left"),
        scrollRightButtonLabel: t("calendar.Scroll right"),
        zoomInButtonLabel: t("calendar.Zoom in"),
        zoomOutButtonLabel: t("calendar.Zoom out"),
        closeButton: t("calendar.closeButton"),
        title: t("calendar.title"),
        go: t("calendar.go"),
    };

    return (
        <VStack width="100%" p={4} columnGap={2} spacing={4} alignItems="flex-start">
            <InputGroup>
                <VStack width="100%" alignItems="flex-start" pb={4}>
                    <Input
                        value={name}
                        onChange={(newValue: ChangeEvent<HTMLInputElement>) => {
                            setName(newValue.target.value);
                        }}
                        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                            if (event.key === "Enter") {
                                setSearchname(name);
                                setError(false);
                                setInit(false);
                            }
                        }}
                        placeholder="email, full name or surname"
                        isInvalid={error && !init}
                    />
                    <>
                        {error && !init ? (
                            <Box textColor="red.500" textAlign="center">
                                <p>{t("errorMessages.calendar.notFound")}</p>
                            </Box>
                        ) : null}
                    </>
                </VStack>
                <VStack boxSize="full" pl={4} alignItems="flex-start">
                    <Button
                        onClick={() => {
                            setSearchname(name);
                            setError(false);
                            setInit(false);
                        }}
                    >
                        Search
                    </Button>
                </VStack>
            </InputGroup>
            {!canReadCrewSensitiveInformation && (
                <Text fontSize="sm" fontWeight="normal" color="red.500" lineHeight={6}>
                    {t("generic.informationRestrictionMessage")}
                </Text>
            )}
            <TimeSchedulerNew
                translations={translations}
                config={{
                    renderExpandedItems: (items) => <ExpandedEventItem itemCount={items.length} />,
                    persistSettings: true,
                    identifier: "crew-calendar",
                }}
                onRangeUpdate={onRangeUpdate}
            >
                {CrewMembersCalendars.length > 0 ? (
                    CrewMembersCalendars.map((crewMember) => {
                        const { id, calendar, email } = crewMember;
                        return (
                            <TimeSchedulerRowNew key={id}>
                                <TimeSchedulerRowLabelNew>
                                    <CrewMemberLabel
                                        crewMember={crewMember}
                                        onDiscard={() => {
                                            const updatedSelectedCrewMembers = [...crewMemberMails];
                                            setCrewMemberMails(updatedSelectedCrewMembers.filter((it) => it !== email));
                                        }}
                                        refetchCrewMembersCalendars={refetchCrewMembersCalendars}
                                    />
                                </TimeSchedulerRowLabelNew>

                                <TimeSchedulerRowContentNew>
                                    {calendar?.map((event) => (
                                        <TimeSchedulerRowItemNew
                                            key={event.id}
                                            id={event.id}
                                            startDate={toLocalDate(new Date(event.startTime))}
                                            endDate={toLocalDate(new Date(event.endTime))}
                                            group="event"
                                        >
                                            <EventItem
                                                crewMemberId={id}
                                                event={event}
                                                refetchCrewMembersCalendars={refetchCrewMembersCalendars}
                                            />
                                        </TimeSchedulerRowItemNew>
                                    ))}
                                </TimeSchedulerRowContentNew>
                            </TimeSchedulerRowNew>
                        );
                    })
                ) : (
                    <TimeSchedulerRowNew key={0}>
                        <TimeSchedulerRowLabelNew>
                            <PlaceholderLabel />
                        </TimeSchedulerRowLabelNew>
                    </TimeSchedulerRowNew>
                )}
            </TimeSchedulerNew>
        </VStack>
    );
};
