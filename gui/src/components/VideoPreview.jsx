import { useEffect, useRef } from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"
const VideoPreview = ({ url, poster }) => (
  <video
    src={url}
    poster={poster}
    controls
    className="w-full aspect-video rounded-md object-cover"
  />
)

export default VideoPreview