import { useState } from "react";

interface typeInput {
  value: string | undefined | number;
  setValue: any;
  className?: string | undefined;
  label: string | undefined;
  type?: string;
  require?: boolean;
}

export const Input = (props: typeInput) => {
  const { value, setValue, className, label, type, require } = props;
  const [error, setError] = useState(false);
  const handleChange = (e: any) => {
    if (require) {
      setError(e.target.value.length === 0);
    }
    setValue(e.target.value);
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-white text-sm">{label}</label>
      <input
        value={value}
        type={type || "text"}
        onChange={handleChange}
        className={`${className} rounded-md bg-gray-400 px-4 py-2 text-app-black w-full outline-none focus:bg-app-red focus:text-white font-bold`}
      />
      {error && <p className="text-app-red text-sm">This field is require</p>}
    </div>
  );
};
