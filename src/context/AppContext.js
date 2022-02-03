import { createContext } from 'react';
export const AppContext = createContext({
  empty: true,
});

// export const AuthProvider = ({ children }) => {
//   let [authToken, setAuthToken] = useState(() =>
//     localStorage.getItem('ITDAacc')
//       ? JSON.parse(localStorage.getItem('ITDAacc'))
//       : null
//   );
//   let [user, setUser] = useState(() =>
//     localStorage.getItem('ITDAusr')
//       ? jwt_decode(localStorage.getItem('ITDAacc'))
//       : null
//   );
//   let [loading, setLoading] = useState(true);
//   let [expandOpen, setExpandOpen] = useState(true);

//   // const history = useHistory();

//   // let loginUser = async (e) => {
//   //   e.preventDefault();
//   //   let response = await fetch('http://127.0.0.1:8000/api/token/', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       username: e.target.username.value,
//   //       password: e.target.password.value,
//   //     }),
//   //   });
//   //   let data = await response.json();

//   //   if (response.status === 200) {
//   //     setAuthTokens(data);
//   //     setUser(jwt_decode(data.access));
//   //     localStorage.setItem('ITDAacc', JSON.stringify(data));
//   //     history.push('/');
//   //   } else {
//   //     alert('Something went wrong!');
//   //   }
//   // };

//   // let logoutUser = () => {
//   //   setAuthTokens(null);
//   //   setUser(null);
//   //   localStorage.removeItem('ITDAacc');
//   //   history.push('/login');
//   // };

//   let contextData = {
//     user,
//     setUser,
//     authToken,
//     setAuthToken,
//     loading,
//     setLoading,
//     expandOpen,
//     setExpandOpen,
//   };

//   useEffect(() => {
//     if (user) {
//       setLoading(false);
//     }
//   }, [user, loading]);

//   return (
//     <AuthContext.Provider value={contextData}>
//       {loading ? null : children}
//     </AuthContext.Provider>
//   );
// };
