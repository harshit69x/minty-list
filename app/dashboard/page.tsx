"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NotesList } from "@/components/dashboard/notes-list"
import { CreateNoteDialog } from "@/components/dashboard/create-note-dialog"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

type Note = Database["public"]["Tables"]["notes"]["Row"]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [notesLoading, setNotesLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchNotes()
    }
  }, [user])

  const fetchNotes = async () => {
    if (!user) return

    setNotesLoading(true)
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) {
      console.error("Error fetching notes:", error)
    } else {
      setNotes(data || [])
    }
    setNotesLoading(false)
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} onRefresh={fetchNotes} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Notes</h1>
            <p className="text-gray-600 mt-1">
              {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
              {searchQuery && " found"}
            </p>
          </div>
          <CreateNoteDialog onNoteCreated={fetchNotes} />
        </div>

        <NotesList notes={filteredNotes} loading={notesLoading} onNoteUpdated={fetchNotes} onNoteDeleted={fetchNotes} />
      </main>
    </div>
  )
}
