import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from "./components/Navbar"; 
import Home from "./pages/";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="my-5 py-5">
      <Navbar />
      <Home />
    </Container>
  );
}

export default App;
