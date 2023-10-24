import { UseFormRegister } from "react-hook-form";

interface SelectProps {
  register: UseFormRegister<any>;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
  value: string;
}

const Select: React.FC<SelectProps> = ({
  register,
  options,
  error,
  placeholder,
  value,
  ...props
}) => {
  return (
    <div className="w-full">
      <select className="input" {...register("category")} value={value}>
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
