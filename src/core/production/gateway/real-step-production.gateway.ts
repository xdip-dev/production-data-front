import { HttpClient } from "@/core/HttpClient";
import {
	CreateStepDto,
	EndStepDto,
	IdStepInfoModel,
	PartialStepProduction,
	StepProductionGateway,
} from "./step-production.gateway";

export class RealStepProductionGateway extends HttpClient implements StepProductionGateway {
	constructor() {
		super();
	}
	getLastStepOperator(id: string): Promise<PartialStepProduction | null> {
		return this.client<null, PartialStepProduction | null>("GET", `step/operator/${id}`);
	}
	getStepIdInformation(stepId: number): Promise<IdStepInfoModel | null> {
		return this.client<void, IdStepInfoModel | null>("GET", `step/${stepId.toString()}`);
	}
	createStep(props: CreateStepDto): Promise<void> {
		console.log("Create step", props);
		return this.client<CreateStepDto, void>("POST", "step/create", props);
	}
	endStep(props: EndStepDto): Promise<void> {
		return this.client<EndStepDto, void>("PATCH", "step/end", props);
	}
}
