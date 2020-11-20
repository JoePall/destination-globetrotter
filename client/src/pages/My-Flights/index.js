import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import "./style.css";
import api from "../../utils/API";
import ConvertAirline from "../Search-Flights/ConvertAirline";
import CalculateDuration from "../Search-Flights/CalculateDuration";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Col from 'react-bootstrap/Col'
import "./style.css"
import DisplayFlight from "../Search-Flights/DisplayFlight.js";


function MyFlights() {

  const [bookmarks, setbookmarks] = useState([]);
  const [displayflights, setdisplayflights] = useState(null);


  useEffect(() => {
    // console.log("in useEffect");
    loadBookmarks();
  }, []);

  function loadBookmarks() {
    api.bookmark.get().then(res => {
      console.log("res after bookmarks.get = ", res.data);
      setbookmarks(res.data);
    }).catch(console.log);
  }
  
console.log("bookmarks = ", bookmarks);

  return (
    <div>
      <Jumbotron>
        <h1>MY FLIGHTS</h1>
        <h5>TRAVEL THE <b>WORLD</b></h5>
      </Jumbotron>
      {
        bookmarks &&
          bookmarks.map( (result) => {
            console.log("result in myflights = ", result)
            let resultid = result.id
            // console.log("result.id = " + result.id);
            if (result.data.result) {
              result = result.data.result
            } else {
              result = result.data;
            }
            console.log("result in myflights after result.data = ", result);
            // console.log("result.airlines[0] = ", result.airlines[0]);
              let departureduration = 0;
              let returnduration = 0;
              let airlinename = ConvertAirline(result.airlines[0]);
              let ddh = CalculateDuration(departureduration = result.duration.departure);
              let rdh = CalculateDuration(returnduration = result.duration.return);
              let flightnumbers = "";
              if (ddh === -1 || rdh === -1) {
                      return (null)
              } else {
                  return (
                  <div key={result.id}>
                  <Table striped bordered hover>
                      <tbody>
                          <tr>
                          <td>{resultid}</td>
                          <td className="searchresults">{airlinename}</td>
                          <td>{result.flyFrom}</td>
                          <td>{result.flyTo}</td>
                          <td>${result.price}</td>
                          <td><Button variant="primary" onClick={() => setdisplayflights(result.id)}>View Details</Button></td>
                          {/* <td><Button className = "selectbutton" variant="primary" onClick={() => setselectflight(result.id)}>Select</Button></td> */}
                          {/* <td><Button className = "selectbutton" variant="primary" onClick={() => selectflightfunction(result)}>Select</Button></td> */}
                          </tr>
                      </tbody>
                  </Table>
                  {(displayflights === result.id) ? DisplayFlight(result={result}) : ""}
                  </div>
                  )
                }
            })
        }
      </div>
  );
}

export default MyFlights;