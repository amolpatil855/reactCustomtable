/**
 * Data Table
 */
/* eslint-disable */
import React from "react";
import MUIDataTable from "mui-datatables";

// page title bar
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import DataGrid from "../../components/Datagrid/datagrid";
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
        { columnName: "Account", linkAction: this.columnAction },
        { columnName: "Doctor Id" },
        { columnName: "Email" },
        { columnName: "Telephone" },
        { columnName: "Sales Person" },
        { columnName: "Sales Territory" }
      ],
      Actions: [
        { actionName: "Add", callback: this.columnAction },
        { actionName: "Edit", callback: this.columnAction },
        { actionName: "Delete", callback: this.columnAction }
      ],
      rowData: [
        {
          Account: "Dr Adam",
          "Doctor Id": "Test 2",
          Email: "Adam@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo2",
          "Sales Territory": "South"
        },
        {
          Account: "Dr Green",
          "Doctor Id": "Test 3",
          Email: "Green@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo3",
          "Sales Territory": "Mid South"
        },
        {
          Account: "Dr Albert",
          "Doctor Id": "Test 4",
          Email: "Albert@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo4",
          "Sales Territory": "South East"
        },
        {
          Account: "Dr Alf",
          "Doctor Id": "Test 5",
          Email: "Alf@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo5",
          "Sales Territory": "Mid Atlantic"
        },
        {
          Account: "Dr Jakson",
          "Doctor Id": "Test 6",
          Email: "Jakson@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo6",
          "Sales Territory": "North"
        },
        {
          Account: "Dr Robart",
          "Doctor Id": "Test 7",
          Email: "Robart@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo7",
          "Sales Territory": "South East"
        },
        {
          Account: "Dr joe",
          "Doctor Id": "Test 8",
          Email: "joe@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo8",
          "Sales Territory": "North"
        },
        {
          Account: "Dr Smith",
          "Doctor Id": "Test 9",
          Email: "Smith@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo9",
          "Sales Territory": "South East"
        },
        {
          Account: "Dr Rag",
          "Doctor Id": "Test 10",
          Email: "Rag@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo10",
          "Sales Territory": "North"
        },
        {
          Account: "Dr Pointing",
          "Doctor Id": "Test 11",
          Email: "Pointing@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo11",
          "Sales Territory": "South East"
        },
        {
          Account: "Dr Clark",
          "Doctor Id": "Test 12",
          Email: "Clark@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo12",
          "Sales Territory": "North"
        },
        {
          Account: "Dr Max",
          "Doctor Id": "Test 1",
          Email: "Max@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo13",
          "Sales Territory": "Mid South"
        },
        {
          Account: "Dr Stive",
          "Doctor Id": "Test 1",
          Email: "Stive@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo14",
          "Sales Territory": "Mid South"
        },
        {
          Account: "Dr Rok",
          "Doctor Id": "Test 1",
          Email: "Rok@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo15",
          "Sales Territory": "North"
        },
        {
          Account: "Dr Leman",
          "Doctor Id": "Test 1",
          Email: "Leman@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo16",
          "Sales Territory": "Mid South"
        },
        {
          Account: "Dr Grag",
          "Doctor Id": "Test 1",
          Email: "Grag@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo17",
          "Sales Territory": "North"
        },
        {
          Account: "Dr Burd",
          "Doctor Id": "Test 1",
          Email: "Test@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo18",
          "Sales Territory": "North"
        },
        {
          Account: "Dr Beeker",
          "Doctor Id": "Test 1",
          Email: "Beeker@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo19",
          "Sales Territory": "North"
        },
        {
          Account: "Dr George",
          "Doctor Id": "Test 1",
          Email: "George@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo20",
          "Sales Territory": "North"
        },
        {
          Account: "Dr George",
          "Doctor Id": "Test 1",
          Email: "George@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo21",
          "Sales Territory": "North"
        },
        {
          Account: "Dr George",
          "Doctor Id": "Test 1",
          Email: "George@info.com",
          Telephone: "8527419630",
          "Sales Person": "Demo1",
          "Sales Territory": "North"
        }
      ]
    };
    //this.hideShowColumn = this.hideShowColumn.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.columnAction = this.columnAction.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   totalItemsCount: this.state.rowData.length,
    // });
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
    const data = [
      ["Dr Adam", "Test 2", "Adam@info.com", "8527419630", "Demo2", "South"],
      [
        "Dr George",
        "Test 1",
        "George@info.com",
        "8527419630",
        "Demo1",
        "North"
      ],
      [
        "Dr Green",
        "Test 3",
        "Green@info.com",
        "8527419630",
        "Demo3",
        "Mid South"
      ],
      [
        "Dr Albert",
        "Test 4",
        "Albert@info.com",
        "8527419630",
        "Demo4",
        "South East"
      ],
      [
        "Dr Alf",
        "Test 5",
        "Alf@info.com",
        "8527419630",
        "Demo5",
        "Mid Atlantic"
      ],
      [
        "Dr Jakson",
        "Test 6",
        "Jakson@info.com",
        "8527419630",
        "Demo6",
        "North"
      ],
      [
        "Dr Robart",
        "Test 7",
        "Robart@info.com",
        "8527419630",
        "Demo7",
        "South East"
      ],
      ["Dr joe", "Test 8", "joe@info.com", "8527419630", "Demo8", "North"],
      [
        "Dr Smith",
        "Test 9",
        "Smith@info.com",
        "8527419630",
        "Demo9",
        "South East"
      ],
      ["Dr Rag", "Test 10", "Rag@info.com", "8527419630", "Demo10", "North"],
      [
        "Dr Pointing",
        "Test 11",
        "Pointing@info.com",
        "8527419630",
        "Demo11",
        "South East"
      ],
      [
        "Dr Clark",
        "Test 12",
        "Clark@info.com",
        "8527419630",
        "Demo12",
        "North"
      ],
      ["Dr Max", "Test 1", "Max@info.com", "8527419630", "Demo13", "Mid South"],
      [
        "Dr Stive",
        "Test 1",
        "Stive@info.com",
        "8527419630",
        "Demo14",
        "Mid South"
      ],
      ["Dr Rok", "Test 1", "Rok@info.com", "8527419630", "Demo15", "North"],
      [
        "Dr Leman",
        "Test 1",
        "Leman@info.com",
        "8527419630",
        "Demo16",
        "Mid South"
      ],
      ["Dr Grag", "Test 1", "Grag@info.com", "8527419630", "Demo17", "North"],
      ["Dr Burd", "Test 1", "test@info.com", "8527419630", "Demo18", "North"],
      [
        "Dr Beeker",
        "Test 1",
        "Beeker@info.com",
        "8527419630",
        "Demo19",
        "North"
      ],
      [
        "Dr George",
        "Test 1",
        "George@info.com",
        "8527419630",
        "Demo20",
        "North"
      ],
      [
        "Dr George",
        "Test 1",
        "George@info.com",
        "8527419630",
        "Demo21",
        "North"
      ]
    ];

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

        <DataGrid
          items={this.state.rowData}
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
