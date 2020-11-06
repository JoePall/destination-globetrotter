import React, { useState, useEffect } from "react";
import Searchbar from "../../components/Searchbar/index.js"
import ConvertAirline from "./ConvertAirline";
import CalculateDuration from "./CalculateDuration";
import Table from 'react-bootstrap/Table'
// const axios = require("axios");
import "./style.css"


const Search = () => {
    const [fromairport, setfromairport] = useState('');
    const [toairport, settoairport] = useState('');
    const [returnto, setreturnto] = useState('');
    const [dateto, setdateto] = useState('');
    const [searchresults, setsearchresults] = useState(null)

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

        // if ({searchresults} !== 'null') console.log({searchresults})

        return (
            <div className="ui segment searchbar">
                <form className="ui form">
                    <div className="field">
                        <label className="searchlabels">From Airport - </label>
                        <input 
                            value={fromairport} 
                            onChange={(e) => setfromairport(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <label className="searchlabels">To Airport - </label>
                        <input 
                            value={toairport} 
                            onChange={(e) => settoairport(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <label className="searchlabels">Departure Date - </label>
                        <input 
                            value={dateto} 
                            onChange={(e) => setdateto(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <label className="searchlabels">Return Date - </label>
                        <input 
                            value={returnto} 
                            onChange={(e) => setreturnto(e.target.value)} 
                            className="input"
                        />

                    </div>
                </form>
                <br />
                <br />
                {
                    searchresults &&
                    searchresults.map( result => {
                        
                        // console.log("result.airline[0] = ", result.airlines[0]);
                        let airlinename = ConvertAirline(result.airlines[0]);
                        // console.log("airlinename = ", airlinename);
                        let ddh = CalculateDuration(result.duration.departure);
                        let rdh = CalculateDuration(result.duration.return);
                        let flightnumbers = "";
                        for (let i = 0; i < result.route.length; i++) {
                            flightnumbers = flightnumbers + result.route[i].operating_flight_no + " | " ;
                        }

                        if (ddh === -1 || rdh === -1) {
                            // console.log("in if statement");
                            // console.log("ddh = ", ddh);
                            // console.log("rdh = ", rdh);
                            // console.log("toooo long");
                            return (null)
                            } else {
                            return <Table striped bordered hover>
                                <tbody>
                                    <tr key={result.id}>
                                    <td className="searchresults">{flightnumbers}</td>
                                    <td className="searchresults">{airlinename}</td>
                                    <td>{result.flyFrom}</td>
                                    <td>{result.flyTo}</td>
                                    <td>${result.price}</td>
                                    <td>{ddh}</td>
                                    <td>{rdh}</td>
                                    </tr>
                                </tbody>
                                </Table>
                            }
                    })
                }
            </div>  
        );
    };

export default Search;