import Modal from './Modal';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const carDetails = [
    { label: 'Land Rover', value: '$990/Day' },
    { label: 'Fuel', value: 'Gasoline' },
    { label: 'Interior Color', value: 'Black' },
    { label: 'Car Type', value: 'Sedan' },
    { label: 'Seat', value: '6' },
    { label: 'Transmission', value: 'Transmission' },
    { label: 'Color', value: 'Red' }, // New detail added
    { label: 'Year', value: '2021' }, // New detail added
];

export default function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
    return (
        <Modal isOpen={isOpen}>
            <div className="flex justify-between items-center mb-4 p-4">
                <h2 className="text-xl font-semibold text-primaryColor">Car Details</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="space-y-2 p-4">
                {carDetails.map((detail) => (
                    <div key={detail.label} className="grid grid-cols-2 gap-6 px-2">
                        <span className="text-[#757575] font-semibold">{detail.label} :</span>
                        <span className="font-semibold">{detail.value}</span>
                    </div>
                ))}
            </div>
        </Modal>
    );
}
