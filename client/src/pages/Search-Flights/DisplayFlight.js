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

  return (
    <Row>
        <Col lg={6} md={12}>
            <Card className="border border-warning m-3 p-3">
                <h3>Return Flight</h3>
                {getReturnFlights(props)}
            </Card>
        </Col>
        <Col lg={6} md={12}>
            <Card className="border border-warning m-3 p-3">
                <h3>Destination Flight</h3>
                {getDestinationFlights(props)}
            </Card>
        </Col>
    </Row>
  );
}

function getReturnFlights(props) {
    return props.result.route.map(leg => {
        if (leg.return === 1) {
            return getFlight(leg, props);
        }
    });    
}

function getDestinationFlights(props) {
    return props.result.route.map(leg => {
        if (leg.return === 0) {
            return getFlight(leg, props);
        }
    });
}

function getFlight(flight, props) {
    let durationdeparture = props.result.duration.departure;
    let durationreturn = props.result.duration.return;
    let ddh = CalculateDuration(durationdeparture);
    let rdh = CalculateDuration(durationreturn);
    console.log(props);
    console.log(props.result);
    console.log(flight);

     return <div key={flight.id} className="my-3">
        <div>{ConvertAirline(flight.airline)} - Flight #{flight.flight_no}</div>
        <div>{flight.cityFrom} -- Local Departure - {ConvertDateTime(flight.local_departure)}</div>
        <div>{flight.cityTo} -- Local Arrival - {ConvertDateTime(flight.local_arrival)}</div>
        <div>{(props.result.cityCodeFrom === flight.cityCodeFrom) ? ddh : ""}</div>
        <div>{(props.result.cityCodeTo === flight.cityCodeFrom) ? rdh : ""}</div>
    </div>
}

export default DisplayFlight;
