import { Input } from '@material-tailwind/react';

type InputDefaultType = {
  placeholder: string;
  type: string;
};
export function InputDefault({ placeholder, type }: InputDefaultType) {
  return (
    <div className="w-full">
      <Input
        type={type}
        crossOrigin={undefined}
        placeholder={placeholder}
        className="!border !border-gray-300 bg-white text-gray-900  ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 "
        labelProps={{
          className: 'hidden',
        }}
        containerProps={{ className: 'min-w-[100px]' }}
      />
    </div>
  );
}