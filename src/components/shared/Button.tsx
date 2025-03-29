interface ButtonProps {
    children: React.ReactNode;
    className: string;
    onClick?: () => void; // onClick for handling button events
    htmlType?: 'button' | 'submit' | 'reset'; // Defaults to 'button' if not specified
}

export default function Button({ children, className, onClick, htmlType = 'button' }: ButtonProps) {
    return (
        <button
            type={htmlType}
            onClick={onClick} // Passing the onClick handler here
            className={`${className} font-semibold text-center my-auto  text-white cursor-pointer bg-bgYellow  h-[50px] rounded-xl text-base font-poppins`}
        >
            {children}
        </button>
    );
}
