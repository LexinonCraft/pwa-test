import { createContext } from "react"

export const databaseName = "tasks"
export const storeName = "tasks"

export function createDatabaseConnection() {
    const request = indexedDB.open(databaseName)

    request.onupgradeneeded = () => {
        const db = request.result
        const store = db.createObjectStore(storeName, { keyPath: "id" })
        //store.crea

        store.put({ id: "1", title: "A task", description: "Task description" })
    }

    return new Promise<IDBDatabase>((resolve) => {
        request.onsuccess = () => {
            resolve(request.result)
        }
    })
}

export const DatabaseContext = createContext<IDBDatabase | undefined>(undefined)
