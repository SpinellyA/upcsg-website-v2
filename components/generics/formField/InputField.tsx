
import { useState } from "react";
import { FormFieldProps } from "@/interface/formfield";
import CustomUploadAfile from "./CustomUpoadAFile";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({field, layout, onChange}: FormFieldProps) => { 
    const {type, name, label, value, placeholder, options, className, accept, readonly, custom, formimage} = field

    const containerClass = layout === 'horizontal' ? 'flex flex-row items-center' : 'flex flex-col';
    const labelClass = layout === 'horizontal' ? 'w-1/2' : 'mb-1 font-semibold tracking-wide';

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);

    };

    if (custom) {
      switch (type) {
        case 'file':
          return (
              <CustomUploadAfile
              name={name}
              label={label}
              type={type}
              accept={accept}
              className={className}
              onChange={onChange}
              formimage={formimage}
              />
          )
      }
    }
    
      switch (type) {
        case 'text':
        case 'email':
        case 'tel':
          return (
            <div className={containerClass}>
              <label className={labelClass}>{label}</label>
              <div className={labelClass}>
                <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={placeholder}
                  className={`p-2 border rounded-xl ${className}`}
                  readOnly={readonly}
                />
              </div>
            </div>
          );
          
        case 'select':
          return (
            <div className={containerClass}>
              <label className={labelClass + ' whitespace-nowrap truncate'}>{label}</label>
              <div className={labelClass}>
                <select
                  name={name}
                  value={value}
                  onChange={onChange}
                  className={`p-2 border rounded-xl cursor-pointer ${className}`}
                >
                  <option value="" disabled>Select an option</option>
                  {options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );

        case 'password':
            return (
                <div className={containerClass}>
                <label className={labelClass}>{label}</label>
                <div className={labelClass}>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      name={name}
                      value={value}
                      onChange={onChange}
                      placeholder={placeholder}
                      className={`p-2 border rounded-xl ${className}`}
                      readOnly={readonly}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3"
                    >
                      {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            );
        default:
          return null;
      }
}

export default InputField
