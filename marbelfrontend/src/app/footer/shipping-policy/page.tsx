
const ShippingPage = () => {
    return (
      <div className="bg-white text-black p-6 m-4 max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-yellow-500">Shipping & Delivery</h1>
        <p>
          At <span className="font-semibold">Stone Live Stock</span>, we are committed to delivering our Marbels products to you in the safest and most efficient manner. We aim to ensure that your experience with us is seamless from purchase to doorstep.
        </p>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">Delivery Time</h2>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Orders within India:</strong> 3–7 business days</li>
            <li><strong>International Orders:</strong> 7–15 business days (may vary based on location and customs)</li>
          </ul>
          <p className="text-sm mt-2 italic text-gray-600">
            Note: Delivery timelines may be affected during holidays, festivals, or unforeseen logistical delays.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">Shipping Charges</h2>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>Free shipping</strong> on orders above ₹999 (India only)</li>
            <li>Standard shipping charges will apply on orders below ₹999</li>
            <li>International shipping charges are calculated at checkout based on weight and destination</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">Order Processing</h2>
          <p className="mt-2">
            Orders are processed within 1–2 business days after successful payment. Once dispatched, a tracking ID will be shared via email or SMS to help you monitor your shipment.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">Delivery Partners</h2>
          <p className="mt-2">
            We work with trusted courier partners to ensure your orders reach you safely and on time. Our logistics partners include Blue Dart, Delhivery, DTDC, and India Post for domestic shipments.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">Packaging</h2>
          <p className="mt-2">
            All our products are packed with utmost care using eco-friendly and secure packaging to preserve the quality of our Marble Products.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">Shipping Restrictions</h2>
          <p className="mt-2">
            Currently, we do not ship to PO boxes or military addresses. For international shipping, please check if Marbel products are allowed in your country before placing an order.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-yellow-500">Need Help?</h2>
          <p className="mt-2">
            If you have any questions about shipping or your delivery, feel free to reach out to us at <a href="mailto:stonelivestock@gmail.com" className="text-blue-600 underline">stonelivestock@gmail.com</a> or call us at +91-1111111111, +91-22222222222.
          </p>
          <p className="mt-2">
            Thank you for choosing Stone Live Stock — your trusted source for authentic Stone Products.
          </p>
        </section>
      </div>
    );
  };
  
  export default ShippingPage;
  