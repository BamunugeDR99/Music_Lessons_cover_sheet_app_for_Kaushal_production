import React, { useState } from "react";
import axios from "axios";
import MainCategoriesDataTable from "./MainCategoriesDataTable";
import SubCategoriesDataTable from "./SubCategoriesDataTable";

export default function ViewCategories(props) {
  return (
    <div style = {{overflow : "auto"}}>
      <div >
      <MainCategoriesDataTable />

      </div>
      <div>
      <SubCategoriesDataTable />

      </div>
    </div>
  );
}

// export default AddStudent;
