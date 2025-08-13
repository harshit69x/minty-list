"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { MoreVertical, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditNoteDialog } from "./edit-note-dialog"
import { DeleteNoteDialog } from "./delete-note-dialog"
import type { Database } from "@/lib/supabase"

type Note = Database["public"]["Tables"]["notes"]["Row"]

interface NotesListProps {
  notes: Note[]
  loading: boolean
  onNoteUpdated: () => void
  onNoteDeleted: () => void
}

export function NotesList({ notes, loading, onNoteUpdated, onNoteDeleted }: NotesListProps) {
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [deletingNote, setDeletingNote] = useState<Note | null>(null)

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes yet</h3>
        <p className="text-gray-600 mb-6">Create your first note to get started!</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{note.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditingNote(note)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeletingNote(note)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">{note.content}</p>
              <p className="text-xs text-gray-400">
                Updated {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingNote && (
        <EditNoteDialog
          note={editingNote}
          open={!!editingNote}
          onOpenChange={(open) => !open && setEditingNote(null)}
          onNoteUpdated={() => {
            onNoteUpdated()
            setEditingNote(null)
          }}
        />
      )}

      {deletingNote && (
        <DeleteNoteDialog
          note={deletingNote}
          open={!!deletingNote}
          onOpenChange={(open) => !open && setDeletingNote(null)}
          onNoteDeleted={() => {
            onNoteDeleted()
            setDeletingNote(null)
          }}
        />
      )}
    </>
  )
}
