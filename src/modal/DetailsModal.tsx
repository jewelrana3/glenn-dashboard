import Modal from './Modal';

interface DeleteModalPros {
    isOpen: boolean;
    onClose: () => void;
}

export default function DetailsModal({ isOpen, onClose }: DeleteModalPros) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen}>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]  relative">
                    {/* Order Image */}
                    <img
                        className="w-full rounded-lg mb-6"
                        src="https://i.ibb.co.com/Nn1R60cB/image-map-usa-filled-stars-600nw-2005076390.webp"
                        alt="country"
                    />

                    {/* Order Summary */}
                    <div className="text-lg font-medium text-gray-800">
                        <p>
                            <strong>User Name:</strong> John Doe
                        </p>
                        <p>
                            <strong>Country Name:</strong> USA
                        </p>
                    </div>

                    {/* Done Button */}
                    <button
                        onClick={onClose}
                        className="w-full mt-8 py-3 text-lg font-semibold bg-[#181c1d] rounded-lg transition duration-300"
                    >
                        Done
                    </button>
                </div>
            </div>
        </Modal>
    );
}
