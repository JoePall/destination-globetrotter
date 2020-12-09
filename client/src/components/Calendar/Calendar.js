import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Container from "react-bootstrap/Container";
import moment from "moment";

function Calendar(props) {
  return (
    <Container fluid>
      <h3 className="mx-auto text-center">Itinerary</h3>
      <FullCalendar
        headerToolbar={{ right: "list,dayGridMonth,timeGrid" }}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="timeGrid"
        visibleRange={{
          start: moment(props.start).format("yyyy-MM-DD"),
          end: moment(props.end).format("yyyy-MM-DD"),
        }}
        events={props.events.map(event => {
          let result = event;

          result.class = "fc-daygrid-event-dot";

          return result;
        })}
      />
    </Container>
  );
}

export default Calendar;
