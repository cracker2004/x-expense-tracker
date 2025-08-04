import React, { useEffect, useState } from "react";
import Transaction from "../components/common/Transaction";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
{
  /* <FaArrowRight />; */
}
{
  /* <FaArrowLeft />; */
}

const Transactions = ({
  transactions,
  setTransactions,
  setBalance,
  setExpenses,
  balance,
}) => {
  // Lets implement pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [tempTransactions, setTempTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const temp = transactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setTempTransactions(temp);
    setTotalPages(Math.ceil(transactions.length / itemsPerPage) || 1);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, transactions, totalPages]);

  if (transactions.length === 0) {
    return (
      <div className="flex-3">
        <h2 className="text-lg font-semibold mb-2 max-md:text-center">
          Recent Transactions
        </h2>
        <div className=" bg-white rounded-lg p-4">
          <h2 className="text-black text-md">No transactions!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-3">
      <h2 className="text-lg font-semibold mb-2 max-md:text-center">Transactions</h2>
      <div className="bg-white rounded-lg max-md:w-full flex flex-col items-center justify-between md:h-[42vh]">
        <ul className="space-y-2 w-full h-full pt-0 max-md:pt-6 max-md:flex max-md:flex-col max-md:gap-y-4 ">
          {tempTransactions.map((transaction, index) => (
            <Transaction
              key={index}
              details={transaction}
              setTransactions={setTransactions}
              setBalance={setBalance}
              setExpenses={setExpenses}
              balance={balance}
              currentPage={currentPage}
              index={index}
            />
          ))}
        </ul>

        <div className="flex items-center justify-center w-full px-4 py-2 mt-4 gap-x-3">
          <button
            className={`text-[#171717e3] bg-[#f1f1f1] rounded-2xl p-3 shadow cursor-pointer ${
              currentPage === 1 ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>

          <div className="bg-green-600 px-2.5 py-1 text-white text-md font-bold shadow rounded-sm">
            {currentPage}
          </div>

          <button
            className={`text-[#171717e3] bg-[#f1f1f1] rounded-2xl p-3 shadow cursor-pointer ${
              currentPage === totalPages ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
