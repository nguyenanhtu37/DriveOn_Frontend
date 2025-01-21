export const Avatar = ({ image, name }) => {
  return (
    <div className=" w-full h-8 px-1 gap-2 flex justify-start items-center">
      <img
        src={image}
        alt=""
        className=" w-6 h-6 object-cover rounded-full ring-1 ring-white"
      />
      <span className=" text-sm text-start text-black">{name}</span>
    </div>
  );
};
