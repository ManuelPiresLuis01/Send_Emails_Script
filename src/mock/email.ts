import type { sendEmail } from "../type/relatory.type.ts";

// List of recipients for the monthly report.
// ➡️ Add here the emails of the people who will receive the report.
// Each item in the list should follow the format: { name: "Person's Name", email: "person@example.com" }.

const emails: sendEmail[] = [
  // Example of how to add recipients:
  /*
  {
    name: "John Doe",             // Recipient's name
    email: "johndoe@example.com"  // Recipient's email
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com"
  }
  */

  // Add as many recipients as you want, separating them with commas (,).
];

export default emails;
