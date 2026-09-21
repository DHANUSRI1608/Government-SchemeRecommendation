import SchemeCard from "./SchemeCard";

export default function SchemeList({
  schemes,
  onViewDetails
}) {

  if (!schemes || schemes.length === 0) {

    return (

      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
          🔍
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-800">
          No schemes found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or category.
        </p>

      </div>

    );
  }


  return (

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {schemes.map((scheme, index) => (

        <SchemeCard
          key={scheme.id ?? index}
          scheme={scheme}
          onViewDetails={onViewDetails}
        />

      ))}

    </div>

  );
}