import { getAllActions } from "@/core/actions/services/actions.services";
import { getAllModel } from "@/core/erp/usecases/get-all-model.usecase";
import { getAllOperator } from "@/core/erp/usecases/get-all-operator.usecase";
import { AppStore } from "@/core/store/create-store";
import { LoaderFunction } from "react-router-dom";

export const createAppLoader =
	({ store }: { store: AppStore }): LoaderFunction =>
	() => {
		store.dispatch(getAllOperator());
		store.dispatch(getAllActions());
		store.dispatch(getAllModel());
		return null;
	};
