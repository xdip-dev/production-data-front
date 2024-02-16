export type ResponseError = {
	error: string;
	message: string;
	statusCode: number;
};

export type AsyncThunkError = {
	message: string;
};

export const ErrorManagement = (error: unknown): AsyncThunkError => {
	const errorResponse = error as ResponseError;
	if (errorResponse.statusCode === 400) {
		return { message: errorResponse.message };
	}
	return { message: "An unexpected error occurred" };
};
