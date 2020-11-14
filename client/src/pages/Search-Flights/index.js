import React, { useState, useEffect } from "react";
import Searchbar from "../../components/Searchbar/index.js"
import ConvertAirline from "./ConvertAirline";
import CalculateDuration from "./CalculateDuration";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import "./style.css"
import DisplayFlight from "./DisplayFlight.js";

import DatePicker from "react-datepicker"
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import api from "../../utils/API";

const Search = () => {

    const [fromairport, setfromairport] = useState('');
    const [toairport, settoairport] = useState('');
    const [returnto, setreturnto] = useState(new Date());
    const [dateto, setdateto] = useState(new Date());
    const [searchresults, setsearchresults] = useState(null);
    const [displayflights, setdisplayflights] = useState(null);
    const [selectflight, setselectflight] = useState(null);


    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (fromairport && toairport && dateto && returnto) {
                console.log(fromairport)
                console.log(toairport)
                console.log(returnto)
                console.log(dateto)
                Searchbar(returnto, dateto, fromairport, toairport, setsearchresults);
            }
        }, 750);
        return () => {
            clearTimeout(timeoutID);
        };
    }, [fromairport, toairport, dateto, returnto]);

    const selectflightfunction = (result) => {
      // setselectflight(result.id)
      // selectflight === result.id ?       
      // api.bookmark.create({data: JSON.stringify(result)}).then(response => {console.log(response); return(response)})
      console.log(result)
      api.bookmark.create({data: result}).then(response => {console.log(response); return(response)})
    }

        return (
          <div className="ui segment searchbar" id="searchbar">
          <div className="form">
            <form className="field">
              <Form.Row> 
              <Col>            
              <label>Departure Airport</label>
              </Col>
              <Col> 
              <input
                placeholder="Airport Code - i.e. MCI"
                value={fromairport}
                onChange={(e) => setfromairport(e.target.value)}
                className="input"
              />
              </Col>
              </Form.Row>
              <Form.Row> 
              <Col>            
              <label>Return Airport</label>
              </Col>
              <Col> 
              <input
                placeholder="Airport Code - i.e. LAS"
                value={toairport}
                onChange={(e) => settoairport(e.target.value)}
                className="input"
              />
              </Col>
              </Form.Row>
              <DatePicker
                placeholder="Departure Date"
                value={dateto}
                dateFormat="dd/MM/yyyy"
                selected={dateto}
                minDate={new Date()}
                onChange={date => setdateto(date)}
                className="input"
              />
              <br />
              <DatePicker
                placeholder="Return Date"
                value={returnto}
                dateFormat="dd/MM/yyyy"
                selected={returnto}
                minDate={new Date()}
                onChange={date => setreturnto(date)}
                className="input"
              />
                {/* <button>Search</button> */}
        </form>
  </div>
                    {
                        searchresults &&
                        searchresults.map( result => {
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
                                        <td className="searchresults">{airlinename}</td>
                                        <td>{result.flyFrom}</td>
                                        <td>{result.flyTo}</td>
                                        <td>${result.price}</td>
                                        <td><Button variant="primary" onClick={() => setdisplayflights(result.id)}>View Details</Button></td>
                                        {/* <td><Button className = "selectbutton" variant="primary" onClick={() => setselectflight(result.id)}>Select</Button></td> */}
                                        <td><Button className = "selectbutton" variant="primary" onClick={() => selectflightfunction(result)}>Select</Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                
                                {(displayflights === result.id) ? DisplayFlight(result={result}) : ""}
                                {/* {(selectflight === result.id) ? api.bookmark.create({data: result}) : ""} */}
                                {(selectflight === result.id) ? console.log("result = ", result) : ""}
                                </div>
                                )
                            }
                        })
                    }
            </div>  
        );
    };

export default Search;