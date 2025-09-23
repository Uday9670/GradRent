import { useEffect } from 'react'
import './App.css'
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import {auth} from "./firebase";
import { useStateValue} from "./StateProvider";
import CollegeA from './CollegeA';
import CollegeB from './CollegeB';
import CollegeC from './CollegeC';
import PropertyDetails from './PropertyDetails';
import ViewAll from './ViewAll';
import AddFlat from "./AddFlat";
import ListWithUs from "./ListWithUs";

function App() {

    const [{},dispatch]=useStateValue();
  
  // how do we actually keep track of who is signed in
// we do this by creating a listener
// by this we quickly show thathow we add something to the db and pulling to the db
  useEffect(()=>{
    // will onlu run once when the component loads..
      auth.onAuthStateChanged(authUser =>{
        console.log('The User is >>>',authUser);
  
        if(authUser){
          // the user just logged in 
          // if u are logged in just dispatch  user information into data layer
          dispatch({
            type:'SET_USER',
            user:authUser 
          })
        }else {
          // the user is logged out
          // if you logout basically redicate the user information
          dispatch({
            type:'SET_USER',
            user:null
          })
        }
      })
  },[])

   return (
    <Router>
    
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
            <Route
  path="/collegeA"
  element={
    <>
      <Header />
      <CollegeA />
    </>
  }
/>
<Route
  path="/addflat"
  element={
    <>
      <Header />
      <AddFlat />
    </>
  }
/>
        <Route
  path="/collegeB"
  element={
    <>
      <Header />
      <CollegeB />
    </>
  }
/>
<Route
  path="/ViewAll"
  element={
    <>
      <Header />
      <ViewAll />
    </>
  }
/>
        <Route
  path="/collegeC"
  element={
    <>
      <Header />
      <CollegeC/>
    </>
  }
/>
          <Route
            path="/login"
            element={
              <>
                <Login />
                
                <p>i am login page</p>
              </>
            }
          />
           <Route
            path="/ListWithUs"
            element={
              <>
                <Header />
                <ListWithUs />
              </>
            }
          />

    <Route
  path="/property-details/:propertyId"
  element={
    <>
      <Header />
      <PropertyDetails />
    </>
  }
/>
        </Routes>
      </div>
    
    </Router>

  )
}

export default App