/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./index.module.scss";
import Button from "@/components/button/Button";
import { defaultPagination } from "@/utils/constants";
import Table from "@/components/table/Table";

type Props = {};

const columns = [
  {
    title: "Transaction ID",
    dataIndex: "transactionId",
    key: "transactionId",
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Customer name",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Customer email",
    dataIndex: "customerEmail",
    key: "customerEmail",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Request date",
    dataIndex: "requestDate",
    key: "requestDate",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const tableData = [
  {
    transactionId: "GB124QWERTY12346",
    source: "GTB",
    customerName: "Mike Owen",
    customerEmail: "0223337281",
    amount: "$230.00",
    requestDate: "24.08.2021",
    status: "Pending",
  },
  {
    transactionId: "CB328ABCEDF23416",
    source: "UBA",
    customerName: "Steve O'Shassy",
    customerEmail: "0223337281",
    amount: "$480.00",
    requestDate: "24.08.2021",
    status: "Successful",
  },
  {
    transactionId: "GB124QWERTY12346",
    source: "GTB",
    customerName: "Mike Owen",
    customerEmail: "0223337281",
    amount: "$230.00",
    requestDate: "24.08.2021",
    status: "Pending",
  },
  {
    transactionId: "GB124QWERTY12346",
    source: "GTB",
    customerName: "Mike Owen",
    customerEmail: "0223337281",
    amount: "$230.00",
    requestDate: "24.08.2021",
    status: "Pending",
  },
];

function Index() {
  return (
    <section className={styles["transaction-page"]}>
      <p className={[styles.title].join(" ")}>Transaction history</p>
      <div className={styles.action}>
        <div className={styles["input-wrapper"]}>
          <input
            type="text"
            placeholder="Search"
            className={styles.input}
            id="search-input"
          />
          <label htmlFor="search-input">
            <img
              src="/icons/search.svg"
              alt="search"
              className="generic-icon"
            />
          </label>
        </div>

        <div className="flex spaced">
          <Button className="text-small">
            Filter{" "}
            <img
              src="/icons/filter.svg"
              alt="filter"
              className="generic-icon margin-left-small"
            />
          </Button>
          <Button className="text-small">Export</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ ...defaultPagination, page: 1, total: 100 }}
      />
    </section>
  );
}

export default Index;
