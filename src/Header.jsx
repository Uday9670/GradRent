import React,{useState} from "react";
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'; 
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'; 
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';


function Header() {

  const colleges = [
  { name: 'ABESEC', path: '/collegeA' },
  { name: 'AKGEC', path: '/collegeB' },
  { name: 'ABESIT', path: '/collegeC' },
  // Add other colleges here
];

const [selectedCollege, setSelectedCollege] = useState('');
const navigate = useNavigate();

function handleChange(e) {
  const path = e.target.value;
  setSelectedCollege(path);
  if (path) {
    navigate(path);
  }
}
   
   const [{ basket,user}] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
    

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
        // src="GradRent.png"
          alt="GradRent"
        />
      </Link>

      <div className="header_search">
  <select 
     className="header_searchInput" 
     value={selectedCollege} 
     onChange={handleChange}
  >
    <option value="">Select a college</option>
    {colleges.map(college => (
      <option key={college.path} value={college.path}>
        {college.name}
      </option>
    ))}
  </select>
  {/* <SearchIcon className="header_searchIcon" /> */}
</div>

      <div className="header_nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLineOne">
              Hello
            </span>
            <span className="header_optionLineTwo">
              {user ? 'Sign out' : 'Sign In'}
            </span>
          </div>
          </Link>
        
        <Link to="/AddFlat">
        <div className="header_option">
          <span className="header_optionLineOne">Add</span>
          <span className="header_optionLineTwo">Flat</span>
        </div>
         </Link>
         
         <Link to="/ListWithUs">
        <div className="header_option">
          <span className="header_optionLineOne">List With</span>
          <span className="header_optionLineTwo">us</span>
        </div>
        </Link>
        
          {/* <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              0
            </span>
          </div> */}
        
      </div>
    </div>
  );
}

export default Header;