import React from "react";
import ChatCss from "./chat-section.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCheck,
  faCoffee,
  faMessage,
  faMicrochip,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  return (
    <>
      <div>
        {/* profile section */}
        <div className={ChatCss["user-profile"]}>
          <div className={ChatCss["profile-img"]}>
            <img src={require("../../assest/chat-logo/favicon.ico")} alt="" />{" "}
            &nbsp;&nbsp;
          </div>

          <div className={ChatCss["user-name-and-status"]}>
            <span>
              <strong>Abobakar Sadeeq</strong>
            </span>
            <p>Online</p>
          </div>

          <div className={ChatCss["profile-img"]}>
            <img src={require("../../assest/chat-logo/favicon.ico")} alt="" />{" "}
            &nbsp;&nbsp;
          </div>
        </div>

        {/* chat read section */}

        <div className={ChatCss["chat-read-section"]}>
          <div className={ChatCss["chat-message-right-main"]}>
            <div className={ChatCss["chat-right-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
                corrupti, beatae sit!
              </span>
            </div>
            <div className={ChatCss["chat-right-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>

          <div className={ChatCss["chat-message-left-main"]}>
            <div className={ChatCss["chat-left-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
              </span>
            </div>
            <div className={ChatCss["chat-left-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-left-main"]}>
            <div className={ChatCss["chat-left-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
              </span>
            </div>
            <div className={ChatCss["chat-left-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-left-main"]}>
            <div className={ChatCss["chat-left-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
              </span>
            </div>
            <div className={ChatCss["chat-left-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-left-main"]}>
            <div className={ChatCss["chat-left-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
              </span>
            </div>
            <div className={ChatCss["chat-left-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-left-main"]}>
            <div className={ChatCss["chat-left-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
              </span>
            </div>
            <div className={ChatCss["chat-left-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-left-main"]}>
            <div className={ChatCss["chat-left-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
              </span>
            </div>
            <div className={ChatCss["chat-left-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-right-main"]}>
            <div className={ChatCss["chat-right-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
                corrupti, beatae sit!
              </span>
            </div>
            <div className={ChatCss["chat-right-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-right-main"]}>
            <div className={ChatCss["chat-right-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
                corrupti, beatae sit!
              </span>
            </div>
            <div className={ChatCss["chat-right-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-right-main"]}>
            <div className={ChatCss["chat-right-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
                corrupti, beatae sit!
              </span>
            </div>
            <div className={ChatCss["chat-right-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
          <div className={ChatCss["chat-message-right-main"]}>
            <div className={ChatCss["chat-right-message-text"]}>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
                facilis quia id commodi at pariatur voluptate quibusdam ducimus
                eum facere molestias tempore saepe recusandae incidunt animi est
                corrupti, beatae sit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem ex sit nisi blanditiis explicabo, nulla tenetur maiores fuga amet vel totam cum inventore magnam hic iusto rerum recusandae eos, atque et placeat quod ullam repellat! Ut veniam ipsam iste veritatis. Mollitia, quae doloremque dolorem odio perspiciatis minima fuga totam.
                corrupti, beatae sit!
              </span>
            </div>
            <div className={ChatCss["chat-right-message-meta"]}>
              <span>
                4:18 pm &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
          </div>
        </div>

        {/* message send section */}
        <div className={ChatCss["chat-bottom"]}>
          <div className={ChatCss["message-send-section"]}>
            {/* microphone section */}
            <div className={ChatCss["send-and-file-open-icon"]}>
              <FontAwesomeIcon
                className={ChatCss["icon-color-hover"]}
                icon={faMicrophone}
              />
            </div>

            {/* send message section */}
            <div className={ChatCss["send-message-div"]}>
              <input type="text" placeholder="Type a message..." />
            </div>

            {/* send message and files icons */}
            <div className={ChatCss["send-and-file-open-icon"]}>
              <FontAwesomeIcon
                className={ChatCss["icon-color-hover"]}
                icon={faPaperclip}
              />{" "}
              &nbsp; &nbsp;
              <FontAwesomeIcon
                className={ChatCss["icon-color-hover"]}
                icon={faPaperPlane}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
