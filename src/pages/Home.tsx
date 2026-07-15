import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero">
      <h1>Georgia Tech Women's Rugby</h1>
      <p>A student-run club sport at the Georgia Institute of Technology.</p>
      <Link className="button button--primary" to="/contact">
        Join the Team
      </Link>
    </section>
  )
}

export default Home
