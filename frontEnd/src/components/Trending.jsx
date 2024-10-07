 import {React, useState, useEffect} from "react";
import List from "./sub component/list/List";
import "../styles/style.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";

function AutoPlay() {


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none", background: "red" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none", background: "green" }}
            onClick={onClick}
          />
        );
      }

      


        const [product, setproduct] = useState([])
        const [width, setwidth] = useState(Number)
        const [screenSize, setScreenSize] = useState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      
        useEffect(() => {
          const handleResize = () => {
            setScreenSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });

            widths()
          };


          widths()

      
          window.addEventListener('resize', handleResize);

      
      
          // Clean up the event listener when the component unmounts
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);

        function widths() {
          if (screenSize.width <= 600) {
            setwidth(2)
          } else if (screenSize.width <= 300) {
            setwidth(1)
          } else {
            setwidth(4)
          }
        }
      

    console.log( process.env.REACT_APP_API_LINK)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + "getall/product")
        .then((res) =>  res.json())
        .then((data) => setproduct(data.data));
    }, []);


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: width,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (

        <div className="trending">

        <h1>TRENDING</h1>

    <div className="slider-container">
      <Slider {...settings}>

            {product?.map((project) => (
 

        <List
        id={project._id}
        price={project.size[0].price}
        name={project.name}
        img={project.imgUrl[0].url}
        size={project.size[0]._id}
        />    


            )   )   }      
            </Slider>

</div>
        </div>
  );
}

export default AutoPlay;



