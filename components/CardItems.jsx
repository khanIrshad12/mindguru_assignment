import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
const CardItems = ({ item ,setData }) => {
  return (
    <div key={item._id} className="md:w-[400px] mb-12 flex relative  gap-5">
      <div className=" flex flex-row  rounded-lg p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            Email: {item.email}
          </h5>
          <p className="mb-4 text-base text-neutral-600">Name: {item.name}</p>
          <p className="mb-4 text-base text-neutral-600">
            Phone No: {item.phone}
          </p>
          <Link href={`/editdetail/${item._id}`}>
            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              Edit button
            </button>
          </Link>
        </div>
        <div className="ml-12">
          <RemoveBtn id={item._id} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default CardItems;
