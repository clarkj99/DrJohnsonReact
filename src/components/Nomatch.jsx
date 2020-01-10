import React from "react";
import Arnold from "../images/ChaeWv_UkAA5fD1.jpg";

const Nomatch = () => {
  return (
    <section className="hero is-warning is-fullheight is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <figure class="image is-1by1">
                <img
                  style={{ objectFit: "cover" }}
                  src={Arnold}
                  alt="404 - Page not found"
                />
              </figure>
            </div>
            <div className="column is-vcentered">
              <h1 className="title">404 - Page Not Found!</h1>
              <h2 className="title">Whatchu Talkin Bout?</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nomatch;
