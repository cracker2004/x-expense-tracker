import React from "react";
import WalletBalanceCard from "../components/WalletBalanceCard";
import Expenses from "../components/Expenses";
import ExpensePieChart from "../components/ExpensePieChart";

const Dashboard = ({balance, setBalance, expenses, setExpenses, setTransactions, categoryExpenses}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold max-md:text-center">Expense Tracker</h1>
      <div className="flex max-md:flex-col items-center justify-between mt-3 px-8 py-6 bg-[#626262] gap-8 md:h-[40vh]">
        <WalletBalanceCard balance={balance} setBalance={setBalance} />
        <Expenses
          expenses={expenses}
          setExpenses={setExpenses}
          setTransactions={setTransactions}
          balance={balance}
          setBalance={setBalance}
        />
        <ExpensePieChart categoryExpenses={categoryExpenses} />
      </div>
    </div>
  );
};

export default Dashboard;
