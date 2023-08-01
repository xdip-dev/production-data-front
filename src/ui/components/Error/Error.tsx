import { SerializedError } from "@reduxjs/toolkit";
import { CustomTypeError } from "../../../application/production/store/ApiServer";

interface Props {
	error: CustomTypeError | SerializedError;
}

const ErrorComponent: React.FC<Props> = ({ error }) => {
	if ("data" in error) {
		return <div>{error.data.message}</div>;
	}
	// you can access all properties of `SerializedError` here
	return <div>{error.message}</div>;
};

export default ErrorComponent;
