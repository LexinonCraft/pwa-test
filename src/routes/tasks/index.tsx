import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import { DatabaseContext, storeName } from '../../db'
import { v4 as uuidv4 } from 'uuid'

export const Route = createFileRoute('/tasks/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [entries, setEntries] = useState<{ id: string, title: string }[]>([])

  const db = useContext(DatabaseContext)

  function fetchEntries() {
    if (!db)
      return

    const tx = db.transaction(storeName, "readonly")
    const store = tx.objectStore(storeName)
    const request = store.getAll()

    request.onsuccess = () => {
      //console.log(request.result)
      setEntries(request.result)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [db])

  function handleSubmit(formData: FormData) {
    if (!db)
      return

    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    store.put({ id: uuidv4(), title: formData.get("title"), description: formData.get("description") })

    fetchEntries()
  }

  return <>
    <h2>Tasks</h2>
    {db ? <>
      <ul>{entries.map((entry) =>
        <li key={entry.id}><Link to="/tasks/$taskId" params={{taskId: entry.id}}>{entry.title}</Link></li>
      )}</ul>
      {entries.length == 0 && <p>You have no tasks yet. Create one below!</p>}
      <h3>Create new task</h3>
      <form action={handleSubmit} className="new-task-form">
        <label>Title</label>
        <input type="text" name="title" />
        <label>Description</label>
        <textarea name="description" />
        <button>Create</button>
      </form>
    </>: "Connecting..."}
  </>
}
