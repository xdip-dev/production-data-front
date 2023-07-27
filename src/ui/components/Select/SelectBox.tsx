// import { useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";

interface Element {
  name: string;
}

interface Props {
  listeElement: Element[];
  onSelected?(name: string | undefined): void;
  placeholder:string
}

const SelectBox: React.FC<Props> = ({ listeElement, onSelected,placeholder }) => {
  const handleChange = (event: SingleValue<Element>) => {
    if (onSelected) {
      onSelected(event?.name);
    }
  };

  return (
    <div>
      <Select
        onChange={handleChange}
        getOptionLabel={(e: Element) => e.name}
        getOptionValue={(e: Element) => e.name}
        options={listeElement}
        isClearable={true}
        backspaceRemovesValue={true}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectBox;
