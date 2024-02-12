import { HttpClient } from "@/core/HttpClient";
import { ErpGateway, Model, Operator } from "./erp.gateway";

export class RealErpGateway extends HttpClient implements ErpGateway {
	constructor() {
		super();
	}

	async getAllOperator(): Promise<Operator[]> {
		return await this.client<void, Operator[]>("GET", "erp/operators");
	}
	async getAllModel(): Promise<Model[]> {
		return await this.client<void, Model[]>("GET", "erp/models");
	}
}
