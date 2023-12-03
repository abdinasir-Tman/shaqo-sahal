import Nav from "./_components/Nav";

export default function Home() {
  return (
    <main className="dark:bg-main-950 bg-main-50 max-w-5xl w-full h-full">
      <Nav />
      <div className="py-10">
        <span className="text-white">Home Page</span>
      </div>
    </main>
  );
}
