import { UserCheck, MapPin, Tent, Sprout, HandCoins, Users, Contact, UserRound, Briefcase } from "lucide-react";

export default function FarmerProfileSidebar({ profile, language }) {
  if (!profile) return null;

  const t = (en, ta) => language === "ta" ? ta : en;

  const unknown = t("Not provided", "வழங்கப்படவில்லை");

  const fields = [
    { key: "state", label: t("State", "மாநிலம்"), icon: <MapPin size={16} />, value: profile.state },
    { key: "district", label: t("District", "மாவட்டம்"), icon: <MapPin size={16} />, value: profile.district },
    { key: "landHolding", label: t("Land (Acres)", "நிலம் (ஏக்கர்)"), icon: <Tent size={16} />, value: profile.landHolding },
    { key: "crop", label: t("Main Crop", "பயிர்"), icon: <Sprout size={16} />, value: profile.crop },
    { key: "annualIncome", label: t("Annual Income", "வருமானம்"), icon: <HandCoins size={16} />, value: profile.annualIncome ? `₹${profile.annualIncome}` : null },
    { key: "category", label: t("Category", "பிரிவு"), icon: <Users size={16} />, value: profile.category },
    { key: "farmerType", label: t("Farmer Type", "விவசாயி வகை"), icon: <UserCheck size={16} />, value: profile.farmerType },
    { key: "age", label: t("Age", "வயது"), icon: <Contact size={16} />, value: profile.age },
    { key: "gender", label: t("Gender", "பாலினம்"), icon: <UserRound size={16} />, value: profile.gender },
    { key: "occupation", label: t("Occupation", "தொழில்"), icon: <Briefcase size={16} />, value: profile.occupation },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-[1.65rem] border border-white bg-white/85 p-5 shadow-[0_18px_55px_rgba(20,83,45,0.08)] ring-1 ring-green-900/[0.04] backdrop-blur sm:p-6">
      
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-lime-50 text-green-800 ring-1 ring-green-200/70">
          <UserCheck size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 leading-tight">
            {t("Farmer Profile", "விவசாயி விவரங்கள்")}
          </h3>
          <p className="text-xs text-gray-500">
            {t("Updated from chat", "உரையாடலில் இருந்து")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {fields.map(field => {
          const hasValue = field.value !== null && field.value !== undefined && field.value !== "";
          return (
            <div 
              key={field.key} 
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                hasValue 
                  ? "border-green-100 bg-gradient-to-r from-white to-green-50/40 shadow-sm"
                  : "border-dashed border-gray-200 bg-gray-50/60 opacity-60"
              }`}
            >
              <div className={hasValue ? "text-green-600" : "text-gray-400"}>
                {field.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  {field.label}
                </span>
                <span className={`truncate text-sm font-medium ${hasValue ? "text-gray-900" : "text-gray-400 italic"}`}>
                  {hasValue ? field.value : unknown}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
