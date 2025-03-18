import {
  BookOpenIcon,
  BriefcaseIcon,
  PawPrintIcon,
  PenIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";

import Personal from "../icons/Personal.svg";
import Pet from "../icons/Pet.svg";
import SelfCare from "../icons/SelfCare.svg";
import Shop from "../icons/Shop.svg";
import Work from "../icons/Work.svg";

const iconDict: Record<string, JSX.Element> = {
  Pet: (
    <img
      src={Pet as unknown as string}
      alt="Personal Icon"
      className="w-8 h-8"
    />
  ),
  SelfCare: (
    <img
      src={SelfCare as unknown as string}
      alt="Personal Icon"
      className="w-8 h-8"
    />
  ),
  Shop: (
    <img
      src={Shop as unknown as string}
      alt="Personal Icon"
      className="w-8 h-8"
    />
  ),
  Work: (
    <img
      src={Work as unknown as string}
      alt="Personal Icon"
      className="w-8 h-8"
    />
  ),
  "book-open": <BookOpenIcon className="w-8 h-8" />,
  briefcase: <BriefcaseIcon className="w-8 h-8" />,
  "paw-print": <PawPrintIcon className="w-8 h-8" />,
  pen: <PenIcon className="w-8 h-8" />,
  plus: <PlusIcon className="w-8 h-8" />,
  trash: <TrashIcon className="w-8 h-8" />,
  Personal: (
    <img
      src={Personal as unknown as string}
      alt="Personal Icon"
      className="w-8 h-8"
    />
  ), // Ensure it is treated as a string
};

export default iconDict;
