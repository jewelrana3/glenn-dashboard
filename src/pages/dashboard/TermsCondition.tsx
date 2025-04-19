import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { useCreateTermsConditionMutation, useGetTermsConditionQuery } from '../../redux/apiSlices/termsConditionSlice';

export default function TermsCondition() {
    const editor = useRef(null);
    const navigate = useNavigate();
    const { data, refetch, isLoading } = useGetTermsConditionQuery(undefined);
    const [createTermsCondition] = useCreateTermsConditionMutation();

    const [content, setContent] = useState('');

    useEffect(() => {
        if (data?.data?.content) {
            setContent(data?.data?.content);
        }
    }, [data]);

    const handleSubmit = async () => {
        const data = { content: content };
        await createTermsCondition(data);
        refetch();
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
