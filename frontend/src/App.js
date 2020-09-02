import React from "react";
import "./App.css";

import Home from "./pages/Home/home";
import Bodys from "./components/body";
import NotFound from "./routes/NotFound";
import Cards from "./components/Card/cards";
import Detail from "./pages/Details/detail";
import Profile from "./pages/Profile/profile";
import Booking from "./pages/Booking/booking";
import AddTrip from "./pages/AddTrip/addTrip";
import Incoming from "./pages/IncomeingTrip/incoming";
import PrivateAuth from "./routes/PrivateAuth/PrivateAuth";
import Transaction from "./pages/ListTransaction/transaction";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute
            path="/admin/list-transaction"
            component={Transaction}
          />
          <PrivateRoute path="/incoming" component={Incoming} />
          <PrivateRoute path="/add-trip" component={AddTrip} />
          <PrivateAuth path="/booking/:id/qty=:qty" component={Booking} />
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <PrivateAuth path="/profile/:id" component={Profile} />
          <Route component={NotFound}></Route>
        </Switch>
        <Bodys />
      </div>
    </Router>
  );
}

export default App;
