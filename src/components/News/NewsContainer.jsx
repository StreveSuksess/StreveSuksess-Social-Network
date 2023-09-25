import {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuth} from "../../hoc/withAuth";
import {getNews} from "../../redux/newsReducer";
import Preloader from "../Preloader/preloader";
import {News} from "./News";
import {withLoginRedirect} from "../../hoc/withLoginRedirect";

function NewsContainer(props) {
  useEffect(() => {
    props.getNews(props.userId)
  }, [props.userId])

  return props.isFetching ? <Preloader/> : <News news={props.news}/>
}

function mapStateToProps(state) {
  return {
    isFetching: state.news.isFetching,
    news: state.news.news
  }
}

export default compose(
  connect(mapStateToProps, {getNews}),
  withLoginRedirect,
  withAuth
)(NewsContainer);