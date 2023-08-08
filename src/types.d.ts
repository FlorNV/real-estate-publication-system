import { type ROLES } from './constants'

// export type UserRole = 'ADMIN' | 'EDITOR' | 'SEEKER'
export type UserRole = typeof ROLES[number]
export type PostingStatus = 'AVAILABLE' | 'RESERVED' | 'FINALIZED'
export type RealEstateTypeName = 'APARTMENT' | 'HOUSE' | 'PH'
export type OperationTypeName = 'RENT' | 'SALE' | 'TEMPORARY_RENTAL'
export type PublicationPlan = 'SIMPLE' | 'HIGHLIGHTED' | 'SUPERHIGHLIGHTED'
