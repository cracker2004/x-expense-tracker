import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const WalletBalanceCard = ({ balance, setBalance }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  return (
    <div className="bg-[#9b9b9b] flex-1 rounded-lg shadow-md  flex flex-col items-center justify-center h-[30vh] max-md:min-h-[30vh] max-md:w-full gap-y-6">
      <h2 className="text-[18px] font-semibold">
        Wallet Balance:{" "}
        <span className="font-semibold text-green-300">${balance}</span>
      </h2>
      <button
        onClick={() => setModalIsOpen(true)}
        className="px-4 py-2 bg-green-300 text-[15px] btn font-semibold outline-none"
      >
        + Add Income
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        className="p-6 rounded-lg bg-[#ededed] max-w-xl mx-auto shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-[grey]/70 flex items-center justify-center z-50"
      >
        <h2 className="text-xl font-bold text-black">Add Balance</h2>
        <div className="mt-4 flex justify-end gap-4">
          <input
            type="number"
            placeholder="Income Amount"
            className="p-2 border-none bg-white text-black outline-none cursor-text rounded-[15px] font-semibold shadow"
            value={amount ? amount : ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#f4bb4a] text-[15px] text-white btn font-semibold"
            onClick={() => {
              if(amount <= 0) {
                alert("Please enter a valid amount");
                return;
              }
              setBalance((prev) => prev + amount);
              setModalIsOpen(false);
              setAmount(0);
            }}
          >
            Add Balance
          </button>
          <button
            className="px-4 py-2 bg-gray-300 btn font-semibold text-black"
            onClick={() => {
              setModalIsOpen(false);
              setAmount(0);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default WalletBalanceCard;
