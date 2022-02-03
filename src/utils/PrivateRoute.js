import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AppContext);
  console.log('user from PR', user);
  return <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>;
};
export default PrivateRoute;
