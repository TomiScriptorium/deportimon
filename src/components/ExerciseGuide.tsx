import React, { useState } from 'react'
import { ExerciseAvatar } from '../avatar/ExerciseAvatar'
import { MUSCLE_LABEL } from '../data/muscles'
import type { Exercise } from '../types'
import { MuscleMap } from './MuscleMap'
import { YouTubePlayer } from './YouTubePlayer'
import { ExternalLinkIcon, PlayIcon } from './icons'

export function ExerciseGuide({ ex }: { ex: Exercise }) {
  const [showVideo, setShowVideo] = useState(false)
  const secondary = ex.secondary ?? []

  return (
    <>
      <ExerciseAvatar anim={ex.anim} primary={ex.primary} secondary={secondary} label={ex.name} />

      <div className="exercise-head">
        <div>
          <div className="exercise-name">{ex.name}</div>
          <div className="exercise-scheme">{ex.scheme}</div>
        </div>
      </div>

      <div className="muscle-panel">
        <MuscleMap primary={ex.primary} secondary={secondary} />
        <div className="muscle-legend">
          <div>
            <div className="muscle-legend-label">Principal</div>
            <div className="chip-row">
              {ex.primary.map((m) => (
                <span key={m} className="chip chip-1">{MUSCLE_LABEL[m]}</span>
              ))}
            </div>
          </div>
          {secondary.length > 0 && (
            <div>
              <div className="muscle-legend-label">También trabaja</div>
              <div className="chip-row">
                {secondary.map((m) => (
                  <span key={m} className="chip chip-2">{MUSCLE_LABEL[m]}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ol className="steps">
        {ex.steps.map((step, i) => (
          <li key={i}>
            <span className="step-num">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      {ex.equipment && (
        <div className="exercise-cue">
          <strong>Con qué:</strong> {ex.equipment}
        </div>
      )}

      {ex.youtubeId ? (
        showVideo ? (
          <YouTubePlayer youtubeId={ex.youtubeId} title={ex.name} />
        ) : (
          <button className="btn btn-secondary btn-sm video-toggle" onClick={() => setShowVideo(true)}>
            <PlayIcon size={14} /> Ver video de referencia
          </button>
        )
      ) : (
        ex.videoSearch && (
          <a
            className="btn btn-secondary btn-sm video-toggle"
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.videoSearch)}`}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLinkIcon size={13} /> Buscar videos en YouTube
          </a>
        )
      )}
    </>
  )
}
