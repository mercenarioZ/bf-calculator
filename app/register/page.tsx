"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import axios from "axios";

const Register = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleCheckInformation = async () => {
    try {
      const response = await axios.post("/api/check", { name });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="pt-20 p-2">
        <div className="flex justify-center">
          <button
            className="p-2 bg-slate-100 hover:bg-slate-300 transition text-black rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Check for information
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <h1 className="text-xl font-semibold text-center pb-4">
              Provide your information here
            </h1>

            <p className="font-medium text-slate-600 text-sm mx-auto w-full text-center pb-2 opacity-75">
              We will check your name and send back to you some information
              about the court fee!
            </p>

            <form className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="p-1 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="p-2 bg-slate-100 max-w-44 transition hover:bg-slate-300 text-black rounded"
                  onClick={handleCheckInformation}
                >
                  Check for information
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Register;
