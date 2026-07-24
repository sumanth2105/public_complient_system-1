import { motion } from 'framer-motion';
import { type CategoryTile } from '../types';

interface CategoryCardProps {
  category: CategoryTile;
  selected: boolean;
  onSelect: () => void;
}

export function CategoryCard({ category, selected, onSelect }: CategoryCardProps) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={onSelect}
      className={`group relative flex h-full w-full flex-col gap-5 rounded-[28px] border p-6 text-left shadow-soft transition ${selected ? 'border-sky-500 bg-sky-500 text-white shadow-lg' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${category.gradient} shadow-lg shadow-slate-300/30 text-3xl`}>{category.icon}</div>
        <div>
          <p className="text-lg font-semibold">{category.label}</p>
          <p className={`mt-1 text-sm ${selected ? 'text-sky-100/95' : 'text-slate-500'}`}>{category.description}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
        <span className="rounded-full bg-white/90 px-3 py-1 text-slate-600 shadow-sm">Choose this category</span>
        <span className="font-semibold">{Math.floor(Math.random() * 42 + 12)} reports</span>
      </div>
    </motion.button>
  );
}
