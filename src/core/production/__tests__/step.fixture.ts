import { AppRootState, createTestStore } from "@/core/store/create-store";
import { FakeStepProductionGateway } from "../gateway/fake-step-production.gateway";
import { expect } from "vitest";
import { PartialStepProduction } from "../gateway/step-production.gateway";
import { getLastStepOperator } from "../usecases/get-last-step";
import { createStep, ThunkCreationsProps } from "../usecases/create-step";

export const createStepFixture = () => {
	const stepProductionGateway = new FakeStepProductionGateway();

	const store = createTestStore({ stepProductionGateway });
	return {
		givenTheLastStepIs(step: PartialStepProduction) {
			stepProductionGateway.returnLastStep = new Map<string, PartialStepProduction>([["1", step]]);
		},

		async whenRetreivingLastStep(props: { operatorId: string }) {
			await store.dispatch(getLastStepOperator(props.operatorId));
		},

		async whenCreatingTheStepWith(props: ThunkCreationsProps) {
			await store.dispatch(createStep(props));
		},

		thenTheStepStoreShouldBe(step: AppRootState["step"]) {
			expect(store.getState().step).toEqual(step);
		},
	};
};

export type StepFixture = ReturnType<typeof createStepFixture>;
