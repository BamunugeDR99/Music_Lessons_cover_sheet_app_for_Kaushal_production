import React from "react";
import { MDBDataTableV5 } from "mdbreact";
// abc 
export default function DataTableTest() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Age",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "Gender",
        field: "gender",
        sort: "disabled",
        width: 150,
      },
    ],
    rows: [
      {
        name: "Michael Bruce",
        age: "29",
        gender: "Male",
      },
      {
        name: "Donna Snider",
        age: "27",
        gender: "Female",
      },
    ],
  });

  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}
      pagesAmount={4}
      data={datatable}
    />
  );
}
