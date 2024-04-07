// // import React, { Component, useEffect, useState } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import '../App.css'
// // import './OperationPanel.css'
// // import List from './List'
// // import withListLoading from './withListLoading'

// // const Settings = require('../settings')

// // let brands = [];

// // const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/getBrand`;
// // fetch(apiUrlBrand)
// //   .then(response => response.json())
// //   .then(response => brands = response)
// //   .catch(err => console.error(err));

// //   const OperationPanel = () => {
// //     const navigate = useNavigate()
// //   const ListLoading = withListLoading(List)
// //   //let operator, brand;

  
// //   const [appState, setAppState] = useState({
// //     loading: false,
// //     repos: null
// //   });
  
// //   const [brands, setBrands] = useState([]);
// //   const [selectedBrandValue, setSelectedBrandValue] = useState('');
// //   const brandNavigate = useNavigate();

  
  
// //   useEffect(() => {
// //     setAppState({ loading: true })
// //     const apiUrlBrand = `${Settings.serviceHost}:${Settings.servicePort}/getBrand`
// //     fetch(apiUrlBrand)
// //       .then(res => res.json())
// //       .then(data => setBrands(data))
// //       .then(users => {
// //         setAppState({ loading: false, users: users })
// //       })
// //       .catch(error => console.error('Error fetching brands:', error));
  
// //   }, [setAppState]);


// //   const handleBrandChange  = (event) => {
// //     setSelectedBrandValue(event.target.value);
// //   };

// //   const handleBrandContinue  = () => {
// //     brandNavigate('/prodTable', { state: { selectedBrandValue}})
// //   };

// //   return (
// //     <div>
// //         <div className='brand'>
// //                           <select
// //                             className='form-select'
// //                             aria-label='Default select example'
// //                             value={selectedBrandValue}
// //                             onChange={handleBrandChange}
// //                           >
// //                             <option defaultValue id='selectBrand'>
// //                               Select Brand
// //                             </option>
// //                             {
// //                               brands.map((brand, index) => (
// //                                 <option value={brand?.text} id={`brand-${brand?._id}`}>
// //                                   {brand?.text}
// //                                 </option>
// //                               ))
// //                             }
// //                           </select>
// //                         </div>

// //                         <div>
// //                         <button className='my-2' onClick={handleBrandContinue}>submit</button>
// //                         </div>
// //     </div>
// //   )

// // }

// // export default OperationPanel;


// // //import  from 'react';
// // import {  useLocation } from "react-router-dom";
// // import React, { useState, useEffect , useContext } from 'react';
// // import '../App.css';
// // import Settings from '../settings';


// // const ProdTable = () => {
// //   const {brandLocation} = useLocation();
// //   const { state } = useLocation();
// //   const selectedBrandValue = brandLocation ? brandLocation.selectedBrandValue : '';

// //   return (
// //     <div>
// //       <input
// //                 className='mx-2'
// //                 type='text'
// //                 value= {selectedBrandValue} 
// //                 id='print-brand'
// //                 placeholder='Brand'
// //                 readOnly
// //               />
// //     </div>
// //   )
// // }

// // export default ProdTable;


// // import React from "react";
// // import { BrowserRouter, Routes, Route, } from "react-router-dom";
// // import OperationPanel from "./component/OperationPanel";
// // import ProdTable from "./component/ProdTable";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //     <Routes>
// //     <Route exact path="/operation" element={<OperationPanel />} />
// //     <Route exact path="/prodTable/:brand" element={<ProdTable />} />
// //     </Routes>
// //     </BrowserRouter>
// //   )
// // }

// // export default App;


// // correct and improve the above code such that the opted brand value from the OperationPanel Component should pass and displayed in the ProdTable Component input field


// // improve and correct the above code such that to write a code in rect for to generate the Serial Number, and it should be generated automatically inside the tbody tag table 
// // write a code in rect for to generate the UBIN which is unique batch identification number and it should be gfenerated automatically such that it is unique and this UBIN should contans the value and data of the selected brand, selected operator , selected layer, selected color, selected layer, selected size , date and time and tank weight of that entry in the database 
// //and write a code in react for to dispay only serial number, UBIN, tank weight and time should be displayed in the table inside the tbody tag component when ADD button is clicked


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import '../App.css';
// import Settings from '../settings';

// const ProdTable = (props) => {
//   const navigate = useNavigate();
//   const [currentDate, setCurrentDate] = useState('');
//   const [currentTime, setCurrentTime] = useState('');
//   const [receivedMessage, setReceivedMessage] = useState('');
//   const { state } = useLocation();

