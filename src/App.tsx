import { Agentation } from "agentation";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#beranda"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Lewati ke konten
      </a>
      <Navbar />
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
      {import.meta.env.DEV ? <Agentation /> : null}
    </div>
  );
}
