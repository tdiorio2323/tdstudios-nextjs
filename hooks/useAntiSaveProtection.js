'use client'

import { useEffect, useCallback } from 'react'

/**
 * Anti-save protection styles for inline use
 */
export const antiSaveStyles = {
  base: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
  },
  image: {
    pointerEvents: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitUserDrag: 'none',
  },
}

/**
 * Custom hook for anti-save protection functionality
 * Returns event handlers and sets up keyboard shortcut blocking
 */
export function useAntiSaveProtection() {
  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
    if (process.env.NODE_ENV === 'development') {
      console.log('Context menu blocked')
    }
  }, [])

  const handleDragStart = useCallback((e) => {
    e.preventDefault()
    if (process.env.NODE_ENV === 'development') {
      console.log('Drag blocked')
    }
  }, [])

  const handleTouchStart = useCallback((e) => {
    // Prevent long-press on iOS
    if (e.touches.length > 1) {
      e.preventDefault()
    }
  }, [])

  // Block common keyboard shortcuts (Ctrl/Cmd+S, Ctrl/Cmd+P)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (process.env.NODE_ENV === 'development') {
          console.log('Save shortcut blocked')
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        if (process.env.NODE_ENV === 'development') {
          console.log('Print shortcut blocked')
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return {
    handlers: {
      onContextMenu: handleContextMenu,
      onDragStart: handleDragStart,
      onTouchStart: handleTouchStart,
    },
    styles: antiSaveStyles,
  }
}
