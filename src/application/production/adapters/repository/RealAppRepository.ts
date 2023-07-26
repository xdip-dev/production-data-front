import { HttpClient } from "../../../../shared/HttpClient";
import { AppRepository } from "../../code/port/AppRepository";
import { Operator } from "../../domain/Operator";

export class RealAppRepository extends HttpClient implements AppRepository {
  public async getAllOpertors(): Promise<Operator[] | null> {
    const response = await this.client<void, Operator[]|null>(
      "GET",
      "/get-operators"
    );
    return response;
  }
}
