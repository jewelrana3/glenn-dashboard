import { CiEdit } from 'react-icons/ci';
import { useDeleteEventMutation, useGetFaqQuery } from '../../../redux/apiSlices/faqSlice';
import { IoMdClose } from 'react-icons/io';

export default function Faq() {
    const { data: getAllFaq, isLoading } = useGetFaqQuery(undefined);
    const [deleteEvent] = useDeleteEventMutation();
    console.log(isLoading);

    const handleDelete = async (id: number) => {
        console.log(id);

        try {
            const response = await deleteEvent(id).unwrap();
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        deleteEvent(id);
    };

    return (
        <div className={'mb-5  duration-500'}>
            {getAllFaq?.data?.map((faq: { question: string; answer: string; _id: number }) => {
                return (
                    <div key={faq._id}>
                        <div className="bg-[#13356b] rounded-xl my-5 p-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className=" font-semibold leading-[30px] text-white">{faq.question}</h3>
                                </div>
                                <div className="flex gap-3">
                                    <button>
                                        <CiEdit size={24} className="text-white" />
                                    </button>
                                    <button onClick={() => handleDelete(faq._id)}>
                                        <IoMdClose size={24} className="text-white" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-300 mt-5 text-[14px]">{faq.answer}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
