import React from "react";

export const CardV2 = () => {
  return (
    <div className=" w-full h-fit max-w-[360px] flex flex-col  bg-white rounded-[20px] border shadow-sm">
      {/* top */}
      <div className="p-[25px] w-full flex justify-between items-center">
        <p className=" font-roboto font-bold leading-[25px] text-start text-black">
          Strawberry Cake
        </p>
        <div className="flex items-center gap-[5px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#2ECC71" />
            <path
              d="M15.5038 5C15.5038 5 14.352 6.11753 13.1062 6.56808C3.88104 9.90485 7.77169 16.4073 7.89861 16.4287C7.89861 16.4287 8.41592 15.5279 9.11471 15.014C13.549 11.7542 14.4502 8.00198 14.4502 8.00198C14.4502 8.00198 13.4552 12.5171 9.51024 15.3266C8.63894 15.9467 8.04897 17.4738 7.79923 19C7.79923 19 8.41686 18.7505 8.68244 18.6829C8.78601 18.007 9.00253 17.3599 9.36861 16.7818C14.8822 17.4382 16.6879 12.9955 16.9238 11.4464C17.4806 7.7876 15.5038 5 15.5038 5Z"
              fill="white"
            />
          </svg>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#F8593B" />
            <g clipPath="url(#clip0_66_1345)">
              <path
                d="M17.2201 13.1968C17.0597 11.1089 16.0876 9.80044 15.23 8.64582C14.4359 7.5769 13.75 6.65383 13.75 5.29217C13.75 5.18279 13.6888 5.08282 13.5916 5.0327C13.4942 4.98228 13.3771 4.99054 13.2886 5.0549C12.0006 5.97655 10.9259 7.52992 10.5505 9.01206C10.2899 10.0439 10.2554 11.204 10.2506 11.9701C9.06112 11.7161 8.79168 9.93686 8.78883 9.91747C8.77543 9.82519 8.71905 9.74488 8.63702 9.70102C8.55414 9.65773 8.45671 9.65459 8.37269 9.69618C8.31032 9.72637 6.84171 10.4726 6.75626 13.452C6.75027 13.5511 6.75 13.6505 6.75 13.7499C6.75 16.6444 9.10525 18.9996 12 18.9996C12.004 18.9998 12.0083 19.0004 12.0117 18.9996C12.0128 18.9996 12.0139 18.9996 12.0154 18.9996C14.903 18.9913 17.25 16.6393 17.25 13.7499C17.25 13.6044 17.2201 13.1968 17.2201 13.1968ZM12 18.4163C11.035 18.4163 10.25 17.5801 10.25 16.5522C10.25 16.5172 10.2497 16.4818 10.2523 16.4385C10.2639 16.0051 10.3463 15.7091 10.4366 15.5123C10.6058 15.8758 10.9082 16.2098 11.3996 16.2098C11.5608 16.2098 11.6913 16.0794 11.6913 15.9182C11.6913 15.503 11.6998 15.0239 11.8032 14.5915C11.8952 14.2082 12.1151 13.8003 12.3937 13.4734C12.5176 13.8977 12.7591 14.2412 12.995 14.5764C13.3325 15.056 13.6814 15.5519 13.7426 16.3975C13.7463 16.4476 13.7501 16.4981 13.7501 16.5522C13.75 17.58 12.965 18.4163 12 18.4163Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_66_1345">
                <rect
                  width="14"
                  height="14"
                  fill="white"
                  transform="translate(5 5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      {/* body */}
      <div className="flex flex-col w-full ">
        <img
          className=" w-full h-[210px] object-cover"
          src="https://images.pexels.com/photos/50594/sea-bay-waterfront-beach-50594.jpeg?auto=compress&cs=tinysrgb&w=800"
        />
        <div className=" p-[25px] w-full flex flex-col items-start font-roboto text-[16px] leading-[23px] text-black">
          <p className=" mb-[10px]">Description</p>
          <p className=" mb-[10px]">
            A strawberry cake is a cake that uses strawberry as a primary
            ingredient. Strawberries may be used in the cake batter, atop cakes
            and in a strawberry cake's frosting. Some are served chilled or
            partially frozen, and they are sometimes served as a Valentine's Day
            treat.
          </p>
          <p className=" mb-[10px]">Price: $20</p>
        </div>

        <div className=" px-[25px] py-8 w-full flex justify-between items-center font-roboto">
          <button className=" bg-[#2ECC71] text-white font-bold text-[16px] leading-[19px] py-3 px-8 rounded-[10px]">
            Add to cart
          </button>
          <button className=" bg-[#F8593B] text-white font-bold text-[16px] leading-[19px] py-3 px-8 rounded-[10px]">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};
