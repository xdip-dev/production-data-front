export type Operator = {
	id: string;
	name: string;
	barcode: string;
};

export type Model = {
	id: number;
	name: string;
};

export interface ErpGateway {
	getAllOperator(): Promise<Operator[]>;
	getAllModel(): Promise<Model[]>;
}
