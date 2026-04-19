import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>This is an app for testing VitePWA, Tanstack Router, IndexedDB, TailwindCSS and Shadcn.</div>
}
