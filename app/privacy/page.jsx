export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: December 8, 2025
          </p>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            {/* 1. Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p className="leading-relaxed mb-3">
                BNG Baby Names (<strong>&quot;BNG&quot;</strong>, <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong>, or <strong>&quot;our&quot;</strong>)
                operates the website{' '}
                <span className="font-mono text-sm">
                  https://babynamegenerator.xyz
                </span>{' '}
                (the <strong>&quot;Site&quot;</strong>).
                This Privacy Policy explains how we collect, use, and protect information
                when you use our AI-powered baby name generator, domain search,
                and baby shop pages.
              </p>
              <p className="leading-relaxed">
                By using the Site, you agree to the collection and use of information
                in accordance with this Privacy Policy. If you do not agree, please
                do not use the Site.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                2. Information We Collect
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    2.1 Information you provide directly
                  </h3>
                  <p className="leading-relaxed">
                    When you use BNG, you may voluntarily provide:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Preferences for gender, religion/culture, and naming style</li>
                    <li>Names you mark as favourites</li>
                    <li>Search queries you type into the generator or search pages</li>
                    <li>
                      Your email address if you choose to subscribe to our updates
                      (newsletter / feature announcements)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    2.2 Information collected automatically
                  </h3>
                  <p className="leading-relaxed">
                    When you visit the Site, certain information is collected
                    automatically by our analytics and hosting providers, such as:
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>IP address and approximate location (country / city)</li>
                    <li>Browser type, language, and device information</li>
                    <li>Pages viewed, buttons clicked, and time spent on the Site</li>
                    <li>Referring URL (how you arrived at our Site)</li>
                    <li>
                      Cookies and similar technologies set by us or third-party services
                      (for analytics and measurement)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    2.3 Email subscription data
                  </h3>
                  <p className="leading-relaxed">
                    If you subscribe using the footer form, we store your email address
                    in a private Google Sheet managed through Google Apps Script.
                    Only authorised administrators can access this sheet.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-2">
                We use the information we collect for purposes such as:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Generating name suggestions based on your selected filters</li>
                <li>Allowing you to save, view, and manage your favourite names</li>
                <li>Improving the Site, user experience, and our features</li>
                <li>Monitoring usage and performance, and detecting technical issues</li>
                <li>
                  Sending occasional emails about new features and updates to
                  subscribers (you can unsubscribe at any time)
                </li>
                <li>
                  Measuring clicks and performance of affiliate links (e.g. Amazon,
                  Namecheap) so we can earn commissions at no extra cost to you
                </li>
              </ul>
            </section>

            {/* 4. Local Storage & Data Storage */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                4. Local storage and data retention
              </h2>
              <p className="leading-relaxed mb-3">
                Your baby name favourites and some preferences are stored locally in
                your browser using <strong>localStorage</strong>. This means:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                <li>
                  We do <strong>not</strong> store your favourites in our own database.
                </li>
                <li>
                  Clearing your browser data or using a different device/browser may
                  remove or not show your saved favourites.
                </li>
              </ul>
              <p className="leading-relaxed">
                Email addresses collected through the subscribe form are stored in
                a private Google Sheet for as long as we continue to send updates or
                until you request deletion / unsubscribe.
              </p>
            </section>

            {/* 5. Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                5. Third-party services and affiliates
              </h2>
              <div className="space-y-3 leading-relaxed">
                <p>
                  We rely on several third-party services to operate BNG. These
                  providers may collect or process data in accordance with their own
                  privacy policies.
                </p>

                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <strong>Analytics &amp; measurement:</strong> We use tools such as
                    Google Tag Manager and Google Analytics (or similar) to understand
                    how the Site is used and to improve it.
                  </li>
                  <li>
                    <strong>AI name generation:</strong> Our name suggestions may be
                    powered by external AI APIs (for example, Groq / OpenAI or similar
                    providers). Your prompts (filters and input text) may be processed
                    by these services to generate results.
                  </li>
                  <li>
                    <strong>Text-to-speech / pronunciation:</strong> We use
                    ElevenLabs and/or browser speech synthesis to generate name
                    pronunciation audio. Requests to ElevenLabs contain the name text
                    and may be logged by ElevenLabs according to their policies.
                  </li>
                  <li>
                    <strong>Newsletter storage:</strong> Email addresses are stored in
                    Google Sheets via Google Apps Script.
                  </li>
                  <li>
                    <strong>Affiliate programmes:</strong> Some links on the Site are
                    affiliate links, including but not limited to Amazon Associates and
                    Namecheap. When you click these links, those services may set
                    cookies or track your activity to attribute commissions to us.
                  </li>
                </ul>

                <p>
                  We do not sell your personal information. However, third parties may
                  independently collect data when you interact with their services or
                  links on our Site.
                </p>
              </div>
            </section>

            {/* 6. Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                6. Cookies and similar technologies
              </h2>
              <p className="leading-relaxed mb-3">
                We use cookies, localStorage, and similar technologies to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                <li>Remember your preferences and favourites</li>
                <li>Measure traffic and usage patterns</li>
                <li>Track affiliate link clicks and conversions</li>
              </ul>
              <p className="leading-relaxed">
                You can usually control cookies through your browser settings. If you
                disable cookies, some features of the Site may not function properly.
              </p>
            </section>

            {/* 7. Your Rights & Choices */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                7. Your rights and choices
              </h2>
              <p className="leading-relaxed mb-2">
                Depending on your location, you may have rights under data protection laws
                (such as the GDPR). In general, you can:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                <li>View and delete your favourites in the app at any time</li>
                <li>Clear your browser data to remove localStorage entries</li>
                <li>
                  Unsubscribe from emails using the link in our messages or by contacting us
                </li>
                <li>
                  Request that we delete your email address from our subscriber list
                </li>
              </ul>
              <p className="leading-relaxed">
                If you wish to exercise any rights or have privacy-related questions, you
                can contact us using the details in the &quot;Contact&quot; section below.
              </p>
            </section>

            {/* 8. Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                8. Children&apos;s privacy
              </h2>
              <p className="leading-relaxed">
                Our Site is designed for adults (such as parents and guardians) who are
                choosing baby names. It is not intended for children under 13 years of age,
                and we do not knowingly collect personal information from children. If you
                believe that a child has provided us with personal information, please
                contact us so we can delete it.
              </p>
            </section>

            {/* 9. International transfers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                9. International data transfers
              </h2>
              <p className="leading-relaxed">
                Our Site and third-party providers may process and store information in
                countries other than your own, including the United States and European
                Union member states. By using the Site, you acknowledge that your
                information may be transferred to and processed in these locations.
              </p>
            </section>

            {/* 10. Changes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                10. Changes to this Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in
                our practices, technologies, or legal requirements. When we do, we will
                update the &quot;Last updated&quot; date at the top of this page. Your
                continued use of the Site after any changes constitutes your acceptance of
                the updated policy.
              </p>
            </section>

            {/* 11. Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                11. Contact us
              </h2>
              <p className="leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy
                Policy or how we handle your data, please contact us:
              </p>
              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                  Email: hello@babynamegenerator.xyz
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                  Please include &quot;Privacy&quot; in the subject line so we can route
                  your request correctly.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
