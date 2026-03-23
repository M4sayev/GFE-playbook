import submitForm from "./submitForm";

export default function App() {
  return (
    <form
      // Ignore the onSubmit prop, it's used by GFE to
      // intercept the form submit event to check your solution.
      onSubmit={submitForm}
      method="POST"
      action="https://questions.greatfrontend.com/api/questions/contact-form"
    >
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" name="name" placeholder="name" />
      <label htmlFor="email">Name:</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="youemail@gmail.com"
      />
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        type="text"
        name="message"
        placeholder="enter your message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
