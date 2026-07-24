import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { AlertCircle, Camera, CheckCircle2, ChevronRight, ImageIcon, MapPin, Sparkles, UploadCloud, X } from 'lucide-react';
import { categoryCards, initialForm } from './data';
import { CategoryCard } from './components/CategoryCard';
import { LocationStep } from './components/LocationStep';
import { DetailsStep } from './components/DetailsStep';
import { UploadStep } from './components/UploadStep';
import { ReviewStep } from './components/ReviewStep';
import { SuccessScreen } from './components/SuccessScreen';

const steps = ['Category', 'Location', 'Details', 'Upload', 'Review'];

type WizardForm = typeof initialForm;

function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<WizardForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const activeStep = steps[step];

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(form.category);
    if (step === 1) return Boolean(form.location.address);
    if (step === 2) return Boolean(form.title && form.description);
    if (step === 3) return form.photos.length > 0;
    return true;
  }, [form, step]);

  const nextStep = () => {
    if (step === 4) return;
    setStep((value) => value + 1);
  };

  const prevStep = () => {
    if (step === 0) return;
    setStep((value) => value - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setStep(0);
    setForm(initialForm);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-xl sm:p-8"
        >
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Government-grade report wizard
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Report an issue with premium clarity</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                A modern 5-step complaint flow for accurate reporting, evidence upload, and intelligent review.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-flow-col sm:auto-cols-max">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ImageIcon className="h-4 w-4" /> Reset wizard
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-4 rounded-[24px] border border-slate-200/90 bg-slate-50/80 p-4 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
              <div className="rounded-[20px] bg-white px-4 py-5 shadow-sm shadow-slate-200/40">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Progress</p>
                <div className="mt-4 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className="h-2 rounded-full bg-sky-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">Step {step + 1} of {steps.length} — {activeStep}</p>
              </div>
              {steps.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`flex w-full items-center justify-between gap-3 rounded-3xl px-4 py-4 text-left transition ${index === step ? 'bg-sky-500 text-white shadow-soft' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
                >
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="rounded-2xl bg-slate-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{index + 1}</span>
                </button>
              ))}
            </aside>

            <section className="space-y-8">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-6"
              >
                {submitted ? (
                  <SuccessScreen form={form} onReset={handleReset} />
                ) : (
                  <>
                    {step === 0 && (
                      <div className="space-y-6">
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                          {categoryCards.map((category) => (
                            <CategoryCard
                              key={category.key}
                              category={category}
                              selected={form.category === category.key}
                              onSelect={() => setForm((prev) => ({ ...prev, category: category.key }))}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 1 && <LocationStep form={form} setForm={setForm} />}
                    {step === 2 && <DetailsStep form={form} setForm={setForm} />}
                    {step === 3 && <UploadStep form={form} setForm={setForm} />}
                    {step === 4 && <ReviewStep form={form} setStep={setStep} />}

                    <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 0 || loading}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Back
                      </button>

                      <div className="flex items-center gap-3">
                        {step < 4 ? (
                          <button
                            type="button"
                            onClick={nextStep}
                            disabled={!canContinue || loading}
                            className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Continue
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!canContinue || loading}
                            className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {loading ? 'Submitting…' : 'Submit complaint'}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
