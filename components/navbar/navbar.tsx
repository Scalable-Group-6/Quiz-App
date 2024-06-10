"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavbarMenu = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  const { data: session } = useSession();

  const router = useRouter();
  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <div className="w-full py-3  shadow-lg px-6 rounded-b-3xl">
      <nav className="flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer "
          onClick={() => {
            router.push("/");
          }}
        >
          <p className="text-2xl font-semibold ">Quiz</p>
          <p className="font-light text-sm text-purple-400">tion</p>
        </div>
        {session ? (
          <div className="flex items-center space-x-2">
            <p className="font-normal text-xs ">{session.user?.name}</p>
            <div className="w-12 h-12 p-1 hover:bg-[#382254] rounded-full">
              <Image
                src="/images/user/default.png"
                alt="profile"
                width={300}
                height={300}
                className="relative aspect-square"
                onClick={handleClick}
              />
            </div>
          </div>
        ) : (
          <button
            className=" p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Login
          </button>
        )}
      </nav>
      {clicked ? (
        <div className="absolute right-1 mt-4 bg-[#171921] drop-shadow-md w-[205px] rounded-2xl border border-gray-200/5 transition ease-in-out duration-200 transform translate-y-1 opacity-100">
          <div
            onClick={() => router.push("/profile")}
            className="flex flex-row p-4  hover:bg-slate-400/30 rounded-md gap-3 my-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="my-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 1.8C7.74068 1.79977 6.50333 2.12984 5.41145 2.75726C4.31956 3.38469 3.41134 4.28752 2.77742 5.37565C2.14351 6.46378 1.80608 7.69915 1.79881 8.95844C1.79154 10.2177 2.11469 11.4569 2.73601 12.5523C3.15596 12.0065 3.69579 11.5646 4.31378 11.2608C4.93177 10.9569 5.61136 10.7993 6.3 10.8H11.7C12.3886 10.7993 13.0682 10.9569 13.6862 11.2608C14.3042 11.5646 14.844 12.0065 15.264 12.5523C15.8853 11.4569 16.2085 10.2177 16.2012 8.95844C16.1939 7.69915 15.8565 6.46378 15.2226 5.37565C14.5887 4.28752 13.6804 3.38469 12.5886 2.75726C11.4967 2.12984 10.2593 1.79977 9 1.8ZM16.1487 14.4684C17.352 12.8997 18.0029 10.9771 18 8.99999C18 4.0293 13.9707 0 9 0C4.02931 0 1.01279e-05 4.0293 1.01279e-05 8.99999C-0.00296116 10.9771 0.647924 12.8997 1.85131 14.4684L1.84681 14.4846L2.16631 14.8563C3.0104 15.8431 4.05845 16.6352 5.23821 17.178C6.41797 17.7207 7.70139 18.0011 9 18C10.8246 18.0033 12.6067 17.4491 14.1075 16.4115C14.7473 15.9694 15.3275 15.4467 15.8337 14.8563L16.1532 14.4846L16.1487 14.4684ZM9 3.6C8.28392 3.6 7.59716 3.88446 7.09081 4.39081C6.58447 4.89716 6.3 5.58391 6.3 6.29999C6.3 7.01608 6.58447 7.70283 7.09081 8.20918C7.59716 8.71553 8.28392 8.99999 9 8.99999C9.71608 8.99999 10.4028 8.71553 10.9092 8.20918C11.4155 7.70283 11.7 7.01608 11.7 6.29999C11.7 5.58391 11.4155 4.89716 10.9092 4.39081C10.4028 3.88446 9.71608 3.6 9 3.6Z"
                fill="white"
              />
            </svg>
            <p className="text-white text-center">Profile</p>
          </div>

          <div
            onClick={() => {
              router.push("/signin");
              signoutHandler();
            }}
            className="flex flex-row p-4 hover:bg-slate-400/30 rounded-md gap-3 my-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              className="my-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.05477 0.0675373C8.7038 -0.350468 9.89995 1.24555 9.89995 2.82357V16.8237C9.89995 18.4018 8.7038 19.9978 7.05477 19.5798C3.09246 18.5758 0.131836 14.5897 0.131836 9.82365C0.131836 5.0576 3.09246 1.07155 7.05477 0.0675373ZM11.9362 6.11661C12.1027 5.92914 12.3285 5.82382 12.564 5.82382C12.7995 5.82382 13.0253 5.92914 13.1918 6.11661L15.8558 9.11665C16.0223 9.30418 16.1158 9.55849 16.1158 9.82365C16.1158 10.0888 16.0223 10.3431 15.8558 10.5307L13.1918 13.5307C13.0243 13.7129 12.8 13.8137 12.5672 13.8114C12.3343 13.8091 12.1116 13.7039 11.947 13.5185C11.7823 13.3331 11.6889 13.0823 11.6869 12.8201C11.6849 12.5579 11.7744 12.3053 11.9362 12.1167L13.0844 10.8237H5.4599C5.22438 10.8237 4.99852 10.7183 4.83198 10.5308C4.66545 10.3432 4.57189 10.0889 4.57189 9.82365C4.57189 9.55843 4.66545 9.30408 4.83198 9.11654C4.99852 8.929 5.22438 8.82364 5.4599 8.82364H13.0844L11.9362 7.53063C11.7697 7.3431 11.6762 7.08879 11.6762 6.82362C11.6762 6.55845 11.7697 6.30414 11.9362 6.11661Z"
                fill="white"
              />
            </svg>
            <p className="text-white text-center">Log Out</p>
          </div>
        </div>
      ) : (
        <div className="absolute right-1 mt-4 bg-[#171921] drop-shadow-md w-[205px] rounded-2xl border border-gray-200/5 transition ease-in-out duration-200 transform translate-y-0 opacity-0">
          <div
            onClick={() => router.push("/profile")}
            className="flex flex-row p-4  hover:bg-slate-400/30 rounded-md gap-3 my-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="my-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 1.8C7.74068 1.79977 6.50333 2.12984 5.41145 2.75726C4.31956 3.38469 3.41134 4.28752 2.77742 5.37565C2.14351 6.46378 1.80608 7.69915 1.79881 8.95844C1.79154 10.2177 2.11469 11.4569 2.73601 12.5523C3.15596 12.0065 3.69579 11.5646 4.31378 11.2608C4.93177 10.9569 5.61136 10.7993 6.3 10.8H11.7C12.3886 10.7993 13.0682 10.9569 13.6862 11.2608C14.3042 11.5646 14.844 12.0065 15.264 12.5523C15.8853 11.4569 16.2085 10.2177 16.2012 8.95844C16.1939 7.69915 15.8565 6.46378 15.2226 5.37565C14.5887 4.28752 13.6804 3.38469 12.5886 2.75726C11.4967 2.12984 10.2593 1.79977 9 1.8ZM16.1487 14.4684C17.352 12.8997 18.0029 10.9771 18 8.99999C18 4.0293 13.9707 0 9 0C4.02931 0 1.01279e-05 4.0293 1.01279e-05 8.99999C-0.00296116 10.9771 0.647924 12.8997 1.85131 14.4684L1.84681 14.4846L2.16631 14.8563C3.0104 15.8431 4.05845 16.6352 5.23821 17.178C6.41797 17.7207 7.70139 18.0011 9 18C10.8246 18.0033 12.6067 17.4491 14.1075 16.4115C14.7473 15.9694 15.3275 15.4467 15.8337 14.8563L16.1532 14.4846L16.1487 14.4684ZM9 3.6C8.28392 3.6 7.59716 3.88446 7.09081 4.39081C6.58447 4.89716 6.3 5.58391 6.3 6.29999C6.3 7.01608 6.58447 7.70283 7.09081 8.20918C7.59716 8.71553 8.28392 8.99999 9 8.99999C9.71608 8.99999 10.4028 8.71553 10.9092 8.20918C11.4155 7.70283 11.7 7.01608 11.7 6.29999C11.7 5.58391 11.4155 4.89716 10.9092 4.39081C10.4028 3.88446 9.71608 3.6 9 3.6Z"
                fill="white"
              />
            </svg>
            <p className="text-white text-center">Profile</p>
          </div>
          <div
            onClick={() => router.push("/signin")}
            className="flex flex-row p-4 hover:bg-slate-400/30 rounded-md gap-3 my-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="none"
              className="my-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.05477 0.0675373C8.7038 -0.350468 9.89995 1.24555 9.89995 2.82357V16.8237C9.89995 18.4018 8.7038 19.9978 7.05477 19.5798C3.09246 18.5758 0.131836 14.5897 0.131836 9.82365C0.131836 5.0576 3.09246 1.07155 7.05477 0.0675373ZM11.9362 6.11661C12.1027 5.92914 12.3285 5.82382 12.564 5.82382C12.7995 5.82382 13.0253 5.92914 13.1918 6.11661L15.8558 9.11665C16.0223 9.30418 16.1158 9.55849 16.1158 9.82365C16.1158 10.0888 16.0223 10.3431 15.8558 10.5307L13.1918 13.5307C13.0243 13.7129 12.8 13.8137 12.5672 13.8114C12.3343 13.8091 12.1116 13.7039 11.947 13.5185C11.7823 13.3331 11.6889 13.0823 11.6869 12.8201C11.6849 12.5579 11.7744 12.3053 11.9362 12.1167L13.0844 10.8237H5.4599C5.22438 10.8237 4.99852 10.7183 4.83198 10.5308C4.66545 10.3432 4.57189 10.0889 4.57189 9.82365C4.57189 9.55843 4.66545 9.30408 4.83198 9.11654C4.99852 8.929 5.22438 8.82364 5.4599 8.82364H13.0844L11.9362 7.53063C11.7697 7.3431 11.6762 7.08879 11.6762 6.82362C11.6762 6.55845 11.7697 6.30414 11.9362 6.11661Z"
                fill="white"
              />
            </svg>
            <p className="text-white text-center">Log Out</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMenu;
