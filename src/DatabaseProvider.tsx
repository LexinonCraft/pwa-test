import { useEffect, useState } from "react";
import { DatabaseContext, createDatabaseConnection } from "./db";

export default function DatabaseProvider({ children }: { children: React.ReactNode }) {
    const [db, setDb] = useState<IDBDatabase | undefined>(undefined)

    useEffect(() => {
        async function createConnection() {
            setDb(await createDatabaseConnection())
        }
        createConnection()
        return () => {
            if (db)
                db.close()
        }
    }, [])

    return <DatabaseContext.Provider value={db}>
        {children}
    </DatabaseContext.Provider>
}