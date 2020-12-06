import React from "react";
import Container from "react-bootstrap/Container";
import { Get } from "react-axios";
import Calendar from "../../../components/Calendar/Calendar";

function TripCalendar(props) {
  console.log(props.tripId);
  return (
    <Get url={"/api/eventsfromtrip/" + props.tripId}>
      {(error, response) => {
        if (response !== null) {
          console.log(response);
          console.log(response.data.trip.start);
          console.log(response.data.trip.end);
          console.log(JSON.stringify(response.data.events));
          return (
            <Container fluid className="p-5">
              <Calendar events={response.data.events} start={response.data.trip.start} end={response.data.trip.end} />
            </Container>
          );
        }
        return <></>;
      }}
    </Get>
  );
}

export default TripCalendar;
