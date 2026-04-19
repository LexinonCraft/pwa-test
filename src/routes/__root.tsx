import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="p-5">
      <h1 className="mb-3">My App!</h1>
      <div className="flex flex-row gap-3 mb-4">
        <Link to="/" activeProps={{className: "active-link"}}>Home</Link>
        <Link to="/about" activeProps={{className: "active-link"}}>About</Link>
        <Link to="/tasks" activeProps={{className: "active-link"}}>Tasks</Link>
      </div>
      <Outlet />
    </div>
  )
}
