
export interface GetActionResponseModel {
    actionId: number;
    operatorId: string;
    action: string;
    model: string;
    bonne: number;
    rebut: number;
    start: string;
    end: string;
    status: string;
    timeSeconde: number | null;
    productivity: number | null;
    breakNumber: number;
}