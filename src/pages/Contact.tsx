import './Contact.css'
import { useSiteContent } from '../hooks/useSiteContent'

function Contact() {
  const content = useSiteContent()

  return (
    <>
      <section className="contact-hero" />
      <section className="page contact-page">
        <h1>Contact</h1>
        <p>{content['contact.intro']}</p>
        <p>
          For match requests, merchandise, fundraising, and other questions,
          please email us at{' '}
          <a href="mailto:president@gtwrfc.org">president@gtwrfc.org</a> or DM
          us on Instagram{' '}
          <a
            href="https://www.instagram.com/gtwrfc"
            target="_blank"
            rel="noreferrer"
          >
            @gtwrfc
          </a>
          .
        </p>

        <a
          className="contact-instagram"
          href="https://www.instagram.com/gtwrfc"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            className="contact-instagram__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span>
            <span className="contact-instagram__label">Follow us on Instagram</span>
            <span className="contact-instagram__handle">@gtwrfc</span>
          </span>
        </a>
      </section>
    </>
  )
}

export default Contact
