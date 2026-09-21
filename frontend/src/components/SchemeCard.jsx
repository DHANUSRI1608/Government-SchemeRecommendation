import {
  ArrowRight,
  MapPin,
  Tag,
  IndianRupee,
  Sparkles
} from "lucide-react";

export default function SchemeCard({
  scheme,
  onViewDetails
}) {

  const name =
    scheme.name ||
    scheme.schemeName ||
    scheme.title ||
    "Government Scheme";


  const description =
    scheme.description ||
    "Government scheme providing support and benefits to eligible farmers.";


  const match =
    scheme.matchPercentage ??
    scheme.matchScore ??
    scheme.score ??
    null;


  return (

    <article onClick={() => onViewDetails(scheme)} className="card-hover flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">

      {/* Top */}

      <div className="h-1.5 bg-green-600" />


      <div className="flex flex-1 flex-col p-6">

        <div className="flex items-start justify-between gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">

            <Tag size={21} />

          </div>


          {match !== null && (

            <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

              <Sparkles size={13} />

              {Math.round(match)}% Match

            </div>

          )}

        </div>


        <h3 className="mt-5 text-xl font-bold leading-7 text-gray-900">
          {name}
        </h3>


        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
          {description}
        </p>


        <div className="mt-5 space-y-3">

          {scheme.category && (

            <InfoRow
              icon={<Tag size={16} />}
              text={Array.isArray(scheme.category) ? scheme.category.join(", ") : scheme.category}
            />

          )}


          {scheme.state && (

            <InfoRow
              icon={<MapPin size={16} />}
              text={scheme.state}
            />

          )}


          {scheme.benefits && (

            <InfoRow
              icon={<IndianRupee size={16} />}
              text={scheme.benefits}
            />

          )}

        </div>


        <div className="mt-auto pt-7">

          <button
            onClick={(event) => {
              event.stopPropagation();
              onViewDetails(scheme);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          >

            View Scheme Details

            <ArrowRight size={17} />

          </button>

        </div>

      </div>

    </article>

  );
}


function InfoRow({
  icon,
  text
}) {

  return (

    <div className="flex items-center gap-2 text-sm text-gray-600">

      <span className="text-green-600">
        {icon}
      </span>

      <span className="truncate">
        {text}
      </span>

    </div>

  );
}