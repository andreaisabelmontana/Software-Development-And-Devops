// Green cart-in-a-circle logo. Used in the header and as the favicon.
export default function Logo({ size = 44 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18 L20 18 L24 42 L48 42" />
        <path d="M22 24 L51 24 L47 38 L26 38 Z" />
        <path d="M29 24 L29 38 M37 24 L37 38 M44 24 L44 38" />
        <path d="M24 31 L48 31" />
      </g>
      <circle cx="29" cy="49" r="3.5" fill="currentColor" />
      <circle cx="44" cy="49" r="3.5" fill="currentColor" />
    </svg>
  );
}
