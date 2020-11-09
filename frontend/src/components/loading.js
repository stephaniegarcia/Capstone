import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Loading({isShown = true}) {
  var display = isShown ? 'flex' : 'none'
  return (
    <div
      style={{
        display: display,
        "flex-direction": "column",
        position: "absolute",
        "justify-content": "center",
        "align-items": "center",
        height: "100%",
        width: "100%",
        top: "0",
        background: "#000000aa",
        bottom: "0",
        left: "0",
        right: "0"
      }}
    >
      <CircularProgress color="primary" />
    </div>
  )
}
