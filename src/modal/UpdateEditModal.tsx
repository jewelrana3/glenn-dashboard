import { Form, Input, Modal } from 'antd';
import Button from '../components/shared/Button';
import { useCreateFaqMutation, useEditFaqMutation } from '../redux/apiSlices/faqSlice';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
const { TextArea } = Input;

// interface UpdateEditModalProps {
//     setOpenModal: (open: boolean) => void;
//     openModal: boolean;
//     openEditModal: boolean;
//     // setEditModal: (open: boolean) => void;
//     refetch: () => void;
// }

//@ts-ignore
export default function UpdateEditModal({ setOpenModal, openModal, refetch, openEditModal, setOpenEditModal }) {
    ({ openEditModal });
    const [form] = Form.useForm();
    const [createFaq] = useCreateFaqMutation();
    const [editFaq] = useEditFaqMutation();

    useEffect(() => {
        if (openEditModal?._id) {
            form.setFieldsValue({
                question: openEditModal?.question,
                answer: openEditModal?.answer,
            });
        }
    }, [openEditModal, form]);

    const onFinish = async (values: { question: string; answer: string }) => {
        const data = {
            _id: openEditModal?._id,
            question: values?.question,
            answer: values?.answer,
        };

        if (openEditModal?._id) {
            const res = await editFaq(data);
            if (res?.data?.success) {
                Swal.fire({
                    text: res?.data?.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    refetch();
                    setOpenModal(false);
                    setOpenEditModal(null);
                    form.resetFields();
                });
            }
        } else {
            await createFaq(values).then((res) => {
                if (res?.data?.success) {
                    Swal.fire({
                        text: res?.data?.message,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        refetch();
                        setOpenModal(false);
                        form.resetFields();
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
    };

    return (
        <Modal
            centered
            open={openModal}
            title={openEditModal?._id ? 'Update FAQ' : 'Add FAQ'}
            onCancel={() => {
                setOpenModal(false);
                setOpenEditModal({});
                form.resetFields();
            }}
            width={500}
            footer={false}
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    label="Question"
                    name="question"
                    rules={[{ required: true, message: 'Please enter a question' }]}
                >
                    <Input
                        style={{
                            height: 42,
                        }}
                        placeholder="Your faq question"
                    />
                </Form.Item>

                {/* Description */}
                <Form.Item label="Answer" name="answer" rules={[{ required: true, message: 'Please enter a answer' }]}>
                    <TextArea
                        style={{
                            width: '100%',
                            resize: 'none',
                            borderRadius: 6,
                            backgroundColor: '#F9F9F9',
                        }}
                        rows={3}
                        placeholder="Your faq answer"
                    />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="flex justify-end">
                    <Button className="!bg-[#007ba5] text-white" htmlType="submit">
                        {openEditModal?._id ? 'Update' : 'Add'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
