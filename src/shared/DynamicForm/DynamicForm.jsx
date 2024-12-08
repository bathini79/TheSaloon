import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import MultiSelect from "../ui/multiselect";

export const DynamicForm = ({
  formConfig,
  onSubmit,
  onClose,
  data,
}) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? parseFloat(value) || ""
            : value,
    });
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    formConfig.forEach(({ id, label, required }) => {
      if (required && !formData?.[id]) {
        newErrors[id] = `${label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  // Dynamic field rendering
  const renderField = ({
    id,
    label,
    type,
    placeholder,
    options,
    dependency,
    ...rest
  }) => {
    const isHidden =
      dependency && formData?.[dependency?.key] !== dependency.value;
    if (isHidden) return null;
    const commonProps = {
      id,
      name: id,
      value: formData?.[id] || "",
      onChange: handleChange,
      placeholder: placeholder || "",
      className: `border ${
        errors[id] ? "border-red-500" : "border-gray-300"
      } p-2 w-full`,
      ...rest,
    };
    switch (type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "time":
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id} className="font-medium text-sm">
              {label}
            </Label>
            <Input {...commonProps} type={type} />
            {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
          </div>
        );

      case "checkbox":
        return (
          <div key={id} className="flex items-center space-x-2">
            <input
              {...commonProps}
              type="checkbox"
              checked={!!formData?.[id]}
              className="h-5 w-5 border-gray-300 rounded focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
              {label}
            </label>
          </div>
        );

      case "textarea":
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id} className="font-medium text-sm">
              {label}
            </Label>
            <textarea {...commonProps} rows={rest.rows || 3} />
            {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
          </div>
        );

      case "select":
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id} className="font-medium text-sm">
              {label}
            </Label>
            <select
              id={id}
              name={id}
              value={formData?.[id] || ""}
              onChange={handleChange}
              className={`border ${
                errors[id] ? "border-red-500" : "border-gray-300"
              } p-2 w-full`}
            >
              <option value="">Select {label.toLowerCase()}</option>
              {options.map((option) => (
                <option key={option.$id} value={option.$id}>
                  {option.address}
                </option>
              ))}
            </select>
            {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
          </div>
        );
      case "multi-select":
        return (
          <div key={id} className="space-y-2">
            <Label htmlFor={id} className="font-medium text-sm">
              {label}
            </Label>
            <MultiSelect
              defaultValue={formData?.[id] || []}
              onChange={(e) => {
                setFormData({ ...formData, [id]: e });
              }}
              className={`border ${
                errors[id] ? "border-red-500" : "border-gray-300"
              } p-2 w-full`}
              options={options}
            ></MultiSelect>
            {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
          </div>
        );

      case "radio":
        return (
          <div key={id} className="space-y-2">
            <Label className="font-medium text-sm">{label}</Label>
            <div className="flex space-x-4">
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${id}-${option.value}`}
                    name={id}
                    value={option.value}
                    checked={formData?.[id] === option?.value}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                  <label
                    htmlFor={`${id}-${option.value}`}
                    className="text-sm font-medium text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formConfig.map(renderField)}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
