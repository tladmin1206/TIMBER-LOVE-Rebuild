'use client';

import { useState } from 'react';
import AdminNav from '../AdminNav';

/**
 * INTERNAL estimator inspector. Runs the assembly engine live and shows the
 * full per-trade breakdown (expandable to child line items), margin, and
 * derivation: the detail the homeowner never sees. Access is gated by the
 * admin session (middleware); no database needed, this computes on the fly.
 */

type Line = { code: string; description: string; uom: string; costType: string; unitCost: number; qty: number; internalCost: number };
type Trade = { division: string; internalCost: number; customerCost: number; lines: Line[] };
type Result = {
  outcome: string;
  range: { low: number; mid: number; high: number } | null;
  confidence: { score: number; label: string };
  durationWeeks: number | null;
  designWeeks: number | null;
  trace: {
    basis: string;
    steps: string[];
    contingencyPct: number;
    multipliers: { id: string; value: number; rationale: string }[];
    adders: { id: string; amount: { low: number; high: number }; rationale: string }[];
    assembly?: { internalCost: number; customerCost: number; margin: number; areaSqFt: number; trades: Trade[]; warnings: string[] };
  } | null;
  diagnostics?: string[];
  error?: string;
};

const money = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;

const PROJECT_TYPES = ['kitchen', 'bathroom', 'bathroom-guest', 'whole-home', 'new-construction'];
const TIERS = ['signature', 'elevated', 'bespoke'];
const SCOPES = ['refresh', 'reimagine', 'rebuild'];

