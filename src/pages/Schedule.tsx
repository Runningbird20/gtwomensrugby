import './Schedule.css'
import { usePractices } from '../hooks/usePractices'
import { useGames } from '../hooks/useGames'
import { useSiteContent } from '../hooks/useSiteContent'

function Schedule() {
  const content = useSiteContent()
  const practices = usePractices()
  const games = useGames()

  return (
    <>
      <section className="schedule-hero" />
      <section className="page schedule-page">
        <h1>Schedule</h1>

        <div className="schedule-section-heading">
          <h2>{content['schedule.practice_heading']}</h2>
        </div>
        <div className="schedule-semester-row">
          <span className="schedule-semester">{content['schedule.practice_semester']}</span>
        </div>
        <table className="practice-table">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Time</th>
              <th scope="col">Place</th>
            </tr>
          </thead>
          <tbody>
            {practices.map((practice) => (
              <tr key={practice.id}>
                <td className="practice-table__day">{practice.day}</td>
                <td>{practice.time}</td>
                <td>{practice.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="schedule-section-heading">
          <h2>{content['schedule.game_heading']}</h2>
        </div>
        <div className="schedule-semester-row">
          <span className="schedule-semester">{content['schedule.game_semester']}</span>
        </div>
        <div className="schedule-table-wrapper schedule-table-wrapper--navy">
          <table className="practice-table practice-table--games">
            <thead>
              <tr>
                <th>Date</th>
                <th>Opponent</th>
                <th>Home/Away</th>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td>{game.date}</td>
                  <td>{game.opponent}</td>
                  <td>{game.is_home ? 'Home' : 'Away'}</td>
                  <td>{game.time}</td>
                  <td>{game.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Schedule
