import { createRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import { ActionButton } from "../../components/button";
import { Input } from "../../components/input";
import Layout from "../../components/layout";
import { LoadingSpinner } from "../../components/spinner";
import APIkit from "../../utils/axios";
import { pinFileToIPFS } from "../../utils/pinata";

interface typeLocation {
  type: string;
  book?: any;
}
const ManagePage = () => {
  const location = useLocation();
  const state = location.state as typeLocation;

  const coverImgRef = createRef<HTMLInputElement>();

  const [uploading, setUpLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDesc] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [coverImg, setCoverImg] = useState<any>();
  const [preview, setPreview] = useState<any>();
  const [valid, setValid] = useState<boolean>(false);
  const [endpointUrl, setEndpointUrl] = useState<string | undefined>();

  const handleUpload = async () => {
    setUpLoading(true);
    const result = await pinFileToIPFS(coverImg);
    if (result.success === true) {
      Swal.fire({
        title: "Success!",
        text: "File Uploaded successfully.",
        icon: "success",
        footer: `<a href="${result.imageUri}" target="_blank" className="underline">View on IPFS</a>`,
      });
      setEndpointUrl(result.imageUri);
    } else {
      Swal.fire({
        title: "Error!",
        text: "File Uploading Failed",
        icon: "error",
      });
    }
    setUpLoading(false);
  };

  const handleCreate = async () => {
    if (!valid) {
      Swal.fire({
        title: "Error!",
        text: "Please input all required values",
        icon: "error",
      });
      return;
    }
    if (state.type !== "edit" || (state.type !== "edit" && !preview)) {
      if (!coverImg) {
        Swal.fire({
          title: "Error!",
          text: "Please Select book cover image and upload it",
          icon: "error",
        });
        return;
      }
      if (!endpointUrl) {
        Swal.fire({
          title: "Error!",
          text: "Please Upload book cover image",
          icon: "error",
        });
        return;
      }
    }

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const data = {
      title: title,
      description: description,
      email: email,
      phone: phone,
      cover_image: endpointUrl ? endpointUrl : preview,
      author: author,
      price: price,
    };
    setCreating(true);
    if (state.type === "edit") {
      await APIkit({
        method: "put",
        url: serverUrl + `/${state.book.id}`,
        data: data,
      })
        .then((res) => {
          handleClear();
          setCreating(false);
          Swal.fire({
            title: "Success!",
            text: "New Book created successfully.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          setCreating(false);
        });
    } else {
      await APIkit({
        method: "post",
        url: serverUrl,
        data: data,
      })
        .then((res) => {
          handleClear();
          setCreating(false);
          Swal.fire({
            title: "Success!",
            text: "New Book created successfully.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error);
          setCreating(false);
        });
    }
  };

  const handleClear = () => {
    setCoverImg(null);
    setEndpointUrl(undefined);
    setTitle("");
    setDesc("");
    setEmail("");
    setPhone("");
    setAuthor("");
    setPrice(0);
  };

  useEffect(() => {
    if (state.type === "edit") {
      setTitle(state.book.title);
      setDesc(state.book.description);
      setAuthor(state.book.author);
      setPrice(state.book.price);
      setEmail(state.book.email);
      setPhone(state.book.phone);
      setPreview(state.book.cover_image);
    }
  }, []);

  useEffect(() => {
    setEndpointUrl(undefined);
    if (coverImg && coverImg.length > 0) {
      const objectUrl = URL.createObjectURL(new Blob(coverImg));
      setPreview(objectUrl);
    } else {
      if (state.type !== "edit") {
        setPreview(null);
      }
      setCoverImg(null);
    }
  }, [coverImg, state.type]);

  useEffect(() => {
    setValid(
      title.length !== 0 &&
        description?.length !== 0 &&
        price !== undefined &&
        price > 0
    );
  }, [title, description, author, price]);

  return (
    <Layout title="book manage">
      <div className="bg-app-black-dark rounded-lg flex flex-col p-8 bg-opacity-80 shadow-xl">
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="w-full sm:w-1/2 flex items-center justify-center sm:mx-12 relative">
            <div
              className="py-12 sm:py-0 rounded-lg bg-app-red flex items-center justify-center w-full h-full flex-col cursor-pointer"
              onClick={() => coverImgRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="cover" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="/assets/icon/ico_book.png"
                    alt="book icon"
                    className="w-20 "
                  />
                  <p className="text-center text-white text-xs">
                    select book cover image
                  </p>
                </div>
              )}
            </div>
            {coverImg && !endpointUrl && (
              <div className="bg-app-black bg-opacity-50 w-full absolute bottom-0 top-0 flex items-center justify-center py-4">
                {uploading ? (
                  <ScaleLoader color="#ffffff" />
                ) : (
                  <ActionButton
                    onClick={handleUpload}
                    className={" hover:animate-bounce"}
                  >
                    Upload
                  </ActionButton>
                )}
              </div>
            )}
            {endpointUrl && (
              <img
                src="/assets/icon/ico_check.png"
                alt="check"
                className="w-12 absolute right-5 top-5"
              />
            )}
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-3">
            <Input
              require
              value={title}
              setValue={setTitle}
              label="Book Title *"
            />
            <Input
              require
              value={description}
              setValue={setDesc}
              label="Book Description *"
            />
            <Input
              require
              value={author}
              setValue={setAuthor}
              label="Book Author *"
            />
            <Input
              require
              value={price}
              setValue={setPrice}
              label="Price *"
              type="number"
            />
            <Input
              require
              value={email}
              setValue={setEmail}
              label="Contact Email"
            />
            <Input
              require
              value={phone}
              setValue={setPhone}
              label="Contact Phone"
            />
            <input
              className="hidden"
              ref={coverImgRef}
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImg(e.target.files)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end mt-12 gap-4">
          <ActionButton
            onClick={handleCreate}
            disabled={!valid}
            className="sm:w-max w-full"
          >
            {state.type === "edit" ? "Update Book" : "Create New Book"}
          </ActionButton>
          <Link to={"/"} className="sm:w-max w-full">
            <ActionButton
              onClick={() => {}}
              type="nevative"
              className="sm:w-max w-full"
            >
              Cancel
            </ActionButton>
          </Link>
        </div>
      </div>
      {creating && <LoadingSpinner />}
    </Layout>
  );
};

export default ManagePage;
