import { Input } from "./ui/input";
import { Button } from "./ui/button";

type InputWithBtnProps = {
  placeholder: string;
  buttonText: string;
  onClick: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputWithBtn({
  placeholder,
  buttonText,
  onClick,
  value,
  onChange,
}: InputWithBtnProps) {
  return (
    <div className="flex items-center w-36 border border-secondary-foreground/20 rounded-md ">
      <Input
        className="w-20 rounded-r-none border-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Button
        variant={"secondary"}
        onClick={onClick}
        className="w-16 rounded-l-none"
      >
        {buttonText}
      </Button>
    </div>
  );
}
