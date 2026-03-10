/**
 * ============================================
 * ScholarShield - QR Code Payment Validator
 * UPI fraud detection for scholarship scams
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    initQrScanner();
});

/**
 * ========== VERIFIED GOVERNMENT UPI IDs ==========
 */
const VERIFIED_UPI_PATTERNS = [
    '@sbi',
    '@pnb',
    '@indianbank',
    '@unionbank',
    '@boi',
    '@canara',
    '@centralbankof',
    '.ifsc.npci'  // Government payment gateway pattern
];

/**
 * ========== SUSPICIOUS UPI PATTERNS ==========
 */
const SUSPICIOUS_UPI_PATTERNS = [
    '@paytm',
    '@phonepe',
    '@googlepay',
    '@okaxis',
    '@ybl',
    '@axl',
    'personal',
    'private',
    'urgent',
    'scholarship',
    'fees',
    'registration'
];

/**
 * ========== INITIALIZE QR SCANNER ==========
 */
function initQrScanner() {
    const qrInput = document.getElementById('qr-input');
    const qrDropZone = document.getElementById('qr-drop-zone');
    const qrPreview = document.getElementById('qr-preview');
    const qrPreviewImg = document.getElementById('qr-preview-img');
    const removeQrBtn = document.getElementById('remove-qr');
    const scanQrBtn = document.getElementById('scan-qr-btn');
    const resultsContainer = document.getElementById('qr-results');
    
    let currentImage = null;
    
    // Click to upload
    if (qrDropZone) {
        qrDropZone.addEventListener('click', () => qrInput.click());
    }
    
    // Drag and drop handlers
    if (qrDropZone) {
        qrDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            qrDropZone.style.borderColor = 'var(--primary-blue)';
            qrDropZone.style.background = 'rgba(37, 99, 235, 0.05)';
        });
        
        qrDropZone.addEventListener('dragleave', () => {
            qrDropZone.style.borderColor = '';
            qrDropZone.style.background = '';
        });
        
        qrDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            qrDropZone.style.borderColor = '';
            qrDropZone.style.background = '';
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleImageUpload(file);
            } else {
                ScholarShield.showToast('Please upload an image file', 'error');
            }
        });
    }
    
    // File input change
    if (qrInput) {
        qrInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleImageUpload(file);
            }
        });
    }
    
    // Remove QR image
    if (removeQrBtn) {
        removeQrBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetQrScanner();
        });
    }
    
    // Scan QR button
    if (scanQrBtn) {
        scanQrBtn.addEventListener('click', () => {
            if (currentImage) {
                analyzeQrCode(currentImage, resultsContainer);
            }
        });
    }
    
    /**
     * Handle image upload
     */
    function handleImageUpload(file) {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            ScholarShield.showToast('Image too large. Max 5MB allowed', 'error');
            return;
        }
        
        // Validate file type
        if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
            ScholarShield.showToast('Unsupported format. Use JPG, PNG, or WEBP', 'error');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            currentImage = e.target.result;
            
            // Show preview
            qrPreviewImg.src = currentImage;
            qrDropZone.classList.add('hidden');
            qrPreview.classList.remove('hidden');
            scanQrBtn.classList.remove('hidden');
            resultsContainer.classList.add('hidden');
            
            ScholarShield.showToast('QR image loaded successfully', 'success');
        };
        
        reader.onerror = () => {
            ScholarShield.showToast('Error reading image file', 'error');
        };
        
        reader.readAsDataURL(file);
    }
    
    /**
     * Reset scanner state
     */
    function resetQrScanner() {
        currentImage = null;
        qrInput.value = '';
        qrPreviewImg.src = '';
        qrDropZone.classList.remove('hidden');
        qrPreview.classList.add('hidden');
        scanQrBtn.classList.add('hidden');
        resultsContainer.classList.add('hidden');
    }
}

/**
 * ========== ANALYZE QR CODE ==========
 */
