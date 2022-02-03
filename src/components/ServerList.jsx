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
    { title: 'Server Status', field: 'Server_Status' },
    { title: 'Name', field: 'name' },
    { title: 'Host', field: 'Hostname' },
    { title: 'IP', field: 'IP' },
    { title: 'OS', field: 'OS' },
    { title: 'CPU', field: 'CPU' },
    { title: 'Memory', field: 'Memory' },
    { title: 'SQL Version', field: 'SQL_Version' },
    { title: 'Disk Size', field: 'Disk_Size' },
    { title: 'Location', field: 'Location' },
  ];

  const listdata = [
    {
      Server_Status: 'Active',
      name: 'jkthomaasql',
      Hostname: 'jkthomaasql',
      IP: '12.34.56.66',
      OS: 'Windows',
      CPU: '2 Ghz',
      Memory: '512Gb',
      SQL_Version: 'SQL Server 2016',
      Disk_Size: '3T',
      Location: 'HO',
    },
    {
      Server_Status: 'Active',
      name: 'jkthomaasql02',
      Hostname: 'jkthomaasql02',
      IP: '12.34.56.66',
      OS: 'Windows',
      CPU: '2 Ghz',
      Memory: '512Gb',
      SQL_Version: 'SQL Server 2012',
      Disk_Size: '3T',
      Location: 'HO',
    },
    {
      Server_Status: 'Active',
      name: 'jkthomaasql03',
      Hostname: 'jkthomaasql03',
      IP: '12.34.56.66',
      OS: 'Windows',
      CPU: '2 Ghz',
      Memory: '512Gb',
      SQL_Version: 'SQL Server 2016',
      Disk_Size: '3T',
      Location: 'HO',
    },
    {
      Server_Status: 'Active',
      name: 'jkthomaasql',
      Hostname: 'jkthomaasql',
      IP: '12.34.56.66',
      OS: 'Windows',
      CPU: '2 Ghz',
      Memory: '512Gb',
      SQL_Version: 'SQL Server 2016',
      Disk_Size: '3T',
      Location: 'HO',
    },
    {
      Server_Status: 'Active',
      name: 'jkthomaasql',
      Hostname: 'jkthomaasql',
      IP: '12.34.56.66',
      OS: 'Windows',
      CPU: '2 Ghz',
      Memory: '512Gb',
      SQL_Version: 'SQL Server 2016',
      Disk_Size: '3T',
      Location: 'HO',
    },
  ];
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
