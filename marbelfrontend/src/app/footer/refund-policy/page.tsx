  // app/refund-policy/page.tsx

  const RefundPolicyPage = () => {
      return (
        <div className="bg-white text-black p-6 max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-yellow-500">Cancellation & Refund Policy</h1>
    
          <p>
            At <span className="font-semibold">Stone Live Stock</span>, customer satisfaction is our top priority. We understand that sometimes plans change, and you may need to cancel or return an order. Please read our cancellation and refund policy below to understand how we can help.
          </p>
    
          <section>
            <h2 className="text-2xl font-semibold text-yellow-500">Order Cancellation</h2>
            <p className="mt-2">
              Orders can be cancelled <strong>within 12 hours</strong> of placing them, provided they have not yet been dispatched.
            </p>
            <p className="mt-2">
              To request a cancellation, please contact us immediately at <a href="mailto:stonelivestock@gmail.com" className="text-blue-600 underline">stonelivestock@gmail.com</a> or call +91-111111111, +91-2222222222.
            </p>
            <p className="mt-2">
              Once the order is shipped, it cannot be cancelled.
            </p>
          </section>
    
          <section>
            <h2 className="text-2xl font-semibold text-yellow-500">Refund Eligibility</h2>
            <p className="mt-2">We offer refunds or replacements under the following conditions:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>You received a <strong>damaged, defective, or wrong product</strong>.</li>
              <li>The item is returned in its original packaging and unused <strong>within 7 days</strong> of delivery.</li>
            </ul>
          </section>
    
          <section>
            <h2 className="text-2xl font-semibold text-yellow-500">Non-Refundable Items</h2>
            <p className="mt-2">Due to the nature of our products, we do not accept returns or provide refunds for:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Damaged Stone products</li>
              <li>Items purchased during sales or promotions</li>
            </ul>
          </section>
    
          <section>
            <h2 className="text-2xl font-semibold text-yellow-500">Refund Process</h2>
            <p className="mt-2">
              Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund.
            </p>
            <p className="mt-2">
              If approved, your refund will be processed to your original payment method <strong>within 7–10 business days</strong>.
            </p>
            <p className="mt-2">Shipping charges are non-refundable unless the return is due to our error.</p>
          </section>
    
          <section>
            <h2 className="text-2xl font-semibold text-yellow-500">How to Request a Refund</h2>
            <p className="mt-2">
              To initiate a return or refund, please email us at <a href="mailto:stonelivestock@gmail.com" className="text-blue-600 underline">stonelivestock@gmail.com</a> with your order number, reason for return, and photos (if applicable).
            </p>
          </section>
    
          <section>
            <h2 className="text-2xl font-semibold text-yellow-500">Need Help?</h2>
            <p className="mt-2">
              For any questions regarding your order, returns, or refunds, feel free to contact our support team. We are here to assist you with care and integrity.
            </p>
            <p className="mt-2">
              Thank you for choosing <span className="font-semibold">Stone Live Stock</span> — your trusted partner in Stone Products.
            </p>
          </section>
        </div>
      );
    };
    
    export default RefundPolicyPage;
    