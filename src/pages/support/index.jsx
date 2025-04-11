import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import logo from "../../assets/output-onlinepngtools__1_-removebg-preview.png";
import instagramImg from "../../assets/instagram.png";
import telegramImg from "../../assets/telegram.png";
import emailImg from "../../assets/email.png";
import phoneCall from "../../assets/phone-call.png";
import { useTranslation } from "react-i18next";

const index = () => {
  const { colors, theme } = useSelector((state) => state.theme);
  const { t } = useTranslation();

  return (
    <div
      style={{
        background: "#F3F7FF",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <header className="header_support">
        <img src={logo} alt="logo" width={250} height={250} />
        <h1 style={{ margin: "20px 0px" }}>
        {t("support.item1")}
        </h1>
        <p style={{ margin: "10px 0px", fontSize: "22px" }}>
        {t("support.item2")}
        </p>
      </header>

      <div className="container_support">
        <section>
          <h2 style={{ marginBottom: "20px" }}>
          {t("support.item3")}
          </h2>

          <div className="faq-item_support">
            <h3 style={{ marginBottom: "10px", color: "#000" }}>
            {t("support.item4")}
            </h3>
            <p style={{ color: "#000" }}>
            {t("support.item5")}
            </p>
          </div>

          <div className="faq-item_support">
            <h3 style={{ color: "#000" }}>{t("support.item6")}</h3>
            <p style={{ color: "#000" }}>
            {t("support.item7")}
            </p>
          </div>

          <div className="faq-item_support">
            <h3 style={{ color: "#000" }}>{t("support.item8")}</h3>
            <p style={{ color: "#000" }}>
            {t("support.item9")}
            </p>
          </div>
        </section>

        <section className="contact-form_support">
          <h2 style={{ color: "#000" }}>{t("support.item10")}</h2>
          <form>
            <label style={{ color: "#000" }} for="name">
            {t("support.item11")}
            </label>
            <input type="text" id="name" name="name" required />

            <label style={{ color: "#000" }} for="email">
            {t("support.item12")}
            </label>
            <input type="email" id="email" name="email" required />

            <label style={{ color: "#000" }} for="message">
            {t("support.item13")}
            </label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit">{t("support.item14")}</button>
          </form>
        </section>

        <section className="contact-info_support">
          <h2 style={{ color: "#000" }}>{t("support.item15")}</h2>

          <div className="info-item_support">
            <img src={phoneCall} alt="Telefon" width="25" />
            <a style={{ color: "#000" }} href="tel:+998901234567">
              +998 55 506-00-64
            </a>
          </div>

          <div className="info-item_support">
            <img src={emailImg} alt="Email" width="25" />
            <a style={{ color: "#000" }} href="mailto:info@qeb.uz">
              sss.ird@mail.ru
            </a>
          </div>

          <div className="social-links_support">
            <a href="https://t.me/smartsolutions_system" target="_blank">
              <img src={telegramImg} alt="Telegram" />
            </a>
            {/* <a href="https://facebook.com/qebplatforma" target="_blank">
              <img src="facebook.png" alt="Facebook" />
            </a> */}
            <a
              href="https://www.instagram.com/smartsolutionssystem.uz/"
              target="_blank"
            >
              <img src={instagramImg} alt="Instagram" />
            </a>
          </div>
        </section>
      </div>

      <footer className="footer_support">
        &copy; 2025 {t("support.item16")}
      </footer>
    </div>
  );
};

export default index;
