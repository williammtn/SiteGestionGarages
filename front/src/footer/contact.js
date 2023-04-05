import { useState } from "react";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send form data to server
    console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    setIsSubmitted(true);
  };

  return (
    <div className="container" style={{ paddingTop: '140px',marginBottom: '20vh' }}>
      <h1>Contactez-nous</h1>
      <p>Vous pouvez nous contacter à l'aide du formulaire ci-dessous :</p>
      {isSubmitted ? (
        <div className="alert alert-success" role="alert">
          Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom :</label>
            <input type="text" id="name" className="form-control" onChange={handleNameChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Adresse email :</label>
            <input type="email" id="email" className="form-control" onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message :</label>
            <textarea id="message" className="form-control" rows="5" onChange={handleMessageChange} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactUs;
