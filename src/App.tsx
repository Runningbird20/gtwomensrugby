import './App.css'

function App() {
  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <span className="site-header__brand">GT Women's Rugby</span>
          <nav className="site-nav">
            <a href="#schedule">Schedule</a>
            <a href="#roster">Roster</a>
            <a href="#news">News</a>
            <a href="#join">Join the Team</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>Georgia Tech Women's Rugby</h1>
          <p>A student-run club sport at the Georgia Institute of Technology.</p>
          <a className="button button--primary" href="#join">
            Join the Team
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>Georgia Tech Women's Rugby &mdash; Club Sport</p>
        <p className="site-footer__disclaimer">
          Not affiliated with Georgia Tech Athletics.
        </p>
      </footer>
    </>
  )
}

export default App
