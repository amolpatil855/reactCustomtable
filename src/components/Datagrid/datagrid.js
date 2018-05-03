import React from "react";
import Pagination from "./Pagination";
import GridAction from "./GridAction";
import GridFilterDropdown from "./GridFilterDropdown";
import RctPageLoader from "../RctPageLoader/RctPageLoader";
var _ = require("lodash");

class DataGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      pager: {},
      rowData: [],
      filteredData: [],
      selectedColumn: [],
      checkedFilteredDataValue: [],
      dataForColumnFilter: [],
      searchTextColumn: [],
      searchColVal: "",
      sortOrder: "asc",
      sortColumn: ""
    };
    this.hideShowColumn = this.hideShowColumn.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onSortClick = this.onSortClick.bind(this);
    this.sortData = this.sortData.bind(this);
    this.filterAllDataAsPerColumnCheck = this.filterAllDataAsPerColumnCheck.bind(
      this
    );
    this.filterAllDataAsPerTextChange = this.filterAllDataAsPerTextChange.bind(
      this
    );
    this.checkForSearchString = this.checkForSearchString.bind(this);
    this.mobileTableFilter = this.mobileTableFilter.bind(this);
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setRecordsPerPage(this.props.initialPage);
    }
  }

  setRecordsPerPage(page, data) {
    var pageOfItems = [];
    var { pageSize } = this.props;
    var pager = this.state.pager;
    data = data || this.state.filteredData;
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(data.length, page, pageSize);

    // get new page of items from items array
    pageOfItems = _.cloneDeep(data).slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.onChangePage(pageOfItems);
    return pageOfItems;
  }

  // update state with new page of items
  onChangePage(pageOfItems) {
    this.setState({ rowData: pageOfItems });
  }

  onSortClick(colObj, sortOrder, _allData) {
    let _setOrder = sortOrder
      ? sortOrder
      : this.state.sortOrder == "asc"
        ? "desc"
        : "asc";
    let _sortedData = this.sortData(colObj, sortOrder, _allData);
    this.setState({
      filteredData: _sortedData,
      sortColumn: colObj.columnName,
      sortOrder: _setOrder
    });
    //return _sortedData;
    return this.setRecordsPerPage(this.props.initialPage, _sortedData);
  }

  sortData(colObj, sortOrder, _allData) {
    let _setOrder = sortOrder
      ? sortOrder
      : this.state.sortOrder == "asc"
        ? "desc"
        : "asc";
    let _sortedData = _.orderBy(
      _.cloneDeep(_allData || this.state.filteredData),
      colObj.columnName,
      _setOrder
    );
    return _sortedData;
  }

  getPager(totalItems, currentPage, pageSize) {
    var { pageSize } = this.props;
    var startPage, endPage, totalPages, startIndex, endIndex;

    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    startIndex = (currentPage - 1) * pageSize;
    endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex
      // pages: pages
    };
  }

  componentDidMount() {
    let _isMobileView = this.checkDevice();
    console.log("dataGrid=" + this.props.items);
    this.setState({
      // totalItemsCount: this.state.rowData.length,
      filteredData: _.cloneDeep(this.props.items),
      selectedColumn: _.cloneDeep(this.props.columns),
      dataForColumnFilter: _.cloneDeep(this.props.items),
      isMobileView: _isMobileView,
      isLoading: this.props.isLoading
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items) {
      this.setState({
        // totalItemsCount: this.state.rowData.length,
        isLoading: nextProps.isLoading,
        filteredData: _.cloneDeep(nextProps.items),
        selectedColumn: _.cloneDeep(nextProps.columns),
        dataForColumnFilter: _.cloneDeep(nextProps.items)
      });
    }
  }

  checkDevice() {
    var check = false;
    (function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }
  hideShowColumn(_columnName) {
    var _selectedColumn = [];
    let colIndex = _.findIndex(this.state.selectedColumn, {
      columnName: _columnName
    });
    if (colIndex >= 0) {
      this.setState({
        selectedColumn: _.remove(this.state.selectedColumn, function(colObj) {
          return colObj.columnName != _columnName;
        })
      });
    } else {
      let _findCol = _.find(this.props.columns, { columnName: _columnName });
      this.state.selectedColumn.push(_.cloneDeep(_findCol));
      _selectedColumn = this.state.selectedColumn;
      this.setState({
        selectedColumn: _.remove(_.cloneDeep(this.props.columns), function() {
          return _.findIndex(_selectedColumn, { columnName: _columnName }) >= 0;
        })
      });
    }

    // let tempcolumns = _.remove(this.props.columns, function(colName) {
    //   return colName != columnName;
    // });
    // this.setState({
    //   columns: tempcolumns
    // });
  }

  filterAllDataAsPerColumnCheck(columnName, value) {
    var allData = [];
    var pagingData = [];
    var _checkedFilteredDataValue = _.cloneDeep(
      this.state.checkedFilteredDataValue
    );
    //let _allColumn = this.props.columns;
    let isColExist = _.find(_checkedFilteredDataValue, { key: columnName });
    if (isColExist) {
      let _isValExist = _.indexOf(isColExist.val, value);
      if (_isValExist >= 0) {
        isColExist.val = _.remove(_.cloneDeep(isColExist.val), function(val) {
          return val != value;
        });
      } else isColExist.val.push(value);

      if (isColExist.val.length == 0) {
        _checkedFilteredDataValue = _.remove(
          _.cloneDeep(_checkedFilteredDataValue),
          function(chkColobj) {
            return columnName != chkColobj.key;
          }
        );
      }
    } else {
      isColExist = {
        key: columnName,
        val: [value]
      };
      _checkedFilteredDataValue.push(isColExist);
    }

    if (
      _checkedFilteredDataValue.length > 0 &&
      this.state.searchTextColumn.length === 0
    ) {
      _.forEach(_.cloneDeep(this.props.items), function(obj) {
        let matchFind = true;
        // _.forEach(_.cloneDeep(_allColumn), function(colName) {
        _.forEach(_.cloneDeep(_checkedFilteredDataValue), function(chkCol) {
          let _isItemFound = _.indexOf(chkCol.val, obj[chkCol.key]);
          if (_isItemFound < 0) {
            matchFind = false;
          }
          // });
        });
        if (matchFind) {
          allData.push(obj);
        }
      });
      allData = this.sortData(
        { columnName: this.state.sortColumn },
        this.state.sortOrder,
        allData
      );
      pagingData = _.cloneDeep(allData);
    } else if (this.state.searchTextColumn.length > 0) {
      let data = this.checkForSearchString(columnName, null);
      _.forEach(_.cloneDeep(data), function(obj) {
        let matchFind = true;
        _.forEach(_.cloneDeep(_checkedFilteredDataValue), function(chkCol) {
          let _isItemFound = _.indexOf(chkCol.val, obj[chkCol.key]);
          if (_isItemFound < 0) {
            matchFind = false;
          }
        });
        if (matchFind) {
          allData.push(obj);
        }
      });
      pagingData = _.cloneDeep(allData);
    } else {
      allData = _.cloneDeep(this.props.items);
      allData = this.sortData(
        { columnName: this.state.sortColumn },
        this.state.sortOrder,
        allData
      );
      pagingData = _.cloneDeep(allData);
    }
    this.setState({
      rowData: allData,
      filteredData: pagingData,
      checkedFilteredDataValue: _checkedFilteredDataValue
    });
  }

  filterAllDataAsPerTextChange(columnName, value) {
    var allData = [];
    var _searchTextColumn = _.cloneDeep(this.state.searchTextColumn);
    allData = this.checkForSearchString(columnName, value);
    this.setState({
      rowData: allData,
      filteredData: allData,
      dataForColumnFilter: allData,
      searchTextColumn: _searchTextColumn,
      checkedFilteredDataValue: []
    });
    //this.refs.child.updateListItem(allData, columnName);
    return this.onSortClick(
      { columnName: columnName },
      this.state.sortOrder,
      allData
    );
  }

  checkForSearchString(columnName, value) {
    var allData = [];
    var _searchTextColumn = _.cloneDeep(this.state.searchTextColumn);
    //let _allColumn = this.props.columns;
    let isColExist = _.find(_searchTextColumn, { key: columnName });
    if (value) {
      if (isColExist && value.target.value) {
        isColExist.val = value.target.value;
      } else if (value.target.value) {
        isColExist = {
          key: columnName,
          val: value.target.value
        };
        _searchTextColumn.push(isColExist);
      } else {
        _searchTextColumn = _.remove(_searchTextColumn, function(val) {
          return val.key != columnName;
        });
      }
    }
    if (_searchTextColumn.length > 0) {
      _.forEach(_.cloneDeep(this.props.items), function(obj) {
        let matchFind = true;
        _.forEach(_.cloneDeep(_searchTextColumn), function(chkCol) {
          let _isItemFound = _.includes(obj[chkCol.key], chkCol.val);
          if (!_isItemFound) {
            matchFind = false;
          }
        });
        if (matchFind) {
          allData.push(obj);
        }
      });
    } else {
      allData = _.cloneDeep(this.props.items);
    }
    return allData;
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  mobileTableFilter() {
    return (
      <div className="row">
        {this.state.selectedColumn.map((item, index) => {
          return (
            <div key={"header" + index} className="col-sm-6">
              <input
                value={item.columnName}
                type="button"
                onClick={() => this.onSortClick(item)}
              />
              {this.state.sortColumn === item.columnName ? (
                this.state.sortOrder === "desc" ? (
                  <i className="fa fa-sort-desc" aria-hidden="true" />
                ) : (
                  <i className="fa fa-sort-asc" aria-hidden="true" />
                )
              ) : (
                ""
              )}
              <GridFilterDropdown
                columnName={item.columnName}
                data={this.state.dataForColumnFilter}
                columns={[]}
                onColumnCheck={this.filterAllDataAsPerColumnCheck}
                onSerachTextChange={this.filterAllDataAsPerTextChange}
                checkedFilteredDataValue={
                  _.find(this.state.checkedFilteredDataValue, {
                    key: item.columnName
                  })
                    ? _.find(this.state.checkedFilteredDataValue, {
                        key: item.columnName
                      }).val
                    : []
                }
              />
            </div>
          );
        })}
      </div>
    );
  }

  renderAsPerDevice() {
    if (this.state.isLoading) {
      return <RctPageLoader />;
    }
    if (this.state.isMobileView) {
      return (
        <div>
          {this.mobileTableFilter()}
          <table className="table">
            <thead>
              {/* <tr>
              {this.state.selectedColumn.map((item, index) => {
                return (
                  <th key={"header" + index}>
                    <input
                      value={item.columnName}
                      type="button"
                      onClick={() => this.onSortClick(item)}
                    />
                    {this.state.sortColumn === item.columnName ? (
                      this.state.sortOrder === "desc" ? (
                        <i className="fa fa-sort-desc" aria-hidden="true" />
                      ) : (
                        <i className="fa fa-sort-asc" aria-hidden="true" />
                      )
                    ) : (
                      ""
                    )}
                    <GridFilterDropdown
                      columnName={item.columnName}
                      data={this.state.dataForColumnFilter}
                      columns={[]}
                      onColumnCheck={this.filterAllDataAsPerColumnCheck}
                      onSerachTextChange={this.filterAllDataAsPerTextChange}
                      checkedFilteredDataValue={
                        _.find(this.state.checkedFilteredDataValue, {
                          key: item.columnName
                        })
                          ? _.find(this.state.checkedFilteredDataValue, {
                              key: item.columnName
                            }).val
                          : []
                      }
                    />
                  </th>
                );
              })}
            </tr> */}
            </thead>
            {this.state.rowData.map((itemData, index) => {
              return (
                <tbody>
                  {this.state.selectedColumn.map((item, tdIndex) => {
                    return (
                      <tr key={"mobTr" + +tdIndex + index}>
                        <td key={"mobCol" + tdIndex + index}>
                          <b>{item.columnName}:</b>
                        </td>
                        <td
                          colSpan={this.state.selectedColumn.length - 2}
                          key={"mobData" + tdIndex}
                          onClick={
                            item.linkAction
                              ? () => item.linkAction(item.columnName, itemData)
                              : null
                          }
                        >
                          {itemData[item.columnName]}
                          {tdIndex == 0 ? (
                            <GridAction
                              Actions={this.props.Actions}
                              data={itemData}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
        </div>
      );
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              {this.state.selectedColumn.map((item, index) => {
                return (
                  <th key={"data" + index}>
                    <input
                      value={item.columnName}
                      type="button"
                      onClick={() => this.onSortClick(item)}
                    />
                    {this.state.sortColumn === item.columnName ? (
                      this.state.sortOrder === "desc" ? (
                        <i className="fa fa-sort-desc" aria-hidden="true" />
                      ) : (
                        <i className="fa fa-sort-asc" aria-hidden="true" />
                      )
                    ) : (
                      ""
                    )}
                    <GridFilterDropdown
                      columnName={item.columnName}
                      data={this.state.dataForColumnFilter}
                      columns={[]}
                      onColumnCheck={this.filterAllDataAsPerColumnCheck}
                      onSerachTextChange={this.filterAllDataAsPerTextChange}
                      checkedFilteredDataValue={
                        _.find(this.state.checkedFilteredDataValue, {
                          key: item.columnName
                        })
                          ? _.find(this.state.checkedFilteredDataValue, {
                              key: item.columnName
                            }).val
                          : []
                      }
                    />
                  </th>
                );
              })}
              {this.props.Actions.map(function(action, tdIndex) {
                if (tdIndex == 0) return <th>Action</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.rowData.map((itemData, index) => {
              return (
                <tr key={"data" + index}>
                  {this.state.selectedColumn.map(function(item, tdIndex) {
                    return (
                      <td
                        key={tdIndex}
                        onClick={
                          item.linkAction
                            ? () => item.linkAction(item.columnName, itemData)
                            : null
                        }
                      >
                        {itemData[item.columnName]}
                      </td>
                    );
                  })}
                  <td key={"action" + index}>
                    {this.props.Actions.map(function(action, tdIndex) {
                      return (
                        <input
                          value={action.actionName}
                          type="button"
                          onClick={() => action.callback(itemData)}
                        />
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }

  render() {
    console.log("render dataGrid=" + this.state.filteredData);
    return (
      <div className="data-table-wrapper">
        <GridFilterDropdown
          columns={this.props.columns}
          onHideShowColumn={this.hideShowColumn}
          selectedColumn={this.state.selectedColumn}
        />
        {this.renderAsPerDevice()}
        <Pagination
          items={this.state.filteredData}
          onChangePage={this.onChangePage}
          pageSize={this.props.pageSize}
        />
        <div />
        {/* </RctCollapsibleCard> */}
      </div>
    );
  }
}

export default DataGrid;
