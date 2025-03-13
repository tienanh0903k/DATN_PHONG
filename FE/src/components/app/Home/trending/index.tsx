/* eslint-disable @next/next/no-img-element */
"use client";
import trending from "../../../../mocks/trending.json";
type Props = object;
const Trending = ({}: Props) => {
  return (
    <div className="p-4 bg-[#fff] mt-3 min-h-[126px] rounded-[8px]">
      <ul className="grid gap-2 grid-cols-10">
        {trending.map((item: { name: string; img: string }, index: number) => (
          <li
            key={index}
            className="flex text-center flex-col items-center gap-2 cursor-pointer"
          >
            <div className="w-[44px] h-[44px] border-[1px] border-solid border-[#0000000d] rounded-[35%] overflow-hidden">
              <img src={item.img} alt="" className="w-full h-full" />
            </div>
            <span className="text-[14px] text-[#27272a] line-clamp-2 leading-[150%] font-[500]">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Trending;
