import Loader from 'react-loader-spinner'
import {Component} from 'react'
import NavBar from '../NavBar'
import Tech from '../Tech'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

class TechEra extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    techEraData: [],
  }

  componentDidMount() {
    this.getTechnologies()
  }

  getTechnologies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const api = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(api)
    if (response.ok === true) {
      this.setState({apiStatus: apiStatusConstants.success})
      const data = await response.json()
      const camelCasedData = data.courses.map(eachTech => ({
        id: eachTech.id,
        name: eachTech.name,
        logoUrl: eachTech.logo_url,
      }))
      this.setState({techEraData: camelCasedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInprogessView = () => (
    <div>
      <NavBar />
      <div className="in-progress-view">
        <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {techEraData} = this.state
    return (
      <div className="bg-container">
        <NavBar />
        <div>
          <h1 className="page-title">Courses</h1>
          <ul className="techs-container">
            {techEraData.map(eachTech => (
              <Tech key={eachTech.id} techDetails={eachTech} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <NavBar />

      <div className="not-found ">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          className="not-found-img "
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button" className="retry-btn ">
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderInprogessView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default TechEra
