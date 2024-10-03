import { PublishedEventType, RegisteredEventType } from "./types/eventBusTypes";

const isTypeOfNewEventDataType = <T>(event: RegisteredEventType<T>): event is RegisteredEventType<T> =>
    event !== undefined;

export class EventBus<T> {
    private events: Record<string, RegisteredEventType<T>[]> = {};

    private publishEventToBus(event: RegisteredEventType<T>): void {
        if (!this.events[event.eventName]) {
            this.events[event.eventName] = [];
        }
        const eventList = this.events[event.eventName];
        if (Array.isArray(eventList) && eventList.length === 0 && isTypeOfNewEventDataType(event)) {
            this.events[event.eventName]?.push(event);
        }
    }

    public subscribe(eventData: RegisteredEventType<T> | RegisteredEventType<T>[]): void {
        if (Array.isArray(eventData))
            for (const event of eventData) {
                this.publishEventToBus(event);
            }
        else this.publishEventToBus(eventData);
    }

    public unsubscribe(eventData: RegisteredEventType<T>): void {
        const handlerEntries = this.events[eventData.eventName];
        if (!handlerEntries) return;

        const index = handlerEntries.findIndex((handlerEntry) => handlerEntry.handler === eventData.handler);
        if (index !== -1) {
            handlerEntries.splice(index, 1);
        }
    }

    public publish(eventData: PublishedEventType<T>): void {
        const handlers = this.events[eventData.eventName]
            ?.filter((eventHandler) => eventHandler.moduleName !== eventData.moduleName)
            .map((eventHandler) => eventHandler.handler);
        if (!handlers) return;
        for (const handler of handlers) {
            handler(eventData.args);
        }
    }
}
