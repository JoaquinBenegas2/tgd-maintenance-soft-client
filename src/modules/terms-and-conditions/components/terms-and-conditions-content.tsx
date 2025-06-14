export default function TermsAndConditionsContent() {
  return (
    <>
      <h3 className="text-xl font-bold">Terms and Conditions of Use</h3>

      {/* Introduction */}
      <p className="mt-2">
        Welcome to <span className="font-bold">TGD Maintenance Soft</span> provided by{" "}
        <span className="font-bold">TGD Company</span>. We are pleased to offer you access to the
        Service (as defined below), subject to these terms and conditions (the "Terms of Service")
        and TGD Company's corresponding Privacy Policy. By accessing and using the Service, you
        express your consent, agreement, and understanding of the Terms of Service and the Privacy
        Policy. If you do not agree with the Terms of Service or the Privacy Policy, do not use the
        Service.
      </p>
      <p className="mt-2">
        By using the Service, you accept the current operational modalities described below and
        declare that you understand and accept them, including those that may be enabled in the
        future under the terms and conditions detailed below:
      </p>

      {/* Enabled operations */}
      <h4 className="text-lg font-bold mt-4">1. Enabled operations</h4>
      <p className="mt-2">
        The enabled operations are those available to clients, who must meet the applicable
        requirements at the time to use the Service. These may be expanded or restricted by the
        provider with prior notice of no less than 60 days, and include, among others, but not
        limited to:
      </p>
      <ul className="list-disc list-inside pl-4">
        <li>Recording and managing preventive and corrective maintenance tasks.</li>
        <li>Planning maintenance routes with operator assignments.</li>
        <li>
          Managing equipment, components, elements, sectors, and industrial manufacturers.
        </li>
        <li>Filling and tracking forms based on maintenance types.</li>
        <li>Generating reports and performance indicators (KPIs).</li>
        <li>
          Managing users per plant, including roles such as plant administrator, supervisor, and
          operator.
        </li>
        <li>Sending notifications for specific events (via email).</li>
      </ul>

      {/* Transactions */}
      <h4 className="text-lg font-bold mt-4">2. Transactions</h4>
      <p className="mt-2">
        Requesting a product or service does not imply any obligation to access or use the Service.
        To operate the Service, clients of TGD Company are required to use an internet-connected
        device. The client must provide the registered email and a personal password, which will be
        provided by the application before the first operation.
      </p>
      <p className="mt-2">
        The personal password and any additional authentication mechanisms provided by TGD Company
        are confidential and non-transferable. The user assumes responsibility for disclosing such
        data and releases TGD Company from any resulting liability.
      </p>
      <p className="mt-2">
        TGD Company will never request the complete set of authentication credentials, nor send
        emails requesting confidential information.
      </p>

      {/* Service fees */}
      <h4 className="text-lg font-bold mt-4">3. Service fees</h4>
      <p className="mt-2">
        TGD Company may charge fees for the maintenance and/or use of this Service or any future
        services implemented. The company is expressly authorized to debit the corresponding amounts
        from the client’s accounts, even if overdrawn, and the user gives their explicit consent for
        such actions. Any changes to this policy will be communicated at least 60 days in advance.
      </p>

      {/* Validity */}
      <h4 className="text-lg font-bold mt-4">4. Validity</h4>
      <p className="mt-2">
        The user may terminate the relationship derived from this agreement immediately, without
        further responsibility other than the expenses incurred up to that point.
      </p>
      <p className="mt-2">
        If the client fails to comply with any of the obligations arising from their contractual
        relationship with TGD Company or from these Terms and Conditions, the company may
        immediately terminate the Service without compensation. TGD Company may also terminate the
        relationship, providing at least 60 days’ notice, without further responsibility.
      </p>

      {/* Validity of operations and notifications */}
      <h4 className="text-lg font-bold mt-4">5. Validity of operations and notifications</h4>
      <p className="mt-2">
        The records generated by the application will serve as sufficient proof of transactions made
        through this channel. The user expressly waives the right to challenge the validity of such
        evidence. Notifications issued through this means are considered equivalent to written
        documents for legal or contractual purposes.
      </p>

      {/* Intellectual property */}
      <h4 className="text-lg font-bold mt-4">6. Intellectual property</h4>
      <p className="mt-2">
        The TGD Company software and all its content, including code, design, logos, data
        structures, and features designed for industrial maintenance management, are protected under
        Argentina’s Law 11.723 on intellectual property.
      </p>
      <p className="mt-2">
        Reproducing, modifying, distributing, transmitting, or using any part of the system’s
        content without prior written consent from TGD Company is strictly prohibited.
      </p>

      {/* Privacy of information */}
      <h4 className="text-lg font-bold mt-4">7. Privacy of information</h4>
      <p className="mt-2">
        To use the services offered by TGD Company, users must provide certain personal information.
        Your personal data is processed and stored on servers or magnetic media that uphold high
        standards of security and protection, both physical and technological.
      </p>

      {/* Applicable law */}
      <h3 className="text-lg font-bold mt-4">Applicable law</h3>
      <p className="mt-2">
        This agreement shall be governed by and construed in accordance with the laws of the
        Argentine Republic. In the event of any dispute, the parties submit to the jurisdiction of
        the ordinary courts located in the Autonomous City of Buenos Aires, expressly waiving any
        other jurisdiction.
      </p>
    </>
  );
}
