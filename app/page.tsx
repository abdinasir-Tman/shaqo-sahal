import AllJobs from "./_components/AllJobs";
import Nav from "./_components/Nav";

export default function Home() {
  return (
    <div className="max-w-[1024px] w-full h-screen">
      <div className="fixed top-0 inset-x-0 ">
        <Nav />
      </div>

      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-10 shadow-lg dark:shadow-gray-800 mt-48">
        <h1 className="text-2xl font-bold font-serif">Filters</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
          ratione repellendus, officia voluptate totam assumenda voluptatem
          fugit, nam corrupti voluptates, tempore nisi temporibus amet suscipit
          quos corporis et a provident.
        </p>
      </div>
      <main className="mt-[75px] md:pl-60 h-full container mx-auto py-7">
        <div className="py-10">
          <div>
            <h1 className="text-center text-3xl font-serif font-bold">
              Find <span className="text-main-800">New</span> Job Today
            </h1>
            <p className="text-center italic">Your Dream Job is waiting you</p>
          </div>
          <span className="">
            <AllJobs />
          </span>
        </div>
      </main>
    </div>
  );
}
