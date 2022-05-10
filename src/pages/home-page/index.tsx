import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import { LoadingSpinner } from "../../components/spinner";

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
        <button onClick={handleManage}>test</button>
        {loading && <LoadingSpinner />}
        <div className="bg-app-black-light h-24 rounded-t-xl flex items-center justify-end px-8">
          <button className="bg-app-red px-8 py-2 rounded-md text-gray-50 font-bold uppercase text-xl hover:scale-105 transform">Create</button>
        </div>
        <div className="bg-app-red flex-1"></div>
        <div className="flex-col md:flex-row flex gap-4 justify-between transform translate-y-12 absolute bottom-20 w-10/12 mx-auto left-1/2 -translate-x-1/2">
          <div className="border border-app-black-dark bg-gray-300 px-6  flex">
            <div className="w-2/3 space-y-4 py-4">
              <p className="uppercase text-gray-600 text-xl font-extrabold">New Books</p>
              <p className="text-xs text-gray-800">
                Newly published this month/week
              </p>
            </div>
            <div className="w-1/3 relative flex items-end justify-start">
              <img
                src="/assets/icon/ico_bestseller.svg"
                alt="best seller"
                className="absolute w-12 md:w-2/3 top-2 right-0"
              />
              <div className="w-20 h-20 bg-app-red flex items-center justify-center">
                <p className="text-gray-200 text-4xl font-bold z-20">23</p>
              </div>
            </div>
          </div>
          <div className="border border-app-black-dark bg-gray-300 px-6  flex">
            <div className="w-2/3 space-y-4 py-4">
              <p className="uppercase text-gray-600 text-xl font-extrabold">Best Seller</p>
              <p className="text-xs text-gray-800">
                Sold more than 1000 this month
              </p>
            </div>
            <div className="w-1/3 relative flex items-end justify-start">
              <img
                src="/assets/icon/ico_new.svg"
                alt="best seller"
                className="absolute w-12 md:w-2/3 top-2 right-0"
              />
              <div className="w-20 h-20 bg-app-red flex items-center justify-center">
                <p className="text-gray-200 text-4xl font-bold z-20">23</p>
              </div>
            </div>
          </div>
          <div className="border border-app-black-dark bg-gray-300 px-6  flex">
            <div className="w-2/3 space-y-4 py-4">
              <p className="uppercase text-gray-600 text-xl font-extrabold">Top Likes</p>
              <p className="text-xs text-gray-800">
                Likes from more than 1000 people
              </p>
            </div>
            <div className="w-1/3 relative flex items-end justify-start">
              <img
                src="/assets/icon/ico_toplikes.svg"
                alt="best seller"
                className="absolute w-12 md:w-2/3 top-2 right-0"
              />
              <div className="w-20 h-20 bg-app-red flex items-center justify-center">
                <p className="text-gray-200 text-4xl font-bold z-20">23</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-400 rounded-b-xl h-24"></div>
      </div>
    </Layout>
  );
};

export default HomePage;