//   const [serialNumber, setSerialNumber] = useState(1); // Initialize serial number
//   const [ubin, setUbin] = useState(''); // Unique Batch Identification Number
//   const [tankWeight, setTankWeight] = useState(''); // Tank Weight
//   const [tableData, setTableData] = useState([]); // Table Data

//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();
//       const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//       const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
//       setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
//       setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
//     };

//     const intervalId = setInterval(updateDateTime, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   const generateUbin = () => {
//     // Generate UBIN based on selected values and current data/time
//     const selectedOperatorValue = state?.selectedOperatorvalue || '';
//     const selectedBrandValue = state?.selectedBrandValue || '';
//     const selectedSizeValue = state?.selectedSizeValue || '';
//     const selectedLayerValue = state?.selectedLayerValue || '';
//     const selectedColorValue = state?.selectedColorValue || '';

//     const newUbin = `${selectedOperatorValue}-${selectedBrandValue}-${selectedSizeValue}-${selectedLayerValue}-${selectedColorValue}-${currentDate}-${currentTime}`;
//     setUbin(newUbin);
//   };

//   const addRow = () => {
//     // Add row to table when ADD button is clicked
//     generateUbin();
//     const newRow = {
//       serialNumber: serialNumber,
//       ubin: ubin,
//       tankWeight: tankWeight,
//       time: currentTime,
//     };
//     setTableData([...tableData, newRow]);
//     setSerialNumber(serialNumber + 1); // Increment serial number
//   };

//   return (
//     <>
//       <body>
//         {/* Navigation Bar */}
//         <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
//           <div className='container-fluid title'>
//             <a className='navbar-brand title' href='#'>
//               <h1>WELCOME TO MP&AD ENTERPRISES</h1>
//             </a>
//           </div>
//         </nav>

//         <center>
//           <div className='container my-3'>
//             {/* Weight Container */}
//             <div className='weight-container'>
//               <label htmlFor='RealTimeweightScreen' className='weightScreen'>
//                 <input
//                   type='text'
//                   name='weight-screen'
//                   id='weightScreen'
//                   className='weightScreen'
//                   placeholder='Tank Weight in Kg Screen'
//                   value={receivedMessage}
//                   style={{
//                     height: '2.5em',
//                     fontSize: '2.5em',
//                     fontWeight: 'bolder',
//                     textAlign: 'center',
//                     borderRadius: '.3em',
//                   }}
//                 />
//               </label>

//               <button className='primary addBtn mx-2' id='ptAddBtn' onClick={addRow}>
//                 ADD
//               </button>

//               <button className='btn-primary mx-2' onClick={() => navigate(-1)}>
//                 Back
//               </button>
//               <button className='mx-2' id='ptFinishBtn'>
//                 Finish
//               </button>
//             </div>

//             {/* Operator, Date, Time, Brand, Size, Layer, Color Inputs */}
//             <div className='my-3'>
//               <div className='osdtTable'>
//                 <input
//                   className='mx-2'
//                   type='text'
//                   value={state?.selectedOperatorvalue || ''}
//                   id='print-op-name'
//                   placeholder='Operator'
//                   disabled
//                 />
//                 <input
//                   className='mx-2'
//                   type='text'
//                   name=''
//                   id='print-op-shift'
//                   placeholder='Shift'
//                   disabled
//                 />
//                 <input className='mx-2' type='text' name='' placeholder={currentDate} disabled />
//                 <input className='mx-2' type='text' name='' placeholder={currentTime} disabled />
//               </div>
//             </div>

//             {/* Brand, Size, Layer, Color Inputs */}
//             <div className='my-2'>
//               <input
//                 className='mx-2'
//                 type='text'
//                 value={state?.selectedBrandValue || ''}
//                 id='print-brand'
//                 placeholder='Brand'
//                 disabled
//               />
//               <input
//                 className='mx-2'
//                 type='text'
//                 value={state?.selectedSizeValue || ''}
//                 id='print-size'
//                 placeholder='Size'
//                 disabled
//               />
//               <input
//                 className='mx-2'
//                 type='text'
//                 value={state?.selectedLayerValue || ''}
//                 id='print-layer'
//                 placeholder='Layer'
//                 disabled
//               />
//               <input
//                 className='mx-2'
//                 type='text'
//                 value={state?.selectedColorValue || ''}
//                 id='print-color'
//                 placeholder='Colour'
//                 disabled
//               />
//             </div>
//           </div>

