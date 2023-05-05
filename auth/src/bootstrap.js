import React from "react"
import ReactDOM from "react-dom"
import { createMemoryHistory, createBrowserHistory } from "history"
import App from "./App"

function mount(el, { setStatus, onNavgate, defaultHistory, initialPath }) {
  const history =
    defaultHistory ||
    createMemoryHistory({
      // 当创建路由的时候，默认匹配什么地址。
      // 解决容器跳转到该微应用时，路由未匹配到组件的bug
      initialEntries: [initialPath]
    })
  if (onNavgate) history.listen(onNavgate)
  ReactDOM.render(<App setStatus={setStatus} history={history} />, el)
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const pathname = history.location.pathname
      if (nextPathname !== pathname) {
        history.push(nextPathname)
      }
    }
  }
}

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-auth")
  if (el)
    mount(el, {
      defaultHistory: createBrowserHistory()
    })
}

export { mount }
