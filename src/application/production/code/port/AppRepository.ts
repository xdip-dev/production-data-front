import { Operator } from "../../domain/Operator";

export interface AppRepository {
  getAllOpertors(): Promise<Operator[] | null>;
}
