import styles from "./users.module.css";
import React from "react";

const Pagination = (props) => {
  const {currentPage, totalPageCount, onPageClick} = props;
  let firstPage, lastPage, showRightPoints = true, showLeftPoints = true;
  if (currentPage < 5) {
    firstPage = 2;
    lastPage = 6;
    showLeftPoints = false;
  } else if (currentPage > totalPageCount - 5) {
    firstPage = totalPageCount - 6;
    lastPage = totalPageCount - 1;
    showRightPoints = false;
  } else {
    firstPage = currentPage - 2;
    lastPage = currentPage + 2;
  }

  const pageArray = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pageArray.push(i);
  }

  return (
    <div>
      <div className={styles.pagination}>
        <span
          onClick={() => onPageClick(1)}
          className={currentPage === 1 ?
            styles.active + ' ' + styles.pagItem
            : styles.pagItem}>1</span>
        {showLeftPoints ? "..." : ''}

        {pageArray.map(p =>
          <span
            onClick={() => onPageClick(p)}
            className={p === currentPage ? styles.active + ' ' + styles.pagItem : styles.pagItem}
            key={p}
          >
            {p}
          </span>)
        }
        {showRightPoints ? "..." : ''}

        <span
          onClick={() => onPageClick(totalPageCount)}
          className={currentPage === totalPageCount
            ? styles.active + ' ' + styles.pagItem
            : styles.pagItem}>{totalPageCount}
        </span>

      </div>
    </div>
  )
}

export default Pagination;