import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
// import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
// import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  // const accounts = await getAccounts({ userId: loggedIn.$id });

  // if (!accounts) return;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account transactions efficiently"
          />
          {/* <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          /> */}
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 1250.47 }]}
      />
    </section>
  );
};

export default Home;
