// import { useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";

interface Element {
  name: string;
}

interface Props {
  listeElement: Element[];
  onSelected?(name: string | undefined): void;
}

const SelectBox: React.FC<Props> = ({ listeElement, onSelected }) => {
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
      />
    </div>
  );
};

export default SelectBox;
