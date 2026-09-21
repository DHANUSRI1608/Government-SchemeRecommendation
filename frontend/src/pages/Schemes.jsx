import { useEffect, useState } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
import SchemeList from "../components/SchemeList";
import SchemeDetails from "../components/SchemeDetails";
import { getAllSchemes } from "../services/api";

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedScheme, setSelectedScheme] = useState(null);

  useEffect(() => {
    let active = true;

    getAllSchemes()
      .then((result) => {
        if (active) setSchemes(Array.isArray(result) ? result : []);
      })
      .catch(() => {
        if (active) setError("Unable to load schemes. Please check whether the backend is running.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="bg-[#f7faf7] py-14">
      <div className="section-container">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-green-700">Government Schemes</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">Explore available schemes</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">Browse the schemes loaded from the recommendation service.</p>
        </div>

        {loading && <div className="flex justify-center py-16"><LoaderCircle className="animate-spin text-green-700" /></div>}
        {error && <div className="mx-auto flex max-w-4xl gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"><AlertCircle size={20} /><p className="text-sm">{error}</p></div>}
        {!loading && !error && <SchemeList schemes={schemes} onViewDetails={setSelectedScheme} />}
      </div>

      {selectedScheme && <SchemeDetails scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />}
    </main>
  );
}