import React, { useState } from 'react'
import { ExternalLinkIcon, PlayIcon } from './icons'

interface YouTubePlayerProps {
  youtubeId: string
  title: string
}

export function YouTubePlayer({ youtubeId, title }: YouTubePlayerProps) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="video-wrap">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <button
      className="video-thumb"
      onClick={() => setPlaying(true)}
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg)` }}
      aria-label={`Reproducir video: ${title}`}
    >
      <div className="gradient" />
      <div className="play-btn">
        <div className="circle">
          <PlayIcon />
        </div>
      </div>
      <a
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          bottom: 8,
          right: 10,
          color: 'white',
          fontSize: 11,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'rgba(0,0,0,0.45)',
          padding: '5px 8px',
          borderRadius: 8,
        }}
      >
        YouTube <ExternalLinkIcon size={12} />
      </a>
    </button>
  )
}
