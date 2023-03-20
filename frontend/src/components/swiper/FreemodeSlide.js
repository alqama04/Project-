import React, { memo } from "react";
// import imageNotFound from '../../images/imageNotFound.png'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Swiper.css";

import { Lazy, Navigation, Scrollbar, FreeMode, } from "swiper";

const FreemodeSlide = ({ data, nav, scrollBar, testimonial }) => {
    const base = testimonial ? 1 : 2
    const sm = testimonial ? 1 : 3
    const md = testimonial ? 2 : 4
    const lg = testimonial ? 2 : 5

    const swipeSlide = data.length ? data.map((dt, i) => (
        <SwiperSlide key={i}>
            {dt}
        </SwiperSlide>
    )) : <SwiperSlide> </SwiperSlide>
    return (
        <React.Fragment>
            <Swiper
                lazy={true}
                slidesPerView={base}
                spaceBetween={4}
                freeMode={true}
                scrollbar={scrollBar || false}
                navigation={nav || false}
                breakpoints={{
                    591: {
                        slidesPerView: sm
                    },
                    791: {
                        slidesPerView: md
                    },
                    991: {
                        slidesPerView: lg
                    },

                }}
                modules={[Lazy, FreeMode, Scrollbar, Navigation]}
                className="freeMode"
            >
                {swipeSlide}
            </Swiper>
        </React.Fragment>
    )
}

export default memo(FreemodeSlide)