import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import Swal from 'sweetalert2';
import { useCreateTermsConditionMutation, useGetTermsConditionQuery } from '../../redux/apiSlices/termsConditionSlice';

export default function TermsCondition() {
    const editor = useRef(null);
    const navigate = useNavigate();
    const { data, refetch, isLoading } = useGetTermsConditionQuery(undefined);
    const [createTermsCondition] = useCreateTermsConditionMutation();

    // Initial content can be set to existing terms if available
    const [content, setContent] = useState<string>(data?.content || '');

    useEffect(() => {
        if (data && !content) {
            setContent(data.content); // Update state if data arrives
        }
    }, [data, content]);

    // (data);

    const handleSubmit = async () => {
        const data = { content: content };

        const res = await createTermsCondition(data);
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
                // @ts-ignore
                text: res?.error?.data?.message || 'Something went wrong',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex items-center gap-4 font-semibold text-[20px]" onClick={() => navigate(-1)}>
                <button className="text-xl">
                    <MdOutlineArrowBackIosNew />
                </button>
                <button>Terms & Condition</button>
            </div>

            <div>
                <div className="mt-5">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={{ height: 550, theme: 'light', readonly: false }}
                        onBlur={(newContent) => setContent(newContent)}
                    />
                </div>

                <Button onClick={handleSubmit} className="mt-5 w-36">
                    Save
                </Button>
            </div>
        </div>
    );
}