//           {/* Production Table */}
//           <div className='container'>
//             <div className='containerTable' id='productionTable'>
//               <br />
//               <table border='2' id='ptTable' className='table table-success table-striped'>
//                 <thead>
//                   <tr>
//                     <th scope='col'>Serial Number</th>
//                     <th scope='col'>UBIN</th>
//                     <th scope='col'>Tank Weight</th>
//                     <th scope='col'>Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Display table data */}
//                   {tableData.map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.serialNumber}</td>
//                       <td>{row.ubin}</td>
//                       <td>{row.tankWeight}</td>
//                       <td>{row.time}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </center>
//       </body>
//     </>
//   );
// };

// export default ProdTable;

// // const generateUbin = () => {
// //   // Generate UBIN based on selected values and current data/time
// //   const selectedOperatorValue = state?.selectedOperatorvalue || '';
// //   const selectedBrandValue = state?.selectedBrandValue || '';
// //   const selectedSizeValue = state?.selectedSizeValue || '';
// //   const selectedLayerValue = state?.selectedLayerValue || '';
// //   const selectedColorValue = state?.selectedColorValue || '';

// //   const newUbin = `${selectedOperatorValue}-${selectedBrandValue}-${selectedSizeValue}-${selectedLayerValue}-${selectedColorValue}-${receivedMessage}-${currentDate}-${currentTime}`;
// //   setUbin(newUbin);
// // };

// // // improvise the above code in react such that the data strored in the newUbin variable such that the whole UBIN should be displayed in the unique six digits alphanumeric format

// // const generateUbin = () => {
// //   // Generate UBIN based on selected values and current data/time
// //   const selectedOperatorValue = state?.selectedOperatorvalue || '';
// //   const selectedBrandValue = state?.selectedBrandValue || '';
// //   const selectedSizeValue = state?.selectedSizeValue || '';
// //   const selectedLayerValue = state?.selectedLayerValue || '';
// //   const selectedColorValue = state?.selectedColorValue || '';

// //   // Combine selected values and current date/time to generate UBIN
// //   const combinedData = `${selectedOperatorValue}${selectedBrandValue}${selectedSizeValue}${selectedLayerValue}${selectedColorValue}${receivedMessage}${currentDate}${currentTime}`;

// //   // Generate a random six-digit alphanumeric UBIN
// //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// //   let ubin = '';
// //   for (let i = 0; i < 6; i++) {
// //     ubin += characters.charAt(Math.floor(Math.random() * characters.length));
// //   }

// //   // Set the generated UBIN
// //   setUbin(ubin);
// // };

// //  // improvise the above code in react such that the data strored in the combinedData variable such that the whole ubin should be displayed in the unique six digits alphanumeric format and it should be generated automatically and the value of the combinedData should be stored inside the ubin variable in six digits alphanumeric format



// // const generateUbin = () => {
// //   // Generate UBIN based on selected values and current data/time
// //   const selectedOperatorValue = state?.selectedOperatorvalue || '';
// //   const selectedBrandValue = state?.selectedBrandValue || '';
// //   const selectedSizeValue = state?.selectedSizeValue || '';
// //   const selectedLayerValue = state?.selectedLayerValue || '';
// //   const selectedColorValue = state?.selectedColorValue || '';

// //   // Combine selected values and current date/time to generate UBIN
// //   const combinedData = `${selectedOperatorValue}${selectedBrandValue}${selectedSizeValue}${selectedLayerValue}${selectedColorValue}${receivedMessage}${currentDate}${currentTime}`;

// //   // Generate a random six-digit alphanumeric UBIN
// //   let ubin = '';
// //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
// //   const charactersLength = characters.length;
// //   for (let i = 0; i < 6; i++) {
// //     ubin += characters.charAt(Math.floor(Math.random() * charactersLength));
// //   }

// //   // Set the generated UBIN
// //   setUbin(ubin);
// // };


// import { useState } from 'react';
// import md5 from 'md5';

// const generateUbin = () => {
//   // Generate UBIN based on selected values and current data/time
//   const selectedOperatorValue = state?.selectedOperatorvalue || '';
//   const selectedBrandValue = state?.selectedBrandValue || '';
//   const selectedSizeValue = state?.selectedSizeValue || '';
//   const selectedLayerValue = state?.selectedLayerValue || '';
//   const selectedColorValue = state?.selectedColorValue || '';

