"use client";

import React from "react";

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
          <div className="bg-white p-4 w-full max-w-md rounded-xl">
            <div>{children}</div>
            <button onClick={onClose} className="mt-4 bg-red-400 text-white rounded p-1">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
