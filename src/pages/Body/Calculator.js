import React, { useEffect, useRef, useState } from "react";
import "./Calculator.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import "swiper/css/navigation";
import Card1 from "./CalculateCards/Card1";
import Card2 from "./CalculateCards/Card2";
import Card3 from "./CalculateCards/Card3";
import Card4 from "./CalculateCards/Card4";
import Card5 from "./CalculateCards/Card5";
import Card6 from "./CalculateCards/Card6";
import Card7 from "./CalculateCards/Card7";
import Card10 from "./CalculateCards/Card10";
import { connect } from "react-redux";
import { setTempData } from "../../redux/action";
import { fetchData } from "../../dataFetching";
import { useTranslation } from "react-i18next";
const swiperParams = {
  direction: "horizontal",
  slidesPerView: 3,
  loop: false, 
  autoplay: false, 
  allowSlideNext: true,
  allowSlidePrev: true, 

  breakpoints: {
    320: {
      slidesPerView: "auto",
      spaceBetween: "20px",
      pagination: {
      
        clickable: true,
      },
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
};
const Calculator = ({ tempData }) => {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;

  useEffect(() => {
    fetchData();
  }, []);
  const CardArray = [Card1, Card2, Card3, Card4, Card5, Card6, Card7, Card10];
  const swiperRef = useRef(null);

  return (
    <div className="calculator">
      <div className="calculator-container">
        <h3 className="Benefits-title">
          {" "}
          {tempData[lng]?.BUY_COOLPASS_PRAGUE_CARD}
        </h3>
        <div className="wrapper">
          <div className="wrapper-content">
            <Box
              h={"24px"}
              cursor={"pointer"}
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="calc-slide-icon"
            >
              <ChevronLeftIcon w={"24px"} h={"100%"} />
            </Box>

            <Swiper {...swiperParams} ref={swiperRef}>
              {CardArray.map((CardComponent, index) => (
                <SwiperSlide key={index} {...swiperParams}>
                  <CardComponent />
                </SwiperSlide>
              ))}
            </Swiper>
            <Box
              h={"24px"}
              cursor={"pointer"}
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="calc-slide-icon"
            >
              <ChevronRightIcon w={"24px"} h={"100%"} />
            </Box>
          </div>
        </div>
        <div class="tips">
          <div class="first-tip-block">
            <li class="list-text">
              {" "}
              {tempData[lng]?.CALCULATOR_card_validity}
            </li>
            <li class="list-text">
              {" "}
              {tempData[lng]?.CALCULATOR_child_card_validity_tip}
            </li>
          </div>
          <div class="second-tip-block">
            <li class="second-list-text">
              {" "}
              {tempData[lng]?.CALCULATOR_student_id_info}
            </li>
          </div>
          <div className="third-tip-block">
            <h>{tempData[lng]?.ADULT_AGE}</h>
            <p className="third-m"> {tempData[lng]?.STUDENT_AGE} </p>{" "}
            <p> {tempData[lng]?.CHILD_AGE} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  tempData: state.tempData,
});
export default connect(mapStateToProps, { setTempData })(Calculator);
