import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageOne from './Components/PageOne';
import PageTwo from './Components/PageTwo';
import { Table } from './Components/Table';
//import { PDFViewer } from '@react-pdf/renderer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
        <Route path="/table" element={<Table />} />
      </Routes>
      
    </Router>
  );

  //ReactDOM.render(<App />, document.getElementById('root'));
};

export default App;
