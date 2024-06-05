import React from "react"
import exp from "constants"
import { Link } from "react-router-dom"

const Index = () => (
  <div>
    <Link to="top">toplink</Link>
    <br />
    <Link to="edit">editlink</Link>
    <br />
    <Link to="list">listlink</Link>
    <br />
    <Link to="play">playlink</Link>
  </div>
)

export default Index
