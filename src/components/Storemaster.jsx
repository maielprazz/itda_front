import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import axios from 'axios';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'; //{ CSVExport }
// import overlayFactory from 'react-bootstrap-table2-overlay';

const useStyles = makeStyles((theme) => ({
  headerTable: {
    background: '#a6a6a6',
    color: '#ffffff',
  },
  tableOr: {
    tableLayout: 'auto !important',
    background: 'red',
  },
}));

const { SearchBar } = Search;

function Storemaster() {
  const [storelist, setStoreList] = useState([]);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  const UserExportCSV = (props) => {
    const handleExport = () => {
      props.onExport();
    };
    return (
      <Button variant="contained" color="primary" onClick={handleExport}>
        Export to CSV
      </Button>
    );
  };

  const columns = [
    { dataField: 'ASOFDATE', text: 'ASOFDATE', sort: true },
    { dataField: 'COMPCODE', text: 'COMPCODE', sort: true },
    { dataField: 'SITECODE', text: 'SITECODE', sort: true },
    { dataField: 'STOREDESC', text: 'STOREDESC', sort: true },
    { dataField: 'MALLNAME', text: 'MALLNAME', sort: true },
    { dataField: 'TELP', text: 'TELP', sort: true },
    { dataField: 'EMAIL', text: 'EMAIL', sort: true },
    { dataField: 'CONCEPT', text: 'CONCEPT', sort: true },
    { dataField: 'PROVINCE', text: 'PROVINCE', sort: true },
    { dataField: 'REGION', text: 'REGION', sort: true },
    { dataField: 'GM_OM', text: 'GM_OM', sort: true },
    { dataField: 'GM_MAIL', text: 'GM_MAIL', sort: true },
    { dataField: 'OM_NAME', text: 'OM_NAME', sort: true },
    { dataField: 'OM_MAIL', text: 'OM_MAIL', sort: true },
    { dataField: 'OM_PHONE', text: 'OM_PHONE', sort: true },
    { dataField: 'OIC_NAME', text: 'OIC_NAME', sort: true },
    { dataField: 'OIC_MAIL', text: 'OIC_MAIL', sort: true },
    { dataField: 'OIC_PHONE', text: 'OIC_PHONE', sort: true },
    { dataField: 'SBU', text: 'SBU', sort: true },
    { dataField: 'STORETYPE', text: 'STORETYPE', sort: true },
    { dataField: 'SITEPROFILE', text: 'SITEPROFILE', sort: true },
    { dataField: 'CONNECTION_TYPE', text: 'CONNECTION_TYPE', sort: true },
    { dataField: 'STORESTATUS_SQL', text: 'STORESTATUS_SQL', sort: true },
    { dataField: 'STOREOPEN_DATE', text: 'STOREOPEN_DATE', sort: true },
    { dataField: 'STORECLOSE_DATE', text: 'STORECLOSE_DATE', sort: true },
    { dataField: 'FAILOVER_STATUS', text: 'FAILOVER_STATUS', sort: true },
    {
      dataField: 'JASPER_NUMBER_DEVICE',
      text: 'JASPER_NUMBER_DEVICE',
      sort: true,
    },
    { dataField: 'JASPESR_DEVICE', text: 'JASPESR_DEVICE', sort: true },
    { dataField: 'JASPER_IPADDRESS', text: 'JASPER_IPADDRESS', sort: true },
    { dataField: 'JASPER_MSISDN', text: 'JASPER_MSISDN', sort: true },
    { dataField: 'JASPER_IMSI', text: 'JASPER_IMSI', sort: true },
    { dataField: 'ROOT_STATUS', text: 'ROOT_STATUS', sort: true },
    { dataField: 'IP_EXTERNAL', text: 'IP_EXTERNAL', sort: true },
    { dataField: 'IP_MIKROTIK', text: 'IP_MIKROTIK', sort: true },
    { dataField: 'IP_GATEWAY', text: 'IP_GATEWAY', sort: true },
    { dataField: 'IP_FORTIGATE', text: 'IP_FORTIGATE', sort: true },
  ];

  // [

  //   {
  //     dataField: 'id',
  //     text: 'id',
  //     headerStyle: { width: '40px' },
  //   },
  //   { dataField: 'name', text: 'Name', sort: true, filter: textFilter() },
  //   { dataField: 'username', text: 'Username', sort: true },
  //   { dataField: 'email', text: 'Email', sort: true },
  // ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 30,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    // onPageChange: function (page, sizePerPage) {
    //   // console.log('page', page);
    //   // console.log('sizePerPage', sizePerPage);
    // },
  });

  useEffect(() => {
    axios
      //.get('http://localhost:8000/api/storemaster/')
      .get('api/storemaster/')
      .then((res) => {
        setStoreList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <ToolkitProvider
        bootstrap4
        keyField="SITECODE"
        data={storelist}
        columns={columns}
        exportCSV
        search
      >
        {(props) => (
          <React.Fragment>
            <UserExportCSV {...props.csvProps} />
            <br />
            <br />
            <SearchBar {...props.searchProps} style={{ width: '200%' }} />
            <BootstrapTable
              wrapperClasses="table-responsive"
              rowClasses="text-nowrap"
              striped
              hover
              condensed
              headerWrapperClasses={classes.headerTable}
              loading={loading}
              noDataIndication={
                loading ? (
                  <strong>Loading...</strong>
                ) : (
                  <strong>Data is empty alias kosooong gan...</strong>
                )
              }
              overlay={overlayFactory({
                spinner: true,
                styles: {
                  overlay: (base) => ({
                    ...base,
                    background: 'rgba(148,216, 246, 0.5)',
                  }),
                },
              })}
              // bootstrap4
              keyField="STORECODE"
              // columns={columns}
              // data={userlist}
              pagination={pagination}
              filter={filterFactory()}
              {...props.baseProps}
            />
          </React.Fragment>
        )}
      </ToolkitProvider>
    </div>
  );
}

export default Storemaster;
