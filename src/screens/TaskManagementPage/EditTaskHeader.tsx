import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../../components/ui/Button";

interface EditTaskHeaderProps {
  onBackClick: () => void;
  isDarkMode: boolean;
}

export const EditTaskHeader = ({
  onBackClick,
  isDarkMode,
}: EditTaskHeaderProps): JSX.Element => {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 pt-5 pb-0 px-0 h-auto"
      onClick={onBackClick}
    >
      <ArrowLeftIcon className="w-5 h-5 text-[#5F33E1]" />
      <span
        className={`font-regular text-[14px] ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Back
      </span>
    </Button>
  );
};
