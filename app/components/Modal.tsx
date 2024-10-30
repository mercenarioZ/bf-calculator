"use client";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  return (
    <div>
      <div className={`fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center transition duration-300 ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1/2 opacity-0"}`}>
        <div
          className="bg-slate-200 p-4 w-full max-w-md rounded-xl"
        >
          <div>{children}</div>
          <button
            onClick={onClose}
            className="mt-4 bg-red-400 text-white rounded py-1 px-2 hover:bg-red-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
