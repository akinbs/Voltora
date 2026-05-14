import type { LucideIcon } from 'lucide-react'

export interface CategoryItem {
  id:           string
  label:        string
  description:  string
  icon:         LucideIcon
  productCount: number
  slug:         string
  href:         string
}

export interface HomeStat {
  value:        string
  label:        string
  icon:         LucideIcon
  description:  string
  numericValue?: number
  suffix?:       string
  prefix?:       string
}

export interface FeaturedKit {
  id:            string
  name:          string
  description:   string
  itemCount:     number
  startingPrice: number
  badge:         string
  highlights:    string[]
  slug:          string
}

export interface WhyChooseUsItem {
  id:          string
  title:       string
  description: string
  icon:        LucideIcon
}
