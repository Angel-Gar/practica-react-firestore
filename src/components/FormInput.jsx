/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

const FormInput = forwardRef(
  ({ type, placeholder, onChange, onBlur, error, name, label }, ref) => {
    const errorClassLabel = error 
      ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
      : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    const errorClassInput = error
    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
    : "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" 

    return (
      <div className="mb-6">
        <label
          htmlFor="email"
          className={errorClassLabel}
        >
          {label}
        </label>

        <input
          className= {errorClassInput}
          type={type}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />
      </div>
    );
  }
);

export default FormInput;
