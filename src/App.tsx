import ActionInputs from "./ui/components/Actions/ActionsInputs";
import {serverApi} from "./application/production/store/ApiServer";
import { Spinner } from "react-bootstrap";
import AddOperationModal from "./ui/components/Modal/AddOperationModal";

// import { useAppDispatch } from "./store/store";
// import { actionsListed, modelsListed, operatorsListed} from "./application/production/store/ProductionSlice";
// import { Model } from "./application/production/domain/Model";
// import { Operator } from "./application/production/domain/Operator";

const App = () => {

  // const dispatch = useAppDispatch()

  // const fakeModelActions = ['A','B','C'];
  // const fakeModel:Model[]=[
  //   {name:'Moon res 1'},
  //   {name:'fdfdfon res 1'},
  //   {name:'Gooon res 1'},
  //   {name:'ddfd ras 1'},
  //   {name:'ddfd tor 1'},
  //   {name:'ddfd tor 2'},
  //   {name:'M2'},
  // ]
  // const fakeOperator: Operator[] = [
  //   { barcode: "bbb", operatorId: "5", name: "Jack" },
  //   { barcode: "bbddb", operatorId: "6", name: "Robert" },
  // ];

  // dispatch(operatorsListed(fakeOperator))
  // dispatch(actionsListed(fakeModelActions))
  // dispatch(modelsListed(fakeModel))

  const operator = serverApi.useGetAllOperatorsQuery()
  const models = serverApi.useGetAllModelsQuery()
  
  if (operator.isLoading || models.isLoading) {
    return <Spinner></Spinner>
  }

  return (
    <div>

      <ActionInputs />
      <AddOperationModal btnName="Add Action" title="Detail Action" size="lg" />
    </div>
  );
};

export default App;
