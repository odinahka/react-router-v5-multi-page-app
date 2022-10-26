import React, { useEffect, Suspense } from "react";
import { useParams, Link, Route, useRouteMatch } from "react-router-dom";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Comments = React.lazy(() => import("../components/comments/Comments"));
const NoQuotesFound = React.lazy(() =>
  import("../components/quotes/NoQuotesFound")
);

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  console.log(loadedQuote);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (status === "completed" && (!loadedQuote || loadedQuote.length === 0)) {
    return (
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <NoQuotesFound/>
      </Suspense>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      <div>
        <HighlightedQuote quote={loadedQuote} />
        <Route path={`${match.url}`} exact>
          <div className="centered">
            <Link className="btn--flat" to={`${match.url}/comments`}>
              Comments
            </Link>
          </div>
        </Route>

        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      </div>
    </Suspense>
  );
};

export default QuoteDetail;
