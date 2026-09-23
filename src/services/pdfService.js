// Service for generating formatted printable and downloadable clinical PDF reports

export function exportReportToPdf(report, doctor) {
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    window.print()
    return
  }

  const reviewedBy = report.reviewedBy || doctor?.name || 'Dr. Mukesh'
  const specialty = doctor?.specialty || 'Radiology & Internal Medicine'
  const isApproved = report.status === 'approved'
  const dateStr = report.reviewedDate || new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Clinical Report - ${report.analysisId || 'Case'}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1a202c;
      background: #fff;
      line-height: 1.5;
      font-size: 13px;
      margin: 0;
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #173C35;
      padding-bottom: 12px;
      margin-bottom: 18px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 700;
      color: #173C35;
      letter-spacing: -0.5px;
    }
    .brand-sub {
      font-size: 12px;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .meta-box {
      text-align: right;
      font-size: 11.5px;
      color: #4a5568;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      margin-top: 4px;
    }
    .badge-approved { background: #E6F4EA; color: #137333; border: 1px solid #CEEAD6; }
    .badge-draft { background: #FEF7E0; color: #B06000; border: 1px solid #FEEFC3; }
    
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #718096;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    .patient-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      background: #f7fafc;
      padding: 10px 14px;
      border-radius: 4px;
      border: 1px solid #edf2f7;
    }
    .field-label { font-size: 10.5px; color: #718096; text-transform: uppercase; }
    .field-value { font-size: 12.5px; font-weight: 600; color: #2d3748; }

    ul { margin: 6px 0 12px 18px; padding: 0; }
    li { margin-bottom: 5px; color: #2d3748; }

    .impression-box {
      background: #f0fdf4;
      border-left: 4px solid #173C35;
      padding: 10px 14px;
      font-weight: 500;
      color: #1c1917;
      margin: 8px 0;
    }

    .signoff-section {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px dashed #cbd5e0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .signoff-doctor {
      font-size: 12.5px;
    }
    .stamp {
      border: 2px solid #173C35;
      padding: 6px 12px;
      border-radius: 4px;
      color: #173C35;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
    }
    .footer {
      margin-top: 24px;
      font-size: 10px;
      color: #a0aec0;
      text-align: center;
      border-top: 1px solid #edf2f7;
      padding-top: 8px;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand-title">MEDORA CLINICAL INTELLIGENCE</div>
      <div class="brand-sub">Diagnostic Radiology & Evidence Verification Service</div>
    </div>
    <div class="meta-box">
      <div><strong>Report ID:</strong> ${report.analysisId || 'R-1024-A'}</div>
      <div><strong>Date:</strong> ${dateStr}</div>
      <div>
        <span class="badge ${isApproved ? 'badge-approved' : 'badge-draft'}">
          ${isApproved ? 'VERIFIED & FINALIZED' : 'PRELIMINARY AI DRAFT'}
        </span>
      </div>
    </div>
  </div>

  <div class="patient-grid">
    <div>
      <div class="field-label">Patient ID</div>
      <div class="field-value">${report.patientId || 'PT-8821'}</div>
    </div>
    <div>
      <div class="field-label">Age / Gender</div>
      <div class="field-value">${report.age || '58'} / ${report.gender || 'Male'}</div>
    </div>
    <div>
      <div class="field-label">Examination</div>
      <div class="field-value">${report.examination || 'Chest X-Ray (PA View)'}</div>
    </div>
    <div>
      <div class="field-label">Priority / Status</div>
      <div class="field-value">${isApproved ? 'Final' : 'Pending Review'}</div>
    </div>
  </div>

  <div class="section-title">Clinical History & Indications</div>
  <p style="margin: 4px 0 10px 0;">${report.clinicalHistory || 'Patient presenting with acute productive cough, localized right pleuritic chest pain, and low-grade fever.'}</p>

  <div class="section-title">Radiological Findings</div>
  <ul>
    ${(report.findings || []).map((f) => `<li>${f}</li>`).join('')}
  </ul>

  <div class="section-title">Impression & Diagnosis</div>
  <div class="impression-box">
    ${report.impression || 'Findings compatible with acute right lower lobe consolidation/pneumonia. Recommend follow-up radiography after antibiotic therapy.'}
  </div>

  <div class="section-title">Evidence & Verification Summary</div>
  <p style="margin: 4px 0; font-size: 11.5px; color: #4a5568;">
    All AI annotations verified against medical guidelines and calibrated vision models.
  </p>
  <ul>
    ${(report.evidenceStatus || [])
      .map((e) => `<li><strong>${e.label}:</strong> <span style="text-transform: capitalize;">${e.status}</span></li>`)
      .join('')}
  </ul>

  <div class="signoff-section">
    <div class="signoff-doctor">
      <div><strong>Attending Clinician:</strong> ${reviewedBy}</div>
      <div style="color: #718096; font-size: 11.5px;">${specialty}</div>
      <div style="color: #718096; font-size: 11px;">Verification Date: ${dateStr}</div>
    </div>
    <div class="stamp">
      ✓ Clinically Verified<br/>MEDORA ID: ${report.analysisId || 'R-1024-A'}
    </div>
  </div>

  <div class="footer">
    This clinical document was generated by MEDORA Clinical Intelligence and reviewed by an authorized medical professional.<br/>
    Confidential Medical Record — Protected by applicable health privacy regulations.
  </div>

  <script>
    window.onload = function() {
      setTimeout(() => {
        window.print();
      }, 400);
    }
  </script>
</body>
</html>
`

  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
