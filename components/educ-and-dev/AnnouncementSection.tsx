// AnnouncementSection.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnnouncementCard from './AnnouncementCard'

interface AnnouncementItemProps {
    image: string
    title: string
    date: string
}

const AnnouncementSection: React.FC = () => {
    const [showAll, setShowAll] = useState(false)
    const [visibleCount, setVisibleCount] = useState(3)
    const contentRef = useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    const announcements: AnnouncementItemProps[] = [
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
        {
            image: '/images/temp.jpg',
            title: 'API Generation with Postman this Wednesday',
            date: 'September 19, 2023',
        },
    ]

    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth
            if (width < 768) {
                setVisibleCount(2)
            } else {
                setVisibleCount(3)
            }
        }

        updateVisibleCount()
        window.addEventListener('resize', updateVisibleCount)
        return () => window.removeEventListener('resize', updateVisibleCount)
    }, [])

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight)
        }
    }, [showAll, visibleCount])

    const visibleAnnouncements = showAll
        ? announcements
        : announcements.slice(0, visibleCount)

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    return (
        <div className="bg-main-dark w-full overflow-x-hidden">
            <div className="max-w-[1280px] mx-auto">
                <h1 className="text-2xl font-bold font-vietnam py-6 text-white pl-4 md:pl-2">
                    RECENT NEWS AND ANNOUNCEMENTS
                </h1>
                <motion.div
                    animate={{ height: showAll ? contentHeight : 'auto' }}
                    transition={{
                        duration: 0.5,
                        ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                >
                    <div ref={contentRef}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-10 pb-6 justify-items-center px-2 sm:px-4">
                            <AnimatePresence initial={false}>
                                {visibleAnnouncements.map(
                                    (announcement, index) => (
                                        <motion.div
                                            key={index}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{
                                                opacity: { duration: 0.3 },
                                                scale: { duration: 0.5 },
                                                layout: { duration: 0.5 },
                                            }}
                                            className="min-w-0"
                                        >
                                            <AnnouncementCard
                                                {...announcement}
                                            />
                                        </motion.div>
                                    )
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
                <AnimatePresence mode="wait">
                    {announcements.length > visibleCount && (
                        <motion.div
                            key="button"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-center pb-6"
                        >
                            <button
                                className="bg-csg-green-100 text-white text-md font-semibold py-2 px-7 rounded-full"
                                onClick={handleToggle}
                            >
                                {showAll ? 'See less' : 'See more'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default AnnouncementSection