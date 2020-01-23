import React, { Fragment } from "react";
import Hero from "./Hero";
import portrait from "../images/IMG_8520.jpg";
import head from "../images/IMG_0103.jpg";
import Icon from "./Icon";

const Contact = props => {
  return (
    <Fragment>
      <Hero title="Contact Me" />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column"></div>
            <div className="column is-half">
              <div className="card has-background-dark">
                <div className="card-image">
                  <figure className="contact-image image is-16by9">
                    <img src={portrait} alt="Good Times" />
                  </figure>
                </div>
                <div className="card-content has-text-light">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img src={head} alt="Me" />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4 has-text-light">Clark Johnson</p>
                      <p className="subtitle is-6 has-text-light">
                        <Icon icon="envelope-square" />
                        <span>
                          <a href="mailto:clarkjohnsoncodes@gmail.com">
                            clarkjohnsoncodes@gmail.com
                          </a>
                        </span>
                        <br />
                        <span className="icon>">
                          <i className="fab fa-linkedin-in"></i>
                        </span>
                        <span>
                          <a
                            href="http://www.linkedin.com/in/clarkjohnsoncodes"
                            target="new"
                          >
                            clarkjohnsoncodes
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="content">
                    Full Stack Web Developer with over 15 years of software
                    development and maintenance experience. Known for being
                    adaptive to new technologies, being a fast learner, and
                    giving attention to detail. Pursuing full-time opportunities
                    utilizing React, Ruby on Rails, Javascript, PHP, MySQL, or
                    WordPress.
                  </div>
                </div>
              </div>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Contact;
