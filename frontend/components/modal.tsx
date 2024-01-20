import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`bg-white fixed inset-0 flex items-center justify-center bg-opacity-10 bg-base-200`}
    >
      <div className="rounded-lg p-4 bg-blue-500 text-content border-2 mx-2 md:w-2/3 max-w-2xl">
        <div className="flex justify-between">
          <>Add Participant</>
          <button onClick={onClose} className="">
            ✖
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div >

  );
};

export default Modal;
