import { IoMdNotificationsOutline } from 'react-icons/io';

const notifications = [
    {
        id: 1,
        message: 'Save big on selected products—grab them before they’re gone!',
        time: 'Fri, 12:30pm',
    },
    {
        id: 2,
        message: 'Thank you for your purchase! We’re preparing your order for shipment.',
        time: 'Fri, 1:30pm',
    },
    {
        id: 3,
        message: 'You’ve successfully created your account—let’s get started!',
        time: 'Fri, 12:30pm',
    },
    {
        id: 4,
        message: 'Thank you for your purchase! We’re preparing your order for shipment.',
        time: 'Fri, 12:30pm',
    },
    {
        id: 5,
        message: 'You’ve successfully created your account—let’s get started!',
        time: 'Fri, 2:30pm',
    },
];

const Notification = () => {
    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center p-4 ">
                    <div className="bg-[#FFAB3E66] p-2 rounded-xl">
                        <IoMdNotificationsOutline className="text-[#FFAB3E]" size={24} />
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-gray-500 text-sm">{notification.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notification;