export default function AdminEstimator() {
  const [projectType, setProjectType] = useState('kitchen');
  const [finishTier, setFinishTier] = useState('elevated');
  const [scopeLevel, setScopeLevel] = useState('reimagine');
  const [sqft, setSqft] = useState(2400);
  const [yearBuilt, setYearBuilt] = useState(1998);
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  async function run() {
    setBusy(true);
    try {
      const nc = projectType === 'new-construction';
      const res = await fetch('/api/admin/estimate-preview', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          answers: { mode: nc ? 'C' : 'A', projectType, finishTier, scopeLevel, ...(nc ? { targetSqFt: sqft } : {}) },
          property: { finishedSqFt: sqft, yearBuilt, serviceAreaBand: 'core', enrichmentSource: 'MANUAL' },
        }),
      });
      setResult(await res.json());
    } catch (e) {
      setResult({ outcome: 'error', range: null, confidence: { score: 0, label: '' }, durationWeeks: null, designWeeks: null, trace: null, error: String(e) });
    } finally {
      setBusy(false);
    }
  }

  const asm = result?.trace?.assembly;
  const inp = 'rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900';

  return (
    <main className="mx-auto min-h-screen max-w-5xl bg-neutral-100 p-6 text-neutral-900">
      <AdminNav />
      <h1 className="text-2xl font-semibold">Internal Estimator · per-trade breakdown</h1>
      <p className="mt-1 text-sm text-neutral-600">Assembly engine, live. Internal costs + margin, not for homeowners.</p>

      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-lg bg-white p-4 shadow-sm">
        <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">Project
          <select className={inp} value={projectType} onChange={(e) => setProjectType(e.target.value)}>{PROJECT_TYPES.map((p) => <option key={p}>{p}</option>)}</select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">Finish tier
          <select className={inp} value={finishTier} onChange={(e) => setFinishTier(e.target.value)}>{TIERS.map((t) => <option key={t}>{t}</option>)}</select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">Scope
          <select className={inp} value={scopeLevel} onChange={(e) => setScopeLevel(e.target.value)}>{SCOPES.map((s) => <option key={s}>{s}</option>)}</select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">Sq ft
          <input className={`${inp} w-24`} type="number" value={sqft} onChange={(e) => setSqft(+e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">Year built
          <input className={`${inp} w-24`} type="number" value={yearBuilt} onChange={(e) => setYearBuilt(+e.target.value)} />
        </label>
        <button onClick={run} disabled={busy} className="rounded bg-neutral-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-40">
          {busy ? 'Running…' : 'Estimate'}
        </button>
      </div>

      {result?.error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{result.error}</p>}

      {result && !result.error && (
        <div className="mt-6 space-y-6">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-neutral-500">Customer range</div>
                <div className="text-xl font-semibold">{result.range ? `${money(result.range.low)} to ${money(result.range.high)}` : `withheld (${result.outcome})`}</div>
              </div>
              {result.range && <div><div className="text-xs uppercase tracking-wide text-neutral-500">Typical</div><div className="text-xl">{money(result.range.mid)}</div></div>}
              <div><div className="text-xs uppercase tracking-wide text-neutral-500">Confidence</div><div className="text-xl">{result.confidence.label} ({result.confidence.score})</div></div>
              {asm && <div><div className="text-xs uppercase tracking-wide text-neutral-500">Internal / margin</div><div className="text-xl">{money(asm.internalCost)} · {Math.round(asm.margin * 100)}%</div></div>}
            </div>
            {result.diagnostics && result.diagnostics.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-xs text-amber-700">{result.diagnostics.map((d, i) => <li key={i}>{d}</li>)}</ul>
            )}
          </div>

          {asm && (
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-neutral-800 text-left text-xs uppercase tracking-wide text-white">
                  <tr><th className="p-3">Parent trade</th><th className="p-3 text-right">Internal</th><th className="p-3 text-right">Customer</th><th className="p-3 w-10" /></tr>
                </thead>
                <tbody>
                  {asm.trades.map((t) => (
                    <>
                      <tr key={t.division} className="cursor-pointer border-t border-neutral-200 hover:bg-neutral-50" onClick={() => setOpen((o) => ({ ...o, [t.division]: !o[t.division] }))}>
                        <td className="p-3 font-medium">{t.division}</td>
                        <td className="p-3 text-right tabular-nums text-neutral-600">{money(t.internalCost)}</td>
                        <td className="p-3 text-right font-medium tabular-nums">{money(t.customerCost)}</td>
                        <td className="p-3 text-neutral-400">{open[t.division] ? '▾' : '▸'}</td>
                      </tr>
                      {open[t.division] && t.lines.map((l) => (
                        <tr key={t.division + l.code} className="border-t border-neutral-100 bg-neutral-50 text-xs text-neutral-600">
                          <td className="py-1.5 pl-8 pr-3">{l.code} · {l.description} <span className="text-neutral-400">({l.costType})</span></td>
                          <td className="py-1.5 pr-3 text-right tabular-nums">{l.qty} {l.uom} × {money(l.unitCost)}</td>
                          <td className="py-1.5 pr-3 text-right tabular-nums">{money(l.internalCost)}</td>
                          <td />
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-neutral-300 font-semibold">
                  <tr><td className="p-3">Total</td><td className="p-3 text-right tabular-nums">{money(asm.internalCost)}</td><td className="p-3 text-right tabular-nums">{money(asm.customerCost)}</td><td /></tr>
                </tfoot>
              </table>
              {asm.warnings.length > 0 && <p className="p-3 text-xs text-amber-700">Warnings: {asm.warnings.join('; ')}</p>}
            </div>
          )}

          {result.trace && (
            <details className="rounded-lg bg-white p-4 text-sm shadow-sm">
              <summary className="cursor-pointer font-medium">Derivation &amp; adjustments</summary>
              <div className="mt-3 space-y-1 text-xs text-neutral-600">
                {result.trace.multipliers.map((m) => <div key={m.id}>× {m.value} · {m.id} ({m.rationale})</div>)}
                {result.trace.adders.map((a) => <div key={a.id}>+ {money(a.amount.low)}-{money(a.amount.high)} · {a.id} ({a.rationale})</div>)}
                <div>contingency {Math.round(result.trace.contingencyPct * 100)}%</div>
                <div className="mt-2 border-t border-neutral-200 pt-2">{result.trace.steps.map((s, i) => <div key={i}>{s}</div>)}</div>
              </div>
            </details>
          )}
        </div>
      )}
    </main>
  );
}
