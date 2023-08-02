import { DataTable } from "../../domain/DataTable";
import { Operator } from "../../domain/Operator";
import { GetActionResponseModel } from "./GetActionResponseModel";
import { GetAllOperatorsResponseModel } from "./GetAllOperatorsResponseModel";

export class ResponseModelMapper {
    public static getActionMapper(response:GetActionResponseModel):DataTable {
        return {
            actionId: response.actionId,
            model: response.model,
            action: response.action,
            status: response.status,
        }
    }
    public static getAllOperatorsMapper(response:GetAllOperatorsResponseModel):Operator {
        return {
            operatorId: response.id,
            name: response.name,
            barcode: response.barcode
        }
    }
}