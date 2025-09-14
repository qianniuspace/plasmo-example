import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: 300,
        height: 400
      }}>
      <h2>欢迎使用我的扩展</h2>
      <p>这是一个简单的弹出窗口示例</p>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmocn.org" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://www.plasmocn.org" target="_blank">
        View Docs
      </a>
      <button
        onClick={() => {
          chrome.tabs.create({
            url: "../tabs/delta-flyer.html"
          })
        }}>
        open tab page
      </button>
      <button
        onClick={() => {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              const { id } = tabs[0]
              chrome.scripting.executeScript({
                target: { tabId: id },
                func: () => {
                  const iframe = document.createElement("iframe")
                  iframe.src = chrome.runtime.getURL("../tabs/delta-flyer.html")
                  iframe.name = "delta-flyer"
                  document.body.appendChild(iframe)
                }
              })
            }
          )
        }}>
        iframe mounting
      </button>
    </div>
  )
}

export default IndexPopup
