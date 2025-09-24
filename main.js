export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, message } = req.body;

    // Replace with your WhatsApp numbers
    const contacts = ["254757961229"];

    // Create a mock response (here is where you’d integrate Twilio API)
    contacts.forEach(num => {
      console.log(`Message to ${num}: From ${name} - ${message}`);
    });

    return res.status(200).json({ message: "Message sent successfully!" });
  }

  res.status(405).json({ message: "Method not allowed" });
}
