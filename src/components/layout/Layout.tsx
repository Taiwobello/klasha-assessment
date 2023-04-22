/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import styles from "./Layout.module.scss";
import { navLinks } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";

interface AppLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;
  const router = useRouter();
  const { pathname } = router;
  return (
    <section className={styles["app-layout"]}>
      <nav className={styles["side-nav"]}>
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
      </nav>
      <main>{children}</main>
    </section>
  );
};

export default AppLayout;
