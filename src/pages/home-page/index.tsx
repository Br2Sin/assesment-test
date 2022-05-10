import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/button";
import Layout from "../../components/layout";
import { LoadingSpinner } from "../../components/spinner";
import SectionBlock from "./section-block";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleManage = () => {
    navigate("/manage", {
      state: {
        type: "edit",
        id: 2,
      },
    });
  };
  return (
    <Layout title="Home Page">
      <div className="bg-app-black-dark bg-opacity-75 shadow-2xl rounded-md w-full h-screen z-10 flex flex-col relative">
        {loading && <LoadingSpinner />}
        <div className="bg-app-black-light h-24 rounded-t-xl flex items-center justify-end px-8">
          <ActionButton onClick={handleManage}>Create</ActionButton>
        </div>
        <div className="bg-app-red flex-1"></div>
        <div className="flex-col md:flex-row flex gap-4 justify-between transform translate-y-12 absolute bottom-20 w-10/12 mx-auto left-1/2 -translate-x-1/2 z-20">
          <SectionBlock title="New Books" desc="Newly published this month/week" icon="ico_bestseller.svg" count={8} />
          <SectionBlock title="Best Seller" desc="Sold more than 1000 this month" icon="ico_new.svg" count={6} />
          <SectionBlock title="Top Likes" desc="Likes from more than 1000 people" icon="ico_toplikes.svg" count={12} />
        </div>
        <div className="bg-gray-400 rounded-b-xl h-24"></div>
      </div>
    </Layout>
  );
};

export default HomePage;
