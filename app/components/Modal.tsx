"use client";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="bg-slate-200 p-4 w-full max-w-md rounded-xl">
            <div>{children}</div>
            <button
              onClick={onClose}
              className="mt-4 bg-red-400 text-white rounded py-1 px-2 hover:bg-red-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
