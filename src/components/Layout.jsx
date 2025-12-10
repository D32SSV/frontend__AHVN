import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="mt-8"> {/* adjusted based on navbar height */}
        {children}
      </main>
    </>
  );
}
