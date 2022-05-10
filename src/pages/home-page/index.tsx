import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActionButton } from "../../components/button";
import Layout from "../../components/layout";
import { LoadingSpinner } from "../../components/spinner";
import APIkit from "../../utils/axios";
import BookItem, { typeBook } from "./book-item";
import SectionBlock from "./section-block";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<typeBook[]>([]);
  const navigate = useNavigate();
  const handleManage = () => {
    navigate("/manage", {
      state: {
        type: "edit",
        id: 2,
      },
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    await APIkit({
      method: "get",
      url: serverUrl,
    })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleRemove = async (id: number) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await APIkit({
          method: "delete",
          url: serverUrl + `/${id}`,
        })
          .then((res) => {
            Swal.fire({
              title: "Success!",
              text: "New Book deleted successfully.",
              icon: "success",
            });
            fetchData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout title="Home Page">
      <div className="bg-app-black-dark bg-opacity-75 shadow-2xl rounded-md w-full min-h-screen z-10 flex flex-col relative">
        {loading && <LoadingSpinner />}
        <div className="bg-app-black-light h-24 rounded-t-xl flex items-center justify-end px-8">
          <ActionButton onClick={handleManage}>Create</ActionButton>
        </div>
        <div className="bg-app-red flex-1 grid sm:grid-cols-2 lg:grid-cols-3 md:px-8 px-2 gap-1 sm:gap-2 md:gap-3 lg:gap-6 pt-6 pb-72 md:pb-32 lg:pb-16">
          {books.map((book, idx) => (
            <BookItem {...book} key={idx} remove={handleRemove} />
          ))}
        </div>
        <div className="flex-col md:flex-row flex gap-4 justify-between transform translate-y-12 absolute bottom-20 w-10/12 mx-auto left-1/2 -translate-x-1/2 z-20">
          <SectionBlock
            title="New Books"
            desc="Newly published this month/week"
            icon="ico_bestseller.svg"
            count={8}
          />
          <SectionBlock
            title="Best Seller"
            desc="Sold more than 1000 this month"
            icon="ico_new.svg"
            count={6}
          />
          <SectionBlock
            title="Top Likes"
            desc="Likes from more than 1000 people"
            icon="ico_toplikes.svg"
            count={12}
          />
        </div>
        <div className="bg-gray-400 rounded-b-xl h-24"></div>
      </div>
    </Layout>
  );
};

export default HomePage;
