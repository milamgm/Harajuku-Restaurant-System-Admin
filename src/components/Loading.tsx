import loadingSVG from "../../public/imgs/loading.svg"

const Loading = () => {
  return (
    <div className="text-center mt-5 pt-5">
        <img className="loading_icon" src={loadingSVG} width="75"/>
        <h3 className="mt-3">Loading...</h3>
    </div>
  )
}

export default Loading