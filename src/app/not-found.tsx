import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F5] text-[#17243A] px-4">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-4xl font-serif font-extrabold text-[#17243A]">404</h2>
        <p className="text-sm text-slate-600">The requested dispatch or expedition chronicle was not found.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#17243A] text-white text-xs font-bold shadow-card hover:bg-[#2B4D76] transition-colors"
        >
          Return to Platform
        </Link>
      </div>
    </div>
  );
}
