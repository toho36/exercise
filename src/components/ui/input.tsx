import { Input } from '@material-tailwind/react';

interface IInputDefaultType {
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
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
