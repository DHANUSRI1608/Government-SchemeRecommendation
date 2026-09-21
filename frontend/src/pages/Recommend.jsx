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

export default function Recommend() {

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

    <main className="bg-[#f7faf7] py-14">

      <div className="section-container">


        {/* Heading */}

        <div className="mx-auto mb-12 max-w-2xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">

            <Sparkles size={27} />

          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-wider text-green-700">
            Personalized Recommendation
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Find schemes for you
          </h1>

          <p className="mt-4 leading-7 text-gray-500">
            Enter your details and discover government schemes
            that match your farming profile.
          </p>

        </div>


        {/* Form */}

        <div className="mx-auto max-w-4xl">

          <FarmerForm
            onSubmit={handleSubmit}
            loading={loading}
          />

        </div>


        {/* Error */}

        {error && (

          <div className="mx-auto mt-6 flex max-w-4xl gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

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

            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <p className="text-sm font-bold uppercase tracking-wider text-green-700">
                  Results
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                  Recommended schemes
                </h2>

                <p className="mt-2 text-gray-500">
                  These schemes match the information you provided.
                </p>

              </div>


              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >

                <RotateCcw size={17} />

                Start Again

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