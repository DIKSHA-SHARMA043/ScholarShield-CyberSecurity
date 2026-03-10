/**
 * ============================================
 * ScholarShield - Verified Scholarship Portals
 * Official government scholarship directory
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    loadScholarshipPortals();
    initPortalFilters();
});

/**
 * ========== VERIFIED SCHOLARSHIP PORTALS DATABASE ==========
 */
const SCHOLARSHIP_PORTALS = [
    // Central Government Portals
    {
        id: 1,
        name: 'National Scholarship Portal (NSP)',
        category: 'central',
        url: 'https://scholarships.gov.in',
        description: 'Official central government portal for all scholarship schemes across ministries',
        icon: 'fas fa-landmark',
        verified: true,
        students: '4 Crore+',
        schemes: '100+'
    },
    {
        id: 2,
        name: 'UGC Scholarships',
        category: 'central',
        url: 'https://www.ugc.ac.in/page/Scholarships.aspx',
        description: 'University Grants Commission scholarships for higher education students',
        icon: 'fas fa-graduation-cap',
        verified: true,
        students: '5 Lakh+',
        schemes: '15+'
    },
    {
        id: 3,
        name: 'AICTE Scholarships',
        category: 'central',
        url: 'https://www.aicte-india.org/schemes/students-development-schemes',
        description: 'All India Council for Technical Education scholarship schemes',
        icon: 'fas fa-laptop-code',
        verified: true,
        students: '2 Lakh+',
        schemes: '10+'
    },
    {
        id: 4,
        name: 'Ministry of Minority Affairs',
        category: 'minority',
        url: 'https://www.minorityaffairs.gov.in/scholarship',
        description: 'Pre-matric, post-matric and merit-cum-means scholarships for minorities',
        icon: 'fas fa-users',
        verified: true,
        students: '50 Lakh+',
        schemes: '8+'
    },
    {
        id: 5,
        name: 'Ministry of Social Justice',
        category: 'central',
        url: 'https://socialjustice.nic.in/SchemeList/Send/33?mid=20108',
        description: 'SC/ST/OBC scholarship schemes and fellowships',
        icon: 'fas fa-balance-scale',
        verified: true,
        students: '1 Crore+',
        schemes: '20+'
    },
    {
        id: 6,
        name: 'Ministry of Tribal Affairs',
        category: 'central',
        url: 'https://tribal.nic.in/scholarship.aspx',
        description: 'Scholarships for tribal students at all education levels',
        icon: 'fas fa-tree',
        verified: true,
        students: '30 Lakh+',
        schemes: '12+'
    },
    {
        id: 7,
        name: 'WCD Girl Child Scholarships',
        category: 'central',
        url: 'https://wcd.nic.in/schemes-listing/2405',
        description: 'Ministry of Women & Child Development scholarships for girl students',
        icon: 'fas fa-female',
        verified: true,
        students: '10 Lakh+',
        schemes: '6+'
    },
    
    // State Government Portals
    {
        id: 8,
        name: 'Rajasthan Scholarship Portal',
        category: 'state',
        url: 'https://sje.rajasthan.gov.in/schemes/scholarship.html',
        description: 'Social Justice & Empowerment Department, Government of Rajasthan',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '25 Lakh+',
        schemes: '15+'
    },
    {
        id: 9,
        name: 'Maharashtra Scholarships',
        category: 'state',
        url: 'https://mahadbt.maharashtra.gov.in',
        description: 'MahaDBT - Direct Benefit Transfer portal for Maharashtra scholarships',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '80 Lakh+',
        schemes: '25+'
    },
    {
        id: 10,
        name: 'Uttar Pradesh Scholarship',
        category: 'state',
        url: 'https://scholarship.up.gov.in',
        description: 'UP Government scholarship portal for SC/ST/OBC/Minority students',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '1 Crore+',
        schemes: '30+'
    },
    {
        id: 11,
        name: 'West Bengal Scholarships',
        category: 'state',
        url: 'https://www.wbmdfc.org/home/online_scholarship',
        description: 'Minority Development & Finance Corporation scholarship schemes',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '15 Lakh+',
        schemes: '10+'
    },
    {
        id: 12,
        name: 'Karnataka Scholarships',
        category: 'state',
        url: 'https://www.scholarships.gov.in',
        description: 'Government of Karnataka scholarship portal integrated with NSP',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '20 Lakh+',
        schemes: '18+'
    },
    {
        id: 13,
        name: 'Tamil Nadu Scholarships',
        category: 'state',
        url: 'https://www.tn.gov.in/scheme/data_view/33',
        description: 'Adi Dravidar and Tribal Welfare Department scholarships',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '18 Lakh+',
        schemes: '12+'
    },
    {
        id: 14,
        name: 'Gujarat Digital Seva Setu',
        category: 'state',
        url: 'https://digitalgujarat.gov.in/Citizen/CitizenScheme.aspx',
        description: 'Integrated platform for all Gujarat government scholarship schemes',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '12 Lakh+',
        schemes: '20+'
    },
    {
        id: 15,
        name: 'Madhya Pradesh Scholarships',
        category: 'state',
        url: 'http://scholarshipportal.mp.nic.in',
        description: 'MP State Scholarship Portal for SC/ST/OBC students',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '15 Lakh+',
        schemes: '14+'
    },
    {
        id: 16,
        name: 'Telangana ePass',
        category: 'state',
        url: 'https://telanganaepass.cgg.gov.in',
        description: 'Electronic Payment Automation System for scholarships in Telangana',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '10 Lakh+',
        schemes: '8+'
    },
    {
        id: 17,
        name: 'Andhra Pradesh ePass',
        category: 'state',
        url: 'https://epass.ap.gov.in',
        description: 'Government of Andhra Pradesh scholarship portal for all categories',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '12 Lakh+',
        schemes: '10+'
    },
    {
        id: 18,
        name: 'Bihar Scholarship Portal',
        category: 'state',
        url: 'http://medhasoft.bih.nic.in',
        description: 'E-Kalyan portal for Bihar government scholarships',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '20 Lakh+',
        schemes: '15+'
    },
    {
        id: 19,
        name: 'Odisha Scholarships',
        category: 'state',
        url: 'https://scholarship.odisha.gov.in',
        description: 'ST & SC Development Department scholarship portal',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '8 Lakh+',
        schemes: '12+'
    },
    {
        id: 20,
        name: 'Chhattisgarh Scholarship',
        category: 'state',
        url: 'http://scholarship.cg.nic.in',
        description: 'Directorate of Social Welfare scholarship schemes',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '6 Lakh+',
        schemes: '10+'
    },
    {
        id: 21,
        name: 'Uttarakhand E-Scholarship',
        category: 'state',
        url: 'https://escholarship.uk.gov.in',
        description: 'Social Welfare Department scholarship portal for Uttarakhand',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '4 Lakh+',
        schemes: '8+'
    },
    {
        id: 22,
        name: 'Punjab Scholarship Portal',
        category: 'state',
        url: 'https://punjab.gov.in/schemes',
        description: 'Department of Social Security & Women & Child Development schemes',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '5 Lakh+',
        schemes: '9+'
    },
    {
        id: 23,
        name: 'Kerala Scholarships',
        category: 'state',
        url: 'https://www.dcescholarship.kerala.gov.in',
        description: 'Scheduled Caste Development Department scholarship schemes',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '7 Lakh+',
        schemes: '11+'
    },
    {
        id: 24,
        name: 'Haryana Scholarship Portal',
        category: 'state',
        url: 'https://www.haryana.gov.in/en/scholarship',
        description: 'Welfare of Scheduled Castes & Backward Classes Department',
        icon: 'fas fa-map-marker-alt',
        verified: true,
        students: '6 Lakh+',
        schemes: '10+'
    }
];

