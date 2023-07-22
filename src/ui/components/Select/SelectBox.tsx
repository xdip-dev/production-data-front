// import { useState } from "react";
import Select from "react-select";

interface Element {
  name:string
}


interface Props {
  listeElement:Element[]
}

const SelectBox: React.FC<Props> = ({listeElement}) => {
  return (
    <div>
      <Select
        getOptionLabel={(e: Element) => e.name}
        getOptionValue={(e: Element) => e.name}
        options={listeElement}
        isClearable={true}
        backspaceRemovesValue={true}
      />
    </div>
  );
}

export default SelectBox