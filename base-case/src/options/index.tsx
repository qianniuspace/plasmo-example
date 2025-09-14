import { useState } from "react"

function OptionsIndex() {
  const [data, setData] = useState("")

  return (
    <div>
      <h1>扩展设置</h1>
      <p>在这里配置您的扩展选项</p>{" "}
      <h1>
        Welcome to your <a href="https://www.plasmocn.org">Plasmo</a> Extension!
      </h1>
      <h2>This is the Option UI page!</h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
    </div>
  )
}

export default OptionsIndex
