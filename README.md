
# 基于webpack模块联邦构建微服务

[模块联邦基础使用看这里](https://github.com/zhang-glitch/module-federation-demo)

## container
容器应用，用于所有微应用的注册。

他是基于react的应用
```js
  <Router history={history}>
    <Header status={status} setStatus={setStatus} />
    <Suspense fallback={<Progress />}>
      <Switch>
        <Route path="/auth/signin">
          <AuthApp setStatus={setStatus} />
        </Route>
        <Route path="/dashboard">
          {!status && <Redirect to="/" />}
          <DashboardApp />
        </Route>
        <Route path="/">
          <MarketingApp />
        </Route>
      </Switch>
    </Suspense>
  </Router>
```

当我们在微应用中切换路由时，我们需要通知容器。当在容器中切换路由时，我们也需要通知微应用。
```js

  const { onParentNavigate } = mount(ref.current, {
    initialPath: history.location.pathname,
    onNavgate({ pathname: nextPathname }) {
      const pathname = history.location.pathname
      if (nextPathname !== pathname) {
        history.push(nextPathname)
      }
    }
  })

  // 当容器应用路由变化，通知微应用
  if (onParentNavigate) history.listen(onParentNavigate)
```

```js
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
```
## auth， marketing
基于react的微应用

## dashboard
基于vue的微应用


## 总结
如果想要传递状态，我们直接通过mount方法即可传递。