import React, { useState } from 'react';


export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold fs-1">Contact Us</h1>
      <p className="text-center mb-4 fs-5">
        Have questions, feedback, or just want to say hello? We're here to help! Fill out the form below or use the contact information provided, and we'll get back to you as soon as possible.
      </p>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Other Ways to Reach Us</h2>
          <p>Email: <a href="mailto:contact@pawfriends.com">contact@pawfriends.com</a></p>
          <p>Phone: 1-800-123-4567</p>
          <p>Address: 123 Paw Street, Petville, PA 12345</p>
          <h3 className="mt-4">Follow Us</h3>
          <ul className="list-unstyled">
            <li><a href="#" className="text-primary" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="#" className="text-primary" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="#" className="text-primary" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
          <h4 className="mt-4">Our Support Hours</h4>
          <p>Monday - Friday: 9 AM - 5 PM</p>
          <p>Saturday - Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
