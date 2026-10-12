import {
  ArrowRight,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Search,
  Sparkles
} from "lucide-react";
import { useTranslation } from "../i18n";

export default function Hero({ setPage }) {
  const { t } = useTranslation();

  return (

    <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_78%_20%,rgba(187,247,208,0.55),transparent_34%),linear-gradient(180deg,#f4faf4_0%,#fbfdfb_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-24 -z-10 h-72 w-72 rounded-full bg-lime-100/60 blur-3xl" />

      <div className="section-container">

        <div className="grid min-h-[650px] items-center gap-10 py-14 sm:py-20 min-[900px]:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">

          {/* LEFT */}

          <div className="fade-up">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-green-800 shadow-sm shadow-green-900/5 backdrop-blur">

              <Sprout size={16} className="text-green-600" />

              {t("Smart Agriculture Platform")}

            </div>


            <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-[-0.045em] text-gray-950 sm:text-5xl lg:text-[4.15rem]">

              {t("Discover the right")}
              <span className="text-gradient">{" "}{t("government schemes")}</span>
              {" "}{t("for you.")}

            </h1>


            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">

              {t("Find government schemes based on your location, income, landholding, category and farming needs — all in one place.")}

            </p>


            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => setPage("recommend")}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-700 to-green-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-900/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >

                <SparklesIcon />

                {t("Find My Schemes")}

                <ArrowRight size={18} />

              </button>


              <button
                onClick={() => setPage("schemes")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:bg-white hover:text-green-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >

                <Search size={18} />

                {t("Browse Schemes")}

              </button>

            </div>


            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

              <Feature text={t("Personalized")} />

              <Feature text={t("Simple & Easy")} />

              <Feature text={t("AI Assisted")} />

            </div>

          </div>


          {/* RIGHT */}

          <div className="relative hidden min-[900px]:block">

            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-green-100/60 blur-3xl" />

            <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-lime-100/50 blur-3xl" />


            <div className="relative mx-auto max-w-[450px] px-3 pb-4">

              {/* Main card */}

              <div className="rounded-[28px] border border-white/80 bg-white/90 p-7 shadow-[0_28px_80px_rgba(20,83,45,0.14)] ring-1 ring-green-900/[0.04] backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-lime-50 text-green-700 ring-1 ring-green-200/70">

                      <Sprout size={25} />

                    </div>

                    <div>

                      <p className="text-xs text-gray-500">
                        {t("Farmer profile")}
                      </p>

                      <h3 className="font-bold text-gray-900">
                        {t("Your Information")}
                      </h3>

                    </div>

                  </div>

                  <ShieldCheck
                    size={22}
                    className="text-green-600"
                  />

                </div>


                <div className="mt-7 space-y-5">

                  <ProfileRow
                    title={t("Location")}
                    value="Tamil Nadu"
                    percentage="82%"
                  />

                  <ProfileRow
                    title={t("Land Holding")}
                    value="2.5 Acres"
                    percentage="62%"
                  />

                  <ProfileRow
                    title={t("Annual Income")}
                    value="₹1.5 Lakh"
                    percentage="45%"
                  />

                </div>


                <div className="mt-7 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-lime-50/70 p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs font-medium text-green-700">
                        {t("AI Recommendation")}
                      </p>

                      <p className="mt-1 text-lg font-bold text-green-900">
                        {t("12 schemes found")}
                      </p>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                      AI
                    </div>

                  </div>

                </div>

              </div>


              {/* Floating card */}

              <div className="absolute -bottom-5 -left-7 rounded-2xl border border-white bg-white p-4 shadow-[0_18px_45px_rgba(20,83,45,0.15)] ring-1 ring-green-900/[0.04]">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">

                    <CheckCircle2 size={20} />

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      {t("Best match")}
                    </p>

                    <p className="text-sm font-bold text-gray-900">
                      {t("96% eligible")}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


function Feature({ text }) {

  return (

    <div className="flex items-center gap-2 text-sm text-gray-600">

      <CheckCircle2
        size={17}
        className="text-green-600"
      />

      {text}

    </div>

  );
}


function ProfileRow({
  title,
  value,
  percentage
}) {

  return (

    <div>

      <div className="mb-2 flex justify-between text-sm">

        <span className="text-gray-500">
          {title}
        </span>

        <span className="font-semibold text-gray-800">
          {value}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-100">

        <div
          className="h-full rounded-full bg-green-600"
          style={{ width: percentage }}
        />

      </div>

    </div>

  );
}


function SparklesIcon() {
  return <Sparkles size={18} />;
}