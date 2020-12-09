import "date-fns";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Get } from "react-axios";
import Calendar from "../../../components/Calendar/Calendar";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import api from "../../../utils/API";
import moment from "moment";

class TripCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      startDate: new Date("2014-08-18T21:11:54"),
      endDate: new Date("2014-08-18T21:11:54"),
    };
  }

  render() {
    return (
      <Get url={"/api/eventsfromtrip/" + this.props.tripId}>
        {(error, response) => {
          if (response !== null) {
            console.log(response);
            console.log(response.data.trip.start);
            console.log(response.data.trip.end);
            console.log(JSON.stringify(response.data.events));
            return (
              <Container fluid className="p-2">
                <Row>
                  <Calendar
                    events={response.data.events}
                    start={response.data.trip.start}
                    end={response.data.trip.end}
                  />
                </Row>
                <Row>
                  <Col>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="eventTitle"
                      label="Title"
                      name="eventTitle"
                      autoFocus
                      type="text"
                      className="mx-auto"
                      onInput={(e) => {
                        this.setState({ event: e });
                      }}
                    />
                  </Col>
                  <Col>
                    <DatePicker
                      className="mt-3"
                      id="selectedStartDate"
                      name="selectedStartDate"
                      value={this.state.startDate}
                      onChange={(e) =>
                        this.setState({ startDate: moment(e).format("YYYY-MM-DDTHH:mm:ss") })
                      }
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      placeholderText="Start Date/Time"
                    />
                  </Col>
                  <Col>
                    <DatePicker
                      className="mt-3"
                      id="selectedEndDate"
                      name="selectedEndDate"
                      value={this.state.endDate}
                      onChange={(e) =>
                        this.setState({ endDate: moment(e).format("YYYY-MM-DDTHH:mm:ss") })
                      }
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      placeholderText="End Date/Time"
                    />
                  </Col>
                  <Col>
                    <button
                      className="btn btn-success my-4 w-75 mx-auto btn-lg"
                      onClick={() => {
                        let result = {};

                        const user = JSON.parse(sessionStorage.getItem("user"));
                        result.tripId = this.props.tripId;
                        result.userId = user.id;
                        result.title = this.Event;
                        result.start = moment(this.startDate);
                        result.end = moment(this.endDate);

                        console.log(result);

                        api.events.create(result);
                      }}
                    >
                      Save
                    </button>
                  </Col>
                </Row>
              </Container>
            );
          }
          return <></>;
        }}
      </Get>
    );
  }
}

export default TripCalendar;
