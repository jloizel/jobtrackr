import React from "react";
import styles from "./footer.module.css";

const links = [
  {
    id: 1,
    title: "Tools",
    links: [
      {
        link: "Job Tracker",
        href: "/tool/job-tracker",
      },
      {
        link: "CV Upload",
        href: "/tool/cv-upload",
      },
      {
        link: "Cover Letter Upload",
        href: "/tool/cover-letter-upload",
      },
    ],
  },
  {
    id: 2,
    title: "Links",
    links: [
      {
        link: "Sign Up",
        href: "/signup",
      },
      {
        link: "Log In",
        href: "/login",
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.linksWrapper}>
        {links.map((section) => (
          <div key={section.id} className={styles.linksContainer}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <div className={styles.links}>
              {section.links.map((item, index) => (
                <a key={index} href={item.href} className={styles.link}>
                  {item.link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
