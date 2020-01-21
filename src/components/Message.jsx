import React from "react";

const Message = props => {
  const articleClass = `message is-${props.type}`;
  return (
    <section className="section">
      <article className={articleClass}>
        <div className="message-body is-size-4">{props.text}</div>
      </article>
    </section>
  );
};

export default Message;
