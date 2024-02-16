export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}h ${minutes}m`
}

// get the shirt dat (Thu) from the date YYYY-MM-DD
export function getShortDay(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
}
