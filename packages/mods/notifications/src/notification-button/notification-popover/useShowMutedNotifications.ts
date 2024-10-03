import { useLocalStorage } from "react-use";

export const useShowMutedNotifications = () => {
    const [showMuted, setShowMuted] = useLocalStorage("voloiq.notifications.ui.showMuted", true);
    const toggleShowMuted = () => setShowMuted(!showMuted);

    return { showMuted, toggleShowMuted };
};
