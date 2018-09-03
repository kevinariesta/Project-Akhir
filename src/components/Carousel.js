import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class CarouselMenu extends Component {
  render() {
    return (
      <div>
        <h1 style={{ color: "black" }}>{this.props.judul}</h1>
        <Carousel className="container slide">
          <Carousel.Item className="makanan">
            <img
              width={900}
              height={500}
              alt="Nasi Uduk"
              src={this.props.image1}
            />
            <Carousel.Caption>
              <p className="legend">{this.props.legend1}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="makanan">
            <img
              width={900}
              height={500}
              alt="Nasi Liwet"
              src={this.props.image2}
            />
            <Carousel.Caption>
              <p className="legend">{this.props.legend2}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="makanan">
            <img
              width={900}
              height={500}
              alt="Nasi Gudeg"
              src={this.props.image3}
            />
            <Carousel.Caption>
              <p className="legend">{this.props.legend3}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="makanan">
            <img
              width={900}
              height={500}
              alt="Nasi Pecel"
              src={this.props.image4}
            />
            <Carousel.Caption>
              <p className="legend">{this.props.legend4}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="makanan">
            <img
              width={900}
              height={500}
              alt="Nasi Timbel"
              src={this.props.image5}
            />
            <Carousel.Caption>
              <p className="legend">{this.props.legend5}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        ;
      </div>
    );
  }
}

export default CarouselMenu;
