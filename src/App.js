import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import TradeHome from './pages/TradeHome';
import AddTrade from './users/AddTrade';
import EditTrade from './users/EditTrade';
import ViewTrade from './users/ViewTrade';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/trade" element={<TradeHome />} />
          <Route exact path="/addtrade" element={<AddTrade />} />
          <Route exact path="/edittrade/:id" element={<EditTrade />} />
          <Route exact path="/viewtrade/:id" element={<ViewTrade />} />
          {/* <Route exact path="/viewtrade/:id" element={<ViewTrade />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
