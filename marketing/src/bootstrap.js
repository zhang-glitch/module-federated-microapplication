import React from "react"
import ReactDOM from "react-dom"
import { createMemoryHistory, createBrowserHistory } from "history"
import App from "./App"

function mount(el, { onNavgate, defaultHistory, initialPath }) {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath]
    })
  // 当微应用路由发生变化后，触发history历史记录。这个函数调用，自动会传递当前的url对象信息。
  if (onNavgate) history.listen(onNavgate)
  ReactDOM.render(<App history={history} />, el)
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
  const el = document.querySelector("#dev-marketing")
  if (el)
    mount(el, {
      defaultHistory: createBrowserHistory()
    })
}

export { mount }

