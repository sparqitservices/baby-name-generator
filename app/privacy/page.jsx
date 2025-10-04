export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                Welcome to BNG Baby Name Generator ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our baby name generation service.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    2.1 Information You Provide
                  </h3>
                  <p className="leading-relaxed">
                    When you use our service, we may collect the following information:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Gender preferences for baby names</li>
                    <li>Religious or cultural preferences</li>
                    <li>Style preferences (modern, traditional, unique)</li>
                    <li>Names you mark as favorites</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    2.2 Automatically Collected Information
                  </h3>
                  <p className="leading-relaxed">
                    We automatically collect certain information when you visit our website:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>IP address</li>
                    <li>Usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-2">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>To generate personalized baby name suggestions</li>
                <li>To save and manage your favorite names</li>
                <li>To improve our service and user experience</li>
                <li>To analyze usage patterns and trends</li>
                <li>To maintain and optimize our website performance</li>
                <li>To communicate with you about service updates</li>
              </ul>
            </section>

            {/* Data Storage */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                4. Data Storage and Security
              </h2>
              <p className="leading-relaxed">
                Your favorite names and preferences are stored locally in your browser using localStorage. We do not store this information on our servers. We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                5. Third-Party Services
              </h2>
              <p className="leading-relaxed">
                We use third-party AI services (Groq API) to generate baby name suggestions. These services may have their own privacy policies governing the use of your information. We recommend reviewing their privacy policies for more information.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences. However, disabling cookies may limit certain features of our service.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                7. Your Rights
              </h2>
              <p className="leading-relaxed mb-2">
                You have the following rights regarding your information:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Access your stored favorites at any time</li>
                <li>Delete your favorites from localStorage</li>
                <li>Clear your browser data to remove all stored information</li>
                <li>Opt-out of analytics tracking</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                8. Children's Privacy
              </h2>
              <p className="leading-relaxed">
                Our service is intended for adults who are expecting or planning for a baby. We do not knowingly collect personal information from children under 13 years of age.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                10. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
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
          </div>
        </div>
      </div>
    </div>
  );
}