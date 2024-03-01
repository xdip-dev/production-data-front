export interface PartialStepProduction {
	stepId: number;
	actionName: string;
	model: string;
	reference?: string;
	status: string;
}

export interface IdStepInfoModel {
	model: string;
	reference?: string;
}

export interface CreateStepDto {
	operatorId: string;
	model: string;
	action: string;
	reference?: string;
	previousStepsIds?: number[];
	matrice?: string;
}

export interface EndStepDto {
	stepId: number;
	bonne?: number;
	rebut?: number;
	problem?: string;
}

export interface StepProductionGateway {
	getLastStepOperator(id: string): Promise<PartialStepProduction | null>;
	getStepIdInformation(stepId: number): Promise<IdStepInfoModel | null>;
	createStep(props: CreateStepDto): Promise<void>;
	endStep(props: EndStepDto): Promise<void>;
}
