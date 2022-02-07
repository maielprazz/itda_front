import React, { useState, useEffect, useContext } from 'react';
import MaterialTable from '@material-table/core';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { AppContext } from '../context/AppContext';

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

function ServerList() {
  const context = useContext(AppContext);
  console.log(location.pathname);
  const {
    accToken,
    setAccToken,
    refToken,
    setRefToken,
    expandOpen,
    setExpandOpen,
    user,
    setUser,
  } = context;
  useEffect(() => {
    // setExpandOpen(false);
    console.log(expandOpen);
  }, [expandOpen]);

  const columns = [
    { title: 'Server_Status', field: 'Server_Status', sort: true },
    { title: 'Name', field: 'Name', sort: true },
    { title: 'Hostname', field: 'Hostname', sort: true },
    { title: 'IP', field: 'IP', sort: true },
    { title: 'Windows_Server', field: 'Windows_Server', sort: true },
    { title: 'CPU', field: 'CPU', sort: true },
    { title: 'Memory', field: 'Memory', sort: true },
    { title: 'SQL_Version', field: 'SQL_Version', sort: true },
    { title: 'Disc_Size', field: 'Disc_Size', sort: true },
    { title: 'Location', field: 'Location', sort: true },
  ];

  const listdata = [];
  // const [serverlist, setServerList] = useState(listdata);
  // const [loading, setLoading] = useState(true);

  const classes = useStyles();
  // const UserExportCSV = (props) => {
  //   const handleExport = () => {
  //     props.onExport();
  //   };
  //   return (
  //     <Button variant="contained" color="primary" onClick={handleExport}>
  //       Export to CSV
  //     </Button>
  //   );
  // };

  // const columns = [
  //   { dataField: 'Server_Status', text: 'Server Status', sort: true },
  //   { dataField: 'Name', text: 'Name', sort: true },
  //   { dataField: 'Hostname', text: 'Host', sort: true },
  //   { dataField: 'IP', text: 'IP', sort: true },
  //   { dataField: 'Windows_Server', text: 'Windows', sort: true },
  //   { dataField: 'CPU', text: 'CPU', sort: true },
  //   { dataField: 'Memory', text: 'Memory', sort: true },
  //   { dataField: 'SQL_Version', text: 'SQl Version', sort: true },
  //   { dataField: 'Disc_Size', text: 'Disc Size', sort: true },
  //   { dataField: 'Location', text: 'Location', sort: true },
  // ];

  // useEffect(() => {
  //   axios
  //     //  .get('http://localhost:8000/api/listserver/') test
  //     .get('api/listserver/')
  //     .then((res) => {
  //       setServerList(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div>
      <h1 align="center">Our maintained server</h1>
      <MaterialTable
        columns={columns}
        data={listdata}
        title="ITDA managed server"
      />
    </div>
  );
}

export default ServerList;
