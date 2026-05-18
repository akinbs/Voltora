import type { FirestoreImage, FirestoreSeo } from './firestore'

export interface Category {
  id:           string
  name:         string
  slug:         string
  description:  string
  iconName:     string
  productCount: number
  isActive:     boolean
  featured:     boolean
  sortOrder:    number
  image?:       FirestoreImage
  seo?:         FirestoreSeo
  createdAt:    unknown
  updatedAt:    unknown
}

export interface CreateCategoryInput {
  name:        string
  slug:        string
  description: string
  iconName:    string
  isActive:    boolean
  featured:    boolean
  sortOrder:   number
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>
