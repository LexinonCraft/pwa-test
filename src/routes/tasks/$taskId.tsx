import { createFileRoute } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import { DatabaseContext, storeName } from '../../db'
import { router } from '../../main'

export const Route = createFileRoute('/tasks/$taskId')({
  component: RouteComponent,
})

function RouteComponent() {
  const [task, setTask] = useState<{ id: string, title: string, description: string } | undefined>(undefined)
  
  const db = useContext(DatabaseContext)
  const { taskId } = Route.useParams()

  useEffect(() => {
    if (!db)
      return

    const tx = db.transaction(storeName)
    const store = tx.objectStore(storeName)
    const request = store.get(taskId)

    request.onsuccess = () => {
      setTask(request.result)
    }
  }, [db])

  function handleDelete() {
    if (!db)
      return

    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    const request = store.delete(taskId)

    request.onsuccess = () => {
      router.navigate({ to: "/tasks" })
    }
  }

  return <>
    {task ? <>
      <h2 className="text-3xl mb-3">Task: {task.title}</h2>
      <p className="mb-3">{task.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </> : <>Loading task...</>}
  </>
}
