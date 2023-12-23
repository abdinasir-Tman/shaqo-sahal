import AllJobs from "./_components/AllJobs";
import Nav from "./_components/Nav";

export default function Home() {
  return (
    <div className="max-w-[1024px] w-full h-screen">
      <Nav />
      <div className="py-10">
        <span className="">
          <AllJobs />
        </span>
      </div>
    </div>
  );
}
