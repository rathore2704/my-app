// PageTwo.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const PageTwo = () => {
  const location = useLocation();
  const { selectedValue1, selectedValue2, selectedValue3 } = location.state;

  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to the next page
    navigate('/table');
  }
  

  return (
    <div>
    <div>
      <h2>Page Two</h2>
      <input type="text" value={selectedValue1} readOnly />
      <input type="text" value={selectedValue2} readOnly />
      <input type="text" value={selectedValue3} readOnly />
    </div>
    <br/>

    <button onClick={handleContinue}>Continue</button>
    </div>

    

   
  );
};

export default PageTwo;

