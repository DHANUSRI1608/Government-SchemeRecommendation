import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type SchemeRule = {
  id: string;
  conditions: {
    region?: string[];
    farmType?: string[];
    income?: string[];
  };
};

const schemeRules: SchemeRule[] = [
  {
    id: 'pmkisan',
    conditions: { income: ['low', 'medium'] }
  },
  {
    id: 'soilHealth',
    conditions: { farmType: ['cereals', 'vegetables', 'fruits', 'mixed'] }
  },
  {
    id: 'dripIrrigation',
    conditions: { region: ['west', 'south'], farmType: ['vegetables', 'fruits'] }
  },
  {
    id: 'cropInsurance',
    conditions: { income: ['low', 'medium'] }
  },
  {
    id: 'animalHusbandry',
    conditions: { farmType: ['dairy', 'mixed'] }
  }
];

type FormState = {
  language: string;
  region: string;
  farmType: string;
  crops: string[];
  income: string;
};

function App() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState<FormState>({
    language: 'en',
    region: '',
    farmType: '',
    crops: [],
    income: ''
  });

  const schemeIds = useMemo(() => {
    const matched = schemeRules.filter((rule) => {
      const { region, farmType, income } = rule.conditions;
      if (region && !region.includes(form.region)) {
        return false;
      }
      if (farmType && !farmType.includes(form.farmType)) {
        return false;
      }
      if (income && !income.includes(form.income)) {
        return false;
      }
      return true;
    });
    return matched.map((rule) => rule.id);
  }, [form]);

  const handleChange = (key: keyof FormState, value: string | string[]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setForm((current) => ({ ...current, language }));
  };

  const schemeItems = schemeIds.map((id) => {
    const scheme = t(`schemes.${id}`, { returnObjects: true }) as { name: string; description: string };
    return (
      <article key={id} className="scheme-card">
        <h3>{scheme.name}</h3>
        <p>{scheme.description}</p>
      </article>
    );
  });

  const cropOptions = ['wheat', 'rice', 'maize', 'vegetables', 'fruits', 'dairy'];

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <span className="eyebrow">{t('subtitle')}</span>
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>
        <div className="hero-actions">
          <label>
            {t('languageLabel')}
            <select value={form.language} onChange={(event) => handleLanguage(event.target.value)}>
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>
          </label>
        </div>
      </header>

      <main className="content-grid">
        <section className="form-panel">
          <h2>{t('subtitle')}</h2>
          <div className="form-field">
            <label>{t('regionLabel')}</label>
            <select value={form.region} onChange={(event) => handleChange('region', event.target.value)}>
              <option value="">{t('selectRegion')}</option>
              <option value="north">{t('regions.north')}</option>
              <option value="south">{t('regions.south')}</option>
              <option value="east">{t('regions.east')}</option>
              <option value="west">{t('regions.west')}</option>
            </select>
          </div>

          <div className="form-field">
            <label>{t('farmTypeLabel')}</label>
            <select value={form.farmType} onChange={(event) => handleChange('farmType', event.target.value)}>
              <option value="">{t('selectFarmType')}</option>
              <option value="cereals">{t('farmTypes.cereals')}</option>
              <option value="vegetables">{t('farmTypes.vegetables')}</option>
              <option value="fruits">{t('farmTypes.fruits')}</option>
              <option value="dairy">{t('farmTypes.dairy')}</option>
              <option value="mixed">{t('farmTypes.mixed')}</option>
            </select>
          </div>

          <div className="form-field">
            <label>{t('cropsLabel')}</label>
            <div className="checkbox-grid">
              {cropOptions.map((crop) => (
                <label key={crop} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={form.crops.includes(crop)}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...form.crops, crop]
                        : form.crops.filter((item) => item !== crop);
                      handleChange('crops', next);
                    }}
                  />
                  {t(`crops.${crop}`)}
                </label>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label>{t('incomeLabel')}</label>
            <select value={form.income} onChange={(event) => handleChange('income', event.target.value)}>
              <option value="">{t('selectIncome')}</option>
              <option value="low">{t('incomeOptions.low')}</option>
              <option value="medium">{t('incomeOptions.medium')}</option>
              <option value="high">{t('incomeOptions.high')}</option>
            </select>
          </div>

          <div className="button-row">
            <button type="button">{t('seeRecommendations')}</button>
          </div>
        </section>

        <section className="recommendation-panel">
          <div className="panel-header">
            <h2>{t('recommendationTitle')}</h2>
          </div>
          <div className="scheme-list">
            {schemeItems.length ? schemeItems : <p>{t('noResults')}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
