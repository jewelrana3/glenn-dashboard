import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';

export default function TermsCondition() {
    const editor = useRef(null);
    const navigate = useNavigate();

    const [content, setContent] = useState('');

    // const handleOnSave = (value: string) => {
    //     console.log(value);
    // };
    return (
        <div>
            <div className="flex items-center gap-4 font-semibold text-[20px]" onClick={() => navigate(-1)}>
                <button className="text-xl">
                    <MdOutlineArrowBackIosNew />
                </button>
                <button>Terms & Condition</button>
            </div>

            <div className="">
                {/* <div className="flex items-center justify-center mt-28">
          <img src={terms} />
        </div> */}
                <div className="mt-5">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={{ height: 550, theme: 'light', readonly: false }}
                        onBlur={(newContent) => setContent(newContent)}
                    />
                </div>
                {/* <Button
                    block
                    onClick={() => handleOnSave(content)}
                    // className="font-barlow"
                > */}

                <Button className="mt-5">Save</Button>
            </div>
        </div>
    );
}
