/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./Layout.module.scss";
import { navLinks } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../button/Button";

interface AppLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;
  const router = useRouter();
  const { pathname } = router;

  const [collapse, setCollapse] = useState(false);

  return (
    <section className={styles["app-layout"]}>
      <div className={styles["sidebar-wrapper"]}>
        <nav
          className={[styles["side-nav"], collapse ? styles.collapse : ""].join(
            " "
          )}
        >
          <img src="/icons/logo.svg" alt="logo" className={styles.logo} />
          {navLinks.map((link, index) => (
            <div key={index}>
              <p className={styles.title}>{link.title}</p>
              <div className={styles.links}>
                {link.children.map((child, index) => (
                  <Link href={child.link} key={index} legacyBehavior>
                    <a
                      className={[
                        styles.link,
                        pathname === child.link ? styles.active : "",
                      ].join(" ")}
                    >
                      {child.icon}
                      <span className="margin-left-small">{child.title}</span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <Button type="accent" className={styles["support-btn"]}>
              <img
                src="/icons/question-mark.svg"
                alt="question"
                className="generic-icon large margin-right-small"
              />
              Support
            </Button>

            <Button
              className="vertical-margin-medium"
              onClick={() => setCollapse(true)}
            >
              <img
                src="/icons/dropdown.svg"
                alt="left"
                className={[styles["left-arrow"], "margin-right-small"].join(
                  " "
                )}
              />{" "}
              Hide Panel
            </Button>
          </div>
        </nav>
        <Button
          className={[
            "vertical-margin-medium",
            styles["right-btn"],
            collapse && styles.active,
          ].join(" ")}
          onClick={() => setCollapse(false)}
          iconOnly
        >
          <img
            src="/icons/dropdown.svg"
            alt="right"
            className={[styles["right-arrow"]].join(" ")}
          />{" "}
        </Button>
      </div>
      <main>{children}</main>
    </section>
  );
};

export default AppLayout;
