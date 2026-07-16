import './Marquee.css'

function Marquee({ text }: { text: string }) {
  const group = Array.from({ length: 6 }, (_, i) => (
    <span className="marquee__item" key={i}>
      {text} <span className="marquee__dot">•</span>
    </span>
  ))

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__group">{group}</div>
        <div className="marquee__group">{group}</div>
      </div>
    </div>
  )
}

export default Marquee
