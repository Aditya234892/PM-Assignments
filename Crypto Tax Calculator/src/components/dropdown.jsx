import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

const Dropdown = ({
  label,
  options,
  placeholder,
  defaultValue,
  onChange,
  layout = "inline", // New 'layout' prop with 'inline' as default
}) => {
  const labelClass = layout === "top" ? "block mb-1" : "text-sm";
  const containerClass =
    layout === "top" ? "flex flex-col space-y-1" : "space-x-3 flex items-center";

  return (
    <div className={containerClass}>
      <label
        htmlFor={label.toLowerCase()}
        className={`text-sm ${labelClass}`}
      >
        {label}
      </label>
      <Select.Root
        defaultValue={options[0].value}
        onValueChange={(value) => onChange(value)}
      >
        <Select.Trigger
          id={label.toLowerCase()}
          className="px-8 py-2 rounded-lg bg-gray-200 flex justify-between items-center font-semibold w-64"
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="rounded-lg bg-white shadow-lg">
            <Select.ScrollUpButton className="flex justify-center">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="px-8 py-2 hover:bg-gray-200 focus:bg-gray-300 outline-none"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex justify-center">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default Dropdown;
