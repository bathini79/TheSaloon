import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { X } from "lucide-react";

const MultiSelect = ({ options, label, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value) => {
    let updatedSelections = [];
    if (selectedOptions.includes(value)) {
      updatedSelections = selectedOptions.filter((item) => item !== value);
    } else {
      updatedSelections = [...selectedOptions, value];
    }
    setSelectedOptions(updatedSelections);
    if (onChange) {
      onChange(updatedSelections);
    }
  };

  const handleRemove = (value) => {
    const updatedSelections = selectedOptions.filter((item) => item !== value);
    setSelectedOptions(updatedSelections);
    if (onChange) {
      onChange(updatedSelections);
    }
  };

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selectedOptions.length > 0 ? (
              <div className="flex gap-1 flex-wrap">
                {selectedOptions.map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {value}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(value);
                      }}
                    />
                  </Badge>
                ))}
              </div>
            ) : (
              <span>{label}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <Input placeholder="Search..." className="mb-2" />
          <div className="max-h-40 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 py-1"
              >
                <Checkbox
                  id={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onCheckedChange={() => handleToggle(option.value)}
                />
                <label
                  htmlFor={option.value}
                  className="text-sm font-medium leading-none"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelect;
