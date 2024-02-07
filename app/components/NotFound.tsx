import Image from "next/image";
// Adjust the path as necessary

const CustomNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <Image src={"/notfound.svg"} alt="Not Found" width={200} height={200} />
      <h1 className="mt-2 text-3xl font-semibold">Page Not Found</h1>
      <p className="mt-2">
        Sorry, we couldn't find the page you're looking for.
      </p>
    </div>
  );
};

export default CustomNotFound;
