import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMapPin,
  FaYoutube,
} from "react-icons/fa6";
import styles from "./FooterSection.module.scss";
import { FOOTER_CONSTANTS, HEADER_CONSTANTS } from "@/constants/constants";
import { Link } from "@mui/material";

const FooterSection = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div ref={ref}>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          {/* Left Section - Brand Info */}
          <div className={styles.footerSection}>
            <h2 className={styles.logo}>{HEADER_CONSTANTS.NAME}</h2>
            <p>
              {FOOTER_CONSTANTS.TAG_LINE}
            </p>
            <div className={styles.socialIcons}>
              {/* <FaTwitter />/ */}
              {/* <FaTripadvisor /> */}
              <Link
                href='notfound'
                // target="_blank"
                rel="noopener noreferrer"
                color="white"
                underline="none">
                <FaFacebookF />
              </Link>
              <Link
                href={FOOTER_CONSTANTS.INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                color="white"
                underline="none">
                <FaInstagram />
              </Link>
              <Link
                href={FOOTER_CONSTANTS.YOUTUBE_HREF}
                target="_blank"
                rel="noopener noreferrer"
                color="white"
                underline="none">
                <FaYoutube />
              </Link>
              <Link
                href={HEADER_CONSTANTS.VIEW_LOCATION_HREF}
                target="_blank"
                rel="noopener noreferrer"
                color="white"
                underline="none">
                <FaMapPin />
              </Link>
            </div>
          </div>

          {/* Middle Section - Contact Info */}
          <div className={styles.footerSection}>
            <h3>{FOOTER_CONSTANTS.CONTACT_US}</h3>
            <p>{HEADER_CONSTANTS.CONTACT_NO}</p>
            <p>{HEADER_CONSTANTS.EMAIL}</p>
            <p>{FOOTER_CONSTANTS.ADDRESS}</p>
          </div>

          {/* Right Section - Newsletter Signup */}
          <div className={styles.footerSection}>
            <h3>{FOOTER_CONSTANTS.NEW_LATEST}</h3>
            <p>{FOOTER_CONSTANTS.UPDATES_AND_OFFERS}</p>
            <div className={styles.subscribe}>
              <input type="email" placeholder="Email" />
              <button>&#10148;</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className={styles.footerBottom}>
          <div className={styles.links}>
            <a href="#">Contact</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Environmental Policy</a>
          </div>
          <p>
            {FOOTER_CONSTANTS.COPYRIGHT}
          </p>
        </div>
      </footer>
    </div>
  )
});

FooterSection.displayName = "AboutSection";

export default FooterSection;
