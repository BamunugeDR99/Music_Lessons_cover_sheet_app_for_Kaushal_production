import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function UserManagement() {
  const [datatable, setDatatable] = React.useState({
    
    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Customer Login Status',
        field: 'status',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Added Date',
        field: 'added_date',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Updated Date',
        field: 'updated_date',
        sort: 'disabled',
        width: 150,
      },
    ],
    rows: [
      {
        name: 'Sonal Jayawardhana',
        status: 'true',
        email: 'Sonal@gmail.com',
        added_date: '11/11/2021',
        updated_date:'15/12/2021',
      },
      {
        name: 'Dulan Bamunuge',
        status: 'false',
        email: 'dulan@gmail.com',
        added_date: '11/11/2021',
        updated_date:'-',
      },
      {

        name: 'Kaveen Wijeesuriya',
        status: 'true',
        email: 'kaveen@gmail.com',
        added_date: '11/11/2021',
        updated_date:'15/12/2021',
        
      },
    ],
  });
//   updated date added date
// customer login state, updated date added date

  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />;
  
}