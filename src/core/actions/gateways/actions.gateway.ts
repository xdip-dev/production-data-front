export interface GetAllActionsResponse {
	id: number;
	name: string;
	zone?: string | null;
}

export interface ActionsGateway {
	getAllActions(): Promise<GetAllActionsResponse[]>;
}
