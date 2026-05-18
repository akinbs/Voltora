// ── Base document ─────────────────────────────────────────────
export interface FirestoreDocumentBase {
  id:        string
  createdAt: unknown
  updatedAt: unknown
}

export interface CreateFirestoreDocument {
  createdAt?: unknown
  updatedAt?: unknown
}

export interface UpdateFirestoreDocument {
  updatedAt?: unknown
}

// ── Shared value types ────────────────────────────────────────
export type FirestoreStatus   = 'active' | 'inactive' | 'draft' | 'archived'
export type FirestoreCurrency = 'USD' | 'TRY'

// ── Rich types shared across models ──────────────────────────
export interface FirestoreImage {
  id:        string
  url:       string
  path:      string
  alt:       string
  sortOrder: number
  isPrimary: boolean
}

export interface FirestoreSeo {
  title:       string
  description: string
  keywords:    string[]
}

export interface FirestoreAudit {
  createdBy?: string
  updatedBy?: string
}
