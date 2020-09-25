import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const Teaser = (props) => (
  <SbEditable content={props.blok}>
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{ props.blok.headline }</h1>
        <p className="lead">Instant Traveling Expert Advisor</p>
        <p className="lead">
          <Link className="btn btn-primary" to={'/page-2'}>
        Example Demo
          </Link>
        </p>
      </div>
    </div>
  </SbEditable>
)

export default Teaser
