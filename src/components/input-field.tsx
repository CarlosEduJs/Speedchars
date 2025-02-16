import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function InputField({
  label,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-sm">{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
