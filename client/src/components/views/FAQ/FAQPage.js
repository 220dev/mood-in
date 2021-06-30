import React from "react";
import { Icon, Collapse } from "antd";

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

// 답변
const answer1 = (
  <p>
    You may be able to unsuspend your own account. If you log in and see prompts
    that ask you to provide your phone number or confirm your email address,
    follow the instructions to get your account unsuspended. <br />
    <br />
    Are you seeing a message that your account is locked? Your account may also
    be temporarily disabled in response to reports of spammy or abusive
    behavior. For example, you may be prevented from Tweeting from your account
    for a specific period of time or you may be asked to verify certain
    information about yourself before proceeding
  </p>
);

const answer2 = (
  <p>
    To deactivate your locked account, please refer to our troubleshooting
    articles or submit a request here. Requests can also be addressed to the
    contacts listed under the “How To Contact Us section of our Privacy Policy”.
  </p>
);

const answer3 = (
  <p>
    <strong>Step 1</strong>
    <br />
    Log in to twitter.com and go to your Account settings page by clicking the
    more icon and then Settings and privacy.
    <br />
    <br />
    <strong>Step 2</strong>
    <br />
    Click Your account.
    <br />
    <br />
    <strong>Step 3</strong>
    <br />
    Click Account information and enter your password.
    <br />
    <br />
    <strong>Step 4</strong>
    <br />
    Click Email.
    <br />
    <br />
    <strong>Step 5</strong>
    <br />
    Type your email address into the Email field. Note: An email address can
    only be associated with one Twitter account at a time.
    <br />
    <br />
    <strong>Step 6</strong>
    <br />
    Click the Save button at the bottom of the page.
  </p>
);

const answer4 = (
  <p>
    When you sign up for Mood-in, your posts are public by default; anyone can
    view and interact with your posts. Should you choose to protect your posts,
    you can do so through your account settings.
  </p>
);

const answer5 = (
  <p>
    Protect your account with simple precautions
    <br />
    <br />
    If your account has been compromised, take these additional precautions:
    <br />
    Delete any unwanted Tweets that were posted while your account was
    compromised.
    <br />
    Scan your computers for viruses and malware, especially if unauthorized
    account behaviors continue to be posted after you've changed the password.
    <br />
    <br />
    Install security patches for your operating system and applications.
    <br />
    Always use a strong, new password you don't use elsewhere and would be
    difficult to guess. Consider using login verification. Instead of relying on
    just a password, login verification introduces a second check to make sure
    that you and only you can access your Twitter account. Visit our account
    security tips page for more information on avoiding hacks and phishing.
  </p>
);

// UI
function FAQPage() {
  return (
    <div style={{ width: "60%", margin: "3rem auto" }}>
      <div>
        <h1 style={{ textAlign: "center" }}>
          <Icon type="question-circle" style={{ paddingRight: "10px" }} />
          Frequently Asked Question{" "}
        </h1>
        <br />
        <Collapse defaultActiveKey={["1"]} onChange={callback}>
          <Panel header="Can I unsuspend my account?" key="1">
            <p>{answer1}</p>
          </Panel>
          <Panel header="How to deactivate your locked accounts" key="2">
            <p>{answer2}</p>
          </Panel>
          <Panel header="How to update your email address" key="3">
            <p>{answer3}</p>
          </Panel>
          <Panel header="About public and protected posts in Mood-in" key="4">
            <p>{answer4}</p>
          </Panel>
          <Panel header="Help with my compromised account" key="5">
            <p>{answer5}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}

export default FAQPage;
