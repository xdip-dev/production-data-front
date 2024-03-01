import { Operator } from "@/core/erp/gateway/erp.gateway";
import { MachineGateway, Matrice } from "./machine.gateway";

export class FakeMachineGateway implements MachineGateway {
	getAllOperatorMachine(): Promise<Operator[]> {
		return Promise.resolve([
			{
				id: "aa",
				name: "dd",
				barcode: "jjj",
			},
		]);
	}
	getAllMatrice(): Promise<Matrice[]> {
		return Promise.resolve([
			{
				code_id: "code 1",
				designation: "des matrice 1",
			},
		]);
	}
}
