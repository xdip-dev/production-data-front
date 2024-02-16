import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { AppRootState } from "@/core/store/create-store";
import { PartialStepProduction } from "@/core/production/gateway/step-production.gateway";
interface Props {
	isReference?: boolean;
}

export default function TableStepData(props: Props) {
	const lastStep = useSelector<AppRootState, PartialStepProduction | null>((state) => state.step.lastStep);

	return (
		<>
			{lastStep ? (
				<DataTable value={[lastStep]}>
					<Column field="stepId" header="Step ID"></Column>
					<Column field="actionName" header="Action"></Column>
					<Column field="model" header="Model"></Column>
					{props.isReference && <Column field="reference" header="Reference"></Column>}
					<Column field="status" header="Status"></Column>
				</DataTable>
			) : (
				<>
					<DataTable value={[{ label: "No Active Step found" }]}>
						<Column field="label" header="Data" align="center"></Column>
					</DataTable>
				</>
			)}
		</>
	);
}
