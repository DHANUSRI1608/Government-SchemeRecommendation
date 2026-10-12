import {
  ArrowRight,
  MapPin,
  Tag,
  IndianRupee,
  Sparkles
} from "lucide-react";
import { useTranslation } from "../i18n";

export default function SchemeCard({
  scheme,
  onViewDetails
}) {
  const { t } = useTranslation();

  const name =
    scheme.name ||
    scheme.schemeName ||
    scheme.title ||
    t("Government Scheme");


  const description =
    scheme.description ||
    t("Government scheme providing support and benefits to eligible farmers.");


  const match =
    scheme.matchPercentage ??
    scheme.matchScore ??
    scheme.score ??
    null;


  return (

    <article onClick={() => onViewDetails(scheme)} className="card-hover group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.4rem] border border-gray-200/90 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.035)] transition hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(20,83,45,0.11)]">

      {/* Top */}

      <div className="h-1.5 bg-gradient-to-r from-green-700 via-green-500 to-lime-400" />


      <div className="flex flex-1 flex-col p-6">

        <div className="flex items-start justify-between gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-50 to-lime-50 text-green-700 ring-1 ring-green-100 transition group-hover:from-green-100 group-hover:to-lime-100">

            <Tag size={21} />

          </div>


          {match !== null && (

            <div className="flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800">

              <Sparkles size={13} />

              {Math.round(match)}% {t("Match")}

            </div>

          )}

        </div>


        <h3 className="mt-5 text-lg font-extrabold leading-7 text-gray-950 sm:text-xl">
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
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-3 text-sm font-semibold text-green-800 transition hover:border-green-600 hover:bg-green-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >

            {t("View Scheme Details")}

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