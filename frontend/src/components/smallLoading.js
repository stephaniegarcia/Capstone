import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

//Smaller Loading logic
export default function SmallLoading({isShown = true}) {
    var display = isShown ? 'flex' : 'none'
    return (
      <div
        style={{
          display: display,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0"
        }}
      >
        <CircularProgress color="primary" />
      </div>
    )
  }