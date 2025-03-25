import { IoMdClose } from 'react-icons/io';
import Modal from './Modal';

interface ContactDetailsModalProps {
    collectData: { message: string; name: string; email: string; phone: string };
}

// @ts-ignore
export default function ContactDetailsModal({ isOpen, onClose, collectData }: ContactDetailsModalProps) {
    return (
        <Modal isOpen={isOpen}>
            <div className=" p-6 rounded-lg shadow-lg w-[500px]">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <IoMdClose size={24} />
                    </button>
                </div>
                <h1 className="text-xl mb-6">Contact Message</h1>
                <p className="border border-gray-200 p-3 rounded-md">{collectData?.message}</p>
            </div>
        </Modal>
    );
}
