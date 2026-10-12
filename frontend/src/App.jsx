import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useTranslation } from "./i18n";

import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import Schemes from "./pages/Schemes";
import ChatPage from "./pages/ChatPage";

import {
  Target,
  BrainCircuit,
  Database,
  Sparkles
} from "lucide-react";


export default function App() {
  const { t } = useTranslation();
  const [page, setPageState] = useState(() => window.location.hash.slice(1) || "home");

  const setPage = (nextPage) => {
    setPageState(nextPage);
    window.location.hash = nextPage === "home" ? "" : nextPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleHashChange = () => setPageState(window.location.hash.slice(1) || "home");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);


  const renderPage = () => {

    switch (page) {

      case "recommend":
        return <Recommend />;

      case "schemes":
        return <Schemes />;

      case "chat":
        return <ChatPage />;

      case "about":
        return <About t={t} />;

      default:
        return (
          <Home
            setPage={setPage}
          />
        );

    }

  };


  return (

    <div className="min-h-screen bg-[#f7faf7]">

      <Navbar
        setPage={setPage}
        activePage={page}
      />

      {renderPage()}

      <Footer setPage={setPage} />

    </div>

  );
}


function About({ t }) {

  return (

    <main className="min-h-[70vh] bg-[radial-gradient(ellipse_at_50%_0%,rgba(187,247,208,0.34),transparent_38%),linear-gradient(180deg,#f5faf5_0%,#fbfdfb_340px)] py-12 sm:py-16">

      <div className="section-container">

        <div className="mx-auto max-w-5xl">


          <div className="text-center">

            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
              {t("About the project")}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-5xl">
              {t("Government Scheme Recommendation System")}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600">
              {t("Helping farmers discover relevant government schemes through intelligent profile-based recommendations.")}
            </p>

          </div>


          <div className="mt-10 rounded-[1.75rem] border border-white bg-white/85 p-6 shadow-[0_20px_60px_rgba(20,83,45,0.07)] ring-1 ring-green-900/[0.04] sm:mt-12 sm:p-10">

            <h2 className="text-2xl font-bold text-gray-900">
              {t("Why this project?")}
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              {t("Farmers may have difficulty identifying suitable government schemes because information is spread across different sources and eligibility conditions can vary between schemes.")}
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              {t("This system simplifies the process by allowing a farmer to provide basic information and receive personalized scheme recommendations.")}
            </p>


            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <AboutCard
                icon={<Target size={22} />}
                title={t("Personalized")}
                text={t("Recommendations are based on farmer-specific information.")}
              />

              <AboutCard
                icon={<BrainCircuit size={22} />}
                title={t("Intelligent")}
                text={t("Uses eligibility and semantic matching techniques.")}
              />

              <AboutCard
                icon={<Database size={22} />}
                title={t("Centralized")}
                text={t("Makes scheme information easier to discover in one place.")}
              />

            </div>

          </div>


          <div className="mt-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-green-800 via-green-800 to-green-700 p-7 text-white shadow-lg shadow-green-900/10 sm:p-8">

            <div className="flex items-start gap-4">

              <Sparkles
                size={24}
                className="mt-1 shrink-0"
              />

              <div>

                <h3 className="text-lg font-bold">
                  {t("Technology Stack")}
                </h3>

                <p className="mt-2 text-sm leading-7 text-green-100">
                  React · Tailwind CSS · Spring Boot ·
                  PostgreSQL · pgvector · LangChain4j ·
                  AI-powered recommendation
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>

  );
}


function AboutCard({
  icon,
  title,
  text
}) {

  return (

    <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm ring-1 ring-green-100">

        {icon}

      </div>

      <h3 className="mt-4 font-bold text-green-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-green-900/60">
        {text}
      </p>

    </div>

  );
}