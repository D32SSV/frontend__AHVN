import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="bg-amber-50 h-[calc(100vh)]"> {/* adjusted based on navbar height */}
        {children}
      </main>
    </>
  );
}
