import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import { DatabaseContext, storeName } from '../../db'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

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
    <h2 className="text-3xl mb-3">Tasks</h2>
    {db ? <>
      <ul className="mb-3 list-disc list-inside">{entries.map((entry) =>
        <li key={entry.id}><Link to="/tasks/$taskId" params={{taskId: entry.id}} className="text-link">{entry.title}</Link></li>
      )}</ul>
      {entries.length == 0 && <p className="mb-3">You have no tasks yet. Create one below!</p>}
      <h3 className="text-2xl mb-3">Create new task</h3>
      <form action={handleSubmit} className="max-w-300">
        <FieldGroup>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input type="text" name="title" className="bg-white text-black" />
          </Field>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea name="description" className="bg-white text-black" />
          </Field>
          <Button>Create</Button>
        </FieldGroup>
      </form>
    </>: "Connecting..."}
  </>
}
