import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container" style={{ padding: '2.5rem 0 4rem', maxWidth: 820 }}>
      <span className="eyebrow" style={{
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        color: 'var(--brand-indigo)',
        marginBottom: '0.5rem',
      }}>About the project</span>
      <h1>The Shop, in context.</h1>
      <p>
        The Shop is a cloud-native backend for a mini online marketplace, originally built by
        a team of six BCSAI students at IE School of Science &amp; Technology as the Fall 2025
        capstone of the Software Development &amp; DevOps course. It manages products, customers
        and orders through a RESTful JSON API, deployed on Azure App Service with Azure SQL
        Database for persistence, CI/CD pipelines for automated build / test / deploy, and
        Application Insights for telemetry.
      </p>

      <h2 style={{ marginTop: '2rem' }}>What this frontend is</h2>
      <p>
        This site is a polished React + Vite reimagining of the team's original frontend. It
        speaks the exact same API as <a href="https://github.com/Geethika2506/Devopsfinalproject" target="_blank" rel="noreferrer">Geethika2506/Devopsfinalproject</a>:
        the same routes (<code>/products</code>, <code>/cart</code>, <code>/orders</code>,
        <code>/auth</code>, <code>/wishlist</code>, <code>/reviews</code>), the same JSON
        shapes, the same JWT auth flow. Point it at the team's deployed backend by setting
        <code>VITE_API_URL</code> at build time and it switches transparently from demo to
        live mode (see the badge in the bottom-left corner).
      </p>

      <h2 style={{ marginTop: '2rem' }}>What's better than the reference</h2>
      <p>Two improvements over the original frontend:</p>
      <ol>
        <li>
          <strong>A real design system.</strong> Palette sampled pixel-for-pixel from the team's
          original screenshot — indigo <code>#5B5FE6</code> → violet <code>#7C3AED</code> →
          purple <code>#9333EA</code> gradient header, cool-gray <code>#F3F4F6</code> page
          background, white cards — backed by responsive product grid, sticky cart drawer,
          dark mode, and procedural product imagery so the site works offline.
        </li>
        <li>
          <strong>A mock payment flow.</strong> The PDF's "future improvements" list called
          for <em>"a secure payment method to streamline transactions"</em>. The checkout page
          here implements a Stripe-style card form — live card preview, Luhn validation,
          brand detection, MM/YY masking — and persists the last four digits to the order
          record, just like a real PSP would.
        </li>
      </ol>

      <h2 style={{ marginTop: '2rem' }}>The team</h2>
      <p>Andrea · Geethika · Hala · Juliette · Nicolas · Omar.</p>

      <h2 style={{ marginTop: '2rem' }}>References</h2>
      <ul>
        <li><a href="https://github.com/Geethika2506/Devopsfinalproject" target="_blank" rel="noreferrer">Backend repository (Geethika)</a></li>
        <li><a href="./docs/SDG_Report_Slides.pdf" target="_blank" rel="noreferrer">SDG Report slides (PDF)</a></li>
        <li><a href="https://github.com/andreaisabelmontana/software-development-and-devops" target="_blank" rel="noreferrer">This frontend on GitHub</a></li>
      </ul>

      <div style={{ marginTop: '2.5rem' }}>
        <Link to="/" className="btn btn-primary">Back to the shop</Link>
      </div>
    </div>
  );
}
