import AllJobs from "./(pages)/jobs/_components/AllJobs";
import Filters from "./(pages)/jobs/_components/Filters";
import Nav from "./(pages)/jobs/_components/Nav";
import { MdFilterAlt } from "react-icons/md";
export default function Home() {
  return (
    <div className="">
      <div className="fixed top-0 inset-x-0 ">
        <Nav />
      </div>
      <div className="mt-96 w-[10rem] mx-auto">Home</div>
    </div>
  );
}
