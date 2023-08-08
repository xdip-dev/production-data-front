import TableComponent from "../../components/Table/Table";
import { serverApi } from "../../../application/production/store/ApiServer";
// import { DataTable } from "../../../application/production/domain/DataTable";
import { useAppSelector } from "../../../store/store";
import ErrorComponent from "../../components/Error/Error";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";

const TableProd: React.FC = () => {
	const operator = useAppSelector((state) => state.production.operator);

	const { data, isLoading, error } = serverApi.useGetActionQuery({ operatorId: operator.operatorId });

	if (error) {
		return (
			<div className="smallPadding" style={{ color: "white" }}>
				<div className="operator-name">
					{operator.name}
				</div>
				<ErrorComponent error={error} />
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="smallPadding">
				<SpinnerComponent />
			</div>
		);
	}

	return (
		<div>
			<div className="smallPadding operator-name" style={{ color: "white" }}>
				{operator.name}
			</div>
			<TableComponent data={data!} />
		</div>
	);
};

export default TableProd;
