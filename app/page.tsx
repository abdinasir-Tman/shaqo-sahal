import { redirect } from "next/navigation";
import AllJobs from "./(pages)/jobs/_components/AllJobs";
import Filters from "./(pages)/jobs/_components/Filters";
import Nav from "./(pages)/jobs/_components/Nav";
import { MdFilterAlt } from "react-icons/md";
import Hero from "./components/Hero";
import Suggest from "./components/Suggest";
import { LatestJobs } from "./components/LatestJobs";
import HowItworks from "./components/HowItworks";

export const dynamic = "auto";

export default function Home() {
  return (
    <div className="">
      <div className="fixed bg-white dark:bg-gray-950  dark:shadow-gray-900 z-50 top-0 inset-x-0 ">
        <Nav />
      </div>
      <Hero />
      <main className="max-w-7xl mx-auto">
        <Suggest />
        <LatestJobs />
      </main>

      <HowItworks />
    </div>
  );
}
