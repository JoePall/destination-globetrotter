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
import Select from "react-select";
import Loader from "react-loader-spinner";
import options from "../../utils/airports.json";
import { useHistory } from "react-router-dom";

const Search = () => {
  const history = useHistory();
  let selectedDestination = undefined;
  if (history.location && history.location.state && history.location.state.location) {
    selectedDestination = history.location.state.location;
  }

  const [fromairport, setfromairport] = useState('');
  const [toairport, settoairport] = useState('');
  const [returnto, setreturnto] = useState(false);
  const [dateto, setdateto] = useState('');
  const [searchresults, setsearchresults] = useState(null);
  const [displayflights, setdisplayflights] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [sortby, setsortby] = useState(null);

  useEffect(() => {
      const timeoutID = setTimeout(() => {
          if (fromairport && toairport && dateto && returnto && sortby) {
              console.log(fromairport)
              console.log(toairport)
              console.log(returnto)
              console.log(dateto)
              console.log("sortby = " + sortby);
              setisLoading(true);
              setsearchresults(null);
              Searchbar(returnto, dateto, fromairport, toairport, setsearchresults, sortby);
          }
      }, 750);
      return () => {
        clearTimeout(timeoutID);
        setisLoading(false)
      };
  }, [fromairport, toairport, dateto, returnto, sortby]);

  const displayloading = () => {
    return (<Loader className="p-5 loadingclass" type="Bars" color="#00eFFF44" height={200} width={200} />
    )
  }

  const selectflightfunction = (result, i) => {
    const button = document.getElementById(i);
    button.disabled = true;
    button.innerHTML = "Saved";
    api.bookmark.create({data: result}).then(response => {console.log(response); return(response)})
  }
  
  const createTrip = (result, i) => {
    const button = document.getElementById(i);
    button.disabled = true;
    api.bookmark.create({data: result}).then(bookmark => {
      console.log(bookmark);
      api.trip.create({ location: result.cityTo, start: result.route[0].local_departure, end: result.route[result.route.length - 1].local_arrival }).then(trip => {
        console.log(trip);
        api.trip_bookmark.create({ tripId: 1, bookmarkId: 1 });
        const user = JSON.parse(sessionStorage.getItem("user"));
        api.trip_user.create({ userId: user.id, tripId: trip.id });
      }) 

      location.assign("/trips/" + "1")
    });
  }

  return (
    <div className="ui segment searchbar" id="searchbar">
      <div className="form">
        <form className="field">
          <Form.Row>
            <Col className="firstcolumn">            
              <label>Sort By</label>
            </Col>
            <Col className="secondcolumn">
              <fieldset>
                <div className="radiobutton">
                  <input className="radio" type="radio" value="price" name="sortresby"  onChange={(e) => setsortby(e.target.value)}/>
                  <label htmlFor="price">Price</label>
                  <input className="radio" type="radio" value="duration" name="sortresby"  onChange={(e) => setsortby(e.target.value)}/>
                  <label htmlFor="duration">Duration</label>
                  <input className="radio" type="radio" value="quality" name="sortresby"  onChange={(e) => setsortby(e.target.value)}/>
                  <label htmlFor="quality">Quality</label>
                  <input className="radio" type="radio" value="date" name="sortresby"  onChange={(e) => setsortby(e.target.value)}/>
                  <label htmlFor="date">Date</label>
                </div>
              </fieldset>
            </Col>
          </Form.Row>
          <Form.Row> 
            <Col className="firstcolumn">            
              <label>Departure Airport</label>
            </Col>
            <Col className="secondcolumn"> 
              <Select
                  placeholder="Airport Code - i.e. MCI"
                  options={options.map((option) => {
                    return {
                      value: option[option.length - 1],
                      label: option[0].trim() + ", " + option[1].trim() + (option.length === 2 ? option[2] : "") + " - " + option[option.length - 1], 
                      search: option[0].split(" ")[0]
                    };
                  })}
                  onChange={(e) => setfromairport(e.value)}
                  className="input"
              />
            </Col>
          </Form.Row>
          <Form.Row> 
            <Col className="firstcolumn">            
              <label>Destination Airport</label>
            </Col>
            <Col className="secondcolumn"> 
              <Select
                  placeholder="Airport Code - i.e. LAX"
                  defaultValue={(selectedDestination) ? selectedDestination : ""}
                  options={options.map((option) => {
                    return {
                      value: option[option.length - 1],
                      label: option[0].trim() + ", " + option[1].trim() + (option.length === 2 ? option[2] : "") + " - " + option[option.length - 1], 
                      search: option[0].split(" ")[0]
                    };
                  })}
                  onChange={(e) => settoairport(e.value)}
                  className="input"
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col className="firstcolumn">            
              <label>Departure Date</label>
            </Col>
            <Col className="secondcolumn"> 
              <DatePicker
                placeholder="Departure Date"
                value={dateto}
                dateFormat="dd/MM/yyyy"
                selected={dateto}
                minDate={new Date()}
                onChange={date => setdateto(date)}
                className="input"
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col className="firstcolumn">            
              <label>Return Date</label>
            </Col>
            <Col className="secondcolumn"> 
              <DatePicker
                placeholder="Return Date"
                value={returnto}
                dateFormat="dd/MM/yyyy"
                selected={returnto}
                minDate={new Date()}
                onChange={date => setreturnto(date)}
                className="input"
              />
            </Col>
          </Form.Row>
      </form>
      </div>

      { (isLoading && !searchresults) ? displayloading() : "" }
      { searchresults && searchresults.map( (result, i) => {
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
                      <td><Button id = {i} className = "selectbutton" variant="primary" onClick={() => selectflightfunction(result, i)}>Select</Button></td>
                      <td><Button id = {i} className = "tripbutton" variant="secondary" onClick={() => createTrip(result, i)}>Create Trip</Button></td>
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