import TableComponent from "../../components/Table/Table";
import { serverApi } from "../../../application/production/store/ApiServer";
// import { DataTable } from "../../../application/production/domain/DataTable";
import { useAppSelector } from "../../../store/store";
import ErrorComponent from "../../components/Error/Error";
import SpinnerComponent from "../../components/Spinner/SpinnerComponent";

const TableProd: React.FC = () => {

  const operator = useAppSelector((state) => state.production.operator)

	const { data, isLoading, error  } = serverApi.useGetActionQuery({operatorId:operator.operatorId});

	// const data:DataTable[] = [
	//   { model:'Ma',action:'BR - friz',status:'terminat'},
	// ];

  if (error) {
    return <ErrorComponent error={error} />
  }


  if(isLoading){
    return <SpinnerComponent/>
  }

	return (
		<div style={{ padding: "1em" }}>
			{data ? <TableComponent data={data} />: null }
		</div>
	);
};

export default TableProd;
