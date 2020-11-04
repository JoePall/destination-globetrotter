import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
          <Route exact path="/" component={Home}/>
          <Route exact path="/SearchBar" component={SearchBar}/>
      </Router>
    </div>
  );
}

export default App;
