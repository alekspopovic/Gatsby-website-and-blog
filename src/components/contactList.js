import React from "react"
import contactListStyles from "../styles/contactList.module.css"
import "font-awesome/css/font-awesome.min.css"

const ContactList = () => {
  return (
    <div
      className={`${contactListStyles.sectionContent} ${contactListStyles.contact}`}
    >
      <h2>
        You have a question, suggestion or a business offer? Maybe you simply
        want to say 'hi'? Shoot me a message!
      </h2>
      <form
        target="_blank"
        action="https://formsubmit.co/8283715e05ca45c0023e1973e99ab73e"
        method="POST"
      >
        <input
          type="text"
          name="name"
          className={contactListStyles.formControl}
          placeholder="name"
          required
        />
        <input
          type="email"
          name="email"
          className={contactListStyles.formControl}
          placeholder="address"
          required
        />
        <textarea
          placeholder="message"
          className={contactListStyles.formControl}
          name="message"
          rows="5"
          required
        ></textarea>
        <input
          type="hidden"
          name="_next"
          value="http://localhost:8000/blog"
        ></input>
        <input
          type="hidden"
          name="_subject"
          value="New message submitted on /contact page"
        ></input>
        <input type="hidden" name="_replyto"></input>
        <div>
          <button type="submit" className={contactListStyles.formControl}>
            Send
          </button>
        </div>
      </form>

      <div className={`${contactListStyles.social}`}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/alekspopovic/"
        >
          <i className="fa fa-linkedin"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/alekswritescode"
        >
          <i className="fa fa-twitter"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/aleks.popovic/"
        >
          <i className="fa fa-instagram"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://codepen.io/aleksandarp/"
        >
          <i className="fa fa-codepen"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/alekspopovic"
        >
          <i className="fa fa-github"></i>
        </a>
      </div>
    </div>
  )
}

export default ContactList
