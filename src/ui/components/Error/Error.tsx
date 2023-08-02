import { SerializedError } from "@reduxjs/toolkit";
import { CustomTypeError } from "../../../application/production/store/ApiServer";

interface Props {
	error: CustomTypeError | SerializedError ;
}

const ErrorComponent: React.FC<Props> = ({ error }) => {
	if ("data" in error) {
		if (typeof error.data.message ==='string') {
			return <div>{error.data.message}</div>;
		}
		return <div>Missing information : {error.data.message[0].path[0]}</div>;
	}
	// you can access all properties of `SerializedError` here
	return <div>{error.message}</div>;
};

export default ErrorComponent;
