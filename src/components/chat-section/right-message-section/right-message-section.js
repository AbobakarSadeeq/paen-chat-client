import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import RightMessageCss from "./right-message-section.module.css";

const RightMessageSection = () => {
  return (
    <>
      <div className={RightMessageCss["chat-message-right-main"]}>
        <div className={RightMessageCss["chat-right-message-text"]}>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
            facilis quia id commodi at pariatur voluptate quibusdam ducimus eum
            facere molestias tempore saepe recusandae incidunt animi est
            corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Assumenda dolorem ex sit nisi blanditiis
            explicabo, nulla tenetur maiores fuga amet vel totam cum inventore
            magnam hic iusto rerum recusandae eos, atque et placeat quod ullam
            repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque
            dolorem odio perspiciatis minima fuga totam. corrupti, beatae sit!
          </span>
        </div>
        <div className={RightMessageCss["chat-right-message-meta"]}>
          <span>
            4:18 pm &nbsp;&nbsp;
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </div>
      </div>
    </>
  );
};

export default RightMessageSection;
