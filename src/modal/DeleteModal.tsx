import Button from '../components/shared/Button';
import Modal from './Modal';

interface DeleteModalPros {
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteModal({ isOpen, onClose }: DeleteModalPros) {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex justify-center items-center h-[300px] bg-[#E6F2FF]">
                <div className="bg-[#E6F2FF] rounded-xl p-6  relative ">
                    <h1 className="text-3xl font-semibold text-center mb-[60px] text-nowrap text-[#333333]">
                        Do you want to delete
                    </h1>

                    <div className="flex justify-between gap-5" onClick={onClose}>
                        <div className="flex justify-center items-center w-[200px] border border-borderYellow rounded-lg text-textYellow cursor-pointer">
                            <button>No</button>
                        </div>
                        <div>
                            <Button onClick={onClose} className="flex justify-center items-center text-white">
                                Yes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
