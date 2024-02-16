import { FakeActionsGateway } from "./core/actions/gateways/fake-actions.gateway";
import { FakeErpGateway } from "./core/erp/gateway/fake-erp.gateway";
import { FakeStepProductionGateway } from "./core/production/gateway/fake-step-production.gateway";
import { PartialStepProduction } from "./core/production/gateway/step-production.gateway";
import { Dependencies } from "./core/store/create-store";

export function inMemoryDevelopment(): Dependencies {
	const erpGateway = new FakeErpGateway();
	erpGateway.returnAllOperator = [
		{
			barcode: "123456789",
			name: "John Doe",
			id: "1",
		},
		{
			barcode: "W-S-R1-Shelf_A",
			name: "Jane Doe",
			id: "W-S-R1-Shelf_A",
		},
		{
			barcode: "OP-1",
			name: "Machine",
			id: "OP-1",
		},
	];

	erpGateway.returnAllModel = [
		{
			id: 1,
			name: "model 1",
		},
		{
			id: 2,
			name: "model 2",
		},
		{
			id: 3,
			name: "model 3",
		},
		{
			id: 4,
			name: "model 4",
		},
		{
			id: 5,
			name: "model 5",
		},
		{
			id: 6,
			name: "model 6",
		},
		{
			id: 7,
			name: "model 7",
		},
		{
			id: 8,
			name: "model 8",
		},
		{
			id: 9,
			name: "model 9",
		},
		{
			id: 10,
			name: "model 10",
		},
		{
			id: 11,
			name: "model 11",
		},
		{
			id: 12,
			name: "model 1 from call",
		},
	];

	const stepProductionGateway = new FakeStepProductionGateway();
	stepProductionGateway.returnLastStep = new Map<string, PartialStepProduction>([
		[
			"W-S-R1-Shelf_A",
			{
				stepId: 1,
				actionName: "action 1",
				model: "model 1",
				reference: "reference 1",
				status: "in_progress",
			},
		],
		[
			"OP-1",
			{
				stepId: 99,
				actionName: "action 9",
				model: "model 9",
				status: "cancelled",
			},
		],
	]);

	stepProductionGateway.returnLastStepFromId = new Map<number, PartialStepProduction>([
		[
			1,
			{
				stepId: 1,
				actionName: "action 1",
				model: "model 1 from call",
				reference: "reference 1 from call",
				status: "in_progress",
			},
		],
		[
			2,
			{
				stepId: 2,
				actionName: "action 1",
				model: "model 1 from call without Ref",
				reference: undefined,
				status: "en cours",
			},
		],
	]);
	const actionsGateway = new FakeActionsGateway();

	return {
		erpGateway,
		stepProductionGateway,
		actionsGateway,
	};
}
