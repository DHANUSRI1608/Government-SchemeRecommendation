import { useState } from "react";

import FarmerForm from "../components/FarmerForm";
import SchemeList from "../components/SchemeList";
import SchemeDetails from "../components/SchemeDetails";

import {
  Sparkles,
  AlertCircle,
  RotateCcw
} from "lucide-react";

import {
  recommendSchemes
} from "../services/api";
import { useTranslation } from "../i18n";

export default function Recommend() {
  const { t } = useTranslation();

  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [selectedScheme, setSelectedScheme] = useState(null);


  const handleSubmit = async (farmerData) => {

    setLoading(true);

    setError("");

    try {

      const result =
        await recommendSchemes(farmerData);


      const schemes = Array.isArray(result)
        ? result.map((recommendation) => ({
            ...recommendation.schemeDetails,
            score: recommendation.score,
            recommendationReason: recommendation.reason
          }))
        : [];


      setRecommendations(schemes);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to the recommendation service. Please check whether your Spring Boot backend is running."
      );

    } finally {

      setLoading(false);

    }

  };


  const reset = () => {

    setRecommendations([]);

    setError("");

  };


  return (

    <main className="min-h-[70vh] bg-[radial-gradient(ellipse_at_15%_0%,rgba(217,249,157,0.32),transparent_30%),radial-gradient(ellipse_at_90%_10%,rgba(187,247,208,0.4),transparent_35%),linear-gradient(180deg,#f5faf5_0%,#fbfdfb_360px)] py-10 sm:py-14">

      <div className="section-container">


        {/* Heading */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-green-600 to-green-800 text-white shadow-lg shadow-green-900/15 ring-4 ring-white">

            <Sparkles size={27} />

          </div>

          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
            {t("Personalized Recommendation")}
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-5xl">
            {t("Find schemes for you")}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            {t("Enter your details and discover government schemes that match your farming profile.")}
          </p>

        </div>


        {/* Form */}

        <div className="mx-auto max-w-4xl rounded-[2rem] border border-green-100/80 bg-white/65 p-2 shadow-[0_20px_60px_rgba(20,83,45,0.07)] backdrop-blur sm:p-3">

          <FarmerForm
            onSubmit={handleSubmit}
            loading={loading}
          />

        </div>


        {/* Error */}

        {error && (

          <div className="mx-auto mt-6 flex max-w-4xl gap-3 rounded-2xl border border-red-200 bg-white p-5 text-red-700 shadow-sm">

            <AlertCircle
              size={20}
              className="shrink-0"
            />

            <p className="text-sm leading-6">
              {error}
            </p>

          </div>

        )}


        {/* Results */}

        {recommendations.length > 0 && (

          <section className="mt-16 fade-up">

            <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-green-100 bg-white/75 p-6 shadow-sm sm:flex-row sm:items-end sm:p-8">

              <div>

                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
                  {t("Results")}
                </p>

                <h2 className="mt-2 text-2xl font-black text-gray-950 sm:text-3xl">
                  {t("Recommended schemes")}
                </h2>

                <p className="mt-2 text-gray-500">
                  {t("These schemes match the information you provided.")}
                </p>

              </div>


              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-800"
              >

                <RotateCcw size={17} />

                {t("Start Again")}

              </button>

            </div>


            <SchemeList
              schemes={recommendations}
              onViewDetails={setSelectedScheme}
            />

          </section>

        )}

      </div>


      {/* Details modal */}

      {selectedScheme && (

        <SchemeDetails
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />

      )}

    </main>

  );
}