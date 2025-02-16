import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface InputWithCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function InputWithCheckbox({
  label,
  checked,
  onChange,
}: InputWithCheckboxProps) {
  const handleChange = (checked: boolean) => {
    onChange(checked);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={label} checked={checked} onCheckedChange={handleChange} />
      <Label className="text-sm" htmlFor={label}>
        {label}
      </Label>
    </div>
  );
}
