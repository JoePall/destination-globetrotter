import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ConvertAirline from "./ConvertAirline";
import CalculateDuration from "./CalculateDuration";
import ConvertDateTime from "./ConvertDateTime";
import Col from "react-bootstrap/Col";

function DisplayFlight(props) {
  if (!props.result && props.result.route.length === 0) return null;
  console.log(props.result);

  
  let departureDuration = CalculateDuration(props.result.duration.departure);
  let returnDuration = CalculateDuration(props.result.duration.return);

  return (
    <Row>
        <Col lg={6} md={12}>
            <Card className="border border-warning m-3 p-3">
                <h3>Departure Flight</h3>
                <h5>Duration: {departureDuration}</h5>
                <DepartureFlights props={props} />
            </Card>
        </Col>
        <Col lg={6} md={12}>
            <Card className="border border-warning m-3 p-3">
                <h3>Return Flight</h3>
                <h5>Duration: {returnDuration}</h5>
                <ReturnFlights props={props} />
            </Card>
        </Col>
    </Row>
  );
}

function ReturnFlights(state) {
    console.log(state);
    return state.props.result.route.map(leg => {
        if (leg.return === 1) {
            return getFlight(leg);
        }
    });    
}

function DepartureFlights(state) {
    console.log(state);
    return state.props.result.route.map(leg => {
        if (leg.return === 0) {
            return getFlight(leg);
        }
    });
}

function getFlight(flight) {
     return <div key={flight.id} className="my-3">
        <div>{ConvertAirline(flight.airline)} - Flight #{flight.flight_no}</div>
        <div>{flight.cityFrom} -- Local Departure - {ConvertDateTime(flight.local_departure)}</div>
        <div>{flight.cityTo} -- Local Arrival - {ConvertDateTime(flight.local_arrival)}</div>
    </div>
}

export default DisplayFlight;
