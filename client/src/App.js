import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from "./components/Navbar"; 
import Home from "./pages/";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Router>
      <Container className="my-5 py-5">
        <Navbar />
        <Home />
      </Container>
    </>
  );
}

export default App;
