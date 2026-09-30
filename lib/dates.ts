const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parse = (ym: string) => {
  const [year, month] = ym.split("-").map(Number);
  return { year, month };
};

const label = ({ year, month }: { year: number; month: number }) => `${MONTHS[month - 1]} ${year}`;

/**
 * "Jun 2026 – Aug 2026 · 3 mos". Months are inclusive, so a June–August internship is 3 months.
 * `end: null` means ongoing and is measured to `now`.
 */
export function formatRange(start: string, end: string | null, now = new Date()): string {
  const from = parse(start);
  const to = end ? parse(end) : { year: now.getFullYear(), month: now.getMonth() + 1 };
  const total = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const duration = [years && `${years} yr${years > 1 ? "s" : ""}`, months && `${months} mo${months > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
  return `${label(from)} – ${end ? label(to) : "Present"} · ${duration}`;
}
