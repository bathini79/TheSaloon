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
      onChange(updatedSelections.map((selection) => selection.$id));
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
          <Button variant="outline" className="w-full justify-between" style={{
            display: 'flex',
            'flex-direction': 'column',
            'max-height': 'none',
            height: 'auto', 'min-height': "2.5rem",
            'align-items': 'flex-start'
          }}>
            {selectedOptions.length > 0 ? (
              <div className="flex gap-1 flex-wrap">
                {selectedOptions?.map((value) => (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {value?.name}
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
        <PopoverContent className="w-64 p-2"
          style={{ maxHeight: "none", height: "auto" }}>
          <Input placeholder="Search..." className="mb-2" />
          <div className="max-h-40 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.$id}
                className="flex items-center space-x-2 py-1"
              >
                <Checkbox
                  id={option.$id}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={() => handleToggle(option)}
                />
                <label
                  htmlFor={option.$id}
                  className="text-sm font-medium leading-none"
                >
                  {option.name}
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
