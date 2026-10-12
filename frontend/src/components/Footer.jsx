import { Sprout, ArrowUpRight } from "lucide-react";
import { useTranslation } from "../i18n";

export default function Footer({ setPage }) {
  const { t } = useTranslation();

  return (

    <footer className="border-t border-green-100/80 bg-white">

      <div className="section-container py-12 sm:py-14">

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">


          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-green-800 text-white shadow-sm shadow-green-900/15">

                <Sprout size={21} />

              </div>

              <div>

                <h3 className="font-bold text-green-800">
                  FarmScheme
                </h3>

                <p className="text-xs text-gray-500">
                  {t("Smart Scheme Finder")}
                </p>

              </div>

            </div>


            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              {t("A smart platform designed to help farmers discover suitable government schemes based on their individual profile.")}
            </p>

          </div>


          <div>

            <h4 className="font-bold text-gray-900">
              {t("Platform")}
            </h4>

            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-gray-500">
              <FooterButton onClick={() => setPage("recommend")} label={t("Personalized recommendations")} />
              <FooterButton onClick={() => setPage("schemes")} label={t("Browse all schemes")} />
              <FooterButton onClick={() => setPage("chat")} label={t("AI Chat")} />
              <FooterButton onClick={() => setPage("about")} label={t("How it works")} />
            </div>

          </div>


          <div>

            <h4 className="font-bold text-gray-900">
              {t("Project")}
            </h4>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              {t("Government Scheme Recommendation System for Farmers.")}
            </p>


            <button onClick={() => setPage("recommend")} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900">
              {t("Start finding schemes")} <ArrowUpRight size={16} />
            </button>

          </div>

        </div>


        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">

          © 2026 FarmScheme · Academic Project

        </div>

      </div>

    </footer>

  );
}

function FooterButton({ onClick, label }) {
  return <button onClick={onClick} className="text-left transition hover:translate-x-0.5 hover:text-green-700 focus-visible:outline-none focus-visible:underline">{label}</button>;
}