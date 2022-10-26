import styles from './HighlightedQuote.module.css';

const HighlightedQuote = (props) => {
  return (
    <figure className={styles.quote}>
      <p>{props.quote.text}</p>
      <figcaption>{props.quote.author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