/**
 * ========== LOAD SCHOLARSHIP PORTALS ==========
 */
function loadScholarshipPortals(filter = 'all') {
    const portalsGrid = document.getElementById('portals-grid');
    if (!portalsGrid) return;
    
    // Filter portals
    let filteredPortals = SCHOLARSHIP_PORTALS;
    if (filter !== 'all') {
        filteredPortals = SCHOLARSHIP_PORTALS.filter(portal => portal.category === filter);
    }
    
    if (filteredPortals.length === 0) {
        portalsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray-500);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No portals found in this category</p>
            </div>
        `;
        return;
    }
    
    // Render portal cards
    portalsGrid.innerHTML = filteredPortals.map(portal => createPortalCard(portal)).join('');
    
    // Add click tracking
    attachPortalClickHandlers();
}

/**
 * ========== CREATE PORTAL CARD HTML ==========
 */
function createPortalCard(portal) {
    return `
        <div class="portal-card" data-category="${portal.category}">
            <div class="portal-header">
                <div class="portal-icon">
                    <i class="${portal.icon}"></i>
                </div>
                <div>
                    <h3>${portal.name}</h3>
                    ${portal.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                </div>
            </div>
            
            <p>${portal.description}</p>
            
            <div style="display: flex; gap: 1rem; margin: 1rem 0; font-size: 0.875rem; color: var(--gray-600);">
                <div>
                    <i class="fas fa-users"></i> ${portal.students}
                </div>
                <div>
                    <i class="fas fa-award"></i> ${portal.schemes}
                </div>
            </div>
            
            <a href="${portal.url}" target="_blank" rel="noopener noreferrer" class="portal-link" data-portal-id="${portal.id}">
                Visit Portal <i class="fas fa-external-link-alt"></i>
            </a>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--gray-200); font-size: 0.75rem; color: var(--gray-500); font-family: var(--font-mono);">
                <i class="fas fa-globe"></i> ${portal.url}
            </div>
        </div>
    `;
}

/**
 * ========== INITIALIZE PORTAL FILTERS ==========
 */
function initPortalFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Load filtered portals
            loadScholarshipPortals(filter);
            
            // Show toast
            const filterLabels = {
                'all': 'All Portals',
                'central': 'Central Government',
                'state': 'State Government',
                'minority': 'Minority Schemes'
            };
            
            ScholarShield.showToast(`Showing: ${filterLabels[filter]}`, 'success');
        });
    });
}

/**
 * ========== ATTACH CLICK HANDLERS ==========
 */
function attachPortalClickHandlers() {
    const portalLinks = document.querySelectorAll('.portal-link');
    
    portalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const portalId = parseInt(this.getAttribute('data-portal-id'));
            const portal = SCHOLARSHIP_PORTALS.find(p => p.id === portalId);
            
            if (portal) {
                // Track portal visit (analytics can be added here)
                trackPortalVisit(portal);
                
                // Show confirmation toast
                ScholarShield.showToast(`Opening ${portal.name}...`, 'success');
            }
        });
    });
}

/**
 * ========== TRACK PORTAL VISITS ==========
 */
function trackPortalVisit(portal) {
    try {
        const visits = JSON.parse(localStorage.getItem('portal_visits') || '{}');
        visits[portal.id] = (visits[portal.id] || 0) + 1;
        localStorage.setItem('portal_visits', JSON.stringify(visits));
        
        // Log for analytics (can integrate with Google Analytics)
        console.log(`Portal Visit: ${portal.name} (${visits[portal.id]} times)`);
    } catch (error) {
        console.error('Error tracking portal visit:', error);
    }
}

/**
 * ========== SEARCH FUNCTIONALITY (Optional Enhancement) ==========
 */
function searchPortals(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        loadScholarshipPortals('all');
        return;
    }
    
    const results = SCHOLARSHIP_PORTALS.filter(portal =>
        portal.name.toLowerCase().includes(searchTerm) ||
        portal.description.toLowerCase().includes(searchTerm)
    );
    
    const portalsGrid = document.getElementById('portals-grid');
    if (!portalsGrid) return;
    
    if (results.length === 0) {
        portalsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray-500);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No portals found matching "${query}"</p>
                <button onclick="loadScholarshipPortals('all')" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-blue); color: white; border: none; border-radius: var(--radius-md); cursor: pointer;">
                    Show All Portals
                </button>
            </div>
        `;
    } else {
        portalsGrid.innerHTML = results.map(portal => createPortalCard(portal)).join('');
        attachPortalClickHandlers();
        ScholarShield.showToast(`Found ${results.length} portal(s)`, 'success');
    }
}

