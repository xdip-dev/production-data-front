import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
	const nav = useNavigate();
	return (
		<div
		// style={{
		// 	padding: "1rem", // Equivalent to p-p-3 depending on the scale used by PrimeFlex
		// 	display: "flex", // Equivalent to p-d-flex
		// 	justifyContent: "center", // Equivalent to p-jc-center
		// 	backgroundColor: "var(--primary-100)", // Set the background color using a variable from the theme
		// }}
		>
			<Button label="Back" icon="pi pi-arrow-left" className="p-button-text mb-2" onClick={() => nav("/")} />
		</div>
	);
}
