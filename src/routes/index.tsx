import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <p>Welcome to my PWA test app!</p>
    <Button>This is a button!</Button>
  </div>
}
