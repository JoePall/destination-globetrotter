import "date-fns";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Get } from "react-axios";
import Calendar from "../../../components/Calendar/Calendar";
import TextField from "@material-ui/core/TextField";
import api from "../../../utils/API";
import moment from "moment";
import Select from "react-select";
import { Card } from "@material-ui/core";

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
        {(error, response, isLoading, makeRequest, axios) => {
          if (response !== null) {
            console.log(response);
            console.log(response.data.trip.start);
            console.log(response.data.trip.end);
            console.log(JSON.stringify(response.data.events));
            return (
              <>
                <Calendar
                  events={response.data.events}
                  start={response.data.trip.start}
                  end={response.data.trip.end}
                />
                <Card className="mx-auto w-100 my-3 p-3">
                  <Container fluid className="p-2">
                    <Row>
                      <h3>Schedule your Itinerary</h3>
                    </Row>
                    <Row>
                      <Col sm={12} md={6} lg={4} xl={4}>
                        <TextField
                          className="d-flex mt-3"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="eventTitle"
                          label="Event Title"
                          name="eventTitle"
                          type="text"
                          onInput={(e) => {
                            this.setState({ event: e.target.value });
                          }}
                        />
                      </Col>
                      <Col sm={12} md={6} lg={4} xl={1}>
                        <TextField
                          className="d-flex mt-3"
                          id="startDate"
                          label="Start Date"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) =>
                            this.setState({ startDate: e.target.value })
                          }
                        />
                      </Col>
                      <Col sm={12} md={6} lg={4} xl={1}>
                        <TextField
                          className="d-flex mt-3"
                          id="startTime"
                          label="Start Time"
                          type="time"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) =>
                            this.setState({ startTime: e.target.value })
                          }
                        />
                      </Col>
                      <Col sm={12} md={6} lg={4} xl={1}>
                        <TextField
                          className="d-flex mt-3"
                          id="endDate"
                          label="End Date"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) =>
                            this.setState({ endDate: e.target.value })
                          }
                        />
                      </Col>
                      <Col sm={12} md={6} lg={4} xl={1}>
                        <TextField
                          id="endTime"
                          label="End Time"
                          type="time"
                          className="d-flex mt-3"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) =>
                            this.setState({ endTime: e.target.value })
                          }
                        />
                      </Col>
                      <Col sm={12} md={6} lg={4} xl={3}>
                        <button
                          className="mt-3 btn btn-success btn-lg"
                          onClick={() => {
                            let result = {};

                            const user = JSON.parse(
                              sessionStorage.getItem("user")
                            );
                            result.tripId = this.props.tripId;
                            result.userId = user.id;
                            result.title = this.state.event;
                            result.start =
                              moment(this.state.startDate).format(
                                "YYYY-MM-DDT"
                              ) +
                              this.state.startTime +
                              ":00";
                            result.end =
                              moment(this.state.endDate).format("YYYY-MM-DDT") +
                              this.state.endTime +
                              ":00";

                            console.log(result);

                            api.events
                              .create(result)
                              .then((res) => {
                                makeRequest({ params: { refresh: true } });
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          Schedule
                        </button>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </>
            );
          }
          return <></>;
        }}
      </Get>
    );
  }
}

export default TripCalendar;
