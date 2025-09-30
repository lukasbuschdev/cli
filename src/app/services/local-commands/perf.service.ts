import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../utils.service';
import { typeCommand } from '../../types/types';

type PerfSnapshot = {
  navigation: {
    type: string;
    ttfb_ms: number | null;
    domContentLoaded_ms: number | null;
    loadEventEnd_ms: number | null;
  };
  paint: {
    fp_ms: number | null;
    fcp_ms: number | null;
    lcp_ms: number | null;
  };
  vitals: {
    cls: number | null;
  };
  memory?: {
    used: number;
    total: number;
    limit: number;
  };
  resources: {
    topByDuration: Array<{ name: string; initiatorType?: string; duration_ms: number; transferSize: number | null }>;
    topByBytes: Array<{ name: string; initiatorType?: string; duration_ms: number; transferSize: number | null }>;
  };
};

@Injectable({ providedIn: 'root' })
export class PerfService {
  utils = inject(UtilsService);

  perf(command: string, executedCommands: typeCommand[], currentPathString: string): void {
    executedCommands.push({ command, path: currentPathString });
    const i = executedCommands.length - 1;

    try {
      const { topN, asJson } = this.parseFlags(command);
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const timing = (performance as any).timing;
      const ttfb = nav ? nav.responseStart : (timing ? timing.responseStart - timing.navigationStart : null);
      const dcl  = nav ? nav.domContentLoadedEventEnd : (timing ? timing.domContentLoadedEventEnd - timing.navigationStart : null);
      const load = nav ? nav.loadEventEnd : (timing ? timing.loadEventEnd - timing.navigationStart : null);
      const navType = nav?.type ?? (document?.referrer ? 'reload-or-back-forward' : 'navigate');
      const paints = performance.getEntriesByType('paint') as PerformanceEntry[];
      const fp  = paints.find(e => e.name === 'first-paint')?.startTime ?? null;
      const fcp = paints.find(e => e.name === 'first-contentful-paint')?.startTime ?? null;

      const lcpEntry = (performance.getEntriesByType('largest-contentful-paint') as PerformanceEntry[]).slice(-1)[0];
      const lcp = lcpEntry ? (lcpEntry as any).startTime ?? null : null;

      let cls: number | null = null;
      const shifts = performance.getEntriesByType('layout-shift') as any[];
      if (shifts && shifts.length) {
        cls = shifts.reduce((sum, e) => sum + (!e.hadRecentInput ? (e.value ?? 0) : 0), 0);
      }

      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const normalized = resources.map(r => ({
        name: r.name,
        initiatorType: r.initiatorType,
        duration_ms: r.duration,
        transferSize: (r as any).transferSize ?? null
      }));

      const topByDuration = [...normalized]
        .sort((a, b) => b.duration_ms - a.duration_ms)
        .slice(0, topN);

      const topByBytes = [...normalized]
        .filter(x => typeof x.transferSize === 'number')
        .sort((a, b) => (b.transferSize! - a.transferSize!))
        .slice(0, topN);

      const mem = (performance as any).memory;
      const memoryBlock = mem ? {
        used: mem.usedJSHeapSize as number,
        total: mem.totalJSHeapSize as number,
        limit: mem.jsHeapSizeLimit as number
      } : undefined;

      const snapshot: PerfSnapshot = {
        navigation: {
          type: String(navType),
          ttfb_ms: this.numOrNull(ttfb),
          domContentLoaded_ms: this.numOrNull(dcl),
          loadEventEnd_ms: this.numOrNull(load)
        },
        paint: {
          fp_ms: this.numOrNull(fp),
          fcp_ms: this.numOrNull(fcp),
          lcp_ms: this.numOrNull(lcp)
        },
        vitals: { cls: this.numOrNull(cls) },
        memory: memoryBlock,
        resources: { topByDuration, topByBytes }
      };

      if (asJson) {
        executedCommands[i].output = JSON.stringify(snapshot, null, 2);
        return;
      }

      let out = '--- Performance Snapshot ---\n';

      out += `Navigation type:\t${snapshot.navigation.type}\n`;
      out += `TTFB:\t\t\t${this.fmtMs(snapshot.navigation.ttfb_ms)}\n`;
      out += `DOM Content Loaded:\t${this.fmtMs(snapshot.navigation.domContentLoaded_ms)}\n`;
      out += `Load Event End:\t\t${this.fmtMs(snapshot.navigation.loadEventEnd_ms)}\n\n`;

      out += `First Paint (FP):\t${this.fmtMs(snapshot.paint.fp_ms)}\n`;
      out += `First Contentful Paint:\t${this.fmtMs(snapshot.paint.fcp_ms)}\n`;
      out += `Largest Contentful Paint:\t${this.fmtMs(snapshot.paint.lcp_ms)}\n`;
      out += `Cumulative Layout Shift:\t${snapshot.vitals.cls ?? 'N/A'}\n\n`;

      if (snapshot.memory) {
        out += '--- JS Heap (Chromium) ---\n';
        out += `Used:\t${this.fmtBytes(snapshot.memory.used)}\n`;
        out += `Total:\t${this.fmtBytes(snapshot.memory.total)}\n`;
        out += `Limit:\t${this.fmtBytes(snapshot.memory.limit)}\n\n`;
      }

      out += `--- Slowest Resources (top ${topByDuration.length} by duration) ---\n`;
      if (topByDuration.length === 0) out += '(none)\n';
      else {
        topByDuration.forEach(r => {
          out += `${this.trunc(r.name)}\n  - type: ${r.initiatorType ?? 'n/a'} | duration: ${this.fmtMs(r.duration_ms)} | bytes: ${r.transferSize != null ? this.fmtBytes(r.transferSize) : 'n/a'}\n`;
        });
      }

      out += `\n--- Largest Resources (top ${topByBytes.length} by transfer size) ---\n`;
      if (topByBytes.length === 0) out += '(none)\n';
      else {
        topByBytes.forEach(r => {
          out += `${this.trunc(r.name)}\n  - type: ${r.initiatorType ?? 'n/a'} | bytes: ${r.transferSize != null ? this.fmtBytes(r.transferSize) : 'n/a'} | duration: ${this.fmtMs(r.duration_ms)}\n`;
        });
      }

      executedCommands[i].output = out;
    } catch (err) {
      executedCommands[i].output = 'Error collecting performance metrics.';
    }
  }

  private parseFlags(cmd: string): { topN: number; asJson: boolean } {
    const m = cmd.match(/--top\s+(\d+)/i);
    const topN = m ? Math.max(1, Math.min(20, parseInt(m[1], 10))) : 3; // default 3, cap to 20
    const asJson = /\s--json(\s|$)/i.test(cmd);
    return { topN, asJson };
  }

  private numOrNull(n: any): number | null {
    return typeof n === 'number' && isFinite(n) ? Math.max(0, n) : null;
    // times are in ms from navigation start
  }

  private fmtMs(n: number | null): string {
    if (n == null) return 'N/A';
    return `${n.toFixed(0)} ms`;
  }

  private fmtBytes(b: number | null): string {
    if (b == null) return 'N/A';
    if (b < 1024) return `${b} B`;
    const units = ['KB','MB','GB','TB'];
    let u = -1;
    let v = b;
    do { v /= 1024; u++; } while (v >= 1024 && u < units.length - 1);
    return `${v.toFixed(2)} ${units[u]}`;
  }

  private trunc(url: string, max = 88): string {
    if (!url) return '(unknown)';
    return url.length <= max ? url : url.slice(0, max - 3) + '...';
  }
}
