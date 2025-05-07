import Modal from './Modal';

interface ContentDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    collectData: { content: string };
}

export default function ContentDetails({ isOpen, onClose, collectData }: ContentDetailsProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className=" p-6 rounded-lg shadow-lg w-[500px]">
                <h1 className="text-xl mb-6">Blog Content</h1>
                <div
                    dangerouslySetInnerHTML={{ __html: collectData?.content }}
                    className="border border-gray-200 p-3 rounded-md"
                />
            </div>
        </Modal>
    );
}
