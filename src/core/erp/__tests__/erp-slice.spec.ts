import { createTestStore } from "@/core/store/create-store";
import { describe, it, expect } from "vitest";
import { Model, Operator } from "../gateway/erp.gateway";
import { getAllOperator } from "../usecases/get-all-operator.usecase";
import { FakeErpGateway } from "../gateway/fake-erp.gateway";
import { getAllModel } from "../usecases/get-all-model.usecase";

describe("Erp Slice", () => {
	describe("Feature : Retrieving all possible operator", () => {
		it("should gather the humain operator", async () => {
			givenTheListOfOperatorIs([
				{
					id: "1",
					name: "operator 1",
					barcode: "1111",
				},
				{
					id: "2",
					name: "operator 2",
					barcode: "2222",
				},
				{
					id: "3",
					name: "operator 3",
					barcode: "3333",
				},
			]);
			await whenRetreivingAllOperators();
			thenTheListOfOperatorShouldBe([
				{
					id: "1",
					name: "operator 1",
					barcode: "1111",
				},
				{
					id: "2",
					name: "operator 2",
					barcode: "2222",
				},
				{
					id: "3",
					name: "operator 3",
					barcode: "3333",
				},
			]);
		});
	});
	describe("Feature : Retrieving all possible Model", () => {
		it("should gather the Model", async () => {
			givenTheListOfModelIs([
				{
					id: 1,
					name: "Model 1",
				},
				{
					id: 2,
					name: "Model 2",
				},
				{
					id: 3,
					name: "Model 3",
				},
			]);
			await whenRetreivingAllModels();
			thenTheListOfModelShouldBe([
				{
					id: 1,
					name: "Model 1",
				},
				{
					id: 2,
					name: "Model 2",
				},
				{
					id: 3,
					name: "Model 3",
				},
			]);
		});
	});
});

const erpGateway = new FakeErpGateway();

const store = createTestStore({ erpGateway });

function givenTheListOfOperatorIs(listOfOperator: Operator[]) {
	erpGateway.returnAllOperator = listOfOperator;
}
async function whenRetreivingAllOperators() {
	await store.dispatch(getAllOperator());
}

function thenTheListOfOperatorShouldBe(listOfOperator: Operator[]) {
	const listOfOperatorsStore = store.getState().erp.listOperator;
	expect(listOfOperatorsStore).toEqual(listOfOperator);
}
function givenTheListOfModelIs(listOfModel: Model[]) {
	erpGateway.returnAllModel = listOfModel;
}
async function whenRetreivingAllModels() {
	await store.dispatch(getAllModel());
}

function thenTheListOfModelShouldBe(listOfModel: Model[]) {
	const listOfModelsStore = store.getState().erp.listModel;
	expect(listOfModelsStore).toEqual(listOfModel);
}
