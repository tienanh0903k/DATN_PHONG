import Image from "next/image";

type Props = object;

const HeaderTop = ({}: Props) => {
  return (
    <div className="bg-[#effff4]">
      <div className="flex justify-center items-center gap-1 px-4 py-3">
        <span className="text-[#00AB56] text-[12px] pl-1 leading-[150%] font-[700]">
          Freeship đơn từ 45k, giảm nhiều hơn cùng
        </span>
        <div className="">
          <Image
            width={79}
            height={4}
            className="w-[79px] h-4 object-contain"
            src="/img/ship.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default HeaderTop;
