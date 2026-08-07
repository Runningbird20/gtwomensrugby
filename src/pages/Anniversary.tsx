import './Anniversary.css'
import { useSiteContent } from '../hooks/useSiteContent'
import Marquee from '../components/Marquee'

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
    <>
      <section className="anniversary-hero" />
      <Marquee text="20th Anniversary Weekend · October 23–25" variant="navy" />
      <section className="page anniversary-page">
        <h1 className="anniversary-heading">
          <img src="/20-navy.png" alt="20th Anniversary" />
        </h1>
        <p className="anniversary-intro">{content['anniversary.intro']}</p>

        <div className="anniversary-merch">
          <button type="button" className="button button--secondary anniversary-merch__button" disabled>
            Buy 20th Anniversary Merch
          </button>
          <p className="anniversary-merch__note">Merch store coming soon</p>
        </div>

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
                  <button type="button" className="button button--secondary anniversary-schedule__payment-button" disabled>
                    Pay with {item.payment.provider}
                  </button>
                  <p className="anniversary-schedule__payment-note">{item.payment.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Anniversary
