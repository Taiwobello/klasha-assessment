/* eslint-disable @next/next/no-img-element */
import Chart from "@/components/chart/Chart";
import styles from "./index.module.scss";
import { salesChart, salesData } from "@/utils/constants";
import Button from "@/components/button/Button";

export default function Home() {
  return (
    <div>
      <p>Sales overview</p>
      <div className={styles["sales-overview"]}>
        <div className={styles["overview-card"]}>
          <p className="margin-bottom-small text-small">Today&apos;s sales</p>
          <p className={styles.value}>₦1,652.50</p>
        </div>
        {salesData.map((sales, index) => (
          <div
            className={[
              [
                styles["overview-card"],
                index === 0 && styles["dark"],
                "flex column",
              ].join(" "),
            ].join()}
            key={index}
          >
            <p>{sales.date}</p>
            <Chart
              data={sales.data}
              dataKey="amt"
              hideXaxis
              hideYaxis
              height={100}
              width="105%"
            />
            <div className={styles.bottom}>
              <p className="margin-bottom-small text-small">{sales.period}</p>
              <p className={styles.value}>{sales.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["sales-chart-wrapper"]}>
        <div className={styles["sales-chart"]}>
          <div className="flex between">
            <div className="flex spaced center-align">
              <p>Sales</p>
              <strong className="text-small primary-color">7 days</strong>
              <strong className="text-small">30 days</strong>
              <Button>
                USD{" "}
                <img
                  src="/icons/dropdown.svg"
                  alt="dropdown"
                  className="generic-icon small margin-left-small"
                />
              </Button>
              <p className="grey text-small">Email</p>
            </div>
            <div className="flex spaced center-align">
              <Button>
                <img
                  src="/icons/arrow-down.svg"
                  alt="arrow-down"
                  className="generic-icon margin-right-small"
                />{" "}
                <p className="text-small">Download report</p>
              </Button>
            </div>
          </div>
          <div className={styles.chart}>
            <Chart
              data={salesChart}
              dataKey="amt"
              height={240}
              dataKeyXAxis="date"
            />
          </div>
        </div>
        <div className={styles["send-wire"]}>
          <p className={styles["wire-text"]}>
            KlashaWire - send money to businesses globally from Africa
          </p>
          <Button type="secondary" className={styles["wire-btn"]}>
            Send a Wire
          </Button>
        </div>
      </div>
    </div>
  );
}
