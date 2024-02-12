import { HttpClient } from "@/core/HttpClient";
import { ActionsGateway, GetAllActionsResponse } from "./actions.gateway";

export class RealActionsGateway extends HttpClient implements ActionsGateway {
	constructor() {
		super();
	}

	async getAllActions(): Promise<GetAllActionsResponse[]> {
		return await this.client<void, GetAllActionsResponse[]>("GET", "actions");
	}
}
