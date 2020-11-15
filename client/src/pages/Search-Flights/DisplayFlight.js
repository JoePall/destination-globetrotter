import React from "react";
import Card from 'react-bootstrap/Card';
import ConvertAirline from "./ConvertAirline";
import CalculateDuration from "./CalculateDuration";
import ConvertDateTime  from "./ConvertDateTime";
// import Button from 'react-bootstrap/Table'


function DisplayFlight(props) {
    let durationdeparture = props.result.duration.departure;
    let durationreturn = props.result.duration.return;
    let ddh = CalculateDuration(durationdeparture);
    let rdh = CalculateDuration(durationreturn);

    // let i=0;
    if (!props.result && props.result.route.length === 0) return (null)
    return (
        <div>
            <Card className="mx-auto my-3 col-9">
                <Card.Img variant="top" src="" />
                <Card.Body>
                    {props.result.route.map((route, i) => (
                        <div key={i}>
                            <Card.Title className="cardtitle">Flight Detail</Card.Title>
                                <Card.Text className="cardtext">
                                    <div>{ConvertAirline(props.result.route[i].airline)} - Flight #{props.result.route[i].flight_no}</div>
                                    <div>{props.result.route[i].cityFrom} -- Local Departure - {ConvertDateTime(props.result.route[i].local_departure)}</div>
                                    <div>{props.result.route[i].cityTo} -- Local Arrival - {ConvertDateTime(props.result.route[i].local_arrival)}</div>
                                    <div>{(props.result.cityCodeFrom === props.result.route[i].cityCodeFrom) ? ddh : ""}</div>
                                    <div>{(props.result.cityCodeTo === props.result.route[i].cityCodeFrom) ? rdh : ""}</div>
                                    <div className="flightdetaildivider">{(props.result.cityCodeTo === props.result.route[i].cityCodeTo) ? "****************************" : ""}</div>
                                </Card.Text>
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
}

export default DisplayFlight