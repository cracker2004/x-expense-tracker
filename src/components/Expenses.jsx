import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Expenses = ({ expenses, setExpenses, setTransactions, balance, setBalance }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    date: "",
  });

  return (
    <div className="bg-[#9b9b9b] flex-1 rounded-lg shadow-md  flex flex-col items-center justify-center h-[30vh] max-md:min-h-[30vh] max-md:w-full gap-y-6">
      <h2 className="text-[18px] font-semibold">
        Expenses:{" "}
        <span className="font-semibold text-red-400">${expenses}</span>
      </h2>
      <button
        className="px-4 py-2 bg-red-400 text-[15px] btn font-semibold outline-none"
        onClick={() => setModalIsOpen(true)}
      >
        + Add Expense
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        className="p-6 rounded-lg bg-[#ededed] max-w-xl mx-auto shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-[grey]/70 flex items-center justify-center z-50"
      >
        <h2 className="text-xl font-bold text-black">Add Expenses</h2>

        <div className="mt-4">
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setModalIsOpen(false);
              if (formData.price > balance) {
                alert("Insufficient balance!");
                return;
              }
              setExpenses((prev) => prev + formData.price);
              setTransactions((prev) => [
                ...prev,
                {
                  title: formData.title,
                  category: formData.category,
                  price: formData.price,
                  date: formData.date,
                },
              ]);
              setBalance((prev) => prev - formData.price);
              setFormData({
                title: "",
                category: "",
                price: 0,
                date: "",
              });
            }}
          >
            <input
            name="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              className="p-2 border-none bg-white text-black outline-none cursor-text rounded-[15px] font-semibold shadow"
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              className="p-2 border-none bg-white text-black outline-none cursor-text rounded-[15px] font-semibold shadow"
              onChange={(e) => {
                setFormData({ ...formData, price: Number(e.target.value) });
              }}
              required
            />

            <select
              name="category"
              id=""
              required
              className="p-2 border-none bg-white text-black outline-none cursor-text rounded-[15px] font-semibold shadow"
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
            >
              <option value="">Select Category</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="entertainment">Entertainment</option>
            </select>

            <input
            name="date"
              type="date"
              value={formData.date}
              className="p-2 border-none bg-white text-black outline-none cursor-text rounded-[15px] font-semibold shadow"
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value });
              }}
              required
            />

            <button
              type="submit"
              className="px-4 py-2 bg-[#f4bb4a] text-[15px] text-white btn font-semibold"
            >
              Add Expense
            </button>
            <button
              className="px-4 py-2 bg-gray-300 btn font-semibold text-black"
              onClick={() => {
                setModalIsOpen(false);
                setFormData({
                  title: "",
                  category: "",
                  price: 0,
                  date: "",
                });
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Expenses;
