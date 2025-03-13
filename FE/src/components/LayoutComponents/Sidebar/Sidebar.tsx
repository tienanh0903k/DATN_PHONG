import Image from "next/image";
import Categories from "../../../mocks/category.json";
import tienich from "../../../mocks/tienich.json";
type Props = object;
const SideBar = ({}: Props) => {
  return (
    <div className="w-[230px] sticky overflow-scroll max-h-[100vh] no-scrollbar">
      <div className="w-full   bg-[#fff]  px-2 py-3 rounded-[8px]">
        <h1 className="text-[14px] text-[#27272a] pl-4 mb-2 leading-[150%] font-[700]">
          Danh mục
        </h1>
        <ul className="">
          {Categories.map(
            (item: { name: string; image: string }, index: number) => (
              <li
                key={index}
                className="flex items-center py-[7px] px-4 rounded-[8px] cursor-pointer hover:bg-[#27272a1f]"
              >
                <div className="w-[32px] h-[32px] mr-[6px]">
                  <Image
                    src={`/${item.image}`}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="min-w-[32px] h-[32px] object-contain"
                  />
                </div>
                <p className="text-[14px] text-[#27272a] leading-[150%] font-[400]">
                  {item.name}
                </p>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="w-full bg-[#fff] mt-4 px-2 py-3 rounded-[8px]">
        <h1 className="text-[14px] text-[#27272a] pl-4 mb-2 leading-[150%] font-[700]">
          Tiện ích
        </h1>
        <ul className="">
          {tienich.map(
            (item: { name: string; image: string }, index: number) => (
              <li
                key={index}
                className="flex items-center py-[7px] px-4 rounded-[8px] cursor-pointer hover:bg-[#27272a1f]"
              >
                <div className="w-[32px] h-[32px] mr-[6px]">
                  <Image
                    src={`/${item.image}`}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="min-w-[32px] h-[32px] object-contain"
                  />
                </div>
                <p className="text-[14px] text-[#27272a] leading-[150%] font-[400]">
                  {item.name}
                </p>
              </li>
            )
          )}
        </ul>
      </div>
      <div className="w-full bg-[#fff] mt-4 px-2 py-3 rounded-[8px] mb-8">
        <div className="flex items-center py-[7px] px-4 rounded-[8px] cursor-pointer hover:bg-[#27272a1f]">
          <div className="w-[32px] h-[32px] mr-[6px]">
            <Image
              src="/img/category/shop.png"
              alt="Bán hàng cùng tiki"
              width={32}
              height={32}
              className="min-w-[32px] h-[32px] object-contain"
            />
          </div>
          <p className="text-[14px] text-[#27272a] leading-[150%] font-[400]">
            Bán hàng cùng tiki
          </p>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
