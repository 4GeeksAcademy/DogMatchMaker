import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Contact = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (store.contactSuccess) {
        setAlertMessage(store.contactSuccess); // Set the success message
        setTimeout(() => {
            setAlertMessage(null); // Clear the alert message
            actions.clearContactStatus(); // Clear the contact status in the store
            navigate('/'); // Redirect after 3 seconds
        }, 3000);
    }
    if (store.contactError) {
        setAlertMessage(store.contactError); // Display error message
    }
  }, [store.contactSuccess, store.contactError, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must contain only alphabetic characters';
    }

    // Email validation
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }

    // Phone validation (optional)
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain 10-15 digits';
    }

    // Subject validation
    if (formData.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long';
    }

    // Message validation
    if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If no errors, proceed with form submission
    window.scrollTo(0,0)
    actions.submitContactForm(formData);
    setErrors({});
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold fs-1">Contact Us</h1>

      {alertMessage && (
        <div className={`alert ${store.contactSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
          {alertMessage}
        </div>
      )}

      <p className="text-center mb-4 fs-5">
        Have questions, feedback, or just want to say hello? We're here to help! Fill out the form below or use the contact information provided, and we'll get back to you as soon as possible.
      </p>

      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Other ways to reach us</h2>
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
              {errors.name && <div className="text-danger">{errors.name}</div>}
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
              {errors.email && <div className="text-danger">{errors.email}</div>}
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
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
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
              {errors.subject && <div className="text-danger">{errors.subject}</div>}
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
              {errors.message && <div className="text-danger">{errors.message}</div>}
            </div>
            <div className= "justify-content-end">
              <button type="submit" className="btn btn-primary d-flex ms-auto">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
