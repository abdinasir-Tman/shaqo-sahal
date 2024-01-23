import AllJobs from "./_components/AllJobs";
import Filters from "./_components/Filters";
import Nav from "./_components/Nav";
import { MdFilterAlt } from "react-icons/md";
export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1024px] w-full h-screen">
      <div className="fixed  z-50 top-0 inset-x-0 ">
        <Nav />
      </div>

      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 overflow-y-auto shadow-lg dark:shadow-gray-800 mt-44">
        <h1 className="text-2xl flex items-center  gap-2 font-bold font-serif pl-7">
          <MdFilterAlt />
          Filters
        </h1>
        <Filters />
      </div>
      <main className="mt-[75px] md:pl-60 h-full mx-auto py-7 px-2">
        <div className="py-10">
          <div>
            <h1 className="text-center text-3xl font-serif font-bold">
              Find <span className="text-main-800">New</span> Job Today
            </h1>
            <p className="text-center italic">Your Dream Job is waiting you</p>
          </div>
          <span className="">{children}</span>
        </div>
      </main>
    </div>
  );
}
