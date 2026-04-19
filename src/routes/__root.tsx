import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <h1>My App!</h1>
      <div className="navbar">
        <Link to="/" activeProps={{className: "active-link"}}>Home</Link>
        <Link to="/about" activeProps={{className: "active-link"}}>About</Link>
        <Link to="/tasks" activeProps={{className: "active-link"}}>Tasks</Link>
      </div>
      <Outlet />
    </>
  )
}
