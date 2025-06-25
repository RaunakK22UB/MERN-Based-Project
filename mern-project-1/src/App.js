// src/App.js
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import AppLayout from "./layout/AppLayout";
import Logout from "./pages/Logout";  
import Error from "./pages/Error";  
import Dashboard from "./pages/Dashboard";
import Register from "./Register";
import axios from "axios";
import { serverEndpoint } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "./redux/user/actions";

function App() {


  // to iuse redux we will remove this userdetails
  // const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state)=>state.userDetails);
// this is example of lifting state up  ............... we dont need this more we will use redux dispatcher
  // const updateUserDetails = (updatedUserDetails) => {
  //   setUserDetails(updatedUserDetails);
  // };


  //   const isUserLoggedIn = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5001/auth/is-user-logged-in",
//         {},
//         { withCredentials: true }
//       );
//       updateUserDetails(response.data.user);
//     } catch (error) {
//       console.log(error);
//     }
//   };
  const isUserLoggedIn = async ()=>{
    try{
    const response = await axios.post(`${serverEndpoint}/auth/isUserLoggedIn`, {}, {
      withCredentials: true // this is important to send cookies with the request
     
  });
  // updateUserDetails(response.data.user);  .................did not need more use dispatch of redux
   dispatch({
        type: SET_USER,
        payload:response.data.user
   });
 }catch(e){
  console.log(e);
}
  };
  
   useEffect(() => {
    isUserLoggedIn();
  }, []);
 
  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Home />
            </AppLayout>
          )
        }
      />

      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              {/* <Login updateUserDetails={updateUserDetails} /> */}
               <Login  />
            </AppLayout>
          )
        }
      />

     <Route
        path="/dashboard"
        element={
          userDetails ? (
            // <Dashboard updateUserDetails={updateUserDetails} />
             <Dashboard  />
          ) : (
            <Navigate to="/login" />
          )
        }
      />


      <Route
        path="/logout"
        element={
          userDetails ? (
            // <Logout updateUserDetails={updateUserDetails} />
            <Logout />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

    <Route
        path="/error"
        element={
          userDetails ? (
            <Error />
          ) : (
            <AppLayout>
              <Error />
            </AppLayout>
          )
        }
      />

      <Route
      path="/register"
      element={
      userDetails ? (
      <Navigate to="/dashboard" />
    ) : (
      <AppLayout>
        <Register />
      </AppLayout>
    )
  }
/>

   

     
    </Routes>
  );
}

export default App;


// // src/App.js
// import { Route, Routes, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Home from "./Home";
// import Login from "./Login";
// import AppLayout from "./layout/AppLayout";
// import Dashboard from "./pages/Dashboard";
// import Logout from "./pages/Logout";  
// import Error from "./pages/Error";      
// import axios from "axios";

// function App() {
//   const [userDetails, setUserDetails] = useState(null);

//   // Function to update user details in state
//   const updateUserDetails = (updatedUserDetails) => {
//     setUserDetails(updatedUserDetails);
//   };

//   // Check if user is logged in (called on mount)
//   const isUserLoggedIn = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5001/auth/is-user-logged-in",
//         {},
//         { withCredentials: true }
//       );
//       updateUserDetails(response.data.user);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     isUserLoggedIn();
//   }, []);

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           userDetails ? (
//             <Navigate to="/dashboard" />
//           ) : (
//             <AppLayout>
//               <Home />
//             </AppLayout>
//           )
//         }
//       />

//       <Route
//         path="/login"
//         element={
//           userDetails ? (
//             <Navigate to="/dashboard" />
//           ) : (
//             <AppLayout>
//               <Login updateUserDetails={updateUserDetails} />
//             </AppLayout>
//           )
//         }
//       />

//       <Route
//         path="/dashboard"
//         element={
//           userDetails ? (
//             <Dashboard updateUserDetails={updateUserDetails} />
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />

//       <Route
//         path="/logout"
//         element={
//           userDetails ? (
//             <Logout updateUserDetails={updateUserDetails} />
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />

//       <Route
//         path="/error"
//         element={
//           userDetails ? (
//             <Error />
//           ) : (
//             <AppLayout>
//               <Error />
//             </AppLayout>
//           )
//         }
//       />
//     </Routes>
//   );
// }

// export default App;


//change 1:-  <Route path="/dashboard" element={<Dashboard />} />
// {/* <Route path="/dashboard" element={<Dashboard updateUserDetails={updateUserDetails} />} /> */}



// learned about hard refresh and lifting state up