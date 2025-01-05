import React from "react";
import styles from "./footer.module.css";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();

  const links = [
    {
      id: 1,
      title: "Tools",
      links: [
        {
          link: session ? "My Tracker" : "Job Tracker",
          href: session ? "/my-tracker" : "/tools/job-tracker",
        },
        {
          link: session ? "My CV" : "CV Upload",
          href: session ? "/my-cv" : "/tools/cv-upload",
        },
        {
          link: session ? "My Cover Letter" : "Cover Letter Upload",
          href: session ? "/my-cover-letter" : "/tools/cover-letter-upload",
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
  
  return (
    <div className={styles.container}>
      <div className={styles.linksWrapper}>
        {links.map((section) => (
          <div key={section.id} className={styles.linksContainer}>
            <div className={styles.sectionTitle}>{section.title}</div>
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
