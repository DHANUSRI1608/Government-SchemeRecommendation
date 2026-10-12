import { Languages, Sprout } from "lucide-react";
import { supportedLanguages, useTranslation } from "../i18n";

export default function Navbar({ setPage, activePage }) {
	const { language, setLanguage, t } = useTranslation();

	return (
		<header className="sticky top-0 z-50 border-b border-green-100/70 bg-white/85 shadow-[0_8px_30px_rgba(20,83,45,0.04)] backdrop-blur-xl">
			<div className="section-container flex flex-wrap items-center justify-between gap-3 py-3">
				<button onClick={() => setPage("home")} aria-label={t("Go to FarmScheme home")} className="group flex items-center gap-3 rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-4">
					<span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-green-800 text-white shadow-md shadow-green-900/15 transition-transform group-hover:-rotate-6 group-hover:scale-105">
						<Sprout size={21} />
					</span>
					<span>
						<span className="block font-extrabold tracking-tight text-gray-900">Farm<span className="text-green-700">Scheme</span></span>
						<span className="block text-[11px] font-medium tracking-wide text-gray-500">{t("Smart Scheme Finder")}</span>
					</span>
				</button>
				<div className="flex flex-wrap items-center justify-end gap-3">
					<nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1 rounded-2xl bg-gray-50/90 p-1 text-sm font-semibold">
						<NavButton page="schemes" label={t("Explore schemes")} activePage={activePage} setPage={setPage} />
						<NavButton page="recommend" label={t("Find my schemes")} activePage={activePage} setPage={setPage} />
						<NavButton page="chat" label={t("AI Chat")} activePage={activePage} setPage={setPage} primary />
						<NavButton page="about" label={t("About")} activePage={activePage} setPage={setPage} />
					</nav>
					<label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-green-200 hover:shadow">
						<span className="sr-only">{t("Language")}</span>
						<Languages size={16} aria-hidden="true" className="text-green-700" />
						<select
							aria-label={t("Language")}
							value={language}
							onChange={(event) => setLanguage(event.target.value)}
							className="max-w-[100px] cursor-pointer border-0 bg-transparent text-sm text-gray-700 outline-none focus:ring-0"
						>
							{supportedLanguages.map(({ code, label }) => (
								<option key={code} value={code}>{label}</option>
							))}
						</select>
					</label>
				</div>
			</div>
		</header>
	);
}

function NavButton({ page, label, activePage, setPage, primary }) {
	const isActive = activePage === page;

	return (
		<button
			onClick={() => setPage(page)}
			aria-current={isActive ? "page" : undefined}
			className={`rounded-xl px-3 py-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 ${
				primary
					? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-sm shadow-green-900/15 hover:-translate-y-0.5 hover:from-green-800 hover:to-green-700"
					: isActive
						? "bg-white text-green-800 shadow-sm"
						: "text-gray-600 hover:bg-white hover:text-green-800"
			}`}
		>
			{label}
		</button>
	);
}
