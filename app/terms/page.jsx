export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                1. Agreement to Terms
              </h2>
              <p className="leading-relaxed">
                By accessing and using BNG Baby Name Generator ("Service"), you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            {/* Use of Service */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                2. Use of Service
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    2.1 Permitted Use
                  </h3>
                  <p className="leading-relaxed">
                    You may use our Service for personal, non-commercial purposes to generate baby name suggestions. You agree to use the Service in compliance with all applicable laws and regulations.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    2.2 Prohibited Activities
                  </h3>
                  <p className="leading-relaxed mb-2">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Use the Service for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the Service</li>
                    <li>Use automated systems to access the Service excessively</li>
                    <li>Copy, modify, or distribute our content without permission</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                3. Intellectual Property Rights
              </h2>
              <p className="leading-relaxed">
                The Service and its original content, features, and functionality are owned by Sparq IT Services and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. The baby names generated are suggestions based on cultural and linguistic traditions and are not subject to copyright.
              </p>
            </section>

            {/* AI-Generated Content */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                4. AI-Generated Content
              </h2>
              <p className="leading-relaxed">
                Our Service uses artificial intelligence to generate baby name suggestions. While we strive for accuracy and cultural sensitivity, we cannot guarantee the accuracy, completeness, or appropriateness of all suggestions. Users should conduct their own research and verification before making final naming decisions.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                5. Disclaimer of Warranties
              </h2>
              <p className="leading-relaxed">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>The Service will be uninterrupted or error-free</li>
                <li>All name suggestions will be culturally accurate</li>
                <li>The Service will meet your specific requirements</li>
                <li>Any errors will be corrected</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                6. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, Sparq IT Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Service.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                7. User Responsibilities
              </h2>
              <p className="leading-relaxed mb-2">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Verifying the cultural and religious appropriateness of names</li>
                <li>Researching the meanings and origins of names independently</li>
                <li>Making informed decisions about baby names</li>
                <li>Consulting with family, cultural, or religious advisors as needed</li>
                <li>Maintaining the security of your device and browser</li>
              </ul>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                8. Third-Party Links and Services
              </h2>
              <p className="leading-relaxed">
                Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                9. Modifications to Service
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We may also modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                10. Termination
              </h2>
              <p className="leading-relaxed">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                11. Governing Law
              </h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts in Lucknow, India.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                12. Contact Information
              </h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                  Email: info@sparqitservices.com
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Sparq IT Services<br />
                  Lucknow, India
                </p>
              </div>
            </section>

            {/* Acceptance */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <p className="leading-relaxed font-semibold text-gray-800 dark:text-white">
                By using BNG Baby Name Generator, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}