import { useEffect, useRef, useState, type ElementType, type KeyboardEvent } from 'react'
import './EditableField.css'

interface EditableFieldProps {
  value: string
  onSave: (value: string) => void
  as?: ElementType
  className?: string
  placeholder?: string
}

function EditableField({ value, onSave, as: Tag = 'span', className, placeholder }: EditableFieldProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commit = () => {
    setEditing(false)
    const trimmed = draft.trim()
    if (trimmed !== value) onSave(trimmed)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
    } else if (event.key === 'Escape') {
      setDraft(value)
      setEditing(false)
    }
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        className={`editable-field editable-field--input ${className ?? ''}`}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
      />
    )
  }

  return (
    <Tag
      className={`editable-field ${className ?? ''}`}
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setEditing(true)
        }
      }}
    >
      {value || <span className="editable-field__placeholder">{placeholder ?? 'Click to edit'}</span>}
    </Tag>
  )
}

export default EditableField
