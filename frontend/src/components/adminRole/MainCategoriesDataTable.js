import React from "react";
import { MDBDataTableV5 } from "mdbreact";

export default function MainCategoriesDataTable() {
  const student1 = {
    name: "Michael Bruce",
    age: "29",
    gender: "Male",
  };
  const student2 = {
    name: "Donna Snider",
    age: "27",
    gender: "Female",
  };
  let students = [];
  students.push(student1);
  students.push(student2);
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
      {
        label: "Gender",
        field: "gender",
        sort: "disabled",
        width: 150,
      },
      {
        label: "Gender",
        field: "gender",
        sort: "disabled",
        width: 150,
      },
    ],
    rows: students,
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
