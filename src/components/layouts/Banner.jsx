import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Banner = () => {
  const bannerImages = [
    "/images/digital_marketing.webp",
    "/images/graphic_design.webp",
    "/images/web_development.webp",
  ];
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/6] mt-5 mb-10 z-0">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="h-full rounded-lg"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
