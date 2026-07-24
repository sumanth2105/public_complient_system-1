import { motion } from 'framer-motion';
import { CheckCircle2, Info, Sparkles } from 'lucide-react';
import { type WizardForm } from '../types';

interface DetailsStepProps {
  form: WizardForm;
  setForm: React.Dispatch<React.SetStateAction<WizardForm>>;
}

const impactOptions = [
  'Moderate community impact',
  'High neighborhood disruption',
  'Low inconvenience',
  'Critical public safety concern',
];

export function DetailsStep({ form, setForm }: DetailsStepProps) {
  const updateField = (field: keyof WizardForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-sky-100 p-3 text-sky-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Complaint details</h2>
              <p className="text-sm text-slate-600">Add clarity and expected impact for better prioritization.</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <label className="block text-sm font-semibold text-slate-900">Title</label>
            <input
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="Summary of the issue"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            <p className="text-xs text-slate-500">Maximum 120 characters.</p>

            <label className="block text-sm font-semibold text-slate-900">Description</label>
            <textarea
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              rows={6}
              placeholder="Describe the problem in detail"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Character count: {form.description.length}/1000</span>
              <span>{form.description.length > 800 ? 'Almost full' : 'Plenty of space'}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-900">Priority</label>
                <select
                  value={form.priority}
                  onChange={(event) => updateField('priority', event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900">Estimated area affected</label>
                <input
                  value={form.areaAffected}
                  onChange={(event) => updateField('areaAffected', event.target.value)}
                  placeholder="e.g. 3 blocks"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
          <div className="rounded-[24px] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-emerald-100 p-3 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">AI assistant</p>
                <p className="mt-1 text-sm text-slate-600">Writing suggestions while you type.</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Try phrases like “damaged street surface causing...” or “unsafe exposed wiring near...”</p>
          </div>

          <div className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Severity</p>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{form.severity}%</span>
            </div>
            <input
              type="range"
              value={form.severity}
              onChange={(event) => updateField('severity', Number(event.target.value))}
              min={0}
              max={100}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-sky-600"
            />
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Expected impact</p>
            <div className="mt-4 space-y-3">
              {impactOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => updateField('impact', option)}
                  className={`w-full rounded-3xl border px-4 py-3 text-left text-sm transition ${form.impact === option ? 'border-sky-500 bg-sky-500/10 text-slate-900' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <label className="text-sm font-semibold text-slate-900">Date detected</label>
              <input
                type="date"
                value={form.detectedDate}
                onChange={(event) => updateField('detectedDate', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-900">Time detected</label>
              <input
                type="time"
                value={form.detectedTime}
                onChange={(event) => updateField('detectedTime', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
              <label className="text-sm font-semibold text-slate-900">Anonymous report</label>
              <input
                type="checkbox"
                checked={form.anonymous}
                onChange={(event) => updateField('anonymous', event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
