import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left Section - Brand Info */}
        <div className={styles.footerSection}>
          <h2 className={styles.logo}>Sona.</h2>
          <p>
            We inspire and reach millions of travelers across 90 local websites.
          </p>
          <div className={styles.socialIcons}>
            <FaFacebookF />
            <FaTwitter />
            <FaTripadvisor />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>

        {/* Middle Section - Contact Info */}
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <p>(12) 345 67890</p>
          <p>
            <a href="mailto:info.colorlib@gmail.com">info.colorlib@gmail.com</a>
          </p>
          <p>856 Cordia Extension Apt. 356, Lake, United States</p>
        </div>

        {/* Right Section - Newsletter Signup */}
        <div className={styles.footerSection}>
          <h3>New Latest</h3>
          <p>Get the latest updates and offers.</p>
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
          Copyright ©2025 All rights reserved | This template is made with{" "}
          <span>❤️</span> by <a href="#">Colorlib</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
