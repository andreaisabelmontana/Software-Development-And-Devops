export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          <h4>The Shop</h4>
          <p style={{ color: 'rgba(244,236,216,0.78)', maxWidth: '38ch', margin: 0 }}>
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
