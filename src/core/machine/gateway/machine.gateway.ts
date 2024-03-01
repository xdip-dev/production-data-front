import { Operator } from "@/core/erp/gateway/erp.gateway";

export type OperatorMachine = Operator;

export interface Matrice {
	code_id: string;
	designation: string;
}

export interface MachineGateway {
	getAllOperatorMachine(): Promise<OperatorMachine[]>;
	getAllMatrice(): Promise<Matrice[]>;
}
