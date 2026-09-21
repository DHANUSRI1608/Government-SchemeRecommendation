import {
  X,
  CheckCircle2,
  MapPin,
  Tag,
  IndianRupee,
  FileText
} from "lucide-react";

export default function SchemeDetails({
  scheme,
  onClose
}) {

  if (!scheme) {
    return null;
  }


  const name =
    scheme.name ||
    scheme.schemeName ||
    scheme.title ||
    "Government Scheme";


  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between border-b border-gray-100 p-6 sm:p-8">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">

              <FileText size={23} />

            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                Government Scheme
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {name}
              </h2>

            </div>

          </div>


          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >

            <X size={22} />

          </button>

        </div>


        {/* Content */}

        <div className="p-6 sm:p-8">

          <div className="rounded-2xl bg-green-50 p-5">

            <h3 className="font-semibold text-green-900">
              About this scheme
            </h3>

            <p className="mt-3 text-sm leading-7 text-green-900/70">
              {scheme.description ||
                "Detailed information about this government scheme is available here."}
            </p>

          </div>

          {scheme.recommendationReason && (
            <div className="mt-4 rounded-2xl border border-green-100 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-green-700">Why this matches</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">{scheme.recommendationReason}</p>
            </div>
          )}


          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            {scheme.category && (

              <Detail
                icon={<Tag size={18} />}
                title="Category"
                value={Array.isArray(scheme.category) ? scheme.category.join(", ") : scheme.category}
              />

            )}


            {scheme.state && (

              <Detail
                icon={<MapPin size={18} />}
                title="Location"
                value={scheme.state}
              />

            )}


            {scheme.benefits && (

              <Detail
                icon={<IndianRupee size={18} />}
                title="Benefits"
                value={scheme.benefits}
              />

            )}


            {scheme.eligibility && (

              <Detail
                icon={<CheckCircle2 size={18} />}
                title="Eligibility"
                value={scheme.eligibility}
              />

            )}

          </div>


          {scheme.applicationLink && (

            <a
              href={scheme.applicationLink}
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex items-center justify-center rounded-xl bg-green-700 px-5 py-3.5 font-semibold text-white hover:bg-green-800"
            >

              Apply / Learn More

            </a>

          )}

        </div>

      </div>

    </div>

  );
}


function Detail({
  icon,
  title,
  value
}) {

  return (

    <div className="rounded-xl border border-gray-100 p-4">

      <div className="flex items-center gap-2 text-green-700">

        {icon}

        <span className="text-xs font-semibold uppercase tracking-wide">
          {title}
        </span>

      </div>

      <p className="mt-2 text-sm font-medium text-gray-800">
        {value}
      </p>

    </div>

  );
}