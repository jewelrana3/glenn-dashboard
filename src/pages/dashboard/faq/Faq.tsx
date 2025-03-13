import { CiEdit } from 'react-icons/ci';
import { useDeleteFaqMutation, useGetAllFaqQuery } from '../../../redux/apiSlices/faqSlice';
import { IoMdClose } from 'react-icons/io';
import Swal from 'sweetalert2';
import { useState } from 'react';
import UpdateEditModal from '../../../modal/UpdateEditModal';
import { FaPlus } from 'react-icons/fa';

export default function Faq() {
    const { data: getAllFaq, refetch } = useGetAllFaqQuery(undefined);
    const [deleteFaq] = useDeleteFaqMutation();
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState({});

    const handleDelete = (id: string | number) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteFaq(id).then((res) => {
                    if (res?.data?.success) {
                        Swal.fire({
                            text: res?.data?.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            refetch();
                        });
                    } else {
                        Swal.fire({
                            title: 'Oops',
                            //@ts-ignore
                            text: res?.error?.data?.message,
                            icon: 'error',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    }
                });
            }
        });
    };

    return (
        <>
            <div className="flex justify-between items-center mt-10">
                <h1 className="text-[#007ba5] text-2xl">Frequently Asked Questions</h1>
                <div
                    className="flex items-center gap-3 bg-[#007ba5] p-2 rounded-md cursor-pointer"
                    onClick={() => setOpenModal(true)}
                >
                    <p>
                        <FaPlus className="text-white" />
                    </p>
                    <button className=" text-white ">Add FAQ</button>
                </div>
            </div>
            <div className={' duration-500'}>
                {getAllFaq?.data?.map((faq: { question: string; answer: string; _id: number }) => {
                    return (
                        <>
                            <div key={faq._id}>
                                <div className="border border-gray-200 rounded-xl my-5 p-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className=" font-semibold leading-[30px] text-black">{faq.question}</h3>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    setOpenEditModal(faq);
                                                    setOpenModal(true);
                                                }}
                                            >
                                                <CiEdit size={24} className="text-[#757575]" />
                                            </button>
                                            <button onClick={() => handleDelete(faq._id)}>
                                                <IoMdClose size={24} className="text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-800 mt-5 text-[14px]">{faq.answer}</p>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>

            {/* update modal */}
            {
                <UpdateEditModal
                    refetch={refetch}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    openEditModal={openEditModal}
                    setOpenEditModal={setOpenEditModal}
                />
            }
        </>
    );
}
