export default function Footer(){
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="container py-8 text-gray-400 text-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">© {new Date().getFullYear()} MovieBook — Built with <span className="text-pink-400">❤️</span></div>
        <div className="flex flex-wrap justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
