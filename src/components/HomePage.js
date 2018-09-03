import React, { Component } from "react";
import image1 from "../images/nasiuduk.jpg";
import image2 from "../images/nasiliwet.png";
import image3 from "../images/nasigudeg.jpg";
import image4 from "../images/nasipecel.jpg";
import image5 from "../images/nasitimbel.jpg";
import CarouselMenu from "./Carousel";

class HomePage extends Component {
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <CarouselMenu
          legend1={"Nasi Uduk"}
          image1={image1}
          legend2={"Nasi Liwet"}
          image2={image2}
          legend3={"Nasi Gudeg"}
          image3={image3}
          legend4={"Nasi Pecel"}
          image4={image4}
          legend5={"Nasi Timbel"}
          image5={image5}
          judul={"Selamat Datang di Warung Melati Mas"}
        />
      </div>
    );
  }
}

export default HomePage;
