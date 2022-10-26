import { useEffect } from "react";
import { Fragment } from "react/cjs/react.production.min";
import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound"
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";



const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
      sendRequest();
  },[sendRequest]);
  if(status === 'pending'){
      return <div className="centered">
          <LoadingSpinner/>
      </div>
  }
  if(error){
    return <p className="centered focused">{error}</p>
  }
  if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)){
      return <NoQuotesFound/>
  }
  return (
    <Fragment>
      <h1>All Quotes Page</h1>
      <QuoteList quotes={loadedQuotes} />
    </Fragment>
  );
};

export default AllQuotes;
