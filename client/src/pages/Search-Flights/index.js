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
import Select from 'react-select'
// import Async, { makeAsyncSelect } from 'react-select/async';
const options = [
  { value: 'ATL', label: 'ATL - Hartsfield–Jackson Atlanta International Airport' },
  { value: 'LAX', label: 'LAX - Los Angeles International Airport' },
  { value: 'ORD', label: 'ORD - O\'Hare International Airport' },
  { value: 'DFW', label: 'DFW - Dallas/Fort Worth International Airport' },
  { value: 'DEN', label: 'DEN - Denver International Airport' },
  { value: 'JFK', label: 'JFK - John F. Kennedy International Airport' },
  { value: 'SFO', label: 'SFO - San Francisco International Airport' },
  { value: 'SEA', label: 'SEA - Seattle–Tacoma International Airport' },
  { value: 'LAS', label: 'LAS - McCarran International Airport' },
  { value: 'MCO', label: 'MCO - Orlando International Airport' },
  { value: 'EWR', label: 'EWR - Newark Liberty International Airport' },
  { value: 'CLT', label: 'CLT - Charlotte Douglas International Airport' },
  { value: 'PHX', label: 'PHX - Phoenix Sky Harbor International Airport' },
  { value: 'IAH', label: 'IAH - George Bush Intercontinental Airport' },
  { value: 'MIA', label: 'MIA - Miami International Airport' },
  { value: 'BOS', label: 'BOS - General Edward Lawrence Logan International Airport' },
  { value: 'MSP', label: 'MSP - Minneapolis–Saint Paul International Airport' },
  { value: 'FLL', label: 'FLL - Fort Lauderdale–Hollywood International Airport' },
  { value: 'DTW', label: 'DTW - Detroit Metropolitan Airport' },
  { value: 'PHL', label: 'PHL - Philadelphia International Airport' },
  { value: 'LGA', label: 'LGA - LaGuardia Airport' },
  { value: 'BWI', label: 'BWI - Baltimore–Washington International Airport' },
  { value: 'SLC', label: 'SLC - Salt Lake City International Airport' },
  { value: 'SAN', label: 'SAN - San Diego International Airport' },
  { value: 'IAD', label: 'IAD - Washington Dulles International Airport' },
  { value: 'DCA', label: 'DCA - Ronald Reagan Washington National Airport' },
  { value: 'MDW', label: 'MDW - Chicago Midway International Airport' },
  { value: 'TPA', label: 'TPA - Tampa International Airport' },
  { value: 'PDX', label: 'PDX - Portland International Airport' },
  { value: 'HNL', label: 'HNL - Daniel K. Inouye International Airport' }
];





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
              {/* <makeAsyncSelect */}
              <Select 
                placeholder="Airport Code - i.e. MCI"
                options={options}
                onChange={(e) => setfromairport(e.value)}
                className="input" />
              {/* <input
                placeholder="Airport Code - i.e. MCI"
                value={fromairport}
                onChange={(e) => setfromairport(e.target.value)}
                className="input"
              /> */}
              </Col>
              </Form.Row>
              <Form.Row> 
              <Col>            
              <label>Return Airport</label>
              </Col>
              <Col> 
              <Select 
                placeholder="Airport Code - i.e. LAX"
                options={options}
                onChange={(e) => settoairport(e.value)}
                className="input" />
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