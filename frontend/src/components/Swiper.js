import React, { useState } from "react";
import imageNotFound from '../images/imageNotFound.png'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Slider.css";

import { Lazy, EffectCards, FreeMode, Navigation, Thumbs, Mousewheel, Pagination, Autoplay, Scrollbar } from "swiper";

import { Box, Image } from "@chakra-ui/react";

export const CardImgGallery = ({ image }) => {

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


export const ImageGallery = ({ image }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const swipeSlid = image.length ? image.map(img => (
        <SwiperSlide key={img.public_id} className='imageGallerySlide'>
            <Image objectFit='cover' rounded='2' w='full' h='full' src={img.url} />
        </SwiperSlide>

    )) : <SwiperSlide className='cardSwiperSlide'>
        <Image objectFit='' boxSize='100%' src={imageNotFound} />
    </SwiperSlide>

    return (
        <React.Fragment>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-navigation-size": "22px",
                    "--swiper-pagination-color": "#fff",
                }}

                lazy={true}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Lazy, FreeMode, Navigation, Thumbs]}
                className="imgeGallery"
            >
                {swipeSlid}
            </Swiper>

            <Box px='4'>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={6}
                    freeMode={true}
                    lazy={true}
                    spaceBetween={2}
                    watchSlidesProgress={true}
                    modules={[Lazy, FreeMode, Navigation, Thumbs]}
                    className="thumbnails"
                >
                    {swipeSlid}

                </Swiper>
            </Box>

        </React.Fragment>
    )
}

export const MousewheelSlide = ({ data, h }) => {
    const swipeSlide = data.map((dt, i) => (
        <SwiperSlide className="mouseSlide" key={i}>{dt}</SwiperSlide>
    ))

    return (
        <React.Fragment>
            <Box h={h}>
                <Swiper
                    direction={"vertical"}
                    slidesPerView={1}
                    spaceBetween={20}
                    mousewheel={true}

                    pagination={{
                        clickable: true,
                    }}
                    modules={[Mousewheel, Pagination]}
                    className="mouseWheel"
                >
                    {swipeSlide}

                </Swiper>
            </Box>
        </React.Fragment>
    );
}


// <img src="https://cdn.magloft.com/github/swiper/images/page-001.jpg" />

