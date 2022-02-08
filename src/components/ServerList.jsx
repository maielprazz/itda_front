import React, { useState, useEffect } from 'react';
import Loading from './Loading.jsx';
import Alert from '@mui/material/Alert';
import useAxios from '../utils/useAxios';
import dayjs from 'dayjs';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@mui/styles';

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

const ServerList = () => {
  const [serverlist, setServerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(200);

  let api = useAxios();

  useEffect(() => {
    getListStore();
  }, []);

  let getListStore = async () => {
    try {
      setLoading(true);
      // console.log('fetching serverlist');
      const response = await api.get('/api/serverlist/');
      setServerList(response.data);
      setLoading(false);
      setStatus(200);
    } catch (err) {
      setStatus(err.response.status);
      setServerList([]);
      setLoading(false);
    }
  };

  const columns = [
    { name: 'Server_Status', label: 'Server_Status' },
    { name: 'Name', label: 'Name' },
    { name: 'Hostname', label: 'Hostname' },
    { name: 'IP', label: 'IP' },
    { name: 'Windows_Server', label: 'Windows_Server' },
    { name: 'CPU', label: 'CPU' },
    { name: 'Memory', label: 'Memory' },
    { name: 'SQL_Version', label: 'SQL_Version' },
    { name: 'Disc_Size', label: 'Disc_Size' },
    { name: 'Location', label: 'Location' },
  ];

  const options = {
    search: true,
    sort: true,
    rowsPerPageOptions: [10, 20],
    rowsPerPage: 10,
    downloadOptions: { filename: 'List_Server_' + dayjs(), separator: ',' },
    print: false,
    selectableRows: 'none',
    selectableRowsHeader: false,
    setRowProps: (data, dataindex, rowindex) => {
      return {
        className: rowindex % 2 == 0 ? { background: '#f5f5f5' } : null,
      };
    },
    setTableProps: () => {
      return {
        padding: 'default',
        // material ui v4 only
        size: 'small',
      };
    },
  };

  return (
    <div>
      {loading && <Loading />}
      <h1 align="center">List SQL Server</h1>
      {status === 200 ? (
        <MUIDataTable
          columns={columns}
          data={serverlist}
          title="List Server"
          options={options}
        />
      ) : (
        <Alert severity="error">
          {'Sorry, You Have No Authorized to see this data...'}
        </Alert>
      )}
    </div>
  );
};

export default ServerList;
