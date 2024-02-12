import { ErpGateway, Model, Operator } from "./erp.gateway";

export class FakeErpGateway implements ErpGateway {
	public returnAllOperator: Operator[] = [];
	public returnAllModel: Model[] = [];
	getAllModel(): Promise<Model[]> {
		return Promise.resolve(this.returnAllModel);
	}
	getAllOperator(): Promise<Operator[]> {
		return Promise.resolve(this.returnAllOperator);
	}
}

export const fakeErpGateway = new FakeErpGateway();
