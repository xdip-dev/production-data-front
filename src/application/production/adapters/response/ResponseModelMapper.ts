import { DataTable } from "../../domain/DataTable";
import { GetActionResponseModel } from "./GetActionResponseModel";

export class ResponseModelMapper {
    public static getActionMapper(response:GetActionResponseModel):DataTable {
        return {
            actionId: response.actionId,
            model: response.model,
            action: response.action,
            status: response.status,
        }
    }
}