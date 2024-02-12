import { describe, it, beforeEach } from "vitest";
import { StepFixture, createStepFixture } from "./step.fixture";

describe("Step Production Slice", () => {
	let fixture: StepFixture;
	beforeEach(() => {
		fixture = createStepFixture();
	});
	it("should be able to get the last step", async () => {
		fixture.givenTheLastStepIs({
			stepId: 1,
			action: "action 1",
			model: "model 1",
			reference: "reference 1",
			status: "in_progress",
		});
		await fixture.whenRetreivingLastStep({ operatorId: "1" });
		fixture.thenTheStepStoreShouldBe({
			lastStep: {
				stepId: 1,
				action: "action 1",
				model: "model 1",
				reference: "reference 1",
				status: "in_progress",
			},
			operatorIdSelected: "1",
			isavailableToEndStep: true,
		});
	});
	it.each([
		{ status: "in_progress", expected: true },
		{ status: "other", expected: false },
		{ status: "", expected: false },
	])("should set the right bool for the available end step : $expected", async ({ status, expected }) => {
		fixture.givenTheLastStepIs({
			stepId: 1,
			action: "action 1",
			model: "model 1",
			reference: "reference 1",
			status: status,
		});

		await fixture.whenRetreivingLastStep({ operatorId: "1" });
		fixture.thenTheStepStoreShouldBe({
			lastStep: {
				stepId: 1,
				action: "action 1",
				model: "model 1",
				reference: "reference 1",
				status: status,
			},
			operatorIdSelected: "1",
			isavailableToEndStep: expected,
		});
	});

	it("should send the creation of a step and reset the store", async () => {
		await fixture.whenCreatingTheStepWith({
			action: "action 1",
			model: "model 1",
		});

		fixture.thenTheStepStoreShouldBe({
			lastStep: null,
			operatorIdSelected: "",
			isavailableToEndStep: false,
		});
	});
});
