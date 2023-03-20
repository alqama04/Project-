import React,{memo}from "react";
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

import { Lazy, Navigation, Pagination, Autoplay, } from "swiper";
import { Box, Image } from "@chakra-ui/react";


const ImageCarousel = () => {
    return (
        <React.Fragment>
            <Box h='100%'>
                <Swiper
                    pagination={{
                        type: "fraction",
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={600}
                    lazy={true}
                    navigation={true}
                    modules={[Lazy, Autoplay, Pagination, Navigation]}
                    className="imageCarousel"
                >
                    <SwiperSlide>
                        <Image src='
                        https://swiperjs.com/demos/images/nature-1.jpg'
                        />

                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src='https://res.cloudinary.com/dvvzcnjyw/image/upload/v1676626206/products/mlnuxzrtjtzpgzmowny1.png' />
                    </SwiperSlide>

                </Swiper>
            </Box>
        </React.Fragment>
    );
}

const ImageCarouselMemo = memo(ImageCarousel)
export default ImageCarouselMemo