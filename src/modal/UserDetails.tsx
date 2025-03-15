import React from 'react';
import Modal from './Modal';
import Button from '../components/shared/Button';

interface UserDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    // userName: string;
    // email: string;
    // contactNumber: string;
    // address: string;
    // joiningDate: string;
}

const agencyDetails = [
    { label: 'User name', value: 'Omar Yusuf Hassan' },
    { label: 'Email', value: 'omar@gmail.com' },
    { label: 'Contact Number', value: '+9834598375435' },
    { label: 'Address', value: 'South Dakota 83475' },
    { label: 'Joining Date', value: '5 June 2025' },
];

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
    isOpen,
    onClose,
}: // userName,
// email,
// contactNumber,
// address,
// joiningDate,
UserDetailsModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-bgModal p-5 rounded-lg pt-10">
                <h2 className="text-lg font-semibold mb-4">Visitor Details</h2>
                <div className="space-y-2">
                    {agencyDetails.map((detail, index) => (
                        <div key={index} className="grid grid-cols-2 gap-14 py-1">
                            <p>{detail.label} :</p>
                            <strong className="text-start">{detail.value}</strong>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end items-center mt-4">
                    <Button className="flex justify-center items-center" onClick={onClose}>
                        Done
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default UserDetailsModal;
