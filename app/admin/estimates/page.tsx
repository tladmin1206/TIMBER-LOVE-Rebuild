import { dbEnabled, prisma } from '@/lib/db';
import AdminNav from '../AdminNav';

/**
 * INTERNAL admin panel: recent stored estimates with the per-trade breakdown.
 * Access is gated by the admin session (middleware). Reads the database; the
 * live inspector at /admin/estimator computes on demand instead.
 */
export const dynamic = 'force-dynamic';

const money = (v: number | null | undefined) => (v == null ? '—' : `$${Math.round(v).toLocaleString('en-US')}`);

type TradeLine = { code: string; description: string; uom: string; qty: number; unitCost: number; internalCost: number };
type Trade = { division: string; internalCost: number; customerCost: number; lines: TradeLine[] };
type LineItems = { margin: number; internalCost: number; trades: Trade[] } | null;

export default async function AdminEstimates() {
  if (!dbEnabled) {
    return (
      <main className="mx-auto min-h-screen max-w-2xl bg-neutral-100 p-8 text-neutral-900">
        <AdminNav />
        <h1 className="text-2xl font-semibold">Estimates</h1>
        <p className="mt-3 text-sm text-neutral-600">DATABASE_URL is not configured, so no estimates are stored yet.</p>
      </main>
    );
  }

  const estimates = await prisma.estimate.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { session: { include: { contact: true } } },
  });

  return (
    <main className="mx-auto min-h-screen max-w-6xl bg-neutral-100 p-6 text-neutral-900">
      <AdminNav />
      <h1 className="text-2xl font-semibold">Stored estimates</h1>
      <p className="mt-1 text-sm text-neutral-600">{estimates.length} most recent. Internal costs + per-trade breakdown — not for homeowners.</p>

      <div className="mt-6 space-y-3">
        {estimates.length === 0 && <p className="text-sm text-neutral-500">No estimates stored yet.</p>}
        {estimates.map((e) => {
          const li = e.lineItems as LineItems;
          const contact = e.session?.contact;
          return (
            <details key={e.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
              <summary className="flex cursor-pointer flex-wrap items-center gap-x-6 gap-y-1 p-4 text-sm">
                <span className="text-neutral-500">{new Date(e.createdAt).toLocaleDateString()}</span>
                <span className="font-medium">{contact ? `${contact.firstName} ${contact.lastName}` : '—'}</span>
                <span>{e.projectTypes.join(', ')} · {e.finishTier ?? '—'} · {e.scopeLevel ?? '—'}</span>
                <span className="font-semibold">{money(e.rangeLow)} – {money(e.rangeHigh)}</span>
                <span className="rounded bg-neutral-200 px-2 py-0.5 text-xs">{e.basis}</span>
                {li && <span className="text-xs text-neutral-500">internal {money(li.internalCost)} · {Math.round(li.margin * 100)}% GM</span>}
              </summary>
              {li ? (
                <table className="w-full border-t border-neutral-200 text-sm">
                  <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
                    <tr><th className="p-2 pl-4">Trade</th><th className="p-2 text-right">Internal</th><th className="p-2 text-right">Customer</th></tr>
                  </thead>
                  <tbody>
                    {li.trades.map((t) => (
                      <tr key={t.division} className="border-t border-neutral-100">
                        <td className="p-2 pl-4">{t.division}<div className="text-xs text-neutral-400">{t.lines.map((l) => l.description).slice(0, 6).join(', ')}{t.lines.length > 6 ? '…' : ''}</div></td>
                        <td className="p-2 text-right tabular-nums text-neutral-600">{money(t.internalCost)}</td>
                        <td className="p-2 text-right tabular-nums font-medium">{money(t.customerCost)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="border-t border-neutral-200 p-4 text-sm text-neutral-500">Segment-band estimate — no per-trade line items (assembly basis not used).</p>
              )}
            </details>
          );
        })}
      </div>
    </main>
  );
}
