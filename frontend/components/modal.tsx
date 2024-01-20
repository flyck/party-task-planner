import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleOverlayClick = (event: MouseEvent) => {
      const modalContent = document.querySelector('.modal-content');

      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOverlayClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center dark:bg-gray-900 bg-gray-200"
    >
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="p-4 mx-auto my-auto">
          <div className="mb-4 flex w-80">
            <div className="flex">
              <div className="h-7 w-7 self-center mr-2" />
            </div>
            {/* TODO solve this problem with the height, creates a zone where the outside click wont close*/}
            <div className="w-full modal-content h-96">
              <div className="mb-4">
                <div className="w-full dark:bg-gray-900 bg-gray-100 dark:border-gray-800 p-2 rounded-lg text-center border">
                  <div className="flex justify-between">
                    <>{title}</>
                    <button onClick={onClose} className="">
                      ✖
                    </button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border dark:bg-gray-900 bg-gray-100 dark:text-gray-100 text-gray-900 dark:border-gray-800 border-gray-200">
                {children}
              </div>
            </div>
            <div className="flex">
              <div className="flex h-7 w-7 self-center mr-2" />
            </div>
          </div>
        </div >
      </main>
    </div>

  );
};

export default Modal;
