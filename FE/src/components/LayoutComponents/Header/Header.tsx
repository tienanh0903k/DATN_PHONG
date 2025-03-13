"use client";
import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { CiFaceSmile } from "react-icons/ci";
import { BiCartAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import historySearch from "../../../mocks/historySearch.json";
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";
import { Modal, ConfigProvider, Dropdown, MenuProps } from "antd";
import ModalAddress from "./modalAddress";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import Image from "next/image";
type Props = object;

const HeaderCpn = ({}: Props) => {
  const { t } = useTranslation();
  const [quantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="pr-8 py-[5px] leading-[150%] font-[400] ">
          Thông tin tài khoản
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="pr-8 py-[5px] leading-[150%] font-[400] ">
          Đơn hàng của tôi
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="pr-8 py-[5px] leading-[150%] font-[400] ">
          Trung tâm hỗ trợ
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="pr-8 py-[5px] leading-[150%] font-[400] ">
          Đăng xuất
        </div>
      ),
    },
  ];

  return (
    <header className="w-full ">
      <HeaderTop />
      <div className=" h-[--header-height] container-base bg-[#fff] flex items-center gap-[48px] py-2">
        <div className="flex flex-col min-w-[96px]">
          <Image
            width={96}
            height={40}
            src="/img/tiki.png"
            alt=""
            className="w-full h-[40px] object-contain justify-center"
          />
          <span className="text-[14px] text-[#003ea1] font-[600] mt-2 ml-2">
            {t("Tốt & Nhanh")}
          </span>
        </div>
        <div className="w-full block ">
          <div className="flex w-full mb-2">
            <div className="header-search flex border border-[#ccc] rounded-[8px] h-[40px] flex-1 items-center ">
              <IoSearchOutline className="text-[#828181] text-[20px] ml-[18px]" />
              <input
                placeholder="Tìm kiếm sản phẩm"
                type="text"
                className="w-full   outline-none text-[#333] mx-2"
              />
              <button className="bg-[#fff] h-full text-[14px] w-[92px] rounded-md max-h-9 text-center text-[#0a68ff] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-5 before:bg-[#ddd] hover:bg-[#0a68ff33] active:bg-[#0a68ff66]">
                {t("Tìm kiếm")}
              </button>
            </div>

            <div className="ml-[48px] flex items-center ">
              <div className="flex items-center px-2 p-4 hover:bg-[#0060ff1f] h-10 rounded-[10px] cursor-pointer">
                <TiHome className="text-[20px] text-[--primary-color] mr-1" />
                <span className="text-[--primary-color]">{t("Trang chủ")}</span>
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Dropdown: {
                      fontSize: 15,
                      controlItemBgActive: "#27272a1f",
                    },
                  },
                }}
              >
                <Dropdown menu={{ items }} placement="bottomRight">
                  <div className="flex items-center px-2 p-4 hover:bg-[#27272a1f] h-10 rounded-[10px] cursor-pointer">
                    <CiFaceSmile className="text-[20px] mr-1" />
                    {/* <Button>bottomLeft</Button> */}
                    <span className="">{t("Tài khoản")}</span>
                  </div>
                </Dropdown>
              </ConfigProvider>
              <div className="flex items-center px-2 p-4 hover:bg-[#0060ff1f] h-10 rounded-[10px] cursor-pointer relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-5 before:bg-[#ddd]">
                <BiCartAlt className="text-[20px] text-[--primary-color]" />
                <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] rounded-full bg-[#ff424f] text-white text-[12px] flex items-center justify-center">
                  {quantity}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <ul className="history flex gap-[12px] w-[820px] overflow-hidden h-6 ">
              {historySearch?.map((item: { name: string }, index: number) => (
                <li
                  className="text-[14px] text-[#808089] leading-[150%] font-[500] cursor-pointer "
                  key={index}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div onClick={showModal} className="address flex cursor-pointer">
              <div className="flex items-center mr-2 text-[#808089]">
                <IoLocationOutline className="mr-1" />
                <p className="">Giao đến :</p>
              </div>
              <div className="text-[#27272a] font-[500] text-[14px] leading-[150%] ">
                <p className="underline">Q. 1, P. Bến Nghé, Hồ Chí Minh</p>
              </div>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Modal: {
                    colorBgElevated: "#f8f8f8",
                  },
                },
              }}
            >
              <Modal
                open={isModalOpen}
                onOk={handleOk}
                footer={false}
                onCancel={handleCancel}
                closable={false}
                maskClosable={true}
                width={"600px"}
              >
                <ModalAddress />
              </Modal>
            </ConfigProvider>
          </div>
        </div>
      </div>
      <HeaderBottom />
    </header>
  );
};
export default HeaderCpn;
