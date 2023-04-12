import ReactDOM from 'react-dom'
import { PacmanLoader, ClimbingBoxLoader, ClipLoader, PuffLoader, RingLoader, ScaleLoader, DotLoader } from 'react-spinners'
import "./loading.css"

const Loading = () => {

    return ReactDOM.createPortal(
        <div className='loadingModal'>

            <RingLoader
                cssOverride={{ transform: "scale(2.5)" }}
                color='#0AF'
            />
            <h1 style={{ color: "#0AF" }}>Loading...</h1>

        </div>,
        document.getElementById("portal")
    )
}

export default Loading