//   // Combine selected values and current date/time to generate UBIN
//   const combinedData = `${selectedOperatorValue}${selectedBrandValue}${selectedSizeValue}${selectedLayerValue}${selectedColorValue}${receivedMessage}${currentDate}${currentTime}`;

//   // Hash the combinedData to a unique alphanumeric string using md5
//   const hashedData = md5(combinedData);

//   // Extract the first six characters from the hashedData as the UBIN
//   const ubin = hashedData.substring(0, 6);

//   // Set the generated UBIN
//   setUbin(ubin);
// };



// //////
// // import { useState } from 'react';
// // import md5 from 'md5';

// // const generateUbin = () => {
// //   // Generate UBIN based on selected values and current data/time
// //   const selectedOperatorValue = state?.selectedOperatorvalue || '';
// //   const selectedBrandValue = state?.selectedBrandValue || '';
// //   const selectedSizeValue = state?.selectedSizeValue || '';
// //   const selectedLayerValue = state?.selectedLayerValue || '';
// //   const selectedColorValue = state?.selectedColorValue || '';

// //   // Combine selected values and current date/time to generate UBIN
// //   const combinedData = `${selectedOperatorValue}${selectedBrandValue}${selectedSizeValue}${selectedLayerValue}${selectedColorValue}${receivedMessage}${currentDate}${currentTime}`;

// //   // Hash the combinedData to a unique alphanumeric string using md5
// //   const hashedData = md5(combinedData);

// //   // Extract the first six characters from the hashedData as the UBIN
// //   const ubin = hashedData.substring(0, 6);

// //   // Set the generated UBIN
// //   setUbin(ubin);
// // };

// // return (
// //   <>
// //    <input 
// //                   type="text"
// //                   placeholder="Enter UBIN"/>
// //                   <button className="mx-3">search</button>
// //   </>
// // )

// // improve the above code such that the value of ubin when passed in the input box after that the value of ubin should be pop up and it should display the data been stored in ubin variable, when the search button is clicked


// // import { useState } from 'react';
// // import md5 from 'md5';

// // const YourComponent = () => {
// //   const [ubin, setUbin] = useState('');
// //   const [inputValue, setInputValue] = useState('');

// //   const generateUbin = () => {
// //     // Generate UBIN based on selected values and current data/time
// //     const selectedOperatorValue = state?.selectedOperatorvalue || '';
// //     const selectedBrandValue = state?.selectedBrandValue || '';
// //     const selectedSizeValue = state?.selectedSizeValue || '';
// //     const selectedLayerValue = state?.selectedLayerValue || '';
// //     const selectedColorValue = state?.selectedColorValue || '';

// //     // Combine selected values and current date/time to generate UBIN
// //     const combinedData = `${selectedOperatorValue}${selectedBrandValue}${selectedSizeValue}${selectedLayerValue}${selectedColorValue}${receivedMessage}${currentDate}${currentTime}`;

// //     // Hash the combinedData to a unique alphanumeric string using md5
// //     const hashedData = md5(combinedData);

// //     // Extract the first six characters from the hashedData as the UBIN
// //     const ubin = hashedData.substring(0, 6);

// //     // Set the generated UBIN
// //     setUbin(ubin);
// //   };

// //   const handleSearch = () => {
// //     if (inputValue === ubin) {
// //       alert(`UBIN: ${ubin}`);
// //     } else {
// //       alert('Invalid UBIN');
// //     }
// //   };

// //   return (
// //     <>
// //       <input 
// //         type="text"
// //         placeholder="Enter UBIN"
// //         value={inputValue}
// //         onChange={(e) => setInputValue(e.target.value)}
// //       />
// //       <button className="mx-3" onClick={handleSearch}>Search</button>
// //     </>
// //   );
// // };

// // export default YourComponent;

// // Import necessary modules and components
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import md5 from 'md5';

// // Define the ProdTable component
// const ProdTable = (props) => {
//   // Define states for various variables
//   const navigate = useNavigate();
//   const [currentDate, setCurrentDate] = useState('');
//   const [currentTime, setCurrentTime] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState('');
//   const [receivedMessage, setReceivedMessage] = useState('');
//   const { state } = useLocation();
//   const [serialNumber, setSerialNumber] = useState(1);
//   const [ubin, setUbin] = useState('');
//   const [tableData, setTableData] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   // Function to update date and time
//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();
//       const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//       const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
//       setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
//       setCurrentTime(now.toLocaleTimeString(undefined, timeOptions));
//     };

