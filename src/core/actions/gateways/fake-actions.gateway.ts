import { ActionsGateway, GetAllActionsResponse } from "./actions.gateway";

export class FakeActionsGateway implements ActionsGateway {
	async getAllActions(): Promise<GetAllActionsResponse[]> {
		return Promise.resolve([
			{ id: 1, name: "Action 1", zone: "Zone 1" },
			{ id: 2, name: "Action 2", zone: "Zone 2" },
			{ id: 3, name: "Action 3", zone: "Zone 3" },
		]);
	}
}
