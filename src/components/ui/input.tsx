import { Input } from '@material-tailwind/react';

interface IInputDefaultType {
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A custom input component that wraps Material Tailwind's Input.
 * It allows for dynamic placeholder text, input type, and value with optional change handler.
 *
 * @param {string} placeholder - The placeholder text to be displayed inside the input field.
 * @param {string} type - The type of the input (e.g., "text", "password").
 * @param {string} [value] - The value to be displayed in the input field (optional).
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - The function to handle changes to the input (optional).
 *
 * @example
 * // A text input with a placeholder and value
 * <InputDefault placeholder="Enter your name" type="text" value={name} onChange={handleChange} />
 *
 * @returns {JSX.Element} An input field wrapped with the Material Tailwind Input component.
 */
export function InputDefault({ placeholder, type, value, onChange }: IInputDefaultType) {
  return (
    <div className="w-full">
      <Input
        type={type}
        crossOrigin={undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="!border !border-gray-300 bg-white text-gray-900  ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 "
        labelProps={{
          className: 'hidden',
        }}
        containerProps={{ className: 'min-w-[100px]' }}
      />
    </div>
  );
}
