import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Error from "../../pages/Error";
import { Get } from "react-axios";
import Loading from "../Loading";
import { Col, Row } from "react-bootstrap";

function Nearby(props) {

  return (
    <Container fluid>
      <Get url={"/api/trip/" + props.tripId}>
        {(error, response) => {
          if (error) {
            return <Error />;
          } else if (response !== null) {
            console.log(response);
            let url =
            "https://www.mapquestapi.com/search/v2/radius?origin=" +
            response.data.location.replace(" ", "+") +
            "&radius=50&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|799604&outFormat=json&key=ASMatA0AMLE" 
            + "4emLLJhCLxKEUqjUeA91V";
            console.log(url);
            return (
              <Get url={url}>
              {(error, response) => {
                if (error) {
                  return <Error />;
                } else if (response !== null) {
                  console.log(response);
                  if (!response.data.searchResults) return <></>;
                  return <Container fluid>
                    <Row>
                    <h3 className="mx-auto text-center">Nearby</h3>
                    </Row>
                    <Row>
                      {response.data.searchResults.map(item => 
                      <Col key={item.fields.mqap_id} xs={12} md={6} lg={4} xl={3}>
                        <Card className="px-4 py-2 bg-light my-3">
                          <h4 className="font-weight-light">{item.name}</h4>
                          <h6>{item.fields.address + " " + item.fields.city + ", " + item.fields.state} | {item.fields.group_sic_code_name_ext}</h6>
                        </Card>
                      </Col>)}
                    </Row>
                  </Container>;
                }
                return <Loading />;
              }}
            </Get>
            );
          }
          return <Loading />;
        }}
      </Get>
    </Container>
  );
}

function NearbyItem(props) {
  let query =
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&minwidth=200&key=AIzaSyC436X7i-RDG3j1NmDo3GIDiJBJkWuju7g&photoreference=" +
    props.photoreference;

  return (
    <Container fluid>
      <Get url={query}>
        {(error, response) => {
          if (error) {
            return <Error />;
          } else if (response !== null) {
            console.log(response);
          }
          return <Loading />;
        }}
      </Get>
    </Container>
  );
}

export default Nearby;
