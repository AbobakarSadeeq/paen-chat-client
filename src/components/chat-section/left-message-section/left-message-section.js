import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import leftMessageCss from "./left-message-section.module.css";

const LeftMessageSection = () => {
  return (
    <div className={leftMessageCss["chat-message-left-main"]}>
      <div className={leftMessageCss["chat-left-message-text"]}>
        <span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
          facilis quia id commodi at pariatur voluptate quibusdam ducimus eum
          facere molestias tempore saepe recusandae incidunt animi est corrupti,
          beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur
          maiores fuga amet vel totam cum inventore magnam hic iusto rerum
          recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam
          iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis
          minima fuga totam.
        </span>
      </div>
      <div className={leftMessageCss["chat-left-message-meta"]}>
        <span>
          4:18 pm &nbsp;&nbsp;
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </div>
    </div>
  );
};

export default LeftMessageSection;
