import { type OPERATION_TYPE, type PUBLICATION_PLAN, type POSTING_STATUS, type PROPERTY_TYPE, type ROLES } from './utils/constants'

// export type UserRole = 'ADMIN' | 'EDITOR' | 'SEEKER'
// export type PostingStatus = 'AVAILABLE' | 'RESERVED' | 'FINALIZED'
// export type PropertyTypeName = 'APARTMENT' | 'HOUSE' | 'PH'
// export type OperationTypeName = 'RENT' | 'SALE' | 'TEMPORARY_RENTAL'
// export type PublicationPlan = 'SIMPLE' | 'HIGHLIGHTED' | 'SUPERHIGHLIGHTED'
export type UserRole = typeof ROLES[number]
export type PostingStatus = typeof POSTING_STATUS[number]
export type PropertyTypeName = typeof PROPERTY_TYPE[number]
export type OperationTypeName = typeof OPERATION_TYPE[number]
export type PublicationPlan = typeof PUBLICATION_PLAN[number]
