import { useEffect, useRef } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

interface InfiniteScrollProps {
  page: number
  loading: boolean
  onLoadMore: () => void
}

export default function InfiniteScroll({ page, loading, onLoadMore }: InfiniteScrollProps) {
  const sentinel = useRef<HTMLDivElement>(null)
  const requestedPage = useRef<number | null>(null)

  useEffect(() => {
    const target = sentinel.current
    if (!target || loading) return

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting) || requestedPage.current === page) return
      // Observer notifications can repeat before React commits the loading state.
      requestedPage.current = page
      observer.disconnect()
      onLoadMore()
    }, { rootMargin: '0px 0px 300px 0px' })

    observer.observe(target)
    return () => observer.disconnect()
  }, [page, loading, onLoadMore])

  return (
    <Box ref={sentinel} role="status" aria-label="Movie pagination" aria-live="polite" className="mt-8 flex min-h-16 flex-col items-center justify-center gap-3">
      {loading ? <><CircularProgress size={24} /><Typography variant="body2" color="text.secondary">Loading more movies…</Typography></> : <Typography variant="caption" color="text.secondary">Scroll to discover more movies.</Typography>}
    </Box>
  )
}
