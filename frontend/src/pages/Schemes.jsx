import { useEffect, useState } from "react";
import { AlertCircle, LoaderCircle, Sprout, Sparkles } from "lucide-react";
import SchemeList from "../components/SchemeList";
import SchemeDetails from "../components/SchemeDetails";
import { getAllSchemes } from "../services/api";
import { useTranslation } from "../i18n";

export default function Schemes() {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedScheme, setSelectedScheme] = useState(null);

  useEffect(() => {
    let active = true;

    getAllSchemes()
      .then((result) => {
        if (active) setSchemes(Array.isArray(result) ? result : []);
      })
      .catch(() => {
        if (active) setError("Unable to load schemes. Please check whether the backend is running.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-[70vh] bg-[radial-gradient(ellipse_at_85%_0%,rgba(187,247,208,0.38),transparent_35%),linear-gradient(180deg,#f5faf5_0%,#fbfdfb_280px)] py-10 sm:py-14">
      <div className="section-container">
        <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-green-100/80 bg-white/75 px-6 py-10 text-center shadow-[0_20px_60px_rgba(20,83,45,0.06)] backdrop-blur sm:mb-12 sm:px-10 sm:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-24 h-64 w-64 rounded-full bg-green-100/70 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-10 h-56 w-56 rounded-full bg-lime-100/60 blur-3xl" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center">
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-lime-50 text-green-700 shadow-sm ring-1 ring-green-200/70">
              <Sprout size={27} />
            </span>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">{t("Government Schemes")}</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-5xl">{t("Explore available schemes")}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">{t("Browse the schemes loaded from the recommendation service.")}</p>
            {!loading && !error && schemes.length > 0 && (
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50/80 px-4 py-2 text-sm font-semibold text-green-800">
                <Sparkles size={15} />
                {schemes.length} {t("Government Schemes")}
              </span>
            )}
          </div>
        </div>

        {loading && <div className="flex min-h-56 items-center justify-center rounded-3xl border border-green-100 bg-white/70 shadow-sm"><LoaderCircle size={30} className="animate-spin text-green-700" /></div>}
        {error && <div className="mx-auto flex max-w-4xl gap-3 rounded-2xl border border-red-200 bg-white p-5 text-red-700 shadow-sm"><AlertCircle size={20} className="shrink-0" /><p className="text-sm leading-6">{t(error)}</p></div>}
        {!loading && !error && <SchemeList schemes={schemes} onViewDetails={setSelectedScheme} />}
      </div>

      {selectedScheme && <SchemeDetails scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />}
    </main>
  );
}