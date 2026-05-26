import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container" style={{ padding: '2.5rem 0 4rem', maxWidth: 820 }}>
      <span className="eyebrow" style={{
        display: 'block',
        fontSize: '0.74rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        color: 'var(--brand)',
        marginBottom: '0.5rem',
      }}>About the project</span>
      <h1>The Shop, in context.</h1>
      <p>
        The Shop is a cloud-native backend for a mini online marketplace, built by a team of
        six BCSAI students at IE School of Science &amp; Technology as the Fall 2025 capstone
        of the Software Development &amp; DevOps course. It manages products, customers and
        orders through a RESTful JSON API, deployed on Azure App Service with Azure SQL
        Database for persistence, CI/CD pipelines for automated build / test / deploy, and
        Application Insights for telemetry.
      </p>

      <h2 style={{ marginTop: '2rem' }}>The palette</h2>
      <p>Pulled directly from the team's report deck — five colors used the same way the deck uses them:</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0' }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--c-green)' }} />
          <strong style={{ color: 'var(--c-green)' }}>Green</strong>&nbsp;— brand. Logo, "THE SHOP" wordmark, prices, primary CTAs, "Add to Cart".
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0' }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--c-pink)' }} />
          <strong style={{ color: 'var(--c-pink)' }}>Pink</strong>&nbsp;— Men's Clothing.
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0' }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--c-purple)' }} />
          <strong style={{ color: 'var(--c-purple)' }}>Purple</strong>&nbsp;— Women's Clothing.
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0' }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--c-yellow)' }} />
          <strong style={{ color: 'var(--c-yellow)' }}>Yellow</strong>&nbsp;— Jewelry &amp; star ratings.
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.35rem 0' }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--c-teal)' }} />
          <strong style={{ color: 'var(--c-teal)' }}>Teal</strong>&nbsp;— Electronics.
        </li>
      </ul>
      <p className="muted" style={{ fontSize: '0.92rem' }}>
        Orange and red appear in the report deck for the "Feedback" and "Conclusion" sections
        — here they're reserved for warnings and errors so the meaning of every color stays
        consistent across the UI.
      </p>

      <h2 style={{ marginTop: '2rem' }}>What this frontend is</h2>
      <p>
        A React + Vite reimagining of the team's frontend. It speaks the exact same API as
        <a href="https://github.com/Geethika2506/Devopsfinalproject" target="_blank" rel="noreferrer"> Geethika2506/Devopsfinalproject</a>:
        the same routes (<code>/products</code>, <code>/cart</code>, <code>/orders</code>,
        <code>/auth</code>, <code>/wishlist</code>, <code>/reviews</code>), the same JSON
        shapes, the same JWT auth. Set <code>VITE_API_URL</code> at build time and it
        switches transparently from "fakestore" mode (public Fake Store API — the same data
        the team's FastAPI seeds itself from) to live mode. See the badge in the bottom-left
        corner.
      </p>

      <h2 style={{ marginTop: '2rem' }}>What's better than the reference</h2>
      <ol>
        <li>
          <strong>A real design system.</strong> Logo, palette, type scale, filter chips,
          sort dropdown, sticky cart drawer, star ratings, product photos — all matching the
          team's deck and adding what the original frontend was missing.
        </li>
        <li>
          <strong>A mock payment flow.</strong> The PDF's "future improvements" list calls
          for <em>"a secure payment method to streamline transactions"</em>. Checkout here
          has a Stripe-style card form with live preview, Luhn check, brand detection, and
          last-four-digits persisted to the order — just like a real PSP.
        </li>
      </ol>

      <h2 style={{ marginTop: '2rem' }}>The team</h2>
      <p>Andrea · Geethika · Hala · Juliette · Nicolas · Omar.</p>

      <h2 style={{ marginTop: '2rem' }}>References</h2>
      <ul>
        <li><a href="https://github.com/Geethika2506/Devopsfinalproject" target="_blank" rel="noreferrer">Backend repository (Geethika)</a></li>
        <li><a href="./docs/SDG_Report_Slides.pdf" target="_blank" rel="noreferrer">SDG Report slides (PDF)</a></li>
        <li><a href="https://github.com/andreaisabelmontana/software-development-and-devops" target="_blank" rel="noreferrer">This frontend on GitHub</a></li>
        <li><a href="https://fakestoreapi.com/" target="_blank" rel="noreferrer">Fake Store API — public product data</a></li>
      </ul>

      <div style={{ marginTop: '2.5rem' }}>
        <Link to="/" className="btn btn-primary">Back to the shop</Link>
      </div>
    </div>
  );
}
