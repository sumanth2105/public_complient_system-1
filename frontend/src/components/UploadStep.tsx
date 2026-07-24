import { motion } from 'framer-motion';
import { Camera, ImageIcon, Trash2, UploadCloud } from 'lucide-react';
import { type WizardForm } from '../types';

interface UploadStepProps {
  form: WizardForm;
  setForm: React.Dispatch<React.SetStateAction<WizardForm>>;
}

export function UploadStep({ form, setForm }: UploadStepProps) {
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/') || form.photos.length >= 5) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setForm((prev) => ({ ...prev, photos: [...prev.photos, reader.result as string] }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (index: number) => {
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const reorderPhoto = (from: number, to: number) => {
    setForm((prev) => {
      const next = [...prev.photos];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return { ...prev, photos: next };
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Evidence</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Upload photos or capture evidence</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Attach up to 5 images to support the complaint and improve verification.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-3xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            <Camera className="h-4 w-4" /> Capture photo
          </button>
        </div>

        <label htmlFor="upload" className="mt-6 flex min-h-[260px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-slate-400 hover:bg-slate-100">
          <UploadCloud className="h-10 w-10 text-sky-500" />
          <div>
            <p className="text-lg font-semibold text-slate-900">Drag & drop or browse files</p>
            <p className="mt-2 text-sm text-slate-500">PNG, JPG, or HEIC up to 5 images.</p>
          </div>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files?.[0]) {
                handleFile(event.target.files[0]);
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/50">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Uploads</p>
            <p className="text-sm text-slate-600">Preview, reorder, and remove images before submission.</p>
          </div>
          <span className="text-sm font-semibold text-slate-500">{form.photos.length}/5</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {form.photos.length === 0 ? (
            <div className="flex min-h-[220px] items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white/60 p-6 text-center text-slate-500">
              <div>
                <p className="text-sm font-semibold">No images yet</p>
                <p className="mt-2 text-sm text-slate-500">Add photos for stronger evidence.</p>
              </div>
            </div>
          ) : (
            form.photos.map((photo, index) => (
              <motion.div
                key={photo}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
              >
                <img src={photo} alt={`Upload ${index + 1}`} className="h-64 w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-slate-950/80 to-transparent px-4 py-3 opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-2 text-xs font-semibold text-white">
                    <ImageIcon className="h-4 w-4" /> {index + 1}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