//     const intervalId = setInterval(updateDateTime, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   // Function to generate UBIN
//   const generateUbin = () => {
//     const selectedOperatorValue = state?.selectedOperatorvalue || '';
//     const selectedBrandValue = state?.selectedBrandValue || '';
//     const selectedSizeValue = state?.selectedSizeValue || '';
//     const selectedLayerValue = state?.selectedLayerValue || '';
//     const selectedColorValue = state?.selectedColorValue || '';
//     const combinedData = `${selectedOperatorValue}-${selectedBrandValue}-${selectedSizeValue}-${selectedLayerValue}-${selectedColorValue}-${receivedMessage}-${currentDate}-${currentTime}`;

//     const hashedData = md5(combinedData);
//     const ubin = hashedData.substring(0, 6);
//     setUbin(ubin);
//   };

//   // Function to handle search button click
//   const handleSearch = () => {
//     if (inputValue === ubin) {
//       alert(`Data stored in UBIN: ${ubin}`);
//     } else {
//       alert('Invalid UBIN');
//     }
//   };

//   // Function to add row to table
//   const addRow = () => {
//     generateUbin();
//     const newRow = {
//       serialNumber: serialNumber,
//       ubin: ubin,
//       receivedMessage: receivedMessage,
//       time: currentTime,
//     };
//     setTableData([...tableData, newRow]);
//     setSerialNumber(serialNumber + 1);
//     setReceivedMessage(receivedMessage);
//   };

//   // Function to send message via WebSocket
//   const sendMessage = () => {
//     if (socket && message) {
//       socket.send(message);
//       setMessage('');
//     }
//   };

//   // Return JSX for the component
//   return (
//     <>
//       <body>
//         <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
//           <div className='container-fluid title'>
//             <a className='navbar-brand title' href='#'>
//               <h1>WELCOME TO MP&AD ENTERPRISES</h1>
//             </a>
//           </div>
//         </nav>

//         <center>
//           <div className='container my-3'>
//             <div className='weight-container'>
//               <label htmlFor='RealTimeweightScreen' className='weightScreen'>
//                 <input
//                   type="text"
//                   placeholder="Enter UBIN"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                 />
//                 <button className="mx-3" onClick={handleSearch}>Search</button>
//                 <input
//                   type='text'
//                   name='weight-screen'
//                   id='weightScreen'
//                   className='weightScreen'
//                   placeholder='Tank Weight in Kg Screen'
//                   value={receivedMessage}
//                   style={{
//                     height: "2.5em",
//                     fontSize: "2.5em",
//                     fontWeight: "bolder",
//                     textAlign: "center",
//                     borderRadius: ".3em"
//                   }}
//                 />
//               </label>

//               <button className='primary addBtn mx-2' id='ptAddBtn' onClick={addRow}>
//                 ADD
//               </button>

//               <button className='btn-primary mx-2' onClick={() => navigate(-1)}>Back </button>
//               <button className='mx-2' id='ptFinishBtn'>Finish</button>
//             </div>

//             <div className='my-3'>
//               <div className='osdtTable'>
//                 <input
//                   className='mx-2'
//                   type='text'
//                   value={state?.selectedOperatorvalue || ''}
//                   id='print-op-name'
//                   placeholder='Operator'
//                   disabled
//                 />
//                 <input
//                   className='mx-2'
//                   type='text'
//                   name=''
//                   id='print-op-shift'
//                   placeholder='Shift'
//                   disabled
//                 />
//                 <input
//                   className='mx-2'
//                   type='text'
//                   name=''
//                   id='print-op-shift'
//                   placeholder={currentDate}
//                   disabled
//                 />
//                 <input
//                   className='mx-2'
//                   type='text'
//                   name=''
//                   id='print-op-shift'
//                   placeholder={currentTime}
//                   disabled
//                 />
//               </div>
//             </div>

//             <div className='my-2'>
//               <input
//                 className='mx-2'
//                 type='text'
//                 value={state?.selectedBrandValue || ''}
//                 id='print-brand'
//                 placeholder='Brand'
//                 disabled
//               />
//               <input
//                 className='mx-2'
//                 type='text'
//                 value={state?.selectedSizeValue || ''}
//                 id='print-size'
//                 placeholder='Size'
//                 disabled
//               />
//               <input
//                 className='mx-2'
//                 type='text'
//                 value={state?.selectedLayerValue || ''}
//                 id='print-layer'
//                 placeholder='Layer'
//                 disabled
//               />
//               <input
//                 className='mx-2'
//                 type='text'
//                 value={state?.selectedColorValue || ''}
//                 id='print-color'
//                 placeholder='Colour'
//                 disabled
//               />
//             </div>
//           </div>

