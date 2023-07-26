import TableComponent, { DataTable } from "../Table/Table"

const TableProd:React.FC = () => {
    
      const data:DataTable[] = [
        { model:'Ma',action:'BR - friz',status:'terminat'},
      ];
    return (
    <div style={{padding:'1em'}}>
        <TableComponent data={data} />
    </div>

    )
}

export default TableProd