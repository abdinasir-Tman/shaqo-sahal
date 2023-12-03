import Nav from "./_components/Nav";

export default function Home() {
  return (
    <div className="dark:bg-main-950 bg-main-50 max-w-[1024px] w-full h-screen">
      <Nav />
      <div className="py-10">
        <span className="text-white">Home Page</span>
      </div>
    </div>
  );
}
