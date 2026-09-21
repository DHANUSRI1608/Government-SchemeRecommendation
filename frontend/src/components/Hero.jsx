import {
  ArrowRight,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Search
} from "lucide-react";

export default function Hero({ setPage }) {

  return (

    <section className="overflow-hidden bg-[#f7faf7]">

      <div className="section-container">

        <div className="grid min-h-[650px] items-center gap-14 py-16 lg:grid-cols-2">

          {/* LEFT */}

          <div className="fade-up">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800">

              <Sprout size={16} />

              Smart Agriculture Platform

            </div>


            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">

              Discover the right

              <span className="text-gradient">
                {" "}government schemes
              </span>

              {" "}for you.

            </h1>


            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">

              Find government schemes based on your
              location, income, landholding, category
              and farming needs — all in one place.

            </p>


            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => setPage("recommend")}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800"
              >

                <SparklesIcon />

                Find My Schemes

                <ArrowRight size={18} />

              </button>


              <button
                onClick={() => setPage("schemes")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
              >

                <Search size={18} />

                Browse Schemes

              </button>

            </div>


            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

              <Feature text="Personalized" />

              <Feature text="Simple & Easy" />

              <Feature text="AI Assisted" />

            </div>

          </div>


          {/* RIGHT */}

          <div className="relative hidden lg:block">

            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-green-100/60 blur-3xl" />

            <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-lime-100/50 blur-3xl" />


            <div className="relative mx-auto max-w-[450px]">

              {/* Main card */}

              <div className="rounded-[28px] border border-green-100 bg-white p-7 shadow-[0_25px_70px_rgba(22,101,52,0.12)]">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">

                      <Sprout size={25} />

                    </div>

                    <div>

                      <p className="text-xs text-gray-500">
                        Farmer profile
                      </p>

                      <h3 className="font-bold text-gray-900">
                        Your Information
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
                    title="Location"
                    value="Tamil Nadu"
                    percentage="82%"
                  />

                  <ProfileRow
                    title="Land Holding"
                    value="2.5 Acres"
                    percentage="62%"
                  />

                  <ProfileRow
                    title="Annual Income"
                    value="₹1.5 Lakh"
                    percentage="45%"
                  />

                </div>


                <div className="mt-7 rounded-2xl bg-green-50 p-5">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs font-medium text-green-700">
                        AI Recommendation
                      </p>

                      <p className="mt-1 text-lg font-bold text-green-900">
                        12 schemes found
                      </p>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                      AI
                    </div>

                  </div>

                </div>

              </div>


              {/* Floating card */}

              <div className="absolute -bottom-7 -left-12 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">

                    <CheckCircle2 size={20} />

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Best match
                    </p>

                    <p className="text-sm font-bold text-gray-900">
                      96% eligible
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

  return (
    <Sparkles size={18} />
  );
}


function Sparkles() {
  return null;
}