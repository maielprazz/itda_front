import React, { useState, useEffect } from 'react';
// import MaterialTable from '@material-table/core';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@mui/styles';
import useAxios from '../utils/useAxios';
import Loading from './Loading.jsx';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';
// import { ExportCsv } from '@material-table/exporters';
// import { flexbox } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
  headerTable: {
    background: '#a6a6a6',
    color: '#ffffff',
  },
  tableOr: {
    tableLayout: 'auto !important',
    background: 'red',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
  },
}));

const Storemaster = () => {
  const [storelist, setStoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(200);
  const [progress, setProgress] = useState(0);
  const classes = useStyles();

  let api = useAxios();

  useEffect(() => {
    getListStore();
  }, []);

  let getListStore = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/storemaster/');
      setStoreList(response.data);
      setLoading(false);
      setStatus(200);
    } catch (err) {
      setStatus(err.response.status);
      setStoreList([]);
      setLoading(false);
      console.log('terjadi error:', err);
      console.log(err.response.status);
    }
  };

  const columns = [
    { name: 'COMPCODE', label: 'COMPCODE' },
    { name: 'SITECODE', label: 'SITECODE' },
    { name: 'STOREDESC', label: 'STOREDESC' },
    { name: 'MALLNAME', label: 'MALLNAME' },
    { name: 'TELP', label: 'TELP' },
    { name: 'EMAIL', label: 'EMAIL' },
    { name: 'CONCEPT', label: 'CONCEPT' },
    { name: 'GM_OM', label: 'GM_OM' },
    { name: 'GM_MAIL', label: 'GM_MAIL' },
    { name: 'RH_NAME', label: 'RH_NAME' },
    { name: 'RH_EMAIL', label: 'RH_EMAIL' },
    { name: 'RH_PHONE', label: 'RH_PHONE' },
    { name: 'AM_NAME', label: 'AM_NAME' },
    { name: 'AM_EMAIL', label: 'AM_EMAIL' },
    { name: 'AM_PHONE', label: 'AM_PHONE' },
    { name: 'SBU', label: 'SBU' },
    { name: 'CITY', label: 'CITY' },
    { name: 'PROVINCE', label: 'PROVINCE' },
    { name: 'REGIONAL', label: 'REGIONAL' },
    { name: 'STORETYPE', label: 'STORETYPE' },
    { name: 'SITEPROFILE', label: 'SITEPROFILE' },
    { name: 'CONNECTION_TYPE', label: 'CONNECTION_TYPE' },
    { name: 'STORESTATUS_SQL', label: 'STORESTATUS_SQL' },
    { name: 'STOREOPEN_DATE', label: 'STOREOPEN_DATE' },
    { name: 'STORECLOSE_DATE', label: 'STORECLOSE_DATE' },
    { name: 'FAILOVER_STATUS', label: 'FAILOVER_STATUS' },
    {
      name: 'JASPER_NUMBER_DEVICE',
      label: 'JASPER_NUMBER_DEVICE',
    },
    { name: 'JASPESR_DEVICE', label: 'JASPESR_DEVICE' },
    { name: 'JASPER_IPADDRESS', label: 'JASPER_IPADDRESS' },
    { name: 'JASPER_MSISDN', label: 'JASPER_MSISDN' },
    { name: 'JASPER_IMSI', label: 'JASPER_IMSI' },
    { name: 'ROOT_STATUS', label: 'ROOT_STATUS' },
    { name: 'IP_EXTERNAL', label: 'IP_EXTERNAL' },
    { name: 'IP_NETWORKDEVICE', label: 'IP_NETWORKDEVICE' },
    { name: 'DEVICE_NAME', label: 'DEVICE_NAME' },
    { name: 'SID', label: 'SID' },
    { name: 'ISP', label: 'ISP' },
    { name: 'Layanan', label: 'Layanan' },
    { name: 'Speed_MBPS', label: 'Speed_MBPS' },
    {
      name: 'ASOFDATE',
      label: 'ASOFDATE',
    },
  ];

  // const xoptions = {
  //   padding: 'dense',
  //   search: true,
  //   searchFieldAlignment: 'left',
  //   doubleHorizontalScroll: true,
  //   pageSize: 500,
  //   pageSizeOptions: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
  //   paginationType: 'stepped',
  //   searchAutoFocus: true,
  //   sorting: true,
  //   exportMenu: [
  //     {
  //       label: 'Download to CSV',
  //       exportFunc: (cols, datas) =>
  //         ExportCsv(cols, datas, 'List_Store_' + dayjs()),
  //     },
  //   ],
  // };
  const options = {
    search: true,
    sort: true,
    rowsPerPageOptions: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
    rowsPerPage: 500,
    downloadOptions: { filename: 'List_Store_' + dayjs(), separator: ',' },
    print: false,
    selectableRows: 'none',
    selectableRowsHeader: false,
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
      <h1 align="center">List Store</h1>
      {status === 200 ? (
        <MUIDataTable
          columns={columns}
          data={storelist}
          title="List Store"
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

export default Storemaster;
