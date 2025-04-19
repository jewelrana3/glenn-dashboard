import React, { useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';

const styles: {
    overlay: React.CSSProperties;
    modal: React.CSSProperties;
    closeButton: React.CSSProperties;
} = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '5px',
        minWidth: '300px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        background: 'transparent',
        fontSize: '26px',
        cursor: 'pointer',
    },
};

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose?.();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div ref={modalRef} style={styles.modal}>
                {onClose && (
                    <button onClick={onClose} style={styles.closeButton} className=" pr-5">
                        <IoMdClose size={24} />
                    </button>
                )}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
