/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "../RctPageLoader/RctPageLoader";

// dashboard
const AsyncDashboardComponent = Loadable({
  loader: () => import("../../routes/dashboard/dashboard-v1"),
  loading: () => <RctPageLoader />
});

const AsyncDataTable = Loadable({
  loader: () => import("../../routes/data-table"),
  loading: () => <RctPageLoader />
});
const AsynCustomTable = Loadable({
  loader: () => import("../Datagrid/datagrid"),
  loading: () => <RctPageLoader />
});
export { AsyncDashboardComponent, AsyncDataTable, AsynCustomTable };
