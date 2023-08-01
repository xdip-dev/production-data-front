import Table from "react-bootstrap/Table";
import { DataTable } from "../../../application/production/domain/DataTable";



interface TableProps {
  data: DataTable;
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  return (
    <div>
      {!data ? <div>No recent data</div> 
      :
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Model</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={1}>
              <td>{data.model}</td>
              <td>{data.action}</td>
              <td>{data.status}</td>
            </tr>
        </tbody>
      </Table>
      
      }
    </div>
  );
};

export default TableComponent;
