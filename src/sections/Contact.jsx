import { useState } from 'react';
import emailjs from '@emailjs/browser';
import FadeInSection from '../components/FadeInSection';
import { Github, Linkedin, Facebook, Mail } from '../components/icons/Icons';

const iconMap = { Github, Linkedin, Facebook, Mail };

// Replace these with your actual EmailJS credentials
const SERVICE_ID = 'service_me28x99';
const TEMPLATE_ID = 'template_j6awvjj';
const PUBLIC_KEY = '2VNQuxvlf6by1P39K';

const Contact = ({ contactLinks }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setStatus('sending');

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      )
      .then(() => {
        setStatus('success');

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <div className="space-y-12 pb-12">
      <FadeInSection type="slide-up">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Let's Connect
            </h2>

            <p className="text-zinc-400 text-lg">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            {contactLinks.map((contact, i) => {
              const Icon = iconMap[contact.icon];

              return (
                <a
                  key={i}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={contact.platform}
                  className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                >
                  {Icon && <Icon size={20} />}
                </a>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      <div className="max-w-4xl mx-auto w-full pt-4">
        <FadeInSection type="slide-up" delay={200}>
          <div className="space-y-6 bg-zinc-900/40 p-6 md:p-8 rounded-2xl border border-zinc-800/50 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">
                Email <span className="text-indigo-400">*</span>
              </label>

              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">
                Your Message <span className="text-indigo-400">*</span>
              </label>

              <textarea
                required
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="bg-indigo-500 text-white font-medium py-3 px-8 rounded-xl hover:bg-indigo-400 transition-all active:scale-95 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-sm">
                Message sent successfully!
              </p>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-sm">
                Something went wrong. Try again.
              </p>
            )}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Contact;