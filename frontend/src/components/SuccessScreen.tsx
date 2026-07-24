import { CheckCircle2 } from 'lucide-react';

interface SuccessScreenProps {
  onReset: () => void;
}

export function SuccessScreen({ onReset }: SuccessScreenProps) {
  return (
    <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-10 text-center shadow-sm shadow-emerald-100/60">
      <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <h2 className="text-3xl font-semibold text-slate-950">Complaint submitted</h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">Your report is now in review. Our team will assess it and update you on the status shortly.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Submit another complaint
      </button>
    </div>
  );
}
