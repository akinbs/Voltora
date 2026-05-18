export interface Review {
  id:         string
  productId:  string
  userId:     string
  userName:   string
  rating:     number
  title:      string
  comment:    string
  isApproved: boolean
  createdAt:  unknown
  updatedAt:  unknown
}

export interface CreateReviewInput {
  productId: string
  userId:    string
  userName:  string
  rating:    number
  title:     string
  comment:   string
}

export type UpdateReviewInput = Partial<Pick<Review, 'rating' | 'title' | 'comment'>>
