import './Anniversary.css'
import { useSiteContent } from '../hooks/useSiteContent'

interface ScheduleItem {
  date: string
  title: string
  details: string[]
  summary: string
  payment?: {
    provider: string
    note: string
  }
}

const weekendSchedule: ScheduleItem[] = [
  {
    date: 'Friday, Oct. 23',
    title: 'Alumni Banquet',
    details: ['Time: TBD', 'Location: TBD'],
    summary: 'Summary details coming soon.',
    payment: {
      provider: 'Square',
      note: 'Ticket payment link coming soon',
    },
  },
  {
    date: 'Saturday, Oct. 24',
    title: 'Homecoming Game vs. Boston College',
    details: ['Kickoff: TBD', 'Tailgate location: TBD'],
    summary: 'Summary details coming soon.',
  },
  {
    date: 'Sunday, Oct. 25',
    title: 'Alumni vs. Undergrads Game',
    details: ['Time: TBD', 'Location: TBD'],
    summary: 'Summary details coming soon.',
  },
]

function Anniversary() {
  const content = useSiteContent()

  return (
    <section className="page">
      <h1>20th Anniversary</h1>
      <p>{content['anniversary.intro']}</p>

      <div className="anniversary-schedule">
        {weekendSchedule.map((item) => (
          <div className="anniversary-schedule__item" key={item.date}>
            <div className="anniversary-schedule__main">
              <p className="anniversary-schedule__date">{item.date}</p>
              <h3 className="anniversary-schedule__title">{item.title}</h3>
              <ul className="anniversary-schedule__details">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <p className="anniversary-schedule__summary">{item.summary}</p>
            </div>

            {item.payment && (
              <div className="anniversary-schedule__payment">
                <p className="anniversary-schedule__payment-label">Pay via {item.payment.provider}</p>
                <button type="button" className="anniversary-schedule__payment-button" disabled>
                  Pay with {item.payment.provider}
                </button>
                <p className="anniversary-schedule__payment-note">{item.payment.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Anniversary
