import { redirect } from "next/navigation";
import AllJobs from "./(pages)/jobs/_components/AllJobs";
import Filters from "./(pages)/jobs/_components/Filters";
import Nav from "./(pages)/jobs/_components/Nav";
import { MdFilterAlt } from "react-icons/md";
import Hero from "./components/Hero";
import Suggest from "./components/Suggest";
export default function Home() {
  return (
    <div className="">
      <div className="fixed z-50 top-0 inset-x-0 ">
        <Nav />
      </div>
      <Hero />
      <Suggest />
    </div>
  );
}
