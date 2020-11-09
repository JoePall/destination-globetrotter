import React from "react";
import Card from 'react-bootstrap/Card';
import ConvertAirline from "./ConvertAirline";
import CalculateDuration from "./CalculateDuration";
// import Button from 'react-bootstrap/Table'


function DisplayFlight(props) {
    let durationdeparture = props.result.duration.departure;
    let durationreturn = props.result.duration.return;
    let duration = null;
    let ddh = CalculateDuration(duration=durationdeparture);
    let rdh = CalculateDuration(duration=durationreturn);

    // let i=0;
    if (!props.result && props.result.route.length === 0) return (null)
    return (
        <div>
            <Card style={{ width: '50vw' }}>
                <Card.Img variant="top" src="" />
                <Card.Body>
                    {props.result.route.map((route, i) => (
                        <div key={i}>
                            <Card.Title>Flight Detail</Card.Title>
                                <Card.Text>
                                    <div>{ConvertAirline(props.result.route[i].airline)} - Flight #{props.result.route[i].flight_no}</div>
                                    <div>{props.result.route[i].cityFrom} -- Local Departure - {props.result.route[i].local_departure}</div>
                                    <div>{props.result.route[i].cityTo} -- Local Arrival - {props.result.route[i].local_arrival}</div>
                                    <div>{(props.result.cityCodeFrom === props.result.route[i].cityCodeFrom) ? ddh : ""}</div>
                                    <div>{(props.result.cityCodeTo === props.result.route[i].cityCodeFrom) ? rdh : ""}</div>
                                </Card.Text>
                            <div>----------------------------------------------------</div>
                        </div>
                    ))}
                </Card.Body>
            </Card>
        </div>
    )
}

export default DisplayFlight