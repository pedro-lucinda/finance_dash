import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  children: React.ReactNode;
}

export function SelectInput({ value, onChange, className, children }: Props) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-[180px] ${className} h-10 rounded-md border-2 text-sm max-lg:w-full`} // Add styles as needed
    >
      {children}
    </select>
  );
}

export default SelectInput;
