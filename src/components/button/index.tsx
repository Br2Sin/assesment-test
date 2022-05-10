import React, { Children } from "react";

interface typeLinkButton {
  icon: string;
  name: string;
}

interface typeActionButton {
  children?: any;
  onClick: any;
  className?: string;
  type?: string;
  disabled?: boolean;
}
export const LinkButton = (props: typeLinkButton) => {
  const { icon, name } = props;
  return (
    <button className="cursor-pointer flex items-center justify-center gap-3 py-2">
      <img src={icon} alt={`${name} icon`} />
      <p className="text-gray-400">{name}</p>
    </button>
  );
};

export const ActionButton = (props: typeActionButton) => {
  const { children, onClick, className, type, disabled } = props;
  return (
    <button
      className={`${
        type === "nevative"
          ? "bg-gray-400 text-app-black"
          : "bg-app-red text-gray-50"
      } px-8 py-2 rounded-md  font-bold uppercase text-xl hover:scale-105 transform ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
};
