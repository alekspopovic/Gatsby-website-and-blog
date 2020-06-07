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
          value="https://aleksandarpopovic.com/"
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
    </div>
  )
}

export default ContactList
