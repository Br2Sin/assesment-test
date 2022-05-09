import React from "react";

interface typeLinkButton {
  icon: string;
  name: string;
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
