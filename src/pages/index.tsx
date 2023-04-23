import Chart from "@/components/chart/Chart";
import styles from "./index.module.scss";
import { salesData } from "@/utils/constants";

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
            />
            <div className={styles.bottom}>
              <p className="margin-bottom-small text-small">{sales.period}</p>
              <p className={styles.value}>{sales.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
