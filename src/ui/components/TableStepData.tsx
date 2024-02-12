import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { AppRootState } from "@/core/store/create-store";
import { PartialStepProduction } from "@/core/production/gateway/step-production.gateway";

export default function TableStepData() {
	const lastStep = useSelector<AppRootState, PartialStepProduction | null>((state) => state.step.lastStep);

	return (
		<>
			{lastStep ? (
				<DataTable value={[lastStep]}>
					<Column field="stepId" header="Step ID"></Column>
					<Column field="action" header="Action"></Column>
					<Column field="model" header="Model"></Column>
					<Column field="reference" header="Reference"></Column>
					<Column field="status" header="Status"></Column>
				</DataTable>
			) : (
				<>
					<DataTable value={[{ label: "No Last Step" }]}>
						<Column field="label" header="Data" align="center"></Column>
					</DataTable>
				</>
			)}
		</>
	);
}
