import { Task } from '@/types';

export function toCSV(tasks: ReadonlyArray<Task>): string {
  // Fixed: use explicit, stable column order
  const headers = ['id', 'title', 'revenue', 'timeTaken', 'priority', 'status', 'notes', 'createdAt', 'completedAt'];
  const rows = tasks.map(t => [
    escapeCsv(t.id),
    escapeCsv(t.title),
    String(t.revenue),
    String(t.timeTaken),
    escapeCsv(t.priority),
    escapeCsv(t.status),
    escapeCsv(t.notes ?? ''),
    escapeCsv(t.createdAt),
    escapeCsv(t.completedAt ?? ''),
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

function escapeCsv(v: string): string {
  // Fixed: properly escape quotes, commas, and newlines per RFC 4180
  if (v.includes('"') || v.includes(',') || v.includes('\n')) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}


