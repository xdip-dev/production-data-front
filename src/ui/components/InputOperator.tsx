import { Operator } from "@/core/erp/gateway/erp.gateway";
import { Dropdown, DropdownChangeEvent, DropdownFilterEvent } from "primereact/dropdown";
import { useState } from "react";

interface Props {
	operators: Operator[];
	operatorselection(operator?: Operator): void;
}

export default function InputOperator(props: Props) {
	const [selectedOperator, setSelectedOperator] = useState<Operator>();

	const operatorTemplate = (option: Operator) => {
		return `${option.barcode} - ${option.name}`;
	};

	const handleSelection = (event: DropdownChangeEvent) => {
		setSelectedOperator(event.value);
		props.operatorselection(event.value);
	};

	const handleFilter = (event: DropdownFilterEvent) => {
		console.log(event.originalEvent.target);
	};

	return (
		<>
			<div>
				<Dropdown
					value={selectedOperator}
					onChange={handleSelection}
					options={props.operators}
					itemTemplate={operatorTemplate}
					optionLabel="name"
					placeholder="Select an Operator"
					filter
					filterBy="name,barcode"
					onFilter={(e) => handleFilter(e)}
				/>
			</div>
		</>
	);
}
