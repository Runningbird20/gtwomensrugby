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
      </section>
    </>
  )
}

export default Contact
