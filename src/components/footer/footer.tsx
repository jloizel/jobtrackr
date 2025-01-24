import React, { useContext } from "react";
import styles from "./footer.module.css";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();

  const links1 = [
    {
      id: 1,
      title: "Tools",
      links: [
        {
          link: "My Tracker",
          href: "/my-tracker",
        },
        {
          link: "My CV",
          href: "/my-cv",
        },
        {
          link: "My Cover Letter",
          href: "/my-cover-letter",
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

  const links2 = [
    {
      id: 1,
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

  const renderedLinks = session ? links1 : links2;
  
  return (
    <div className={styles.container}>
      <div className={styles.linksWrapper}>
        {renderedLinks.map((section) => (
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
