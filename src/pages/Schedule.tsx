import './Schedule.css'
import { usePractices } from '../hooks/usePractices'
import { useGames } from '../hooks/useGames'
import { useSiteContent } from '../hooks/useSiteContent'
import { formatGameDate } from '../data/games'

function Schedule() {
  const content = useSiteContent()
  const practices = usePractices()
  const games = useGames()
  const nextGame = games.find((game) => game.status === 'Upcoming')

  return (
    <>
      <section className="schedule-hero">
        {nextGame && (
          <div className="schedule-next-game">
            <p className="schedule-next-game__label">Next Game</p>
            <h2 className="schedule-next-game__opponent">
              {nextGame.is_home ? 'vs.' : '@'} {nextGame.opponent}
            </h2>
            <div className="schedule-next-game__details">
              <span>{formatGameDate(nextGame.game_date)}</span>
              <span aria-hidden="true">·</span>
              <span>{nextGame.time}</span>
              <span aria-hidden="true">·</span>
              <span>{nextGame.location}</span>
            </div>
          </div>
        )}
      </section>
      <section className="page schedule-page">
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
                <tr className={game.is_home ? 'practice-table__home-row' : undefined} key={game.id}>
                  <td>{formatGameDate(game.game_date)}</td>
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
