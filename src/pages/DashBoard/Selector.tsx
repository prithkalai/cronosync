import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Category } from ".";

interface Props {
  category: Category[];
  setCurrCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Selector = ({ category, setCurrCategory }: Props) => {
  return (
    <Select
      onValueChange={(val) => {
        if (val === "all") {
          setCurrCategory(val);
        } else {
          setCurrCategory(
            category[category.findIndex((cat) => cat._id === val)].title
          );
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {category.map((cat, index) => (
          <SelectItem key={index} value={cat._id}>
            {cat.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Selector;
