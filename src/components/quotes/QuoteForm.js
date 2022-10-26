import { useRef, useState, Fragment } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  const formFocusHandler = () => {
    setIsEntering(true);
  };
  const finishEntering = () => {
    setIsEntering(false);
  }
  return (
    <Fragment>
       <Prompt when = {isEntering} message={(location) => 'Are you sure you want to leave? All entered data will be lost' }/>
      <Card>
        <form
          className={styles.form}
          onSubmit={submitFormHandler}
          onFocus={formFocusHandler}
        >
          {props.isLoading && (
            <div className={styles.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={styles.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={styles.actions}>
            <button  className="btn" onClick={finishEntering}>Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
