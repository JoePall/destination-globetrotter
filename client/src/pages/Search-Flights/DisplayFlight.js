import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ConvertAirline from "./ConvertAirline";
import CalculateDuration from "./CalculateDuration";
import ConvertDateTime from "./ConvertDateTime";
import Col from "react-bootstrap/Col";

function DisplayFlight(props) {

    console.log("props = ", props);

  if (!props.result && props.result.route.length === 0) return null;
  console.log(props.result);

  if (props.result.route.length === 2) {
        return (
            <Row>
                <Col lg={6} md={12}>
                    <Card className="border border-warning m-3 p-3">
                        <h3>Departure Flight</h3>
                        {props.result.route.filter(r => r.return === 0).map((route, i) => getFlight(route, i, props))}
                    </Card>
                </Col>
                <Col lg={6} md={12}>
                    <Card className="border border-warning m-3 p-3">
                        <h3>Return Flight</h3>
                        {props.result.route.filter(r => r.return === 1).map((route, i) => getFlight(route, i+1, props))}
                    </Card>
                </Col>
            </Row>
        )
    }

    if (props.result.route.length === 4) {
        return (
            <Row>
                <Col lg={6} md={12}>
                    <Card className="border border-warning m-3 p-3">
                        <h3>Departure Flight</h3>
                        {props.result.route.filter(r => r.return === 0).map((route, i) => getFlight(route, i, props))}
                    </Card>
                </Col>
                <Col lg={6} md={12}>
                    <Card className="border border-warning m-3 p-3">
                        <h3>Return Flight</h3>
                        {props.result.route.filter(r => r.return === 1).map((route, i) => getFlight(route, i+2, props))}
                    </Card>
                </Col>
            </Row>
        )
    }
}

function getFlight(route, i, props) {
    console.log("route from getflight = ", route);
    console.log("i = " + i);
    let durationdeparture = props.result.duration.departure;
    let durationreturn = props.result.duration.return;
    let ddh = CalculateDuration(durationdeparture);
    let rdh = CalculateDuration(durationreturn);

     return <div key={i} className="my-3">
        <div>{ConvertAirline(props.result.route[i].airline)} - Flight #{props.result.route[i].flight_no}</div>
        <div>{props.result.route[i].cityFrom} -- Local Departure - {ConvertDateTime(props.result.route[i].local_departure)}</div>
        <div>{props.result.route[i].cityTo} -- Local Arrival - {ConvertDateTime(props.result.route[i].local_arrival)}</div>
        <div>{(props.result.cityCodeFrom === props.result.route[i].cityCodeFrom) ? ddh : ""}</div>
        <div>{(props.result.cityCodeTo === props.result.route[i].cityCodeFrom) ? rdh : ""}</div>
    </div>
}

export default DisplayFlight;
