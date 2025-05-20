import { ClipLoader } from "react-spinners"


const Loading=()=>{
    return(
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ClipLoader
             color="#FF1212"
             loading={true}
             size={35}
             />
        </div>
    )
}

export default Loading