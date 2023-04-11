import React from "react";
import "./privacy.css";

function privacy({ toggle }) {
  return (
    <div onClick={toggle} className="background">
      <div className="content">
        <h6 onClick={toggle} className="backBTN">
          Back
        </h6>
        <h1>Privacy Policy</h1>
        <p className="sub">
          At Quick⚡️TODO, we respect the privacy of our users and are commited
          to protect your data. This privacy policy outlines the types of data
          we collect in order to provide a friction less user experience.
        </p>
        <p className="heading">Collection of Personal Information</p>
        <p className="sub">
          Quick⚡️TODO only collects data to provide a great user experience, We
          collect your email to sync up your todos between devices.
        </p>
        <p className="heading">Usage of Cookies & Local Storage</p>
        <p className="sub">
          Quick⚡️TODO may use cookies and local storage, which are small text
          files that are stored on a user's computer or mobile device. These
          cookies&localstorages help us to personalize the user experience, And
          we only use cookies and local storage for storing data that are
          required for user authentication and basic functions like: storing
          offline todos, and other preferences. However, we do not use cookies
          or local storage to collect any personal information.
        </p>
        <p className="heading">Sharing of Personal Information</p>
        <p className="sub">
          Quick⚡️TODO does not share any personal information with third
          parties, including advertisers or other companies. We do not sell,
          rent, or trade any personal information.
        </p>
        <p className="heading">Protection of Personal Information</p>
        <p className="sub">
          Quick⚡️TODO takes reasonable measures to protect the personal
          information of our users. We use industry-standard security measures
          to prevent unauthorized access, disclosure, or misuse of personal
          information.
        </p>
        <p className="heading">Passwords and Sensitive Information</p>
        <p className="sub">
          Quick⚡️TODO uses industry-standard encryption techniques to protect
          passwords and other sensitive information. We do not have access to
          passwords or other sensitive information, as this information is
          stored in a secure and encrypted format.
        </p>
        <p className="heading">Changes to Privacy Policy</p>
        <p className="sub">
          Quick⚡️TODO may update this privacy policy from time to time. If we
          make any material changes to the policy, we will notify users by
          posting a notice on our website.
        </p>
      </div>
    </div>
  );
}

export default privacy;
