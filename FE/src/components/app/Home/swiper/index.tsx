"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
const SwiperCpn = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (
    s: SwiperClass,
    time: number,
    progress: number
  ) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 3000)}s`;
    }
  };
  return (
    <div className="p-4 bg-[#fff]">
      <div className="flex relative">
        <button
          ref={prevRef}
          className="z-10 absolute p-2 bg-[#fff] rounded-[50%] top-[50%] left-[10px]"
        >
          <IoIosArrowBack />
        </button>
        <Swiper
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
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="grid grid-cols-2 gap-4">
              <img
                className="rounded-[12px] aspect-video border-[1px] border-solid border-[#0000000d]"
                src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/46/09/e2/ab43d18c6cf6ddc5923ae17a5efd9490.png.webp"
                alt=""
              />
              <img
                className="rounded-[12px] aspect-video border-[1px] border-solid border-[#0000000d]"
                src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/46/ec/34/b29971a0733201cb2cb80698e0f4d4b2.png.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="grid grid-cols-2 gap-4">
              <img
                className="rounded-[12px] aspect-video border-[1px] border-solid border-[#0000000d]"
                src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/c9/06/da/bd477405b0cf00c492ac5d63d698de43.png.webp"
                alt=""
              />
              <img
                className="rounded-[12px] aspect-video border-[1px] border-solid border-[#0000000d]"
                src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/ae/07/80/4e08a325826cfff841a41ca40c4e7518.jpg.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="grid grid-cols-2 gap-4">
              <img
                className="rounded-[12px] aspect-video border-[1px] border-solid border-[#0000000d]"
                src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/d4/bc/1a/7442d254dad7e020927d8bcdf1e10de2.jpg.webp"
                alt=""
              />
              <img
                className="rounded-[12px] aspect-video border-[1px] border-solid border-[#0000000d]"
                src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/b7/1a/46/3f67e253ae169fb970bb697c69f1e5da.png.webp"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <button
          ref={nextRef}
          className="z-10 absolute p-2 bg-[#fff] rounded-[50%] top-[50%] right-[10px]"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};
export default SwiperCpn;
