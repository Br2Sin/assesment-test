interface typeLinkButton {
  icon: string;
  name: string;
  link: string;
}
interface typeActionButton {
  children?: any;
  onClick: any;
  className?: string;
  type?: string;
  disabled?: boolean;
}

export const LinkButton = (props: typeLinkButton) => {
  const { icon, name, link } = props;
  return (
    <a href={link} target="_blank">
      <button className="cursor-pointer flex items-center justify-center gap-3 py-2 ">
        <img src={icon} alt={`${name} icon`} className="hover:scale-125 duration-100 transform"/>
        <p className="text-gray-400">{name}</p>
      </button>
    </a>
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
      } px-8 py-2 rounded-md  font-bold uppercase text-xl duration-100 hover:scale-105 transform ${className} ${
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