/**
 * ========== GET PORTAL STATISTICS ==========
 */
function getPortalStatistics() {
    const stats = {
        total: SCHOLARSHIP_PORTALS.length,
        central: SCHOLARSHIP_PORTALS.filter(p => p.category === 'central').length,
        state: SCHOLARSHIP_PORTALS.filter(p => p.category === 'state').length,
        minority: SCHOLARSHIP_PORTALS.filter(p => p.category === 'minority').length,
        verified: SCHOLARSHIP_PORTALS.filter(p => p.verified).length
    };
    
    return stats;
}

/**
 * ========== EXPORT PORTALS TO CSV (Optional Feature) ==========
 */
function exportPortalsToCSV() {
    const headers = ['Name', 'Category', 'URL', 'Description', 'Students', 'Schemes'];
    const rows = SCHOLARSHIP_PORTALS.map(portal => [
        portal.name,
        portal.category,
        portal.url,
        portal.description,
        portal.students,
        portal.schemes
    ]);
    
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scholarshield_verified_portals.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    ScholarShield.showToast('Portal list downloaded!', 'success');
}

// Make functions globally accessible if needed
window.ScholarshipPortals = {
    search: searchPortals,
    getStatistics: getPortalStatistics,
    exportCSV: exportPortalsToCSV,
    getAll: () => SCHOLARSHIP_PORTALS
};