import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="accent-stripe" aria-hidden="true" />
      <div className="container inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', color: 'var(--brand)' }}>
            <span style={{
              width: 36, height: 36, borderRadius: 999,
              border: '2px solid var(--brand)', display: 'grid', placeItems: 'center',
            }}>
              <Logo size={22} />
            </span>
            <strong style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>THE SHOP</strong>
          </div>
          <p style={{ color: 'var(--fg-muted)', maxWidth: '42ch', margin: 0, fontSize: '0.92rem' }}>
            A cloud-native marketplace built by the BCSAI Software Development &amp; DevOps team
            at IE School of Science &amp; Technology, Madrid.
          </p>
        </div>
        <div>
          <h4>Project</h4>
          <a href="https://github.com/Geethika2506/Devopsfinalproject" target="_blank" rel="noreferrer">
            Reference repository
          </a>
          <a href="./docs/SDG_Report_Slides.pdf" target="_blank" rel="noreferrer">
            SDG Report (PDF)
          </a>
          <a href="https://github.com/andreaisabelmontana/software-development-and-devops"
             target="_blank" rel="noreferrer">
            Source on GitHub
          </a>
        </div>
        <div>
          <h4>Stack</h4>
          <a>FastAPI · React · Vite</a>
          <a>Docker · Azure App Service</a>
          <a>GitHub Actions · App Insights</a>
        </div>
      </div>
      <div className="container legal">
        <span>© {new Date().getFullYear()} IE School of Science &amp; Technology — Class project</span>
        <span>Made in Madrid</span>
      </div>
    </footer>
  );
}
