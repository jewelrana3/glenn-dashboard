import { IoMdNotificationsOutline } from 'react-icons/io'; // Ensure you have this import
import { useNotificationQuery } from '../../redux/apiSlices/notification';

const Notifications = () => {
    const { data, isLoading, error } = useNotificationQuery(undefined);

    // Handle loading state
    if (isLoading) {
        return <span>Loading...</span>;
    }

    // Handle error state
    if (error) {
        return <span>Error loading notifications</span>;
    }

    const notifications = data?.data?.notifications;

    // Handle case where there are no notifications
    if (!notifications || notifications.length === 0) {
        return <span>No notifications available</span>;
    }

    return (
        <div className="space-y-4 mt-6">
            {notifications.map((notification: { text: string; _id: string; createdAt: string }) => (
                <div key={notification._id} className="flex items-center p-2">
                    <div className="bg-[#FFAB3E66] p-2 rounded-xl">
                        <IoMdNotificationsOutline className="text-[#FFAB3E]" size={24} />
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="font-medium">{notification.text}</p>
                        <p className="text-gray-500 text-sm">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notifications;
