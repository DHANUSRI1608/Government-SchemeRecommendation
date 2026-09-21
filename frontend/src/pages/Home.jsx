import Hero from "../components/Hero";

import {
  UserRound,
  BrainCircuit,
  BadgeCheck,
  ArrowRight
} from "lucide-react";

export default function Home({ setPage }) {

  return (

    <>

      <Hero setPage={setPage} />


      {/* HOW IT WORKS */}

      <section className="bg-white py-20">

        <div className="section-container">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-green-700">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How it works
            </h2>

            <p className="mt-4 text-gray-500">
              Find suitable government schemes in just a few simple steps.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <StepCard
              number="01"
              icon={<UserRound size={24} />}
              title="Create your profile"
              description="Enter your basic farming information such as state, income, landholding and category."
              onClick={() => setPage("recommend")}
            />

            <StepCard
              number="02"
              icon={<BrainCircuit size={24} />}
              title="Smart matching"
              description="The recommendation system analyses your information against available schemes."
              onClick={() => setPage("recommend")}
            />

            <StepCard
              number="03"
              icon={<BadgeCheck size={24} />}
              title="Get recommendations"
              description="View the schemes that best match your profile and eligibility."
              onClick={() => setPage("recommend")}
            />

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="green-gradient py-16">

        <div className="section-container">

          <div className="grid gap-10 text-center text-white md:grid-cols-3">

            <Stat
              number="794+"
              text="Government Schemes"
            />

            <Stat
              number="5+"
              text="Agriculture Categories"
            />

            <Stat
              number="AI"
              text="Personalized Matching"
            />

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="bg-[#f7faf7] py-20">

        <div className="section-container">

          <div className="overflow-hidden rounded-3xl bg-green-50 p-8 sm:p-12">

            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

              <div className="max-w-2xl">

                <p className="text-sm font-bold uppercase tracking-wider text-green-700">
                  Get started
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-green-950">
                  Find schemes that match your needs.
                </h2>

                <p className="mt-3 leading-7 text-green-900/60">
                  Enter your farming details and discover
                  relevant government support programs.
                </p>

              </div>


              <button
                onClick={() => setPage("recommend")}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white hover:bg-green-800"
              >

                Start Recommendation

                <ArrowRight size={18} />

              </button>

            </div>

          </div>

        </div>

      </section>

    </>

  );
}


function StepCard({
  number,
  icon,
  title,
  description,
  onClick
}) {

  return (

    <button onClick={onClick} className="card-hover group w-full rounded-2xl border border-gray-200 bg-white p-7 text-left transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
          {icon}
        </div>

        <span className="text-3xl font-black text-green-100">
          {number}
        </span>

      </div>

      <h3 className="mt-6 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-700 opacity-0 transition group-hover:opacity-100">
        Start here <ArrowRight size={16} />
      </div>
    </button>

  );
}


function Stat({
  number,
  text
}) {

  return (

    <div>

      <div className="text-4xl font-extrabold">
        {number}
      </div>

      <p className="mt-2 text-green-100">
        {text}
      </p>

    </div>

  );
}