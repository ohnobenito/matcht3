import React, { useState, useEffect } from "react";
import "./Search.css";
import API from "../../utils/API";
import SwipeCard from "react-tinder-card";
import { Form, Col, Container, Row, Card} from "react-bootstrap";
//import { AuthContext } from "../../Auth";
import Brand from "../../components/Brand/Brand";


function Search() {
  const [jobsData, setJobsData] = useState([]);
  const [locationSearched, setLocationSearched] = useState([]);
  

  useEffect(() => {
    loadJobData();
  }, []);

  function loadJobData() {
    API.getJobs()
      .then((res) => {
        setLocationSearched(res.data);
        setJobsData(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleInputLocationChange(event) {
    let newJobs = locationSearched.filter((res) => {
      let searchValue = res.candidate_required_location.toLowerCase();
      let searchedIndex = searchValue.indexOf(event.target.value) !== -1;
      return searchedIndex;
    });
    setJobsData(newJobs);
  }

  function onSwipe(e, direction) {
    let index = e;
    console.log("you swiped " + direction);
    if (direction === "right") {
      API.saveLikedJob({
        url: jobsData[index].url,
        title: jobsData[index].title,
        company_name: jobsData[index].company_name,
        job_type: jobsData[index].job_type,
        candidate_required_location:
          jobsData[index].candidate_required_location,
      }).catch((err) => console.log(err));
    }
  }

  
  return (
    <div className="searchpage">
    <Container>
      <Row>
        <Col md="auto">
        <Brand />
        <Form>
          <Form.Group>
            <Form.Label className="Search-header">
              Search Location{" "}
            </Form.Label>
            <Col>
            <Form.Control
            className="m-1"
            type="search"
            placeholder="Country"
            onChange={handleInputLocationChange.bind(this)} 
            />
            </Col>
          </Form.Group>
        </Form>
        </Col>
        <Col md="auto">
          {jobsData.map((res, index) => (
            <SwipeCard
            className="swipe"
            key={res._id}
            prevntSwipe={["up", "down"]}
            onSwipe={(e) => onSwipe(index, e)}
            job={index}
            >
              <Card bsPrefix="cardBody">
  <Card.Header bsPrefix="cardHeaderCompany">{res.company_name}</Card.Header>
  <Card.Body>
    <Card.Title bsPrefix="title"> {res.title}</Card.Title>
    <Card.Title> {res.job_type} {res.category}, {res.candidate_required_location}</Card.Title>
    <Card.Title> {" "} <a href={res.url}> Link to Posting </a> {" "}</Card.Title>
    <hr className="my-4" />
    <Card.Text className="cardText"> {res.description}</Card.Text>
  </Card.Body>
</Card>
            </SwipeCard>
          ))}
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Search;