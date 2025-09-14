import { useState } from "react"

function IndexSidePanel() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Welcome to your
        <a href="https://www.plasmocn.org" target="_blank">
          {" "}
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://www.plasmocn.org" target="_blank">
        View Docs2
      </a>
      <h3>扩展侧边栏</h3>
      <p>这里可以显示实时信息或快捷操作</p>
    </div>
  )
}

export default IndexSidePanel
