// app/privacy-policy/page.tsx

const PrivacyPolicyPage = () => {
    return (
      <div className="bg-white text-black p-6 max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-yellow-500">Privacy Policy</h1>
  
        <p>
          At <span className="font-semibold">Stone Live Stock</span>, we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or interact with our services.
        </p>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">1. Information We Collect</h2>
          <p className="mt-2">
            We may collect the following types of personal and non-personal information:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Your name, email address, phone number, and shipping address</li>
            <li>Order and payment details</li>
            <li>IP address, browser type, and device information</li>
            <li>Feedback, reviews, and communication history</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">2. How We Use Your Information</h2>
          <p className="mt-2">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Process and fulfill your orders</li>
            <li>Send order updates and promotional emails</li>
            <li>Improve our products, services, and website</li>
            <li>Respond to your queries and support requests</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">3. Data Security</h2>
          <p className="mt-2">
            We implement appropriate security measures to protect your data from unauthorized access, misuse, or disclosure. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">4. Sharing of Information</h2>
          <p className="mt-2">
            We do not sell or rent your personal information. We may share your data with trusted third-party service providers (such as payment gateways and delivery partners) solely for the purpose of fulfilling your orders and improving our service.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">5. Cookies</h2>
          <p className="mt-2">
            Our website uses cookies to enhance user experience and analyze site traffic. You can choose to disable cookies through your browser settings, but some features may not work properly.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">6. Your Rights</h2>
          <p className="mt-2">
            You can:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Request access to the personal information we hold about you.</li>
            <li>Update, correct, or delete your information at any time by contacting us.</li>
            <li>Opt-out of marketing emails by clicking the link in our emails.</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">7. Third-Party Links</h2>
          <p className="mt-2">
            Our site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. Please read their privacy policies before sharing any information.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">8. Changes to This Policy</h2>
          <p className="mt-2">
            We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated Last Updated date.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">9. Contact Us</h2>
          <p className="mt-2">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            Email: <a href="mailto:stonelivestock@gmail.com" className="text-blue-600 underline">stonelivestock@gmail.com</a>
          </p>
          <p className="mt-2">
            Phone: +91-1111111111, +91-2222222222
          </p>
        </section>
  
        <section>
          <p className="mt-2">
            Thank you for trusting <span className="font-semibold">Stone Live Stock</span> – committed to your privacy.
          </p>
        </section>
      </div>
    );
  };
  
  export default PrivacyPolicyPage;
  