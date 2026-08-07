import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase'
import { defaultHomeLocation, formatGameDate, sortByGameDate, type Game } from '../../data/games'
import { defaultSiteContent } from '../../data/siteContent'
import EditableField from '../../components/EditableField'
import '../Schedule.css'
import './Admin.css'

type NewGameDraft = {
  game_date: string
  opponent: string
  is_home: boolean
  time: string
  location: string
}

const emptyDraft: NewGameDraft = {
  game_date: '',
  opponent: '',
  is_home: true,
  time: '',
  location: defaultHomeLocation,
}

function withIsHomeLocation<T extends { is_home: boolean; location: string }>(draft: T, is_home: boolean): T {
  if (is_home) {
    const locationIsBlank = draft.location.trim() === ''
    return { ...draft, is_home, location: locationIsBlank ? defaultHomeLocation : draft.location }
  }
  const locationIsDefault = draft.location === defaultHomeLocation
  return { ...draft, is_home, location: locationIsDefault ? '' : draft.location }
}

function AdminGames() {
  const [games, setGames] = useState<Game[]>([])
  const [heading, setHeading] = useState(defaultSiteContent['schedule.game_heading'])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)
  const [newRow, setNewRow] = useState<NewGameDraft>(emptyDraft)

  const load = async () => {
    setLoading(true)
    const [gamesResult, contentResult] = await Promise.all([
      supabase.from('games').select('*'),
      supabase.from('site_content').select('key, value').eq('key', 'schedule.game_heading'),
    ])

    if (!gamesResult.error && gamesResult.data) setGames(sortByGameDate(gamesResult.data as Game[]))
    if (!contentResult.error && contentResult.data?.[0]) setHeading(contentResult.data[0].value)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const saveHeading = async (value: string) => {
    setHeading(value)
    const { error } = await supabase
      .from('site_content')
      .upsert({ key: 'schedule.game_heading', value }, { onConflict: 'key' })
    setStatus(error ? `Error saving: ${error.message}` : 'Saved.')
  }

  const handleAdd = async () => {
    if (!newRow.game_date || !newRow.opponent.trim() || !newRow.location.trim()) return
    // Result tracking was removed from the UI; new games still store a
    // status so the games table stays consistent.
    const { error } = await supabase.from('games').insert({
      ...newRow,
      status: 'Upcoming',
      score: null,
      sort_order: games.length,
    })
    if (error) {
      setStatus(`Error adding: ${error.message}`)
      return
    }
    setNewRow(emptyDraft)
    setStatus('Added.')
    load()
  }

  const handleFieldSave = async (game: Game, patch: Partial<Game>) => {
    const { error } = await supabase.from('games').update(patch).eq('id', game.id)
    if (error) {
      setStatus(`Error saving: ${error.message}`)
      return
    }
    setGames((current) => sortByGameDate(current.map((g) => (g.id === game.id ? { ...g, ...patch } : g))))
    setStatus('Saved.')
  }

  const handleIsHomeToggle = (game: Game, checked: boolean) => {
    const patch = withIsHomeLocation({ is_home: game.is_home, location: game.location }, checked)
    handleFieldSave(game, patch)
  }

  const handleDelete = async (game: Game) => {
    if (!confirm(`Delete the game vs. ${game.opponent}?`)) return
    const { error } = await supabase.from('games').delete().eq('id', game.id)
    if (error) {
      setStatus(`Error deleting: ${error.message}`)
      return
    }
    setStatus('Deleted.')
    load()
  }

  return (
    <section className="admin-section">
      <p className="admin-section__hint">
        Click any text to edit it — changes save as soon as you click away or press Enter. Games are ordered
        automatically by Date, soonest to latest. The site only ever shows the weekday and month to visitors — the
        year (shown here for your own reference) never appears on the public Schedule page.
      </p>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <EditableField as="h2" value={heading} onSave={saveHeading} />

          <div className="schedule-table-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Opponent</th>
                  <th>Home/Away</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id}>
                    <td>
                      <EditableField
                        type="date"
                        value={game.game_date ?? ''}
                        placeholder="Not set"
                        onSave={(v) => handleFieldSave(game, { game_date: v || null })}
                      />
                      <p className="admin-table__hint">Shows as "{formatGameDate(game.game_date)}"</p>
                    </td>
                    <td>
                      <EditableField value={game.opponent} onSave={(v) => handleFieldSave(game, { opponent: v })} />
                    </td>
                    <td>
                      <label className="admin-inline-checkbox">
                        <input
                          type="checkbox"
                          checked={game.is_home}
                          onChange={(e) => handleIsHomeToggle(game, e.target.checked)}
                        />
                        {game.is_home ? 'Home' : 'Away'}
                      </label>
                    </td>
                    <td>
                      <EditableField value={game.time} onSave={(v) => handleFieldSave(game, { time: v })} />
                    </td>
                    <td>
                      <EditableField value={game.location} onSave={(v) => handleFieldSave(game, { location: v })} />
                    </td>
                    <td className="admin-table__actions">
                      <button type="button" className="admin-btn admin-btn--danger" onClick={() => handleDelete(game)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="admin-table__new-row">
                  <td>
                    <input
                      type="date"
                      value={newRow.game_date}
                      onChange={(e) => setNewRow({ ...newRow, game_date: e.target.value })}
                    />
                    {newRow.game_date && (
                      <p className="admin-table__hint">Shows as "{formatGameDate(newRow.game_date)}"</p>
                    )}
                  </td>
                  <td>
                    <input
                      value={newRow.opponent}
                      placeholder="Opponent"
                      onChange={(e) => setNewRow({ ...newRow, opponent: e.target.value })}
                    />
                  </td>
                  <td>
                    <label className="admin-inline-checkbox">
                      <input
                        type="checkbox"
                        checked={newRow.is_home}
                        onChange={(e) => setNewRow(withIsHomeLocation(newRow, e.target.checked))}
                      />
                      {newRow.is_home ? 'Home' : 'Away'}
                    </label>
                  </td>
                  <td>
                    <input value={newRow.time} placeholder="1:00 PM" onChange={(e) => setNewRow({ ...newRow, time: e.target.value })} />
                  </td>
                  <td>
                    <input
                      value={newRow.location}
                      placeholder={newRow.is_home ? undefined : 'e.g. Auburn, AL'}
                      onChange={(e) => setNewRow({ ...newRow, location: e.target.value })}
                    />
                  </td>
                  <td>
                    <button type="button" className="admin-btn" onClick={handleAdd}>
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {status && <p className="admin-status">{status}</p>}
    </section>
  )
}

export default AdminGames
