import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import TopExpenses from "./pages/TopExpenses";

const App = () => {
  const [balance, setBalance] = useState(() => {
    return localStorage.getItem("balance") ? JSON.parse(localStorage.getItem("balance")) : 5000;
  });
  const [expenses, setExpenses] = useState(() => {
    return localStorage.getItem("totalExpenses") ? JSON.parse(localStorage.getItem("totalExpenses")) : 0;
  });
  const [transactions, setTransactions] = useState(() => {
    return localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : [];
  });
  const [categoryExpenses, setCategoryExpenses] = useState(() => {
    return localStorage.getItem("categoryExpenses") ? JSON.parse(localStorage.getItem("categoryExpenses")) : {
      food: 0,
      travel: 0,
      entertainment: 0,
    };
  });

  useEffect(() => {
    const newCategoryExpenses = {
      food: 0,
      travel: 0,
      entertainment: 0,
    };

    transactions.forEach((transaction) => {
      newCategoryExpenses[transaction.category] += transaction.price;
    });

    setCategoryExpenses(newCategoryExpenses);
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("totalExpenses", expenses);
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("categoryExpenses", JSON.stringify(categoryExpenses));
  }, [categoryExpenses]);

  return (
    <div className="mx-4 flex flex-col">
      <Dashboard
        balance={balance}
        setBalance={setBalance}
        expenses={expenses}
        setExpenses={setExpenses}
        setTransactions={setTransactions}
        categoryExpenses={categoryExpenses}
      />

      <div className="flex max-md:flex-col gap-x-6 mt-4 max-md:gap-y-4">
        <Transactions
          transactions={transactions}
          setTransactions={setTransactions}
          setBalance={setBalance}
          setExpenses={setExpenses}
          balance={balance}
        />
        <TopExpenses categoryExpenses={categoryExpenses} />
      </div>
    </div>
  );
};

export default App;
