import {
  faDollarSign,
  faEdit,
  faEnvelope,
  faFeather,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export interface typeBook {
  id: number;
  title: string;
  description: string;
  author: string;
  price: number;
  email: string;
  phone: string;
  cover_image: string;
  remove?: any;
}
const BookItem = (props: typeBook) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    author,
    price,
    email,
    phone,
    cover_image,
    remove,
  } = props;

  const handleEdit = () => {
    navigate("/manage", {
      state: {
        type: "edit",
        id: id,
        book: props,
      },
    });
  };

  return (
    <div
      className="shadow-2xl flex flex-col bg-app-black relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={cover_image} alt={`${title} cover`} />
      <div className="flex flex-col px-4 py-3 text-gray-300 h-full">
        <p className="uppercase font-bold  text-xl">{title}</p>
        <p className="flex-1 text-gray-500">{description}</p>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faFeather} />
              <p className="">{author}</p>
            </div>
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>{email}</p>
            </div>
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faPhone} />
              <p>{phone}</p>
            </div>
          </div>
          <div className="flex gap-1 items-center mt-2">
            <FontAwesomeIcon icon={faDollarSign} size={"3x"} />
            <p className="text-4xl font-bold">{price}</p>
          </div>
        </div>
      </div>
      {hovered && (
        <div className="absolute top-0 left-0 w-full h-full bg-app-black bg-opacity-70 flex items-center justify-center gap-4">
          <div
            className="p-6 bg-blue-600 rounded-full cursor-pointer"
            onClick={handleEdit}
          >
            <FontAwesomeIcon
              icon={faEdit}
              size={"2x"}
              color={"#FFFFFF"}
              className="transform hover:scale-125 duration-100"
            />
          </div>
          <div
            className="p-6 bg-app-red rounded-full cursor-pointer"
            onClick={() => remove(id)}
          >
            <FontAwesomeIcon
              icon={faTrash}
              size={"2x"}
              color={"#FFFFFF"}
              className="transform hover:scale-125 duration-100"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookItem;
