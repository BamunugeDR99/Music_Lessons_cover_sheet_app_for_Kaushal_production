import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Feedback',
        field: 'feedback',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Added Date',
        field: 'added_date',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Updated Date',
        field: 'updated_date',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },
    ],
    rows: [
      {
        name: 'Sonal Jayawardhana',
        feedback: 'GG',
        email: 'Sonal@gmail.com',
        added_date: '12/11/2021',
        updated_date: '18/11/2021',
      },
      {
        name: 'Dulan Bamunuge',
        feedback: 'good',
        email: 'Dulan@gmail.com',
        added_date: '15/11/2021',
        updated_date: '18/11/2021',
      },
      {
        name: 'Kaveen Wijeesuriya',
        feedback: 'lol',
        email: 'Kaveen@gmail.com',
        added_date: '17/11/2021',
        updated_date: '18/11/2021',
      },
      {
        name: 'Chamod Induranga',
        feedback: 'GG',
        email: 'chamod@gmail.com',
        added_date: '13/11/2021',
        updated_date: '18/11/2021',
      },
      {
        name: 'Tharindu Deshan',
        feedback: 'GG',
        email: 'tharindu@gmail.com',
        added_date: '12/11/2021',
        updated_date: '18/11/2021',
      }
    ]
  };

  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
  );
}

export default DatatablePage;