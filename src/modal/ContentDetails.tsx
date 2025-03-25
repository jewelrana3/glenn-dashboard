import { IoMdClose } from 'react-icons/io';
import Modal from './Modal';

interface ContentDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    collectData: { content: string };
}

export default function ContentDetails({ isOpen, onClose, collectData }: ContentDetailsProps) {
    return (
        <Modal isOpen={isOpen}>
            <div className=" p-6 rounded-lg shadow-lg w-[500px]">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <IoMdClose size={24} />
                    </button>
                </div>
                <h1 className="text-xl mb-6">Blog Content</h1>
                <div
                    dangerouslySetInnerHTML={{ __html: collectData?.content }}
                    className="border border-gray-200 p-3 rounded-md"
                />
            </div>
        </Modal>
    );
}
