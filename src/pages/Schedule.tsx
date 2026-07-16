import './Schedule.css'
import { usePractices } from '../hooks/usePractices'
import { useGames } from '../hooks/useGames'
import type { Game } from '../data/games'
import { useSiteContent } from '../hooks/useSiteContent'

function statusClass(status: Game['status']) {
  if (status === 'Win') return 'schedule-badge schedule-badge--win'
  if (status === 'Loss') return 'schedule-badge schedule-badge--loss'
  return 'schedule-badge schedule-badge--upcoming'
}

function Schedule() {
  const content = useSiteContent()
  const practices = usePractices()
  const games = useGames()
  const nextMatch = games.find((game) => game.status === 'Upcoming')

  return (
    <section className="page">
      <h1>Schedule</h1>
      <p>{content['schedule.intro']}</p>

      {nextMatch && (
        <div className="next-match">
          <p className="next-match__label">Next Match</p>
          <h2 className="next-match__opponent">
            {nextMatch.is_home ? 'vs.' : '@'} {nextMatch.opponent}
          </h2>
          <div className="next-match__details">
            <span>{nextMatch.date}</span>
            <span aria-hidden="true">·</span>
            <span>{nextMatch.time}</span>
            <span aria-hidden="true">·</span>
            <span>{nextMatch.location}</span>
          </div>
        </div>
      )}

      <div className="schedule-section-heading">
        <h2>{content['schedule.practice_heading']}</h2>
        <span className="schedule-semester">{content['schedule.practice_semester']}</span>
      </div>
      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {practices.map((practice) => (
              <tr key={practice.id}>
                <td>{practice.day}</td>
                <td>{practice.time}</td>
                <td>{practice.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{content['schedule.game_heading']}</h2>
      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
              <th>Home/Away</th>
              <th>Time</th>
              <th>Location</th>
              <th>Result</th>
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
                <td>
                  <span className={statusClass(game.status)}>
                    {game.status === 'Upcoming' ? 'Upcoming' : `${game.status} ${game.score}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Schedule
