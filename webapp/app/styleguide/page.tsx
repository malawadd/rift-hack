"use client";

import Link from "next/link";

export default function StyleGuidePage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="neobrutalism-card p-6 mb-8 flex items-center justify-between" style={{ background: 'var(--secondary)' }}>
          <div className="flex items-center gap-4">
            <h3>Style Guide</h3>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm underline font-bold">
              \u2190 Dashboard
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="mb-4">KIYAN Design System</h1>
          <p className="text-lg" style={{ fontWeight: '500', textTransform: 'none' }}>
            Bold neo-brutalist design with high contrast and strong typography
          </p>
        </div>

        <section className="mb-12">
          <h2 className="mb-6">
            Color Tokens
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="neobrutalism-card p-8">
              <h4 className="mb-6">Base Colors</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16" style={{ background: 'var(--background)', border: '3px solid var(--border)' }} />
                  <div>
                    <div className="font-black text-sm mono">--background</div>
                    <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Cream</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16" style={{ background: 'var(--foreground)', border: '3px solid var(--border)' }} />
                  <div>
                    <div className="font-black text-sm mono">--foreground</div>
                    <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Navy</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16" style={{ background: 'white', border: '3px solid var(--border)' }} />
                  <div>
                    <div className="font-black text-sm mono">white</div>
                    <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Card background</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="neobrutalism-card p-8">
              <h4 className="mb-6">Brand Colors</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16" style={{ background: 'var(--primary)', border: '3px solid var(--border)' }} />
                  <div>
                    <div className="font-black text-sm mono">--primary</div>
                    <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Hot pink</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16" style={{ background: 'var(--secondary)', border: '3px solid var(--border)' }} />
                  <div>
                    <div className="font-black text-sm mono">--secondary</div>
                    <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Cyan</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16" style={{ background: 'var(--accent)', border: '3px solid var(--border)' }} />
                  <div>
                    <div className="font-black text-sm mono">--accent</div>
                    <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Bright yellow</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="neobrutalism-card p-8">
            <h4 className="mb-6">Status Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-full h-24 mb-3" style={{ background: 'var(--success)', border: '3px solid var(--border)' }} />
                <div className="font-black text-xs mono">--success</div>
                <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Sky blue</div>
              </div>
              <div className="text-center">
                <div className="w-full h-24 mb-3" style={{ background: 'var(--danger)', border: '3px solid var(--border)' }} />
                <div className="font-black text-xs mono">--danger</div>
                <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Coral red</div>
              </div>
              <div className="text-center">
                <div className="w-full h-24 mb-3" style={{ background: 'var(--border)', border: '3px solid var(--border)' }} />
                <div className="font-black text-xs mono">--border</div>
                <div className="text-xs" style={{ fontWeight: '500', textTransform: 'none' }}>Dark navy</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6">Typography</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="neobrutalism-card p-8">
              <h4 className="mb-6 text-sm">Headings</h4>
              <p className="text-xs mb-4" style={{ fontWeight: '500', textTransform: 'none' }}>Geist Sans, weight 900, uppercase</p>
              <h1 className="mb-3">Heading 1</h1>
              <h2 className="mb-3">Heading 2</h2>
              <h3 className="mb-3">Heading 3</h3>
              <h4>Heading 4</h4>
            </div>

            <div className="neobrutalism-card p-8">
              <h4 className="mb-6 text-sm">Body</h4>
              <p className="text-xs mb-4" style={{ fontWeight: '500', textTransform: 'none' }}>Geist Sans, weight 500/700</p>
              <p className="mb-3" style={{ fontWeight: '500', textTransform: 'none' }}>Regular body text at 16px with line-height 1.6 for comfortable reading.</p>
              <p className="font-bold" style={{ textTransform: 'none' }}>Bold text for emphasis and labels.</p>
            </div>

            <div className="neobrutalism-card p-8">
              <h4 className="mb-6 text-sm">Monospace</h4>
              <p className="text-xs mb-4" style={{ fontWeight: '500', textTransform: 'none' }}>Geist Mono</p>
              <p className="mono text-3xl mb-3 font-black">$1,234.56</p>
              <p className="mono text-sm font-bold">BTC-PERP</p>
              <p className="mono text-xs font-bold">0x1234...5678</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6">Components</h2>

          <div className="space-y-6">
            <div className="neobrutalism-card p-8">
              <h4 className="mb-6">Buttons</h4>
              <div className="flex flex-wrap gap-4">
                <button className="neobrutalism-btn">Default Button</button>
                <button className="neobrutalism-btn" style={{ background: 'var(--primary)', color: 'white' }}>
                  Primary
                </button>
                <button className="neobrutalism-btn" style={{ background: 'var(--secondary)' }}>
                  Secondary
                </button>
                <button className="neobrutalism-btn" style={{ background: 'var(--success)' }}>
                  Success
                </button>
                <button className="neobrutalism-btn" style={{ background: 'var(--danger)', color: 'white' }}>
                  Danger
                </button>
                <button className="neobrutalism-btn" style={{ background: 'var(--accent)' }}>
                  Accent
                </button>
              </div>
            </div>

            <div className="neobrutalism-card p-8">
              <h4 className="mb-6">Status Pills</h4>
              <div className="flex flex-wrap gap-4">
                <span className="status-pill status-pass">PASS</span>
                <span className="status-pill status-fail">FAIL</span>
                <span className="status-pill status-warning">WARNING</span>
                <span className="status-pill status-live">LIVE</span>
                <span className="status-pill status-paused">PAUSED</span>
                <span className="status-pill status-active">ACTIVE</span>
                <span className="status-pill status-published">PUBLISHED</span>
                <span className="status-pill status-completed">COMPLETED</span>
              </div>
            </div>

            <div className="neobrutalism-card p-8">
              <h4 className="mb-6">Input Fields</h4>
              <input type="text" placeholder="Text input" className="neobrutalism-input w-full mb-4" />
              <textarea placeholder="Textarea" className="neobrutalism-input w-full" rows={3} />
            </div>

           
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6">Elevation & Shadows</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="neobrutalism-card p-8" style={{ boxShadow: 'none' }}>
              <h4 className="mb-2">No Shadow</h4>
              <p className="text-sm" style={{ fontWeight: '500', textTransform: 'none' }}>Flat appearance</p>
            </div>

            <div className="neobrutalism-card p-8">
              <h4 className="mb-2">Default</h4>
              <p className="text-sm" style={{ fontWeight: '500', textTransform: 'none' }}>8px offset shadow</p>
            </div>

            <div className="neobrutalism-card p-8" style={{ boxShadow: '12px 12px 0 var(--border)' }}>
              <h4 className="mb-2">Elevated</h4>
              <p className="text-sm" style={{ fontWeight: '500', textTransform: 'none' }}>12px offset shadow</p>
            </div>
          </div>
        </section>

        <footer className="text-center text-sm py-8" style={{ borderTop: '4px solid var(--border)', fontWeight: '500' }}>
          KIYAN Design System • Neo-Brutalist Edition
        </footer>
      </div>
    </div>
  );
}
