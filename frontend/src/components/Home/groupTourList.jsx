import React from "react";
import "./css/groupTour.css";
import GroupTourItem from "./groupTourItem";
import { useQuery } from "react-query";
import { CardDeck, Container } from "react-bootstrap";

const GroupTourList = (props) => {
  const fetchTrip = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/trips");

      return response.json();
    } catch (err) {}
  };

  const { isLoading, data } = useQuery("trips", fetchTrip);

  return (
    <div>
      <Container className="App">
        <h1 className="up">{props.titles}</h1>
        <CardDeck>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {data.data.trip.map((trip) => (
                <div key={trip.id} className="cards">
                  <GroupTourItem
                    paramId={trip.id}
                    img={`http://localhost:8080/Images/${trip.image}`}
                    title={trip.title}
                    price={trip.price}
                    country={trip.country.name}
                  />
                </div>
              ))}
            </>
          )}
        </CardDeck>
      </Container>
    </div>
  );
};

export default GroupTourList;
