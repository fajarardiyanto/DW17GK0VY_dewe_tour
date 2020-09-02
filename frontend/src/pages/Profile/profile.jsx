import React, { useState, useEffect } from "react";

import "./css/profile.css";

import Map from "../../Images/place.png";
import Name from "../../Images/name.png";
import Phone from "../../Images/local_phone.png";
import Mail from "../../Images/local_post_office.png";

import axios from "axios";
import { useParams } from "react-router-dom";
import History from "../../components/Card/History";
import Footer from "../../components/Footer/footer";
import ModalPhoto from "../../components/Modal/ModalPhoto";
import { useMutation, queryCache } from "react-query";
import HeaderPage from "../../components/Header/HeaderPage";
import { Card, Container, Col, Button, Row, Form } from "react-bootstrap";

function Profile() {
  const { id } = useParams();

  const [userResult, setUserResult] = useState([]);
  const [showModalPic, setModalPic] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [currentImage, setCurrentImage] = useState({
    profilImage: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUser() {
      const res = await axios(`http://localhost:8080/api/v1/user/${id}`);

      setUserResult(res.data.usersById);
    }
    getUser();
  }, []);

  const handleInputPicture = async () => {
    try {
      let fd = new FormData();

      fd.append("profilImage", currentImage.profilImage);

      await axios.patch(`http://localhost:8080/api/v1/user/${id}`, fd, {
        header: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setModalPic(false);
    } catch (err) {}
  };

  const [handleAddImage] = useMutation(handleInputPicture, {
    onSuccess: () => {
      queryCache.prefetchQuery("users", currentImage);
    },
  });

  const onChange = (e) => {
    const updateForm = { ...currentImage };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setCurrentImage(updateForm);
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
    handleAddImage();
  };

  const showModal = () => {
    setModalPic(true);
  };

  const closeModal = () => {
    setModalPic(false);
  };

  console.log(userResult);

  return (
    <div>
      <HeaderPage />
      <Container>
        <Row>
          <Card className="card-profile">
            <Card.Body>
              <Col>
                <h1 className="card-header-profile">Personal Info</h1>
              </Col>
              <Col className="col-profile">
                <img src={Name} className="icon-profile-size" alt="icon" />
                <h5 className="text-profil-title">{userResult.fullName}</h5>
                <p className="text-profile-muted">Full name</p>
              </Col>
              <Col className="col-profile">
                <img src={Mail} className="icon-profile-size" alt="icon" />
                <h5 className="text-profil-title">{userResult.email}</h5>
                <p className="text-profile-muted">Email</p>
              </Col>
              <Col className="col-profile">
                <img src={Phone} className="icon-profile-size" alt="icon" />
                <h5 className="text-profil-title">{userResult.phone}</h5>
                <p className="text-profile-muted">Mobile phone</p>
              </Col>
              <Col className="col-profile">
                <img src={Map} className="icon-profile-size" alt="Map" />
                <h5 className="text-profil-title">{userResult.address}</h5>
                <p className="text-profile-muted">Address</p>
              </Col>

              <img
                src={`http://localhost:8080/Images/${userResult.imgProfil}`}
                className="img-foto-profile"
                alt="Profile"
              />
              <Button
                variant="flat"
                className="btn-change-foto"
                onClick={showModal}
              >
                Change Photo Profile
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <h2
        style={{
          color: "#000",
          fontSize: "36px",
          textAlign: "left",
          marginLeft: "150px",
          marginTop: "70px",
          marginBottom: "-40px",
          fontWeight: "700",
        }}
      >
        History Trip
      </h2>
      <History />
      <ModalPhoto
        show={showModalPic}
        onHide={closeModal}
        body={
          <Form encType="multipart/form-data" onSubmit={(e) => onSubmit(e)}>
            <Form.File className="form__group">
              <Form.File.Input
                type="file"
                name="profilImage"
                onChange={(e) => {
                  onChange(e);
                  onChangeFileImage(e);
                }}
              />
            </Form.File>
            <div style={{ marginTop: "10px" }} className="div-preview-size">
              <img
                src={previewSrc}
                className="preview-film preview-size"
                alt=""
              />
            </div>
            <Button type="submit" variant="flat" className="btn__add__profile">
              Submit
            </Button>
          </Form>
        }
      />
      <Footer />
    </div>
  );
}

export default Profile;
