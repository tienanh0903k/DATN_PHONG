import Image from "next/image";
import { useState } from "react";
type Props = object;

const HeaderBottom = ({}: Props) => {
  return (
    <div className="border-t-[1px] border-b-[1px] border-solid border-[#ebebf0]">
      <div className="container-base py-3 flex">
        <h2 className="mr-3 leading-[150%] text-[#003EA1] test-[14px] font-[600]">
          Cam Kết
        </h2>
        <ul className="flex items-center gap-3">
          <li className="flex items-center px-[6px] gap-[4px] cursor-pointer">
            <div className="w-[20px] h-[20px]">
              <Image
                width={20}
                height={20}
                className="w-full h-full object-contain"
                src="/img/comfirmIcon.png"
                alt=""
              />
            </div>
            <p className="text-[#27272A] text-[12px] font-[500]">
              100% hàng thật
            </p>
          </li>
          <div className="w-[1px] h-[20px] bg-[#EBEBF0]" />
          <li className="flex items-center px-[6px] gap-[4px] cursor-pointer">
            <div className="w-[20px] h-[20px]">
              <Image
                width={20}
                height={20}
                className="w-full h-full object-contain"
                src="/img/carIcon.png"
                alt=""
              />
            </div>
            <p className="text-[#27272A] text-[12px] font-[500]">
              Free ship mọi nơi
            </p>
          </li>
          <div className="w-[1px] h-[20px] bg-[#EBEBF0]" />
          <li className="flex items-center px-[6px] gap-[4px] cursor-pointer">
            <div className="w-[20px] h-[20px]">
              <Image
                width={20}
                height={20}
                className="w-full h-full object-contain"
                src="/img/recoinIcon.png"
                alt=""
              />
            </div>
            <p className="text-[#27272A] text-[12px] font-[500]">
              Hoàn 200% nếu hàng giả
            </p>
          </li>
          <div className="w-[1px] h-[20px] bg-[#EBEBF0]" />
          <li className="flex items-center px-[6px] gap-[4px] cursor-pointer">
            <div className="w-[20px] h-[20px]">
              <Image
                width={20}
                height={20}
                className="w-full h-full object-contain"
                src="/img/backIcon.png"
                alt=""
              />
            </div>
            <p className="text-[#27272A] text-[12px] font-[500]">
              30 ngày đổi trả
            </p>
          </li>
          <div className="w-[1px] h-[20px] bg-[#EBEBF0]" />
          <li className="flex items-center px-[6px] gap-[4px] cursor-pointer">
            <div className="w-[20px] h-[20px]">
              <Image
                width={20}
                height={20}
                className="w-full h-full object-contain"
                src="/img/car1.png"
                alt=""
              />
            </div>
            <p className="text-[#27272A] text-[12px] font-[500]">
              Giao nhanh 2h
            </p>
          </li>
          <div className="w-[1px] h-[20px] bg-[#EBEBF0]" />
          <li className="flex items-center px-[6px] gap-[4px] cursor-pointer">
            <div className="w-[20px] h-[20px]">
              <Image
                width={20}
                height={20}
                className="w-full h-full object-contain"
                src="/img/ticket.png"
                alt=""
              />
            </div>
            <p className="text-[#27272A] text-[12px] font-[500]">Giá siêu rẻ</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HeaderBottom;
