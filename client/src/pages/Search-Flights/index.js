import React, { useState, useEffect } from "react";
import Searchbar from "../../components/Searchbar/index.js"
import ConvertAirline from "./ConvertAirline";
import CalculateDuration from "./CalculateDuration";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import "./style.css"
import DisplayFlight from "./DisplayFlight.js";

const Search = () => {

    const [fromairport, setfromairport] = useState('');
    const [toairport, settoairport] = useState('');
    const [returnto, setreturnto] = useState('');
    const [dateto, setdateto] = useState('');
    const [searchresults, setsearchresults] = useState(null);
    const [displayflights, setdisplayflights] = useState(null);

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

        return (
          <div className="ui segment searchbar" id="searchbar">
          <div className="form">
            <form className="field">
              <input
                placeholder="From Airport"
                value={fromairport}
                onChange={(e) => setfromairport(e.target.value)}
                className="input"
              />
              <input
                placeholder="To Airport"
                value={toairport}
                onChange={(e) => settoairport(e.target.value)}
                className="input"
              />
              <input
                placeholder="Departure Date"
                value={dateto}
                onChange={(e) => setdateto(e.target.value)}
                className="input"
              />
              <input
                placeholder="Return Date"
                value={returnto}
                onChange={(e) => setreturnto(e.target.value)}
                className="input"
              />
                <button>Search</button>
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
                                <div>
                                <Table striped bordered hover key={result.id}>
                                    <tbody>
                                        <tr>
                                        <td className="searchresults">{airlinename}</td>
                                        <td>{result.flyFrom}</td>
                                        <td>{result.flyTo}</td>
                                        <td>${result.price}</td>
                                        <Button variant="primary" onClick={() => setdisplayflights(result.id)}>View Details</Button>
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
    };

export default Search;