//           <div className="container">
//             <div className='containerTable' id='productionTable'>
//               <br />
//               <table
//                 border='2'
//                 id='ptTable'
//                 className='table table-success table-striped'
//               >
//                 <thead>
//                   <tr>
//                     <th scope='col' id='sName'>
//                       Serial Number
//                     </th>
//                     <th scope='col'>UBIN</th>
//                     <th scope='col'>Tank Weight</th>
//                     <th scope='col'>Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((row, index) => (
//                     <tr key={index}>
//                       <td>{row.serialNumber}</td>
//                       <td>{row.ubin}</td>
//                       <td>{row.receivedMessage}</td>
//                       <td>{row.time}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div>
//             <h1>WebSocket Client</h1>
//             <div>
//               <strong>Received Message:</strong> {receivedMessage}
//             </div>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Enter message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <button onClick={sendMessage}>Send</button>
//             </div>
//           </div>

//         </center>
//       </body>
//     </>
//   );
// };

// export default ProdTable;


// import ReactExport from 'react-data-export';
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


// const handleExport = () => {
//     const dataSet = tableData.map(row => ({
//       'Serial Number': row.serialNumber,
//       'UBIN': row.ubin,
//       'Tank Weight': row.receivedMessage,
//       'Time': row.time
//     }));
  
//     const excelData = [
//       {
//         columns: [
//           { title: 'Serial Number', width: { wch: 10 } },
//           { title: 'UBIN', width: { wch: 20 } },
//           { title: 'Tank Weight', width: { wch: 15 } },
//           { title: 'Time', width: { wch: 15 } }
//         ],
//         data: dataSet
//       }
//     ];
  
//     // Export the data as an Excel file
//     return (
//       <ExcelFile element={<button>Save</button>} filename="Production_Data">
//         <ExcelSheet dataSet={excelData} name="Production" />
//       </ExcelFile>
//     );
//   };

//   <button onClick={handleExport}>Save</button>


// const ProdTable = (props) => {
//     // Existing code...
  
//     // Function to handle saving and converting table data into an object
//     const handleSave = () => {
//       // Create an array to store table data objects
//       const savedData = [];
  
//       // Iterate through the tableData array and construct objects
//       tableData.forEach((row) => {
//         const rowData = {
//           serialNumber: row.serialNumber,
//           ubin: row.ubin,
//           receivedMessage: row.receivedMessage,
//           time: row.time,
//         };
  
//         savedData.push(rowData);
//       });
  
//       // Display the constructed object in the console
//       console.log('Saved Data:', savedData);
//     };
  
//     return (
//       <>
//         {/* Existing JSX code */}
  
//         {/* Save button to trigger saving and displaying data */}
//         <div>
//           <button onClick={handleSave}>Save</button>
//         </div>
//       </>
//     );
//   };
  
//   export default ProdTable;
  

//npm install @react-pdf/renderer


// import React, { Fragment, useState } from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
// import data from '../mock-data.json';
// import { nanoid } from 'nanoid';
// import { ReadOnlyRow } from './ReadOnlyRow';
// import EditTableRow from './EditTableRow';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../App.css';

// const Table = () => {
//     const location = useLocation();
//     const { selectedValue1, selectedValue2, selectedValue3 } = location.state;
//     const navigate = useNavigate();
//     const [contacts, setContacts] = useState(data);
//     const [edtContactId, setEditContactId] = useState(null);

//     const handleEditFormSubmit = (event) => {
//         // Your existing handleEditFormSubmit logic
//     };

//     const handleEditClick = (event, contact) => {
//         // Your existing handleEditClick logic
//     };

//     const handleCancelClick = () => {
//         // Your existing handleCancelClick logic
//     };

//     const handleDeleteClick = (contactId) => {
//         // Your existing handleDeleteClick logic
//     };

//     const handleAddFormSubmit = (event) => {
//         // Your existing handleAddFormSubmit logic
//     };

//     const handleAddFormChange = (event) => {
//         // Your existing handleAddFormChange logic
//     };

