import React, { useState } from "react";
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const colleges = [
  { name: 'Delhi', path: '/delhi' },
  { name: 'College A', path: '/collegeA' },
  { name: 'College B', path: '/collegeB' },
  { name: 'College C', path: '/collegeC' },
];

function SearchBar() {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
  };

  const handleSearch = () => {
    // For demonstration, navigating to selectedCollege path
    // In real app, you might want to perform a search with both selectedCollege and searchText
    if (selectedCollege) {
      navigate(selectedCollege);
    }
  };

  return (
    <div className="searchBar_container">
      <div className="searchBar_tabs">
        <span className="active">BUY</span>
        <span>RENT</span>
        <span>COMMERCIAL</span>
        <span>PG/CO-LIVING</span>
        <span>PLOTS</span>
      </div>

      <div className="searchBar_search">
        <select
          className="searchBar_select"
          value={selectedCollege}
          onChange={handleCollegeChange}
          aria-label="Select Location"
        >
          {colleges.map(college => (
            <option value={college.path} key={college.path}>
              {college.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="searchBar_input"
          placeholder="Search for locality, landmark, project, or builder"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button className="searchBar_button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Optional: Popular Localities - you can extend this later */}
    </div>
  );
}

export default SearchBar;