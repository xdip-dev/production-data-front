import { ActionsGateway, GetAllActionsResponse } from "./actions.gateway";

export class FakeActionsGateway implements ActionsGateway {
	async getAllActions(): Promise<GetAllActionsResponse[]> {
		return Promise.resolve([
			{ id: 1, name: "Action 1", zone: "CAN" },
			{ id: 2, name: "Action 2", zone: "INJ" },
			{ id: 3, name: "Action 3", zone: "CAN" },
		]);
	}
}
