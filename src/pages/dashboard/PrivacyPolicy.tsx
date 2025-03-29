import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { useCreatePolicyMutation, useGetPrivacyPolicyQuery } from '../../redux/apiSlices/privacyPolicySlice';
import Swal from 'sweetalert2';

export default function PrivacyPolicy() {
    const editor = useRef(null);
    const navigate = useNavigate();
    const { refetch } = useGetPrivacyPolicyQuery(undefined);
    const [createPolicy] = useCreatePolicyMutation();

    const [content, setContent] = useState('');
    const handleSubmit = async () => {
        const data = { content: content };

        const res = await createPolicy(data);
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
    };
    return (
        <div>
            <div className="flex items-center gap-4 font-semibold text-[20px]" onClick={() => navigate(-1)}>
                <button className="text-xl">
                    <MdOutlineArrowBackIosNew />
                </button>
                <button>Privacy Policy</button>
            </div>

            <div className="">
                <div className="mt-5">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={{ height: 550, theme: 'light', readonly: false }}
                        onBlur={(newContent) => setContent(newContent)}
                    />
                </div>
                <Button className="mt-5 w-36" htmlType="submit" onClick={handleSubmit}>
                    Save
                </Button>
            </div>
        </div>
    );
}
