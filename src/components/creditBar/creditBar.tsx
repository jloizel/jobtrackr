import React from 'react'
import styles from "./creditBar.module.css"
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";


const CreditBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.name}>
          Built by Jack Loizel
        </div>
        <div className={styles.iconContainer}>
          <a target="_blank" href="https://github.com/jloizel">
            <FaGithub/>
          </a>
          <a target="_blank" href="mailto:loizeljack@gmail.com">
            <MdEmail/>
          </a>
          <a target="_blank" href="https://www.jackloizel.com/">
            <TbWorld/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CreditBar
