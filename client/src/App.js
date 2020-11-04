import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from './pages/Navbar/index';
import { Home } from './pages/Home/index';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
