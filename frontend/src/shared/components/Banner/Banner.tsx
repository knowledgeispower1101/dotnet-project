import leaderBoardImage from "@/assets/leader_board.jpg";
import "./Banner.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TransportationWidgetTab } from "@/shared";
export const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="homepage-banner">
      <img className="banner-img-pc" src={leaderBoardImage} alt="Banner" />
      <div className="homepage-body-banner">
        <div className="homepage-content-wrapper">
          <Link to="/" className="title-container">
            <p className="slogan-text color--white">{t("slogan")}</p>
          </Link>
          <TransportationWidgetTab />
        </div>
      </div>
    </div>
  );
};
