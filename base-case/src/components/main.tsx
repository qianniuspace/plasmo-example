"use client"

import { useState } from "react"

export function Main({ name = "Extension" }) {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmocn.org">Plasmo</a> {name}!
      </h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />

      <a href="https://www.plasmocn.org">READ THE DOCS!</a>
    </div>
  )
}
