import ActionInputs from "./ui/components/Actions/ActionsInputs";
import { useAppDispatch } from "./store/store";
import { actionsListed, modelsListed, operatorsListed} from "./application/production/store/ProductionSlice";
import { Model } from "./application/production/domain/Model";
import { Operator } from "./application/production/domain/Operator";
// import { serverApi } from "./store/ApiServer";
// import { Spinner } from "react-bootstrap";

const App = () => {

  const dispatch = useAppDispatch()

  // const operator = serverApi.useGetAllOperatorsQuery()
  // const models = serverApi.useGetAllModelsQuery()

  const fakeModelActions = ['A','B','C'];
  const fakeModel:Model[]=[
    {name:'M1'},
    {name:'M2'},
  ]
  const fakeOperator: Operator[] = [
    { barcode: "bbb", id: "5", name: "Jack" },
    { barcode: "bbddb", id: "6", name: "Robert" },
  ];

  // if (operator.isLoading || models.isLoading) {
  //   return <Spinner></Spinner>
  // }

  dispatch(operatorsListed(fakeOperator))
  dispatch(actionsListed(fakeModelActions))
  dispatch(modelsListed(fakeModel))
  
  return (
        <ActionInputs />
  );
};

export default App;
