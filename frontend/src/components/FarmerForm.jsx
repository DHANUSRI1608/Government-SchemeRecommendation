import { useState } from "react";

import {
  MapPin,
  User,
  Wallet,
  LandPlot,
  Users,
  Search,
  LoaderCircle,
  ChevronDown
} from "lucide-react";
import { useTranslation } from "../i18n";

export default function FarmerForm({
  onSubmit,
  loading
}) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    state: "",
    gender: "",
    age: "",
    income: "",
    landHolding: "",
    category: "",
    occupation: "Farmer",
    disability: false,
    education: "",
    keywords: ""
  });


  const states = [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Andhra Pradesh",
    "Telangana",
    "Maharashtra",
    "Punjab",
    "Gujarat",
    "Rajasthan",
    "Uttar Pradesh"
  ];


  const categories = [
    "General",
    "SC",
    "ST",
    "OBC",
    "Small Farmer",
    "Marginal Farmer"
  ];


  const updateField = (event) => {

    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

  };


  const handleSubmit = (event) => {

    event.preventDefault();

    onSubmit({
      ...form,

      age: Number(form.age),

      income: Number(form.income),

      landHolding: Number(form.landHolding)
    });

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-green-100 bg-white p-6 shadow-[0_15px_50px_rgba(22,101,52,0.08)] sm:p-8 lg:p-10"
    >

      {/* Header */}

      <div className="mb-8 flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">

          <User size={23} />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            {t("Tell us about yourself")}
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            {t("Your information helps us find schemes that match your eligibility.")}
          </p>

        </div>

      </div>


      {/* Form */}

      <div className="grid gap-5 md:grid-cols-2">

        <Field
          label={t("State")}
          icon={<MapPin size={17} />}
        >

          <div className="relative">

            <select
              name="state"
              value={form.state}
              onChange={updateField}
              required
              className="input-field appearance-none pr-10"
            >

              <option value="">
                {t("Select your state")}
              </option>

              {states.map((state) => (

                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>

              ))}

            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

          </div>

        </Field>


        <Field label={t("Gender")} icon={<User size={17} />}>
          <select name="gender" value={form.gender} onChange={updateField} required className="input-field">
            <option value="">{t("Select gender")}</option>
            <option value="Male">{t("Male")}</option>
            <option value="Female">{t("Female")}</option>
            <option value="Other">{t("Other")}</option>
          </select>
        </Field>


        <Field
          label={t("Age")}
          icon={<User size={17} />}
        >

          <input
            type="number"
            name="age"
            value={form.age}
            onChange={updateField}
            min="18"
            max="100"
            placeholder={t("Enter your age")}
            required
            className="input-field"
          />

        </Field>


        <Field
          label={t("Annual Income")}
          icon={<Wallet size={17} />}
        >

          <input
            type="number"
            name="income"
            value={form.income}
            onChange={updateField}
            min="0"
            placeholder={t("Example: 150000")}
            required
            className="input-field"
          />

        </Field>


        <Field
          label={t("Land Holding")}
          icon={<LandPlot size={17} />}
        >

          <div className="relative">

            <input
              type="number"
              step="0.01"
              name="landHolding"
              value={form.landHolding}
              onChange={updateField}
              min="0"
              placeholder={t("Example: 2.5")}
              required
              className="input-field pr-20"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {t("acres")}
            </span>

          </div>

        </Field>


        <Field
          label={t("Farmer Category")}
          icon={<Users size={17} />}
        >

          <div className="relative">

            <select
              name="category"
              value={form.category}
              onChange={updateField}
              required
              className="input-field appearance-none pr-10"
            >

              <option value="">
                {t("Select category")}
              </option>

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >
                  {t(category)}
                </option>

              ))}

            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

          </div>

        </Field>

      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label={t("Education")} icon={<User size={17} />}>
          <input name="education" value={form.education} onChange={updateField} placeholder={t("Example: 10th")} className="input-field" />
        </Field>

        <Field label={t("Support needed")} icon={<Search size={17} />}>
          <input name="keywords" value={form.keywords} onChange={updateField} placeholder={t("Example: drip irrigation")} className="input-field" />
        </Field>

        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
          <input type="checkbox" name="disability" checked={form.disability} onChange={(event) => setForm({ ...form, disability: event.target.checked })} />
          {t("Person with disability")}
        </label>
      </div>


      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-4 font-semibold text-white shadow-lg shadow-green-900/10 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >

        {loading ? (

          <>
            <LoaderCircle
              size={20}
              className="animate-spin"
            />

            {t("Finding suitable schemes...")}
          </>

        ) : (

          <>
            <Search size={20} />

            {t("Recommend Schemes")}
          </>

        )}

      </button>


      <p className="mt-3 text-center text-xs text-gray-400">
        {t("Your details are used only to identify suitable schemes.")}
      </p>

    </form>
  );
}


function Field({
  label,
  icon,
  children
}) {

  return (

    <div>

      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

        <span className="text-green-700">
          {icon}
        </span>

        {label}

      </label>

      {children}

    </div>

  );
}