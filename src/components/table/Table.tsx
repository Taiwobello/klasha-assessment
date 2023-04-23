/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./Table.module.scss";
import { getPrefilledPaginationControls } from "@/utils/pagination-helpers";

export type CellRender<T = any> = (
  value: any,
  record: T,
  index: number
) => ReactNode;

export type TableColumn<T = any> = {
  title: string;
  key: string;
  dataIndex?: keyof T;
  render?: CellRender;
};

export type Pagination = {
  total: number;
  page: number;
  pageSize: number;
};

interface TableProps {
  columns: TableColumn[];
  dataSource: { [value: string]: any }[];
  onPageChange?: (page: number) => void;
  pagination?: Pagination;
  total?: { [value: string]: any };
}

function Table(props: TableProps) {
  const { columns, dataSource, pagination, onPageChange = () => {} } = props;
  const { page = 1, pageSize = 1, total = 0 } = pagination || {};

  const [pageCount, setPageCount] = useState(0);

  const handlePageControlClick = (_page: number) => {
    if (_page >= 1 && _page <= pageCount) {
      onPageChange?.(_page);
    }
  };

  const paginationControls = useMemo(() => {
    return getPrefilledPaginationControls(page, pageCount);
  }, [pageCount, page]);

  const handlePageSkip = (direction: "forward" | "backward") => {
    const newPage =
      direction === "forward"
        ? Math.min(page + 5, pageCount)
        : Math.max(page - 5, 1);
    onPageChange(newPage);
  };

  useEffect(() => {
    const pageCount = Math.ceil(total / pageSize);
    setPageCount(pageCount);
  }, [total, pageSize]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j}>
                  {col.render
                    ? col.render(row[(col.dataIndex as string) || ""], row, i)
                    : row[(col.dataIndex as string) || ""]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className={styles["pagination-wrapper"]}>
          <div className={styles["pagination-flex"]}>
            <div
              onClick={() => handlePageControlClick(page - 1)}
              className={[
                styles["page-control"],
                styles.previous,
                page === 1 && styles.invalid,
              ].join(" ")}
            >
              <img
                src="/icons/arrow-left.svg"
                alt="search"
                className="generic-icon"
              />
            </div>
            {paginationControls.map((control, index) =>
              control.pageNumber ? (
                <div
                  key={index}
                  className={[
                    styles["page-control"],
                    page === control.pageNumber && styles.active,
                  ].join(" ")}
                  onClick={() =>
                    handlePageControlClick(control.pageNumber || 1)
                  }
                >
                  {control.pageNumber}
                </div>
              ) : (
                <div
                  key={index}
                  className={[
                    styles.skip,
                    styles[control.skipDirection || "forward"],
                  ].join(" ")}
                  onClick={() =>
                    handlePageSkip(control.skipDirection || "forward")
                  }
                >
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                </div>
              )
            )}
            <div
              onClick={() => handlePageControlClick(page + 1)}
              className={[
                styles["page-control"],
                styles.next,
                (!pageCount || page === pageCount) && styles.invalid,
              ].join(" ")}
            >
              <img
                src="/icons/arrow-left.svg"
                alt="search"
                className={["generic-icon", styles["rotate-icon"]].join(" ")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