//     // PDF generation function
//     const generatePDF = () => {
//         const doc = (
//             <Document>
//                 <Page size="A4">
//                     <View style={styles.header}>
//                         <Text style={styles.headerText}>Contact Details</Text>
//                         <Text>{selectedValue1}</Text>
//                         <Text>{selectedValue2}</Text>
//                         <Text>{selectedValue3}</Text>
//                     </View>
//                     <View style={styles.table}>
//                         <View style={styles.row}>
//                             <Text style={styles.headerCell}>Name</Text>
//                             <Text style={styles.headerCell}>Address</Text>
//                             <Text style={styles.headerCell}>Phone Number</Text>
//                             <Text style={styles.headerCell}>Email</Text>
//                         </View>
//                         {contacts.map(contact => (
//                             <View style={styles.row} key={contact.id}>
//                                 <Text style={styles.cell}>{contact.fullName}</Text>
//                                 <Text style={styles.cell}>{contact.address}</Text>
//                                 <Text style={styles.cell}>{contact.phoneNumber}</Text>
//                                 <Text style={styles.cell}>{contact.email}</Text>
//                             </View>
//                         ))}
//                     </View>
//                 </Page>
//             </Document>
//         );

//         const pdfBlob = PDFViewer.renderToBlob(doc);

//         // Save the PDF blob to the local drive
//         const url = window.URL.createObjectURL(pdfBlob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'contact_details.pdf';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//     };

//     // Styles for PDF document
//     const styles = StyleSheet.create({
//         header: {
//             textAlign: 'center',
//             marginBottom: 10,
//         },
//         headerText: {
//             fontSize: 20,
//             fontWeight: 'bold',
//         },
//         table: {
//             display: 'table',
//             width: 'auto',
//             borderStyle: 'solid',
//             borderWidth: 1,
//             borderRightWidth: 0,
//             borderBottomWidth: 0,
//         },
//         row: {
//             flexDirection: 'row',
//             borderBottomWidth: 1,
//         },
//         headerCell: {
//             margin: 5,
//             fontSize: 12,
//             fontWeight: 'bold',
//         },
//         cell: {
//             margin: 5,
//             fontSize: 10,
//         },
//     });

//     return (
//         <div className='container app-container'>
//             <h2 style={{ textAlign: 'center' }}>Page table</h2>
//             <div className='page-table'>
//                 <input type="text" value={selectedValue1} readOnly />
//                 <input type="text" value={selectedValue2} readOnly />
//                 <input type="text" value={selectedValue3} readOnly />
//                 <button onClick={() => navigate('/')}>Back To Home</button>
//                 <button onClick={generatePDF}>Download PDF</button>
//             </div>
//             <br />
//             <form className='form' onSubmit={handleEditFormSubmit}>
//                 {/* Your existing form code */}
//             </form>
//             <h2>Add a new contact</h2>
//             {/* Your existing add form code */}
//         </div>
//     );
// }

// export default Table;



// import React, { Fragment, useState } from 'react';
// import '../table.css';
// import data from '../mock-data.json';
// import { nanoid } from 'nanoid';
// import { ReadOnlyRow } from './ReadOnlyRow';
// import EditTableRow from './EditTableRow';
// import { useLocation, useNavigate } from 'react-router-dom';
// //import { Page } from '@react-pdf/renderer';
// //import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// //import jsPDF from 'jspdf';
// import PDF from './PDF';



// import '../App.css';



// export const Table = () => {

//     const styleBox = {

//     };

//     const location = useLocation();
//     const { selectedValue1, selectedValue2, selectedValue3 } = location.state;

//     const navigate = useNavigate();
//     const [contacts, setContacts] = useState(data);


//     const [addFormData, setAddFormData] = useState({
//         fullName: '',
//         address: '',
//         phoneNumber: '',
//         email: ''
//     })


//     const [editFormData, setEditFormData] = useState({
//         fullName: '',
//         address: '',
//         phoneNumber: '',
//         email: ''
//     })

//    const state = {
//         selectedValue1: selectedValue1,
//         selectedValue2: selectedValue2,
//         selectedValue3: selectedValue3,
//         fullName: '',
//         address: '',
//         phoneNumber: '',
//         email: '',
//         postSubmitted: false
//     }

//   const  onChange = input => e => {
//         this.setState({
//             [input]: e.target.value
//         });
//     }

//     const submitPost = (e) => {

//         if (!this.state.title || !this.state.content) {
//             alert('All fields are required!');
//             e.preventDefault();
//         } else {
//             this.setState({
//                 postSubmitted: true
//             });
//         }
//     }

//     const [edtContactId, setEditContactId] = useState(null)

//     const handleAddFormChange = event => {
//         event.preventDefault()

