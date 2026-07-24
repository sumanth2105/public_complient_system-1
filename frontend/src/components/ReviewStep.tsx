import { motion } from 'framer-motion';
import { MapPin, Sparkles, Ticket, UploadCloud } from 'lucide-react';
import { type WizardForm } from '../types';

interface ReviewStepProps {
  form: WizardForm;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export function ReviewStep({ form, setStep }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Final review</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Confirm before submission</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
            <Ticket className="h-4 w-4" /> Reference ready
          </div>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Category</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">{form.category || 'Not selected'}</p>
              </div>
              <button type="button" onClick={() => setStep(0)} className="text-sm font-semibold text-sky-600">Edit</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                <p className="mt-3 text-sm text-slate-700">{form.location.address || 'No address provided'}</p>
                <p className="mt-2 text-sm text-slate-500">{form.location.city || 'City unavailable'}, {form.location.state || 'State unavailable'}</p>
              </div>
              <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-sky-600">Edit</button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Complaint summary</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">{form.title || 'No title added'}</p>
              </div>
              <button type="button" onClick={() => setStep(2)} className="text-sm font-semibold text-sky-600">Edit</button>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{form.description || 'No description added.'}</p>
          </motion.div>
        </div>

        <aside className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <div className="rounded-[24px] bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Priority</p>
            <p className="mt-3 text-xl font-semibold text-slate-950">{form.priority}</p>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Estimated department</p>
            <p className="mt-3 text-xl font-semibold text-slate-950">{form.category ? `${form.category} team` : 'Pending'}</p>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Estimated response time</p>
            <p className="mt-3 text-xl font-semibold text-slate-950">24-48 hours</p>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Photos</p>
            <div className="mt-3 grid gap-3">
              {form.photos.length === 0 ? (
                <p className="text-sm text-slate-500">No photos uploaded yet.</p>
              ) : (
                form.photos.map((photo, index) => (
                  <img key={photo} src={photo} alt={`Photo ${index + 1}`} className="h-20 w-full rounded-3xl object-cover" />
                ))
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
