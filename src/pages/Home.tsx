/*
 * Page composition. Each section is a self-contained component that reads its
 * data from `src/lib`; the anchor ids here are the targets of the navbar links.
 */
import { About } from "../components/sections/About";
import { Agenda } from "../components/sections/Agenda";
import { Countdown } from "../components/sections/Countdown";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";
import { Hero } from "../components/sections/Hero";
import { Location } from "../components/sections/Location";
import { RegistrationForm } from "../components/sections/RegistrationForm";
import { Speakers } from "../components/sections/Speakers";
import { Tickets } from "../components/sections/Tickets";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown />
      <About />
      <Speakers />
      <Agenda />
      <Tickets />
      <Location />
      <FAQ />
      <RegistrationForm />
      <FinalCTA />
    </>
  );
}
