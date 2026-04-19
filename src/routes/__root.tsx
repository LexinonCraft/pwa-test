import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="p-5">
      <h1 className="mb-3 text-5xl">My App!</h1>
      <div className="flex flex-row gap-3 mb-4">
        <Link to="/" activeProps={{className: "text-primary"}} className="text-link font-bold">Home</Link>
        <Link to="/about" activeProps={{className: "text-primary"}} className="text-link font-bold">About</Link>
        <Link to="/tasks" activeProps={{className: "text-primary"}} className="text-link font-bold">Tasks</Link>
      </div>
      <Outlet />
    </div>
  )
}
