
import React, { useEffect } from 'react';

type LegalProps = {
  type: 'privacy' | 'terms' | 'refund' | 'shipping';
};

const Legal: React.FC<LegalProps> = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          content: (
            <div className="space-y-6 text-[#9AA4B2]">
              <p>The organizing committee of JASICON 2026 is committed to protecting the privacy and personal information of all delegates, participants, sponsors, and visitors using the official conference website. This Privacy Policy outlines how information is collected, used, and protected when individuals register for or interact with the conference website.</p>

              <div>
                <h3 className="text-white font-bold mb-2">1. Information We Collect</h3>
                <p>During the registration or website interaction process, we may collect personal information including but not limited to the participant’s name, email address, phone number, professional details, institutional affiliation, and payment-related information. This information is collected solely for the purpose of facilitating conference registration, communication, and event management.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">2. Use of Information</h3>
                <p>The information collected from participants may be used for the following purposes:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Processing and confirming conference registrations</li>
                  <li>Communicating important updates related to the conference</li>
                  <li>Sending registration confirmations, payment receipts, and event-related information</li>
                  <li>Managing conference logistics such as delegate lists, badges, and participation records</li>
                  <li>Improving the functionality and experience of the conference website</li>
                </ul>
                <p className="mt-2">Personal information will only be used for legitimate administrative and operational purposes related to JASICON 2026.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">3. Payment Information</h3>
                <p>All payments made through the conference website are processed via authorized and secure payment gateways. The organizing committee does not store or have direct access to sensitive financial information such as credit card numbers, debit card details, or banking credentials. Payment data is handled securely by the payment service provider in accordance with their security policies.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">4. Data Protection</h3>
                <p>The organizing committee takes reasonable administrative and technical measures to safeguard the personal information provided by participants against unauthorized access, misuse, or disclosure. While we strive to use commercially acceptable methods to protect data, no method of transmission over the internet is completely secure.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">5. Sharing of Information</h3>
                <p>Personal information collected through the website will not be sold, rented, or shared with third parties for marketing or commercial purposes. Information may only be shared with authorized service providers or partners who assist in organizing the conference, such as payment processors or technical service providers, strictly for operational purposes.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">6. Cookies and Website Usage</h3>
                <p>The conference website may use basic cookies or similar technologies to enhance user experience and improve website performance. These cookies help in understanding website usage patterns but do not collect sensitive personal information.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">7. Updates to Privacy Policy</h3>
                <p>The organizing committee reserves the right to update or modify this Privacy Policy if necessary for administrative, operational, or legal reasons. Any changes will be published on the official conference website.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">8. Consent</h3>
                <p>By accessing the website or registering for JASICON 2026, participants acknowledge that they have read, understood, and consent to the collection and use of their personal information in accordance with this Privacy Policy.</p>
              </div>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms and Conditions',
          content: (
            <div className="space-y-6 text-[#9AA4B2]">
              <p>Welcome to the official website of the 25th JASICON 2026 Conference. By accessing this website, registering for the conference, or making any payment through the platform, you agree to comply with and be bound by the following Terms and Conditions. These terms govern the use of the website and participation in the conference organized by the JASICON 2026 Organizing Committee.</p>

              <div>
                <h3 className="text-white font-bold mb-2">1. Registration and Participation</h3>
                <p>All participants are required to provide accurate, complete, and up-to-date information during the registration process. The organizing committee reserves the right to verify registration details and may reject or cancel any registration found to contain incorrect, misleading, or incomplete information. Participation in the conference is subject to successful payment confirmation and compliance with the rules set forth by the organizers.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">2. Payment Terms</h3>
                <p>All payments made for conference registration, workshops, sponsorships, or other services must be completed through the authorized payment channels available on the official website. Once the payment is successfully processed, the registration will be considered confirmed. The organizing committee shall not be responsible for any transaction failure due to banking issues, payment gateway problems, or incorrect information provided by the participant.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">3. Cancellation and Refund Policy</h3>
                <p>All registrations made for JASICON 2026 are considered final. As stated in the official cancellation policy, no cancellation requests or refunds will be entertained once the registration payment has been completed. Participants are advised to carefully review their availability before confirming their registration.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">4. Use of Website</h3>
                <p>The content available on this website, including text, images, logos, design, and conference materials, is the intellectual property of the JASICON 2026 Organizing Committee and may not be copied, reproduced, distributed, or used for commercial purposes without prior written permission. Unauthorized use of any content may result in legal action.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">5. Changes to Conference Program</h3>
                <p>While the organizing committee will make every effort to conduct the conference as planned, the organizers reserve the right to modify the conference schedule, speakers, sessions, venue arrangements, or other program details if required due to unforeseen circumstances. Such changes will not constitute grounds for refunds or compensation.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">6. Limitation of Liability</h3>
                <p>The organizers of JASICON 2026 shall not be held liable for any loss, injury, damage, delay, or inconvenience caused to participants due to circumstances beyond the control of the organizing committee. This includes but is not limited to natural disasters, government restrictions, travel disruptions, technical failures, or other unforeseen events.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">7. Code of Conduct</h3>
                <p>All participants are expected to maintain professional and respectful behavior throughout the conference. The organizing committee reserves the right to deny entry or remove any participant from the conference if their conduct is deemed inappropriate, disruptive, or in violation of professional ethics.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">8. Privacy</h3>
                <p>Any personal information collected during the registration process will be used solely for conference administration and communication purposes. The organizing committee will take reasonable measures to protect participant data in accordance with applicable regulations.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">9. Amendments to Terms</h3>
                <p>The organizing committee reserves the right to update or modify these Terms and Conditions at any time without prior notice. Any changes will be posted on the official conference website and will take effect immediately upon publication.</p>
              </div>

              <div>
                <h3 className="text-white font-bold mb-2">10. Acceptance of Terms</h3>
                <p>By registering for the conference or using the website, participants acknowledge that they have read, understood, and agreed to abide by these Terms and Conditions as established by the organizers of JASICON 2026.</p>
              </div>
            </div>
          )
        };
      case 'refund':
        return {
          title: 'Cancellation and Refund Policy',
          content: (
            <div className="space-y-6 text-[#9AA4B2]">
              <p>All registrations for the 25th JASICON 2026 Conference are considered final. Once a participant has successfully completed the registration process and payment has been received, no cancellation requests or refund claims will be entertained under any circumstances. The organizing committee incurs significant administrative, logistical, and operational commitments in advance to ensure the smooth conduct of the conference, including venue arrangements, academic sessions, hospitality, and related services. Therefore, participants are kindly advised to carefully review their schedules and ensure their availability before proceeding with registration. In the event that a registered delegate is unable to attend the conference for any reason, the registration fee shall remain non-refundable and non-transferable. By completing the registration process, participants acknowledge and agree to abide by this policy as set forth by the conference organizers.</p>
            </div>
          )
        };
      case 'shipping':
        return {
          title: 'Shipping and Delivery Policy',
          content: (
            <div className="space-y-6 text-[#9AA4B2]">
              <p>For registrations made for the 25th JASICON 2026 Conference, all services provided are primarily digital in nature, and therefore no physical shipping of products is involved in most cases. Once a participant successfully completes the registration process and the payment is confirmed, a confirmation email or digital acknowledgment will be sent to the registered email address provided during registration. This confirmation typically contains important details such as registration confirmation, receipt of payment, and further instructions related to the conference.</p>
              <p>Participants are advised to ensure that the email address and contact details provided during registration are accurate and active to avoid any delays in receiving communication from the organizing committee. In case of any issues related to confirmation emails or registration details, participants may contact the conference support team for assistance.</p>
              <p>In certain cases, if conference materials, kits, badges, or other items are required, they will typically be distributed at the conference venue during the event registration or check-in process. The organizing committee does not guarantee postal or courier delivery of any physical items unless explicitly stated. Any distribution of conference-related materials will be managed directly at the venue for the convenience of registered delegates.</p>
              <p>The organizing committee of JASICON 2026 reserves the right to modify or update this shipping and delivery policy if required for administrative or operational purposes.</p>
            </div>
          )
        };
    }
  };

  const { title, content } = getContent();

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-[#121826]/80 backdrop-blur-md border border-[#1F2937] rounded-2xl p-8 md:p-12 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold serif text-[#E6EAF0] mb-8 border-b border-[#1F2937] pb-6">
          {title}
        </h1>
        <div className="prose prose-invert max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Legal;