//         const fieldName = event.target.getAttribute('name')
//         const fieldValue = event.target.value

//         const newFormData = { ...addFormData }
//         newFormData[fieldName] = fieldValue

//         setAddFormData(newFormData)
//     };



//     const handleEditFormChange = event => {
//         event.preventDefault();

//         const fieldName = event.target.getAttribute('name');
//         const fieldValue = event.target.value;

//         const newFormData = { ...editFormData };
//         newFormData[fieldName] = fieldValue;

//         setEditFormData(newFormData);
//     }

//     const handleAddFormSubmit = (event) => {
//         event.preventDefault();

//         const newContact = {
//             id: nanoid(),
//             fullName: addFormData.fullName,
//             address: addFormData.address,
//             phoneNumber: addFormData.phoneNumber,
//             email: addFormData.email
//         };

//         const newContacts = [...contacts, newContact];
//         setContacts(newContacts);
//     };

//     const handleEditFormSubmit = (event) => {
//         event.preventDefault();

//         const editedContact = {
//             id: edtContactId,
//             fullName: editFormData.fullName,
//             address: editFormData.address,
//             phoneNumber: editFormData.phoneNumber,
//             email: editFormData.email
//         }

//         const newContacts = [...contacts];

//         const index = contacts.findIndex((contact) => contact.id === edtContactId);

//         newContacts[index] = editedContact;

//         setContacts(newContacts);

//         setEditContactId(null);
//     }

//     const handleEditClick = (event, contact) => {
//         event.preventDefault();
//         setEditContactId(contact.id);

//         const formValues = {
//             fullName: contact.fullName,
//             address: contact.address,
//             phoneNumber: contact.phoneNumber,
//             email: contact.email
//         }

//         setEditFormData(formValues);
//     };


//     const handleCancelClick = () => {
//         setEditContactId(null);
//     }

//     const handleDeleteClick = (contactId) => {
//         const newContacts = [...contacts];

//         const index = contacts.findIndex((contact) => contact.id === contactId);

//         newContacts.splice(index, 1);

//         setContacts(newContacts);
//     };



    
//     return (
//         <>
//             {!this.state.postSubmitted ?
//                 (<div className=' container app-container'>


//                     <h2 style={{ textAlign: 'center' }}>Page table</h2>

//                     <div className='page-table' >


//                         <input type="text" value={selectedValue1} readOnly />

//                         <input type="text" value={selectedValue2} readOnly />

//                         <input type="text" value={selectedValue3} readOnly />
//                         <button onClick={() => navigate('/')}>Back To Home</button>

//                         {/* <button onClick={generatePDF}>Download PDF</button>  */}
//                     </div>

//                     <br />

//                     <h2>Add a new contact</h2>
//                     <form className='add-form' onSubmit={handleAddFormSubmit}>
//                         <input
//                             onChange={handleAddFormChange}
//                             type='text'
//                             placeholder='Enter FullName'
//                             required='required'
//                             name='fullName'
//                         />
//                         <input
//                             onChange={handleAddFormChange}
//                             type='text'
//                             placeholder='Enter Address'
//                             required='required'
//                             name='address'
//                         />
//                         <input
//                             onChange={handleAddFormChange}
//                             type='text'
//                             placeholder='Enter PhoneNumber'
//                             required='required'
//                             name='phoneNumber'
//                         />
//                         <input
//                             onChange={handleAddFormChange}
//                             type='text'
//                             placeholder='Enter Email'
//                             required='required'
//                             name='email'
//                         />
//                         <button onClick={handleAddFormSubmit} type='submit'>Add</button>
//                     </form>

//                     <br />

//                     <form className='form' onSubmit={handleEditFormSubmit} >
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Address</th>
//                                     <th>Phone Number</th>
//                                     <th>Email</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {contacts.map(contact => (
//                                     <Fragment>


//                                         {edtContactId === contact.id ? (
//                                             <EditTableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
//                                         ) : (<ReadOnlyRow contact={contact}
//                                             handleDeleteClick={handleDeleteClick}
//                                             handleEditClick={handleEditClick} />)}

//                                     </Fragment>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <button type="button" onClick={this.submitPost} className="btn btn-primary btn-lg">Submit</button>
//                     </form>


//                 </div>
//                 ) : (
//                     <PDF fullName={this.state.fullName} address={this.state.address} phoneNumber={this.state.phoneNumber} email={this.state.email} />


//                 )

//             }

//         </>
//     )
// }



// export default Table


// improve the above code such that in creating the pdf