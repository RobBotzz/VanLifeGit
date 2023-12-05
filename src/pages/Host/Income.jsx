import React, { Suspense } from "react";
import { useOutletContext, Await } from "react-router-dom";

import Loading from "../../components/Loading.jsx";

export default function Income() {
  const userData = useOutletContext();

  function renderIncomeData(userData) {
    const transactionsData = [
      { amount: 720, date: "Jan 3, '23", id: "1" },
      { amount: 560, date: "Dec 12, '22", id: "2" },
      { amount: 980, date: "Dec 3, '22", id: "3" },
    ];
    return (
      <section className="host-income">
        <h1>Your income</h1>
        <p>
          Last <span>30 days</span>
        </p>
        <h2>${userData.income}</h2>
        <img
          className="graph"
          src="/assets/images/income-graph.png"
          alt="Income graph"
        />
        <div className="info-header">
          <h3>Your transactions (3)</h3>
          <p>
            Last <span>30 days</span>
          </p>
        </div>
        <div className="transactions">
          {transactionsData.map((item) => (
            <div key={item.id} className="transaction">
              <h3>${item.amount}</h3>
              <p>{item.date}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={userData}>{renderIncomeData}</Await>
    </Suspense>
  );
}
