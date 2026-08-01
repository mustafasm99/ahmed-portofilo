import { useMemo } from "react";
import data from "./data.json";
import SubscriptionExpired from "./components/SubscriptionExpired";
import Navbar        from "./components/Navbar";
import Hero          from "./components/Hero";
import Skills        from "./components/Skills";
import Experience    from "./components/Experience";
import Projects      from "./components/Projects";
import Testimonials  from "./components/Testimonials";
import Contact       from "./components/Contact";
import Footer        from "./components/Footer";

export default function App() {
  const isActive = useMemo(() => {
    const exp = data.subscription?.expiresAt;
    return exp ? new Date(exp) > new Date() : false;
  }, []);

  if (!isActive) return <SubscriptionExpired clientName={data.subscription?.clientName} />;

  return (
    <div className="min-h-screen bg-void scanline-overlay">
      <Navbar       profile={data.profile} />
      <Hero         profile={data.profile} stats={data.stats} />
      <Skills       skills={data.skills} />
      <Experience   experience={data.experience} />
      <Projects     projects={data.projects} />
      <Testimonials testimonials={data.testimonials} />
      <Contact      profile={data.profile} contact={data.contact} />
      <Footer       profile={data.profile} />
    </div>
  );
}
