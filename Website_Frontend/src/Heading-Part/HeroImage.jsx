import { Carousel } from "react-bootstrap";
import style from "./HeroImage.module.css";

const HeroImage = () => {
  return (
    <section className={`${style.heroSection}`}>
      <Carousel fade controls={false} indicators interval={2500}>
        <Carousel.Item>
          <img
            className={`d-block w-100 ${style.heroImage}`}
            src="NavbarHeroImage3.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Luxury Interior Design</h3>
            <p>Elegance and sophistication in every detail.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`d-block w-100 ${style.heroImage}`}
            src="NavbarHeroImage2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Modern Living Spaces</h3>
            <p>Creating innovative and stylish environments.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className={`d-block w-100 ${style.heroImage}`}
            src="NavbarHeroImage1.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Custom Interior Solutions</h3>
            <p>Tailored designs to reflect your unique style.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default HeroImage;