import { useState } from "react"

function IndexNewtab() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>
        <h1>欢迎使用我的新标签页</h1>
        <p>享受定制化的浏览体验</p>
        Welcome to your <a href="https://www.plasmocn.org">Plasmo</a> Extension!
      </h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />
    </div>
  )
}

export default IndexNewtab
