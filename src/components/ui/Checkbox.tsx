import React, { Dispatch, SetStateAction } from "react";

interface SwitchProps {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  label: string;
  className: string;
}

const Checkbox: React.FC<SwitchProps> = ({
  isChecked,
  setIsChecked,
  label,
  className,
}) => {
  return (
    <div className={className}>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          value={label}
          checked={isChecked}
          onChange={() => setIsChecked((s) => !s)}
          className="mr-2 cursor-pointer"
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