function analyzeQrCode(imageData, resultsContainer) {
    // Show loading state
    resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-blue);"></i>
            <p style="margin-top: 1rem; color: var(--gray-600);">Decoding QR code...</p>
        </div>
    `;
    resultsContainer.classList.remove('hidden');
    
    // Create image element for jsQR
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Use jsQR library to decode
        if (typeof jsQR !== 'undefined') {
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            
            if (code) {
                const upiData = parseUpiString(code.data);
                if (upiData) {
                    const analysis = analyzeUpiData(upiData);
                    displayQrResults(resultsContainer, analysis, upiData);
                } else {
                    displayQrResults(resultsContainer, {
                        threatLevel: 'warning',
                        title: '⚠️ Not a UPI QR Code',
                        issues: ['This QR code does not contain UPI payment information'],
                        recommendations: [
                            'Verify this is the correct QR code for scholarship payment',
                            'Government scholarships rarely require QR code payments',
                            'Contact your institution for official payment methods'
                        ]
                    });
                }
            } else {
                displayQrResults(resultsContainer, {
                    threatLevel: 'warning',
                    title: '❌ QR Code Not Detected',
                    issues: [
                        'Unable to decode QR code from image',
                        'Image quality may be too low',
                        'QR code may be damaged or incomplete'
                    ],
                    recommendations: [
                        'Try uploading a clearer image',
                        'Ensure QR code is fully visible',
                        'Use better lighting when capturing image'
                    ]
                });
            }
        } else {
            ScholarShield.showToast('QR scanner library not loaded', 'error');
        }
    };
    
    img.src = imageData;
}

/**
 * ========== PARSE UPI STRING ==========
 */
function parseUpiString(qrData) {
    // UPI format: upi://pay?pa=merchant@bank&pn=Name&am=100&cu=INR
    
    if (!qrData.toLowerCase().startsWith('upi://')) {
        return null;
    }
    
    const upiData = {
        rawData: qrData,
        payeeAddress: null,
        payeeName: null,
        amount: null,
        currency: null,
        transactionNote: null,
        merchantCode: null
    };
    
    try {
        const url = new URL(qrData);
        const params = new URLSearchParams(url.search);
        
        upiData.payeeAddress = params.get('pa') || params.get('payee');
        upiData.payeeName = params.get('pn') || params.get('payeeName');
        upiData.amount = params.get('am') || params.get('amount');
        upiData.currency = params.get('cu') || params.get('currency') || 'INR';
        upiData.transactionNote = params.get('tn') || params.get('note');
        upiData.merchantCode = params.get('mc') || params.get('merchantCode');
        
        return upiData;
    } catch (error) {
        console.error('Error parsing UPI data:', error);
        return null;
    }
}

/**
 * ========== ANALYZE UPI DATA ==========
 */
function analyzeUpiData(upiData) {
    const issues = [];
    const warnings = [];
    const goodSigns = [];
    let threatScore = 0;
    
    const payeeAddress = (upiData.payeeAddress || '').toLowerCase();
    const payeeName = (upiData.payeeName || '').toLowerCase();
    const transactionNote = (upiData.transactionNote || '').toLowerCase();
    
    // 1. Check if UPI ID uses verified government bank
    const isVerifiedBank = VERIFIED_UPI_PATTERNS.some(pattern => 
        payeeAddress.includes(pattern)
    );
    
    if (isVerifiedBank) {
        goodSigns.push('✓ Payment directed to government-verified bank');
    } else {
        issues.push('🚨 UPI ID not using official government bank');
        threatScore += 30;
    }
    
    // 2. Check for private payment apps
    const usesPrivateApp = SUSPICIOUS_UPI_PATTERNS.some(pattern =>
        payeeAddress.includes(pattern)
    );
    
    if (usesPrivateApp) {
        issues.push('🚨 Using private payment app (Paytm/PhonePe/GooglePay)');
        issues.push('⚠️ Government scholarships use direct bank transfers, not wallet apps');
        threatScore += 40;
    }
    
    // 3. Check payee name for red flags
    const suspiciousNames = ['personal', 'private', 'urgent', 'scholarship', 'student', 'admission'];
    const hasSuspiciousName = suspiciousNames.some(keyword => 
        payeeName.includes(keyword)
    );
    
    if (hasSuspiciousName) {
        warnings.push('⚠️ Payee name contains suspicious keywords');
        threatScore += 20;
    }
    
    // 4. Check if merchant code exists (legitimate businesses have this)
    if (!upiData.merchantCode) {
        warnings.push('⚠️ No merchant code found (common in personal accounts)');
        threatScore += 15;
    } else {
        goodSigns.push('✓ Merchant code present');
    }
    
    // 5. Amount validation
    if (upiData.amount) {
        const amount = parseFloat(upiData.amount);
        
        if (amount > 0) {
            warnings.push(`💰 Pre-filled amount: ₹${amount}`);
            warnings.push('⚠️ Legitimate government portals do not use QR codes with fixed amounts');
            threatScore += 25;
        }
        
        // Common scam amounts
        if ([99, 100, 199, 299, 499, 999].includes(amount)) {
            issues.push('🚨 Amount matches common scholarship scam patterns');
            threatScore += 30;
        }
    }
    
    // 6. Transaction note analysis
    const scamKeywords = ['fees', 'registration', 'processing', 'verification', 'urgent', 'confirm'];
    const hasScamKeyword = scamKeywords.some(keyword => 
        transactionNote.includes(keyword)
    );
    
    if (hasScamKeyword) {
        issues.push('🚨 Transaction note contains scam-related keywords');
        threatScore += 25;
    }
    
    // 7. Check for government payment gateway patterns
    if (payeeAddress.includes('.npci') || payeeAddress.includes('bharatqr')) {
        goodSigns.push('✓ Using NPCI-compliant payment gateway');
        threatScore = Math.max(0, threatScore - 20);
    }
    
    // 8. Personal account detection (number-based UPI IDs)
    if (/^\d{10}@/.test(payeeAddress)) {
        warnings.push('⚠️ Appears to be personal mobile-based UPI ID');
        threatScore += 20;
    }
    
    // Determine threat level
    let threatLevel, title;
    
    if (threatScore >= 60) {
        threatLevel = 'danger';
        title = '🚨 HIGH RISK - Likely Payment Scam';
    } else if (threatScore >= 30) {
        threatLevel = 'warning';
        title = '⚠️ SUSPICIOUS - Verify Before Payment';
    } else if (threatScore > 0) {
        threatLevel = 'warning';
        title = '⚠️ CAUTION - Some Red Flags Detected';
    } else {
        threatLevel = 'safe';
        title = '✅ No Major Issues Detected';
    }
    
    return {
        threatLevel,
        title,
        issues,
        warnings,
        goodSigns,
        threatScore
    };
}

/**
 * ========== DISPLAY QR RESULTS ==========
 */
function displayQrResults(container, result, upiData = null) {
    const icons = {
        safe: '✅',
        warning: '⚠️',
        danger: '🚨'
    };
    
    const colors = {
        safe: 'var(--success-green)',
        warning: 'var(--warning-orange)',
        danger: 'var(--danger-red)'
    };
    
    let html = `
        <div class="results-header">
            <div class="threat-level" style="background: ${colors[result.threatLevel]}; color: white;">
                ${icons[result.threatLevel]}
            </div>
            <h4 class="result-title" style="color: ${colors[result.threatLevel]};">
                ${result.title}
            </h4>
        </div>
        <div class="results-body">
    `;
    
    // Display threat score
    if (result.threatScore !== undefined) {
        html += `
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: var(--white); border-radius: var(--radius-md);">
                <strong>Fraud Risk Score: ${result.threatScore}/100</strong>
                <div style="height: 8px; background: var(--gray-200); border-radius: 4px; margin-top: 0.5rem; overflow: hidden;">
                    <div style="width: ${result.threatScore}%; height: 100%; background: ${colors[result.threatLevel]}; transition: width 0.5s ease;"></div>
                </div>
            </div>
        `;
    }
    
    // Display UPI details if available
    if (upiData) {
        html += `
            <div style="margin-bottom: 1rem; padding: 1rem; background: var(--gray-50); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.875rem;">
                <strong style="font-family: var(--font-primary);">📋 Payment Details Extracted:</strong>
                <div style="margin-top: 0.75rem; line-height: 2;">
        `;
        
        if (upiData.payeeAddress) {
            html += `<div><strong>UPI ID:</strong> ${upiData.payeeAddress}</div>`;
        }
        if (upiData.payeeName) {
            html += `<div><strong>Payee Name:</strong> ${upiData.payeeName}</div>`;
        }
        if (upiData.amount) {
            html += `<div><strong>Amount:</strong> ₹${upiData.amount} ${upiData.currency}</div>`;
        }
        if (upiData.transactionNote) {
            html += `<div><strong>Note:</strong> ${upiData.transactionNote}</div>`;
        }
        if (upiData.merchantCode) {
            html += `<div><strong>Merchant Code:</strong> ${upiData.merchantCode}</div>`;
        }
        
        html += `</div></div>`;
    }
    
    // Display issues
    if (result.issues && result.issues.length > 0) {
        html += `<div style="margin-bottom: 1rem;"><strong style="color: var(--danger-red);">🚨 Critical Issues:</strong><ul style="margin-top: 0.5rem; padding-left: 1.5rem;">`;
        result.issues.forEach(issue => {
            html += `<li style="margin-bottom: 0.5rem; color: var(--gray-700);">${issue}</li>`;
        });
        html += `</ul></div>`;
    }
    
    // Display warnings
    if (result.warnings && result.warnings.length > 0) {
        html += `<div style="margin-bottom: 1rem;"><strong style="color: var(--warning-orange);">⚠️ Warnings:</strong><ul style="margin-top: 0.5rem; padding-left: 1.5rem;">`;
        result.warnings.forEach(warning => {
            html += `<li style="margin-bottom: 0.5rem; color: var(--gray-700);">${warning}</li>`;
        });
        html += `</ul></div>`;
    }
    
    // Display good signs
    if (result.goodSigns && result.goodSigns.length > 0) {
        html += `<div style="margin-bottom: 1rem;"><strong style="color: var(--success-green);">✅ Positive Indicators:</strong><ul style="margin-top: 0.5rem; padding-left: 1.5rem;">`;
        result.goodSigns.forEach(sign => {
            html += `<li style="margin-bottom: 0.5rem; color: var(--gray-700);">${sign}</li>`;
        });
        html += `</ul></div>`;
    }
    
    // Recommendations
    html += `
        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--white); border-radius: var(--radius-md); border-left: 4px solid ${colors[result.threatLevel]};">
            <strong>📋 Expert Recommendations:</strong>
            <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
    `;
    
    if (result.threatLevel === 'danger') {
        html += `
            <li>❌ <strong>DO NOT</strong> scan or pay through this QR code</li>
            <li>❌ <strong>DO NOT</strong> share this with other students</li>
            <li>🚨 Report this scam immediately</li>
            <li>✅ Government scholarships NEVER require QR payments</li>
            <li>✅ Official fees are paid through university portals only</li>
        `;
    } else if (result.threatLevel === 'warning') {
        html += `
            <li>⚠️ Verify payment recipient through official channels</li>
            <li>⚠️ Contact scholarship helpline before payment</li>
            <li>⚠️ Check if amount matches official fee structure</li>
            <li>✅ Request official payment gateway link instead</li>
        `;
    } else {
        html += `
            <li>✅ Still verify through official sources before payment</li>
            <li>✅ Save payment confirmation screenshot</li>
            <li>✅ Ensure transaction is refundable if needed</li>
        `;
    }
    
    html += `
            </ul>
        </div>
    `;
    
    // Educational note
    html += `
        <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(37, 99, 235, 0.1); border-radius: var(--radius-md); font-size: 0.875rem;">
            <strong>💡 Know This:</strong> Legitimate government scholarships are <strong>completely free</strong>. 
            If someone asks for payment via QR code, WhatsApp, or phone call claiming to be from 
            NSP/government portal, it is 100% a scam.
        </div>
    `;
    
    html += `</div>`;
    
    container.className = `results-container ${result.threatLevel}`;
    container.innerHTML = html;
    container.classList.remove('hidden');
    
    // Show toast notification
    if (result.threatLevel === 'danger') {
        ScholarShield.showToast('🚨 Payment scam detected!', 'error');
    } else if (result.threatLevel === 'safe') {
        ScholarShield.showToast('✅ QR analysis complete', 'success');
    }
    
    // Scroll to results
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}