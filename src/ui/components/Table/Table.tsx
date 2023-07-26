import Table from "react-bootstrap/Table";

export interface DataTable {
  model: string;
  action: string;
  status: string;
}

interface TableProps {
  data: DataTable[];
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Model</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.model}</td>
              <td>{item.action}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
