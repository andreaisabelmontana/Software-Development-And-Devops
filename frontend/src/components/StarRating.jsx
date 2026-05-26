// Inline 5-star rating. Half-filled for fractional ratings, e.g. 3.9 → ★★★★☆.
// Uses a single SVG with the fill % driven by the rating value, so it scales
// crisply at any size and matches the OG screenshot's "★★★★☆ 4.7 (500 reviews)".

export default function StarRating({ rating, size = 14, showCount = true }) {
  const rate = Number(rating?.rate ?? rating ?? 0) || 0;
  const count = Number(rating?.count ?? 0) || 0;
  const pct = Math.max(0, Math.min(5, rate)) / 5 * 100;

  return (
    <span className="rating" aria-label={`Rated ${rate.toFixed(1)} out of 5${count ? ` from ${count} reviews` : ''}`}>
      <span className="stars" style={{
        position: 'relative',
        display: 'inline-block',
        fontSize: size,
        lineHeight: 1,
      }}>
        <span style={{ color: 'var(--gray-300)' }}>★★★★★</span>
        <span style={{
          position: 'absolute', left: 0, top: 0,
          width: `${pct}%`,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          color: 'var(--star)',
        }}>★★★★★</span>
      </span>
      <span>{rate.toFixed(1)}{showCount && count > 0 ? ` (${count} reviews)` : ''}</span>
    </span>
  );
}
