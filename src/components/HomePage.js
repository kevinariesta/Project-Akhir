import React, { Component } from "react";
import { Media } from 'react-bootstrap';
import image1 from "../images/nasiuduk.jpg";
import image2 from "../images/nasiliwet.png";
import image3 from "../images/nasigudeg.jpg";
import image4 from "../images/nasipecel.jpg";
import image5 from "../images/nasitimbel.jpg";
import CarouselMenu from "./Carousel";

class HomePage extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#f4831f'}}>
        <div id="homepage">
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
        <Media style={{ marginLeft: '50px' }}>
          <Media.Left>
            <img width={600} height={400} src={image5} alt="Nasi Timbel" />
          </Media.Left>
          <Media.Body style={{ verticalAlign: 'middle' }}>
            <h1>Paket Nasi Timbel</h1>
            <p>Nasi Timbel + Empal + Tahu + Tempe</p>
            <h3>HANYA Rp. 40.000,-</h3>
            <input type="button" className="btn btn-primary" value="PESAN SEKARANG" />
          </Media.Body>
        </Media>
        <Media style={{ marginRight: '50px' }}>
          <Media.Body style={{ verticalAlign: 'middle' }}>
            <h1>Paket Nasi Uduk</h1>
            <p>Nasi Uduk + Telur Balado + Mie Goreng + Tempe Kecap</p>
            <h3>HANYA Rp. 33.000,-</h3>
            <input type="button" className="btn btn-primary" value="PESAN SEKARANG" />
          </Media.Body>
          <Media.Right>
            <img width={600} height={400} src={image1} alt="Nasi Uduk" />
          </Media.Right>
        </Media>
        <Media style={{ marginLeft: '50px' }}>
          <Media.Left>
            <img width={600} height={400} src={image3} alt="Nasi Gudeg" />
          </Media.Left>
          <Media.Body style={{ verticalAlign: 'middle' }}>
            <h1>Paket Nasi Gudeg</h1>
            <p>Nasi Gudeg + Telur Kecap + Ayam Opor + Krecek</p>
            <h3>HANYA Rp. 40.000,-</h3>
            <input type="button" className="btn btn-primary" value="PESAN SEKARANG" />
          </Media.Body>
        </Media>
      </div>
    );
  }
}

export default HomePage;
