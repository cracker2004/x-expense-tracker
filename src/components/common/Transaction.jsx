import React, { useState } from "react";
import { IoPizzaOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { MdOutlineLuggage } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Transaction = ({
  details,
  setTransactions,
  setBalance,
  setExpenses,
  balance,
  currentPage,
  index
}) => {
  const { title, category, price, date } = details;
  const d = new Date(date);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    date: "",
  });
  const idx = (currentPage * 3) - 3 + index;
  const formattedDate = d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="flex justify-between w-full text-black px-2 h-[29%]">
        <div className="flex gap-x-2 items-center">
          <div className="p-2 bg-[#d9d9d9] rounded-full text-xl">
            {category === "food" ? (
              <IoPizzaOutline className="" />
            ) : category === "travel" ? (
              <MdOutlineLuggage className="" />
            ) : (
              <CiGift className="" />
            )}
          </div>
          <div>
            <h2>{title}</h2>
            <h2 className="text-[#d9d9d9] text-xs">{formattedDate}</h2>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <h2 className="text-orange-400 text-sm font-semibold mr-2">
            ${price}
          </h2>
          <button className="text-xl bg-red-600 text-white p-1 rounded-xl cursor-pointer" onClick={() => {
              setTransactions((prev) => prev.filter((_, i) => i !== idx));
              setBalance((prev) => prev + price);
              setExpenses((prev) => prev - price);
            }}>
            <MdOutlineCancel />
          </button>
          <button
            className="text-xl bg-orange-400 text-white p-1 rounded-xl cursor-pointer"
            onClick={() => {
                setModalIsOpen(true)}}
          >
            <MdOutlineEdit />
          </button>
        </div>
      </div>
      <hr className="bg-black text-[#d9d9d9] mx-2 rounded-2xl" />

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
              setBalance((prev) => prev + price);
              setExpenses((prev) => prev - price);
              setBalance((prev) => prev - formData.price);
              setTransactions((prev) =>
                prev.map((transaction, index) =>
                  index === idx
                    ? {
                        ...transaction,
                        title: formData.title,
                        category: formData.category,
                        price: formData.price,
                        date: formData.date,
                      }
                    : transaction
                )
              );

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
    </>
  );
};

export default Transaction;
