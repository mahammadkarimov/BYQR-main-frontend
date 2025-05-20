import React from 'react'
import styles from './videoplayer.module.css'

const VideoPlayer = ({ videoUrl }) => {
    return (
        <div className={styles.videoContainer}>
            <video width="600" className={styles.videoSize} controls>
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    )
}

export default VideoPlayer