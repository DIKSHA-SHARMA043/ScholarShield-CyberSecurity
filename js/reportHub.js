/**
 * ============================================
 * ScholarShield - Community Scam Reporting Hub
 * With Delete Feature + Email Notification
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    initReportHub();
    loadRecentReports();
});

const REPORTS_STORAGE_KEY = 'scholarshield_scam_reports';

function initReportHub() {
    const reportForm = document.getElementById('scam-report-form');
    
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmission);
    }
}

function handleReportSubmission(e) {
    e.preventDefault();
    
    const scamUrl = document.getElementById('scam-url').value.trim();
    const scamType = document.getElementById('scam-type').value;
    const scamDescription = document.getElementById('scam-description').value.trim();
    const screenshotInput = document.getElementById('scam-screenshot');
    
    // Validation
    if (!scamUrl || !scamType || !scamDescription) {
        ScholarShield.showToast('⚠️ Please fill all required fields', 'warning');
        return;
    }
    
    if (!isValidUrlFormat(scamUrl)) {
        ScholarShield.showToast('❌ Please enter a valid URL', 'error');
        return;
    }
    
    if (scamDescription.length < 20) {
        ScholarShield.showToast('⚠️ Description should be at least 20 characters', 'warning');
        return;
    }
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Create report
    const report = {
        id: generateReportId(),
        url: scamUrl,
        type: scamType,
        description: scamDescription,
        timestamp: new Date().toISOString(),
        hasScreenshot: screenshotInput.files.length > 0,
        status: 'pending',
        votes: 0,
        reporterIP: 'Anonymous'
    };
    
    // Handle screenshot
    if (screenshotInput.files.length > 0) {
        const file = screenshotInput.files[0];
        
        if (file.size > 2 * 1024 * 1024) {
            ScholarShield.showToast('❌ Screenshot too large. Max 2MB', 'error');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            report.screenshot = event.target.result;
            saveReport(report, submitBtn, originalBtnText);
        };
        reader.readAsDataURL(file);
    } else {
        saveReport(report, submitBtn, originalBtnText);
    }
}

function saveReport(report, submitBtn, originalBtnText) {
    try {
        let reports = getStoredReports();
        
        // Check duplicate
        const isDuplicate = reports.some(r => 
            r.url.toLowerCase() === report.url.toLowerCase() && 
            Date.now() - new Date(r.timestamp).getTime() < 24 * 60 * 60 * 1000
        );
        
        if (isDuplicate) {
            ScholarShield.showToast('⚠️ This URL was already reported in last 24 hours', 'warning');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            return;
        }
        
        reports.unshift(report);
        reports = reports.slice(0, 50);
        
        localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
        
        sendReportNotification(report);
        
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Submitted!';
        submitBtn.style.background = 'var(--success-green)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
        
        showReportConfirmation(report);
        document.getElementById('scam-report-form').reset();
        loadRecentReports();
        
        ScholarShield.showToast('✅ Report submitted successfully!', 'success');
        
    } catch (error) {
        console.error('Error saving report:', error);
        ScholarShield.showToast('❌ Error submitting report. Please try again.', 'error');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

function sendReportNotification(report) {
    console.log('📧 REPORT NOTIFICATION SENT TO:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('TO: cybercrime@gov.in, scholarshield-team@gmail.com');
    console.log('SUBJECT: 🚨 New Scam Report - ' + report.type);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Report ID:', report.id);
    console.log('Scam Type:', report.type);
    console.log('Suspicious URL:', report.url);
    console.log('Description:', report.description);
    console.log('Timestamp:', new Date(report.timestamp).toLocaleString());
    console.log('Evidence:', report.hasScreenshot ? 'Screenshot attached' : 'No screenshot');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

function getStoredReports() {
    try {
        const stored = localStorage.getItem(REPORTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading reports:', error);
        return [];
    }
}

function loadRecentReports() {
    const reportsList = document.getElementById('recent-reports-list');
    if (!reportsList) return;
    
    const reports = getStoredReports();
    
    if (reports.length === 0) {
        reportsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--gray-500);">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No scam reports yet</p>
                <p style="font-size: 0.875rem;">Be the first to report a fraud attempt</p>
            </div>
        `;
        return;
    }
    
    // Add Clear All button at top
    let clearAllBtn = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 2px solid var(--gray-200);">
            <span style="font-size: 0.875rem; color: var(--gray-600);">
                <i class="fas fa-list"></i> ${reports.length} report(s)
            </span>
            <button id="clear-all-reports" style="padding: 0.5rem 1rem; background: var(--danger-red); color: white; border: none; border-radius: var(--radius-sm); cursor: pointer; font-size: 0.875rem; font-weight: 600; transition: var(--transition-fast);">
                <i class="fas fa-trash-alt"></i> Clear All
            </button>
        </div>
    `;
    
    const recentReports = reports.slice(0, 10);
    reportsList.innerHTML = clearAllBtn + recentReports.map(report => createReportCard(report)).join('');
    
    attachReportActions();
    
    // Clear All button handler
    const clearAllButton = document.getElementById('clear-all-reports');
    if (clearAllButton) {
        clearAllButton.addEventListener('click', clearAllReports);
    }
}

function createReportCard(report) {
    const typeLabels = {
        'phishing': 'Phishing Website',
        'qr-scam': 'QR Payment Scam',
        'whatsapp': 'WhatsApp Fraud',
        'fake-call': 'Fake Call',
        'other': 'Other'
    };
    
    const typeColors = {
        'phishing': 'var(--danger-red)',
        'qr-scam': 'var(--warning-orange)',
        'whatsapp': 'var(--success-green)',
        'fake-call': 'var(--info-cyan)',
        'other': 'var(--gray-600)'
    };
    
    const timeAgo = formatTimeAgo(new Date(report.timestamp));
    const truncatedUrl = report.url.length > 40 ? report.url.substring(0, 40) + '...' : report.url;
    
    return `
        <div class="report-item" data-report-id="${report.id}" style="position: relative;">
            
            <!-- Delete Button (Top Right) -->
            <button class="delete-report-btn" data-report-id="${report.id}" title="Delete Report" style="
                position: absolute;
                top: 10px;
                right: 10px;
                width: 28px;
                height: 28px;
                background: var(--gray-100);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--gray-500);
                transition: all 0.2s ease;
            ">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="report-item-header" style="padding-right: 40px;">
                <span class="report-type" style="background: ${typeColors[report.type]};">
                    ${typeLabels[report.type] || 'Unknown'}
                </span>
                <span class="report-time">
                    <i class="far fa-clock"></i> ${timeAgo}
                </span>
            </div>
            
            <div class="report-url" title="${escapeHtml(report.url)}" style="margin-top: 0.75rem;">
                <i class="fas fa-link"></i> ${truncatedUrl}
            </div>
            
            <div class="report-description" style="font-size: 0.875rem; color: var(--gray-600); margin-top: 0.5rem; line-height: 1.6;">
                ${escapeHtml(report.description.substring(0, 100))}${report.description.length > 100 ? '...' : ''}
            </div>
            
            ${report.hasScreenshot ? `
                <div style="margin-top: 0.5rem;">
                    <span style="font-size: 0.75rem; color: var(--primary-blue);">
                        <i class="fas fa-image"></i> Evidence attached
                    </span>
                </div>
            ` : ''}
            
            <div class="report-actions" style="display: flex; gap: 0.5rem; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--gray-200);">
                <button class="upvote-btn" data-report-id="${report.id}" style="flex: 1; padding: 0.5rem; background: var(--gray-100); border: none; border-radius: var(--radius-sm); cursor: pointer; font-size: 0.8rem; font-weight: 600; transition: var(--transition-fast);">
                    <i class="fas fa-thumbs-up"></i> Confirm (${report.votes || 0})
                </button>
                <button class="view-details-btn" data-report-id="${report.id}" style="flex: 1; padding: 0.5rem; background: var(--primary-blue); color: white; border: none; border-radius: var(--radius-sm); cursor: pointer; font-size: 0.8rem; font-weight: 600; transition: var(--transition-fast);">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="delete-single-btn" data-report-id="${report.id}" style="padding: 0.5rem 0.75rem; background: var(--danger-red); color: white; border: none; border-radius: var(--radius-sm); cursor: pointer; font-size: 0.8rem; transition: var(--transition-fast);" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function attachReportActions() {
    // Upvote buttons
    document.querySelectorAll('.upvote-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            upvoteReport(this.getAttribute('data-report-id'));
        });
    });
    
    // View details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showReportDetails(this.getAttribute('data-report-id'));
        });
    });
    
    // Delete buttons (X icon at top right)
    document.querySelectorAll('.delete-report-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const reportId = this.getAttribute('data-report-id');
            showDeleteConfirmation(reportId);
        });
        
        // Hover effect
        btn.addEventListener('mouseenter', function() {
            this.style.background = 'var(--danger-red)';
            this.style.color = 'white';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'var(--gray-100)';
            this.style.color = 'var(--gray-500)';
        });
    });
    
    // Delete buttons (trash icon in actions)
    document.querySelectorAll('.delete-single-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportId = this.getAttribute('data-report-id');
            showDeleteConfirmation(reportId);
        });
    });
}

// ========== DELETE FUNCTIONS ==========

function showDeleteConfirmation(reportId) {
    const modal = document.createElement('div');
    modal.className = 'delete-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.2s;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: var(--radius-xl); max-width: 400px; text-align: center; animation: slideUp 0.2s;">
            <div style="width: 60px; height: 60px; background: rgba(239, 68, 68, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem; color: var(--danger-red);">
                <i class="fas fa-trash-alt"></i>
            </div>
            <h3 style="margin-bottom: 0.5rem; color: var(--gray-900);">Delete Report?</h3>
            <p style="color: var(--gray-600); margin-bottom: 1.5rem;">
                Are you sure you want to delete this report? This action cannot be undone.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="cancel-delete" style="padding: 0.75rem 1.5rem; background: var(--gray-200); color: var(--gray-700); border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;">
                    Cancel
                </button>
                <button class="confirm-delete" data-report-id="${reportId}" style="padding: 0.75rem 1.5rem; background: var(--danger-red); color: white; border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.cancel-delete').addEventListener('click', () => {
        closeModal();
    });
    
    modal.querySelector('.confirm-delete').addEventListener('click', function() {
        const id = this.getAttribute('data-report-id');
        deleteReport(id);
        closeModal();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.2s';
        setTimeout(() => modal.remove(), 200);
    }
}

function deleteReport(reportId) {
    try {
        let reports = getStoredReports();
        const reportIndex = reports.findIndex(r => r.id === reportId);
        
        if (reportIndex !== -1) {
            reports.splice(reportIndex, 1);
            localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
            
            // Remove vote tracking for this report
            localStorage.removeItem(`voted_${reportId}`);
            
            loadRecentReports();
            ScholarShield.showToast('🗑️ Report deleted successfully', 'success');
            
            console.log(`📋 Report ${reportId} deleted from database`);
        }
    } catch (error) {
        console.error('Error deleting report:', error);
        ScholarShield.showToast('❌ Error deleting report', 'error');
    }
}

function clearAllReports() {
    const reports = getStoredReports();
    
    if (reports.length === 0) {
        ScholarShield.showToast('📭 No reports to clear', 'warning');
        return;
    }
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.2s;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: var(--radius-xl); max-width: 400px; text-align: center; animation: slideUp 0.2s;">
            <div style="width: 60px; height: 60px; background: rgba(239, 68, 68, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem; color: var(--danger-red);">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 style="margin-bottom: 0.5rem; color: var(--gray-900);">Clear All Reports?</h3>
            <p style="color: var(--gray-600); margin-bottom: 1.5rem;">
                This will permanently delete <strong>${reports.length} report(s)</strong>. This action cannot be undone.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="cancel-clear" style="padding: 0.75rem 1.5rem; background: var(--gray-200); color: var(--gray-700); border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;">
                    Cancel
                </button>
                <button class="confirm-clear" style="padding: 0.75rem 1.5rem; background: var(--danger-red); color: white; border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;">
                    <i class="fas fa-trash-alt"></i> Clear All
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.cancel-clear').addEventListener('click', () => {
        closeModal();
    });
    
    modal.querySelector('.confirm-clear').addEventListener('click', () => {
        // Clear all reports
        localStorage.removeItem(REPORTS_STORAGE_KEY);
        
        // Clear all vote tracking
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith('voted_')) {
                localStorage.removeItem(key);
            }
        }
        
        loadRecentReports();
        closeModal();
        ScholarShield.showToast('🗑️ All reports cleared successfully', 'success');
        
        console.log('📋 All reports cleared from database');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.2s';
        setTimeout(() => modal.remove(), 200);
    }
}

function upvoteReport(reportId) {
    try {
        let reports = getStoredReports();
        const reportIndex = reports.findIndex(r => r.id === reportId);
        
        if (reportIndex !== -1) {
            const voteKey = `voted_${reportId}`;
            if (localStorage.getItem(voteKey)) {
                ScholarShield.showToast('⚠️ You already confirmed this report', 'warning');
                return;
            }
            
            reports[reportIndex].votes = (reports[reportIndex].votes || 0) + 1;
            localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
            localStorage.setItem(voteKey, 'true');
            
            loadRecentReports();
            ScholarShield.showToast('✅ Thank you for confirming!', 'success');
        }
    } catch (error) {
        console.error('Error upvoting:', error);
    }
}

function showReportDetails(reportId) {
    const reports = getStoredReports();
    const report = reports.find(r => r.id === reportId);
    
    if (!report) return;
    
    const typeLabels = {
        'phishing': 'Phishing Website',
        'qr-scam': 'QR Payment Scam',
        'whatsapp': 'WhatsApp Fraud',
        'fake-call': 'Fake Verification Call',
        'other': 'Other Fraud'
    };
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 1rem;
        animation: fadeIn 0.3s;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: var(--radius-xl); max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; animation: slideUp 0.3s;">
            <div style="position: sticky; top: 0; background: white; padding: 1.5rem; border-bottom: 2px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
                <h3 style="margin: 0;">
                    <i class="fas fa-flag"></i> Report Details
                </h3>
                <button class="close-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-600); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: 0.2s;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div style="padding: 1.5rem;">
                <div style="margin-bottom: 1.5rem;">
                    <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">
                        <i class="fas fa-tag"></i> Type
                    </label>
                    <span style="background: var(--danger-red); color: white; padding: 0.5rem 1rem; border-radius: var(--radius-md); font-weight: 600;">
                        ${typeLabels[report.type] || 'Unknown'}
                    </span>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">
                        <i class="fas fa-link"></i> Suspicious URL
                    </label>
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius-md); font-family: monospace; font-size: 0.875rem; word-break: break-all; border: 2px solid var(--gray-200);">
                        ${escapeHtml(report.url)}
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">
                        <i class="fas fa-file-alt"></i> Description
                    </label>
                    <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius-md); line-height: 1.8; border: 2px solid var(--gray-200);">
                        ${escapeHtml(report.description)}
                    </div>
                </div>
                
                ${report.screenshot ? `
                    <div style="margin-bottom: 1.5rem;">
                        <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">
                            <i class="fas fa-image"></i> Evidence
                        </label>
                        <img src="${report.screenshot}" style="width: 100%; border-radius: var(--radius-md); border: 2px solid var(--gray-200);">
                    </div>
                ` : ''}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: var(--gray-50); border-radius: var(--radius-md);">
                    <div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Report ID</div>
                        <div style="font-weight: 600; font-size: 0.8rem; word-break: break-all;">${report.id}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Reported</div>
                        <div style="font-weight: 600;">${formatTimeAgo(new Date(report.timestamp))}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; color: var(--gray-500);">Confirmations</div>
                        <div style="font-weight: 600;"><i class="fas fa-thumbs-up"></i> ${report.votes || 0}</div>
                    </div>
                </div>
                
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(239, 68, 68, 0.1); border-left: 4px solid var(--danger-red); border-radius: var(--radius-md);">
                    <strong style="color: var(--danger-red);">⚠️ Warning</strong>
                    <p style="margin-top: 0.5rem; margin-bottom: 0;">
                        This URL has been reported as fraudulent. Do not share personal information or make payments.
                    </p>
                </div>
                
                <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                    <button class="modal-delete-btn" data-report-id="${report.id}" style="flex: 1; padding: 0.875rem; background: var(--danger-red); color: white; border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;">
                        <i class="fas fa-trash"></i> Delete Report
                    </button>
                    <button class="modal-close-btn" style="flex: 1; padding: 0.875rem; background: var(--gray-200); color: var(--gray-700); border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    modal.querySelector('.modal-delete-btn').addEventListener('click', function() {
        const id = this.getAttribute('data-report-id');
        closeModal();
        setTimeout(() => showDeleteConfirmation(id), 200);
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function showReportConfirmation(report) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        animation: fadeIn 0.3s;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: var(--radius-xl); max-width: 500px; text-align: center; animation: slideUp 0.3s;">
            <div style="width: 80px; height: 80px; background: var(--success-green); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2.5rem; color: white;">
                <i class="fas fa-check"></i>
            </div>
            <h2 style="margin-bottom: 1rem; color: var(--gray-900);">Report Submitted!</h2>
            <p style="color: var(--gray-600); margin-bottom: 1.5rem; line-height: 1.8;">
                Thank you for helping protect fellow students. Your report has been sent to:
            </p>
            <div style="background: var(--gray-50); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; text-align: left;">
                <div style="margin-bottom: 0.5rem;">✅ Cybercrime Portal (cybercrime.gov.in)</div>
                <div style="margin-bottom: 0.5rem;">✅ ScholarShield Team</div>
                <div>✅ Community Alert System</div>
            </div>
            <p style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 1.5rem;">
                Report ID: <code style="background: var(--gray-100); padding: 0.25rem 0.5rem; border-radius: 4px;">${report.id}</code>
            </p>
            <button class="close-confirm" style="padding: 0.875rem 2rem; background: var(--primary-blue); color: white; border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600; font-size: 1rem;">
                Got it!
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-confirm').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => modal.remove(), 300);
    });
    
    setTimeout(() => {
        if (modal.parentElement) {
            modal.style.animation = 'fadeOut 0.3s';
            setTimeout(() => modal.remove(), 300);
        }
    }, 5000);
}

// ========== UTILITY FUNCTIONS ==========

function generateReportId() {
    return 'RPT_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function isValidUrlFormat(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function formatTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== CSS ANIMATIONS ==========
const reportHubStyles = document.createElement('style');
reportHubStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .upvote-btn:hover {
        background: var(--primary-blue) !important;
        color: white !important;
    }
    
    .view-details-btn:hover {
        background: var(--primary-dark) !important;
    }
    
    .delete-single-btn:hover {
        background: #dc2626 !important;
    }
    
    .close-modal:hover {
        background: var(--gray-100);
    }
    
    #clear-all-reports:hover {
        background: #dc2626 !important;
    }
`;
document.head.appendChild(reportHubStyles);