import './index.css'

const Tech = props => {
  const {techDetails} = props
  const {name, logoUrl} = techDetails
  return (
    <li className="tech-card-container">
      <img alt={name} src={logoUrl} className="tech-img " />
      <h1 className="tech-name">{name}</h1>
    </li>
  )
}

export default Tech
