import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import iconDict from "../../utils/iconsDict";
import { useTheme } from "../../store/ThemeStore";
import { Checkbox } from "./Checkbox";
import { iconesColorDict } from "../../utils/iconsColorDict";

interface DropdownOption {
  value: string;
  icon: string;
}

interface DropdownProps {
  title: string;
  options?: DropdownOption[];
  isCheckbox?: boolean;
  onSelect?: (value: string, icon: string) => void;
  selectedValue?: string;
  selectedOptions?: string[];
  onOptionToggle?: (value: string) => void;
  fullWidth?: boolean;
}
type IconType = keyof typeof iconesColorDict;

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  options = [
    { value: "Pet", icon: "Pet" },
    { value: "Personal", icon: "Personal" },
    { value: "Self Care", icon: "SelfCare" },
    { value: "Shop", icon: "Shop" },
    { value: "Work", icon: "Work" },
  ],
  isCheckbox = true,
  onSelect,
  selectedValue: externalSelectedValue,
  selectedOptions: externalSelectedOptions,
  onOptionToggle,
  fullWidth = false,
}) => {
  const { isDarkMode } = useTheme();

  const [internalSelectedValue, setInternalSelectedValue] = useState<
    string | undefined
  >(externalSelectedValue);
  const [internalSelectedOptions, setInternalSelectedOptions] = useState<
    string[]
  >([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalSelectedValue(externalSelectedValue);
  }, [externalSelectedValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleCheckboxSelection = (value: string) => {
    if (onOptionToggle) {
      onOptionToggle(value);
    } else {
      setInternalSelectedOptions((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const handleSingleSelection = (value: string, icon: string) => {
    setInternalSelectedValue(value);
    if (onSelect) {
      onSelect(value, icon);
    }
    setOpen(false);
  };

  const effectiveSelectedValue = internalSelectedValue || externalSelectedValue;
  const effectiveSelectedOptions =
    externalSelectedOptions || internalSelectedOptions;

  const getBackgroundColor = (icon: string) => {
    if (icon in iconesColorDict) {
      return { backgroundColor: iconesColorDict[icon as IconType].unfilled };
    }
    return { backgroundColor: "#D5F7EE" }; // Default background color
  };

  const getSelectedOptionLabel = () => {
    if (isCheckbox) {
      const selectedCount = effectiveSelectedOptions.length;
      return selectedCount ? `${selectedCount} selected` : "Filter";
    }

    if (effectiveSelectedValue) {
      const selectedOption = options.find(
        (opt) => opt.value === effectiveSelectedValue
      );
      if (selectedOption) {
        return (
          <span className="flex items-center gap-2">
            {selectedOption.icon && iconDict[selectedOption.icon]}
            <span
              className={`ml-1 ${
                isDarkMode
                  ? "text-white font-inter text-base font-medium"
                  : "text-black"
              }`}
            >
              {selectedOption.value}
            </span>
          </span>
        );
      }
    }

    return (
      <span
        className={
          isDarkMode
            ? "text-white font-inter text-base font-medium"
            : "text-black"
        }
      >
        {title}
      </span>
    );
  };

  return (
    <div
      className={`relative ${fullWidth ? "w-full" : "w-full max-w-[182px]"}`}
      ref={dropdownRef}
    >
      <button
        className={`w-full flex justify-between items-center rounded-lg shadow-md ${
          isDarkMode
            ? "px-3 py-2 bg-[#342F65] text-white"
            : "px-3 py-2 bg-white text-black"
        }`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex-1 text-left">{getSelectedOptionLabel()}</div>
        <ChevronDown
          className={`w-4 h-4 ml-2 flex-shrink-0 ${
            isDarkMode ? "text-white" : "text-gray-500"
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 mt-1 p-2 flex flex-col items-start gap-2 self-stretch rounded-lg shadow-md z-50 w-full ${
            isDarkMode ? "bg-[#342F65]" : "bg-white"
          }`}
        >
          {options.map((option) => {
            const bgColorStyle = getBackgroundColor(option.icon);

            return (
              <div
                key={option.value}
                className={`p-1 px-2 flex items-center gap-2 self-stretch rounded-lg cursor-pointer w-full ${
                  isDarkMode ? "hover:bg-[#403A78]" : "hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isCheckbox) {
                    handleCheckboxSelection(option.value);
                  } else {
                    handleSingleSelection(option.value, option.icon);
                  }
                }}
              >
                {isCheckbox && (
                  <Checkbox
                    checked={effectiveSelectedOptions.includes(option.value)}
                    onCheckedChange={() =>
                      handleCheckboxSelection(option.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                <div
                  className={`flex items-center justify-center rounded-xl p-1 w-10 h-10`}
                  style={bgColorStyle}
                >
                  <div className="scale-90">{iconDict[option.icon]}</div>
                </div>
                <span
                  className={`ml-1 ${
                    isDarkMode
                      ? "text-white font-inter text-base font-medium"
                      : "text-black"
                  }`}
                >
                  {option.value}
                </span>
                {!isCheckbox && effectiveSelectedValue === option.value && (
                  <Check className="w-4 h-4 text-green-500 ml-auto" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
