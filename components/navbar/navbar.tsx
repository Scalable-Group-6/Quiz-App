"use client";

import Image from "next/image";

const NavbarMenu = () => {
  return (
    <div className="w-full py-3  shadow-lg px-6 rounded-b-3xl">
      <nav className="flex justify-between items-center">
        <div className="flex items-center ">
          <p className="text-2xl font-semibold ">Quiz</p>
          <p className="font-light text-sm text-purple-400">tion</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-normal text-xs ">{"Ramadhani Al-Qadri"}</p>
          <div className="w-12 h-12 p-1 hover:bg-[#382254] rounded-full">
            <Image
              src="/images/user/default.png"
              alt="profile"
              width={300}
              height={300}
              className="relative aspect-square"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarMenu;
