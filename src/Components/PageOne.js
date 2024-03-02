import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';

const PageOne = () => {
  const [selectedValue1, setSelectedValue1] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  const [selectedValue3, setSelectedValue3] = useState('');
  const navigate = useNavigate();

  const handleSelectChange1 = (event) => {
    setSelectedValue1(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setSelectedValue2(event.target.value);
  };

  const handleSelectChange3 = (event) => {
    setSelectedValue3(event.target.value);
  };

  const handleContinue = () => {
    navigate('/page-two', {
      state: {
        selectedValue1,
        selectedValue2,
        selectedValue3
      }
    });
  };

  const handleContinueTable = () => {
    navigate('/table', {
      state: {
        selectedValue1,
        selectedValue2,
        selectedValue3
      }
    });
  };

  const styleBox = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    border: '1px solid #ccc',
    marginBottom: '10px'
  };

  const items = Array.from({ length: 20 });

  const data = [
    {
      name: "Akram",
      age: 21,
      gender: "Male",
      Roll_Number: "2019meb1235",
    },
    {
      name: "Michael",
      age: 22,
      gender: "FeMale",
      Roll_Number: "2019csb1225",
    },
    { name: "Manisha", age: 22, gender: "Female", Roll_Number: "2018meb1236" },
    { name: "Tanishq", age: 21, gender: "Male", Roll_Number: "2018eeb1190" },
    { name: "Stark", age: 19, gender: "Female", Roll_Number: "2019csb1212" },
  ];

 

  return (
    <div>
      <div>
        <h2>Page One</h2>
        <div>
          <select value={selectedValue1} onChange={handleSelectChange1}>
            <option value="">Select an option</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>

          <select value={selectedValue2} onChange={handleSelectChange2}>
            <option value="">Select an option</option>
            <option value="Option 4">Option 4</option>
            <option value="Option 5">Option 5</option>
            <option value="Option 6">Option 6</option>
          </select>

          <select value={selectedValue3} onChange={handleSelectChange3}>
            <option value="">Select an option</option>
            <option value="Option 7">Option 7</option>
            <option value="Option 8">Option 8</option>
            <option value="Option 9">Option 9</option>
          </select>
        </div>
        <br />
        <br />
        <button onClick={handleContinue}>Continue</button>
        <button onClick={handleContinueTable}>Continue To Table</button>
      </div>

      {/* <div
        id="scrollableDiv"
        style={{
          height: 300,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }} */}
      {/* > */}
      {/* Put the scroll bar always on the bottom */}
      {/* <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          style={{ display: 'flex', flexDirection: 'column-reverse' }} // To put endMessage and loader to the top.
          inverse={true}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {items.map((_, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll> */}
      {/* </div> */}

      
    </div>
  );
};

export default PageOne;
