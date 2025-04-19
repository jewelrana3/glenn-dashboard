import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { useCreateAboutMutation, useGetAboutQuery } from '../../redux/apiSlices/aboutSlice';

export default function AboutUs() {
    const editor = useRef(null);
    const navigate = useNavigate();
    const { data, refetch, isError, isLoading } = useGetAboutQuery(undefined);
    const [createAbout] = useCreateAboutMutation();
    const [content, setContent] = useState('');

    useEffect(() => {
        if (data?.data?.content) {
            setContent(data?.data?.content);
        }
    }, [data]);

    const handleSubmit = async () => {
        const data = { content: content };
        await createAbout(data);
        refetch();
        // if (res?.data?.success) {
        //     Swal.fire({
        //         text: res?.data?.message,
        //         icon: 'success',
        //         showConfirmButton: false,
        //         timer: 1500,
        //     }).then(() => {
        //         refetch();
        //     });
        // } else {
        //     Swal.fire({
        //         title: 'Opps',
        //         // @ts-ignore
        //         text: res?.error?.data?.message,
        //         icon: 'error',
        //         timer: 1500,
        //         showConfirmButton: false,
        //     });
        // }
    };

    if (isLoading) {
        return <span>Loading ....</span>;
    }
    if (isError) {
        return <span>data not found ....</span>;
    }

    return (
        <div>
            <div className="flex items-center gap-4 font-semibold text-[20px]" onClick={() => navigate(-1)}>
                <button className="text-xl">
                    <MdOutlineArrowBackIosNew />
                </button>
                <button>About Us</button>
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
                <Button className="mt-5 w-36" onClick={handleSubmit}>
                    Save
                </Button>
            </div>
        </div>
    );
}
