import React, { useState, useEffect } from "react";
import Search from "./Search"
// const axios = require("axios");
import "./style.css"


const SearchBar = () => {

    const [fromairport, setfromairport] = useState('');
    const [toairport, settoairport] = useState('');
    const [datefrom, setdatefrom] = useState('');
    const [dateto, setdateto] = useState('');
    const [searchresults, setsearchresults] = useState(null)

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (fromairport && toairport && dateto) {
                console.log(fromairport)
                console.log(toairport)
                console.log(datefrom)
                console.log(dateto)
                Search(datefrom, dateto, fromairport, toairport, setsearchresults);
            }
        }, 750);
        return () => {
            clearTimeout(timeoutID);
        };
    }, [fromairport, toairport, datefrom, dateto]);

        console.log({searchresults})

        return (
            <div className="ui segment searchbar">
                <form className="ui form">
                    <div className="field">
                        <label>From Airport </label>
                        <input 
                            value={fromairport} 
                            onChange={(e) => setfromairport(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <br />
                        <label>To Airport </label>
                        <input 
                            value={toairport} 
                            onChange={(e) => settoairport(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <br />
                        <label>Date To </label>
                        <input 
                            value={dateto} 
                            onChange={(e) => setdateto(e.target.value)} 
                            className="input"
                        />
                        <br />
                        <br />
                        <label>Date From </label>
                        <input 
                            value={datefrom} 
                            onChange={(e) => setdatefrom(e.target.value)} 
                            className="input"
                        />

                    </div>
                </form>
                <ul>
                    {
                        searchresults &&
                        searchresults.map( result => {
                            return <li key={result.id}>
                                {result.airlines} - 
                                {result.flyFrom} - 
                                {result.flyTo} - 
                                {result.price} - 
                                </li>
                        })
                    }
                </ul>
            </div>  
        );
    };

export default SearchBar;