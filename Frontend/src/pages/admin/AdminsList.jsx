import { DataTable } from "./data-table"
import { Admincolumns } from "./columns"

const AdminsList = () => {

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "0Z0oJ@example.com",
      position: "Manager",
      departement: "HR",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "0Z0oJ@example.com",
      position: "Manager",
      departement: "HR",
    }]


  return (
    <div>
      <div className="mt-10 w-4/5 mx-auto">

      <DataTable columns={Admincolumns} data={data} />
      </div>
    </div>
  )
}

export default AdminsList
