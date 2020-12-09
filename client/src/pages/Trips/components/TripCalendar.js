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
              <Container fluid className="p-2">
                <Row>
                  <Calendar 
                    events={response.data.events}
                    start={response.data.trip.start}
                    end={response.data.trip.end}
                  />
                </Row>
                <Row>
                  <Col md={12} lg={6} xl={4}>
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
                        this.setState({ event: e.target.value });
                      }}
                    />
                  </Col>
                  <Col md={12} lg={6} xl={4}>
                    <TextField
                      id="startDate"
                      label="Start Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.setState({ startDate: e.target.value })}
                    />
                  </Col>
                  <Col md={12} lg={6} xl={4}>
                    <TextField
                      id="startTime"
                      label="Start Time"
                      type="time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.setState({ startTime: e.target.value })}
                    />
                  </Col>
                  <Col md={12} lg={6} xl={4}>
                    <TextField
                      id="endDate"
                      label="End Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.setState({ endDate: e.target.value })}
                    />
                  </Col>
                  <Col md={12} lg={6} xl={4}>
                    <TextField
                      id="endTime"
                      label="End Time"
                      type="time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => this.setState({ endTime: e.target.value })}
                    />
                  </Col>
                  <Col md={12} lg={6} xl={4}>
                    <button
                      className="btn btn-success btn-lg"
                      onClick={() => {
                        let result = {};

                        const user = JSON.parse(sessionStorage.getItem("user"));
                        result.tripId = this.props.tripId;
                        result.userId = user.id;
                        result.title = this.state.event;
                        result.start =
                          moment(this.state.startDate).format("YYYY-MM-DDT") + this.state.startTime + ":00";
                        result.end =
                          moment(this.state.endDate).format("YYYY-MM-DDT") + this.state.endTime + ":00";

                        console.log(result);

                        api.events.create(result).then(res => {
                          makeRequest({ params: { refresh: true } });
                        }).catch(error => {
                          console.log(error);
                        });
                      }}
                    >
                      Schedule
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
