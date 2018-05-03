/**
 * Data Table
 */
/* eslint-disable */
import React from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
// page title bar
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import DataGrid from "../../components/Datagrid/datagrid";
import {
  AsynCustomTable,
  AsyncDataTable
} from "../../components/AsyncComponent/AsyncComponent";

import DataGridUtil from "../../components/Datagrid/tableToXls/datagrid.util";
import FormatService from "../../components/Datagrid/tableToXls/format.service";
// // rct card box
// import RctCollapsibleCard from "../../../components/RctCollapsibleCard/RctCollapsibleCard";
// intl messages
import IntlMessages from "../../util/IntlMessages";
// import Pagination from "react-js-pagination";

class DataTable extends React.Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
      totalItemsCount: 0,
      itemsCountPerPage: 10,
      columns: [
        {
          columnName: "DoctorID",
          linkAction: this.columnAction,
          variable: "DoctorID",
          filter: "text"
        },
        {
          columnName: "ItemDescription",
          variable: "ItemDescription",
          filter: "text"
        },
        {
          columnName: "DoctorName",
          variable: "DoctorName",
          filter: "text"
        },
        {
          columnName: "Standard",
          variable: "Standard",
          filter: "text"
        },
        {
          columnName: "RemakeAmount",
          variable: "RemakeAmount",
          filter: "text"
        },
        {
          columnName: "RemakeUnits",
          variable: "RemakeUnits",
          filter: "text"
        }
      ],
      Actions: [
        { actionName: "Add", callback: this.columnAction },
        { actionName: "Edit", callback: this.columnAction },
        { actionName: "Delete", callback: this.columnAction }
      ],
      rowData: [],
      isLoading: true
    };
    //this.hideShowColumn = this.hideShowColumn.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.columnAction = this.columnAction.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   totalItemsCount: this.state.rowData.length,
    // });
    axios
      .get(
        `https://labtracdataconnector.servicebus.windows.net/DataConnector/4550ca84c83f44f99c968a357ab1c290/getdata?params=%7b%22method%22%3a%7b%22name%22%3a%22SalesData%22%2c%22startDate%22%3a%2212%2f1%2f2017%22%2c%22endDate%22%3a%2212%2f31%2f2017%22%7d%7d`,
        { crossdomain: true }
      )
      .then(response => {
        // dispatch({ type: GET_FEEDBACKS_SUCCESS, payload: response.data });
        this.setState({ rowData: response.data, isLoading: false });
        //this.exporttoCSV(response.data, this.state.columns, "test");
      })
      .catch(error => {
        // error handling
      });
  }

  exporttoCSV(data, columns, categoryName) {
    var _dataGridUtil = new DataGridUtil();
    let exprtcsv = [];
    let _tempList = data;
    let exportFileName = "MasterPriceListReportFor" + categoryName + "_";
    JSON.parse(JSON.stringify(_tempList)).forEach(x => {
      var obj = new Object();
      var frmt = new FormatService();
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].variable.indexOf(".") > -1) {
          let transfrmVal = frmt.transform(
            x[columns[i].variable.split(".")[0]][
              columns[i].variable.split(".")[1]
            ],
            columns[i].filter
          );
          obj[columns[i].columnName] = transfrmVal;
        } else {
          let transfrmVal = frmt.transform(
            x[columns[i].variable],
            columns[i].filter
          );
          obj[columns[i].columnName] = transfrmVal;
        }
      }
      exprtcsv.push(obj);
    });
    _dataGridUtil.downloadcsv(exprtcsv, exportFileName);
  }
  columnAction(columnName, data) {
    console.log(columnName);
    console.log(data);
  }

  // hideShowColumn() {
  //   this.setState({
  //     columns: [
  //       "Doctor Id",
  //       "Email",
  //       "Telephone",
  //       "Sales Person",
  //       "Sales Territory"
  //     ]
  //   });
  // }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    console.log(this.state.rowData);
    const options = {
      filterType: "multiselect",
      responsive: "stacked",
      print: false,
      selectableRows: false
    };
    return (
      <div className="data-table-wrapper">
        <PageTitleBar
          title={<IntlMessages id="sidebar.dataTable" />}
          match={this.props.match}
        />
        {/* <div className="alert alert-info">
          <p>MUI-Datatables is a data tables component built on Material-UI V1.
            It comes with features like filtering, view/hide columns, search, export to CSV download, printing, pagination, and sorting.
            On top of the ability to customize styling on most views, there are two responsive modes "stacked" and "scroll" for mobile/tablet
            devices. If you want more customize option please <a href="https://github.com/gregnb/mui-datatables" className="btn btn-danger btn-small mx-10">Click </a> here</p>
        </div> */}
        {/* <RctCollapsibleCard fullBlock> */}
        {/* <MUIDataTable title={"Doctor list"} data={data} columns={columns} options={options} /> */}

        <AsynCustomTable
          items={this.state.rowData}
          isLoading={this.state.isLoading}
          columns={this.state.columns}
          Actions={this.state.Actions}
          pageSize={5}
        />
        {/* </RctCollapsibleCard> */}
      </div>
    );
  }
}

export default DataTable;
