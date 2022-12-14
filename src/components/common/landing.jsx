import React, { Component } from "react";
import fbLogo from "../../assets/img/fb-logo.png";
import twitterLogo from "../../assets/img/twitter-logo.png";
import instaLogo from "../../assets/img/insta-logo.png";
import telegramLogo from "../../assets/img/telegram-logo.png";
import insaLogo from "../../assets/img/logo.jpg";
import linkedinLogo from "../../assets/img/linkedin-logo.png";
import youtubeLogo from "../../assets/img/youtube-logo.png";
import "../css/landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="" style={{ marginTop: "3%" }}>
        <div className="row" style={{ textAlign: "center" }}>
          <img className="center" src={insaLogo} alt="logo" height="300vh" />
        </div>
        <br />
        <br />
        <div className="row">
          <MediaCards
            image={fbLogo}
            title="Facebook"
            imageClass=""
            linkClass="btn btn-warning btn-block"
            href="/pre-facebook"
          />
          <MediaCards
            image={twitterLogo}
            title="Twitter"
            imageClass=""
            linkClass="btn btn-warning btn-block"
            href="/twitter"
          />
          <MediaCards
            image={telegramLogo}
            title="Telegram"
            imageClass=""
            linkClass="btn btn-warning btn-block"
            href="/pre-telegram"
          />
          <MediaCards
            image={linkedinLogo}
            title="LinkedIn"
            imageClass=""
            linkClass="btn btn-warning btn-block"
            href="/linkedin"
          />
          <MediaCards
            image={youtubeLogo}
            title="YouTube"
            imageClass=""
            linkClass="btn btn-warning btn-block"
            href="/youtube"
          />
          <MediaCards
            image={instaLogo}
            title="Instagram"
            imageClass=""
            linkClass="btn btn-warning btn-block disabled"
            href="#"
            
          />
        </div>
      </div>
    );
  }
}

class MediaCards extends Component {
  render() {
    const imageClass = "card-img-top " + this.props.imageClass;
    const linkClass = this.props.linkClass;
    return (
      <div className="col-md-2 logo-cards">
        <div className="card curve-edge" style={{textAlign:"center"}}>
          <a href={this.props.href}>
            <img className={imageClass} src={this.props.image} alt="logo" />
          </a>
          <div className="card-body" style={{padding:"20% 0 3% 0"}}>
            <button onClick={() => window.location = this.props.href} style={{padding:"5% 0 5% 0"}} className={linkClass}>GO&nbsp;&nbsp;{'\u279C'}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
