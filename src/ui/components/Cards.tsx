import { Card } from "primereact/card";
import React from "react";
import { useNavigate } from "react-router-dom";
interface Props {
	title: string;
	endpoint: string;
}

export default function Cards(props: Props) {
	const navigate = useNavigate();
	const handleNavigation = () => {
		navigate(props.endpoint);
	};

	function icon(): React.ReactNode {
		return <span className="pi pi-angle-double-right"></span>;
	}

	return (
		<div>
			<Card
				title={props.title}
				subTitle={icon}
				onClick={handleNavigation}
				className="surface-50 shadow-3 cursor-pointer"

				// style={{ backgroundColor: "var(green-600)" }}
			/>
		</div>
	);
}
// className="surface-0 shadow-3 border-1 border-50 border-round "
