import loading from "../../images/loading.svg";

function Preloader() {
  return (
    <div className="loading">
      <img src={loading} alt=""/>
    </div>
  )
}

export default Preloader;