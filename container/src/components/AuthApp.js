import React, { useEffect, useRef } from "react"
import { mount } from "auth/AuthApp"
import { useHistory } from "react-router-dom"

export default function AuthApp({ setStatus }) {
  const ref = useRef()
  const history = useHistory()
  useEffect(() => {
    // 我们直接利用共享的mount方法，就可以实现容器和微应用的通信。
    const { onParentNavigate } = mount(ref.current, {
      setStatus,
      initialPath: history.location.pathname,
      onNavgate({ pathname: nextPathname }) {
        const pathname = history.location.pathname
        if (nextPathname !== pathname) {
          history.push(nextPathname)
        }
      }
    })

    if (onParentNavigate) history.listen(onParentNavigate)
  }, [])
  return <div ref={ref}></div>
}
