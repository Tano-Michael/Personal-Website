export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function readMin(txt: string) {
  return Math.max(1, Math.ceil((txt || '').split(' ').length / 200));
}
