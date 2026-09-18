export function getFullName(firstName?: string, lastName?: string | null) {
  return [firstName, lastName].filter(Boolean).join(' ')
}
