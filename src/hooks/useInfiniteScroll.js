import { useEffect, useState } from 'react'

const edgeOffset = 800

const useInfiniteScroll = (elRef, action, ongoingAction) => {
  const [scrollTriggered, setScrollTriggered] = useState(false)

  useEffect(() => {
    const el = elRef.current

    const threadSafeAction = () => {
      if (scrollTriggered) return
      setScrollTriggered(true)
      action()
      setScrollTriggered(false)
    }

    const handleScroll = () => {
      if (ongoingAction) return // do not trigger an action if one is ongoing
      if (el.scrollTop + el.offsetHeight < el.scrollHeight - edgeOffset) return
      threadSafeAction()
    }

    el.addEventListener('scroll', handleScroll)

    return () => {
      el.removeEventListener('scroll', handleScroll)
    }
  })
}

export default useInfiniteScroll
