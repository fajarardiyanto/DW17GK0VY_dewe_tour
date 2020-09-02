import React, { useState } from "react";

import "./css/addTrip.css";
import Icon from "../../Images/Icon.png";

import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import { useQuery, useMutation, queryCache } from "react-query";
import { Jumbotron, Container, Button, Col, Form } from "react-bootstrap";
import DropdownAdmin from "../../components/Dropdown/dropdownAdmin";

const AddTrip = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [previewSrc, setPreviewSrc] = useState(null);
  const [forms, setForm] = useState({
    title: "",
    countryId: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    dateTrip: "",
    price: "",
    quota: "",
    description: "",
    tripImage: "",
  });

  const token = localStorage.getItem("token");

  const handleInputTrip = async () => {
    try {
      let fd = new FormData();

      fd.append("title", forms.title);
      fd.append("countryId", forms.countryId);
      fd.append("accomodation", forms.accomodation);
      fd.append("transportation", forms.transportation);
      fd.append("eat", forms.eat);
      fd.append("day", forms.day);
      fd.append("night", forms.night);
      fd.append("dateTrip", forms.dateTrip);
      fd.append("price", forms.price);
      fd.append("quota", forms.quota);
      fd.append("description", forms.description);
      fd.append("tripImage", forms.tripImage);

      const res = await axios
        .post("http://localhost:8080/api/v1/trip", fd, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(refetch);

      return res;
    } catch (err) {
      const resError = err.response.data.error.message;
      return setError(resError);
    }
  };

  const [handleAddTrip, { refetch }] = useMutation(handleInputTrip, {
    onSuccess: () => {
      queryCache.prefetchQuery("users", forms);
    },
  });

  const onChange = (e) => {
    const updateForm = { ...forms };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(updateForm);
  };

  const onChangeFileImage = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
      setPreviewSrc([reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddTrip();
    {
      error && history.push(`/incoming`);
    }
  };

  const fetchCountrys = async () => {
    const res = await fetch("http://localhost:8080/api/v1/countrys");

    return res.json();
  };

  const { isLoading, data: dataCountry } = useQuery("countrys", fetchCountrys);

  console.log({ dataCountry });

  return (
    <div>
      <Jumbotron fluid className="jumbotrons">
        <Link to="/">
          <img className="logo" src={Icon} alt="Icon" />
        </Link>
        <DropdownAdmin />
      </Jumbotron>
      <h3 className="title__add__trip">Add Trip</h3>
      <Container>
        {error && (
          <div className="my-3 alert alert-danger text-center">{error}</div>
        )}
        <Form encType="multipart/form-data" onSubmit={(e) => onSubmit(e)}>
          <Form.Group className="form__group">
            <Form.Label>Title Trip</Form.Label>
            <Form.Control
              className="form__control"
              type="text"
              value={forms.title}
              onChange={(e) => onChange(e)}
              name="title"
            />
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Country</Form.Label>
            <Form.Control
              className="form__control"
              as="select"
              name="countryId"
              value={forms.countryId}
              onChange={(e) => onChange(e)}
            >
              <option>Select Country</option>
              {dataCountry == null || isLoading
                ? "loading"
                : dataCountry.data.countrys.map((country) => (
                    <option value={country.id}>{country.name}</option>
                  ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Accommodation</Form.Label>
            <Form.Control
              className="form__control"
              type="text"
              name="accomodation"
              value={forms.accomodation}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Transportation</Form.Label>
            <Form.Control
              className="form__control"
              type="text"
              name="transportation"
              value={forms.transportation}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Eat</Form.Label>
            <Form.Control
              className="form__control"
              type="text"
              name="eat"
              value={forms.eat}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Duration</Form.Label>
            <Form.Row className="form__group">
              <Col sm={2}>
                <Form.Control
                  className="form__control"
                  type="text"
                  name="day"
                  value={forms.day}
                  onChange={(e) => onChange(e)}
                />
              </Col>
              <Form.Label style={{ margin: "4px" }}>Day</Form.Label>
              <Col sm={2}>
                <Form.Control
                  className="form__control"
                  type="text"
                  name="night"
                  value={forms.night}
                  onChange={(e) => onChange(e)}
                />
              </Col>
              <Form.Label style={{ marginTop: "4px" }}>Night</Form.Label>
            </Form.Row>
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Date Trip</Form.Label>
            <Form.Control
              className="form__control"
              type="date"
              name="dateTrip"
              value={forms.dateTrip}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className="form__control"
              type="number"
              name="price"
              value={forms.price}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Quota</Form.Label>
            <Form.Control
              className="form__control"
              type="number"
              name="quota"
              value={forms.quota}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className="form__group">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="form__control"
              as="textarea"
              rows="3"
              name="description"
              value={forms.description}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Col sm={3}>
            <Form.File className="form__group">
              <Form.File.Label>Regular file input</Form.File.Label>
              <Form.File.Input
                type="file"
                name="tripImage"
                onChange={(e) => {
                  onChange(e);
                  onChangeFileImage(e);
                }}
              />
            </Form.File>
            <div style={{ marginTop: "10px" }}>
              <img src={previewSrc} className="preview-film" alt="" />
            </div>
          </Col>
          <Button type="submit" variant="flat" className="btn__add__trip">
            Submit
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default AddTrip;
