import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
        <div className="site-footer__col site-footer__col--brand">
          <p className="site-footer__brand">GT Women's Rugby</p>
          <p className="site-footer__tagline">Leave No Doubt.</p>
        </div>

      <div className="site-footer__bottom">
        <p>Georgia Tech Women's Rugby &mdash; Club Sport</p>
        <p className="site-footer__disclaimer">Not affiliated with Georgia Tech Athletics.</p>
      </div>
    </footer>
  )
}

export default Footer
