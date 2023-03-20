import React, { memo } from "react";
import imageNotFound from '../../images/imageNotFound.png'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Swiper.css";

import { Lazy, EffectCards, } from "swiper";
import { Image } from "@chakra-ui/react";

export const CardImgGallery = ({ image }) => {
    console.log('image card')
    const swipeSlid = image.length ? image.map(img => (
        <SwiperSlide key={img.public_id} className='cardSwiperSlide'>
            <Image objectFit='' boxSize='100%' src={img.url} />
        </SwiperSlide>
    )) :
        <SwiperSlide className='cardSwiperSlide'>
            <Image objectFit='' boxSize='100%' src={imageNotFound} />
        </SwiperSlide>

    return (
        <React.Fragment>
            <Swiper
                lazy={true}
                effect={"cards"}
                grabCursor={true}
                modules={[Lazy, EffectCards]}
                className="cardSwiper"
            >
                {swipeSlid}
            </Swiper>
        </React.Fragment>
    )
}

export default CardImgGallery