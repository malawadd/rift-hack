import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] border-t-8 border-[var(--border)] mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">⚔️</div>
              <div className="text-xl font-black text-white uppercase">
                DORANDISHI
              </div>
            </div>
            <p className="text-white opacity-80 font-medium">
              AI-powered League of Legends match prediction platform. Get instant win probabilities, MVP predictions, and detailed analysis.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-black text-white uppercase mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-white opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all font-bold text-sm"
              >
                Home
              </Link>
              <Link
                href="/predict"
                className="text-white opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all font-bold text-sm"
              >
                Create Prediction
              </Link>
              <Link
                href="/feed"
                className="text-white opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all font-bold text-sm"
              >
                Prediction Feed
              </Link>
              <Link
                href="/profile"
                className="text-white opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all font-bold text-sm"
              >
                Profile
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-white uppercase mb-4">
              Community
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/admin"
                className="text-white opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all font-bold text-sm"
              >
                Admin Dashboard
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all font-bold text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-white opacity-20 pt-8">
          <div className="text-center text-white opacity-60 text-sm font-bold">
            © {new Date().getFullYear()} DORANDISHI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
