/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	CreateStepDto,
	EndStepDto,
	IdStepInfoModel,
	PartialStepProduction,
	StepProductionGateway,
} from "./step-production.gateway";

export class FakeStepProductionGateway implements StepProductionGateway {
	returnLastStep: Map<string, PartialStepProduction> = new Map<string, PartialStepProduction>();
	returnLastStepFromId: Map<number, IdStepInfoModel> = new Map<number, IdStepInfoModel>();
	getStepIdInformation(stepId: number): Promise<IdStepInfoModel | null> {
		return Promise.resolve(this.returnLastStepFromId.get(stepId) ?? null);
	}
	getLastStepOperator(operatorId: string): Promise<PartialStepProduction | null> {
		return Promise.resolve(this.returnLastStep.get(operatorId) ?? null);
	}
	createStep(_props: CreateStepDto): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000); // Delay resolution by 1000ms
		});
	}

	endStep(_props: EndStepDto): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000); // Delay resolution by 1000ms
		});
	}
}
