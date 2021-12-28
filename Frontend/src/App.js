import React from 'react';
import PiePage from './PiePage';
import Table from "./Table";
import Homepage from './Homepage';
import MiscGraph from './MiscGraph';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Homepage/>} />
        <Route path="/pie" element={<PiePage/>} />
        <Route path="/misc"element={<MiscGraph/>}  />
        <Route path="/data"element={<Table/>} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
