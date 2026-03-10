# 🛡️ ScholarShield  
### AI-Powered Scholarship Fraud Detection System  
🚀 Official Prototype | India Innovates 2026

---

# 🎯 Project Overview

ScholarShield is an AI-assisted cybersecurity platform designed to protect Indian students from scholarship fraud.

Every year, millions of students apply for government scholarships online.  
With the growth of digital services, phishing websites, fake scholarship portals, and QR-based payment scams have increased rapidly.

ScholarShield acts as a real-time verification layer that helps students instantly verify:

- Scholarship websites
- Payment QR codes
- Suspicious announcements

Before any financial or personal data loss occurs.

---

# 🌍 The Real Problem

India has 40+ million scholarship applicants every year, making students a major target for cyber fraud.

Fraudsters exploit the trust students place in government schemes by spreading fake scholarship opportunities.

### 🧾 Fake Scholarship Websites
Scammers create pixel-perfect copies of official portals like the National Scholarship Portal (NSP).

These websites steal:
- Aadhaar numbers  
- Bank account details  
- Login credentials  

### 📱 QR Code Payment Scams
Students are often asked to pay “processing fees” through QR codes.

These QR codes redirect money to private scam wallets instead of official government accounts.

### 📢 WhatsApp & Social Media Misinformation
Fraud links spread quickly through:
- WhatsApp groups  
- Telegram channels  
- Social media posts  

Students unknowingly submit personal data on malicious websites.

---

# 💡 Our Solution

ScholarShield introduces a three-layer cybersecurity protection system:

### 🔍 1. Verification Layer
Instant scanning of URLs and QR codes using heuristic detection.

### 📚 2. Education Layer
Verified scholarship directory containing trusted government portals.

### 🌐 3. Community Defense
Students can report scams to help build a crowdsourced scam intelligence system.

This ensures students verify before they trust.

---

# ✨ Core Features

## 🔎 Heuristic URL Fraud Scanner

Analyzes suspicious scholarship links using multiple security checks:

• Domain pattern analysis  
• SSL certificate validation  
• Government domain verification  
• Phishing keyword detection  

Unsafe links are immediately flagged.

---

## 📸 QR Code Integrity Validator

ScholarShield scans uploaded QR images and extracts UPI payment details.

It detects:

• Merchant name  
• Payment address  
• Suspicious wallet identifiers  

This prevents students from paying **fake scholarship fees**.

---

## 📚 Verified Scholarship Directory

Provides **direct access to official scholarship portals**.

Students can search by:

• State  
• Scholarship category  
• Government scheme  

This eliminates the risk of clicking fake links on search engines.

---

## 🚨 Live Scam Alert System

Displays recently detected scams to help students stay informed about **new fraud trends**.

---

## 🚩 Community Scam Reporting

Students can submit reports with:

• Screenshot evidence  
• Fraud description  
• Suspicious link

These reports help update the **threat database**.

---
## ⚙️ Technology Stack & Architecture Strategy

ScholarShield is designed using a **dual-phase architecture strategy** that prioritizes what matters most for students: **Speed, Privacy, and Zero-Friction Access**.

The current system focuses on providing **instant verification with maximum privacy**, while the future architecture prepares the platform to scale into a **nationwide AI-driven cybersecurity protection system for students.**

---

### 🟢 Phase 1: High-Fidelity MVP (Current Build)

The current version of ScholarShield is optimized for **instant access and simplicity**.
Students can verify suspicious scholarship links or QR codes **directly from their browser**, without downloading applications or creating accounts.

#### 🎨 Frontend Framework
**Technologies:** `HTML5`, `CSS3`

**Impact:**
* Provides a **clean, responsive, and mobile-friendly interface**
* Ensures fast loading even on **low-bandwidth networks**
* Allows students to verify suspicious links instantly without installing heavy applications

This lightweight web approach makes the platform accessible to **students across both urban and rural regions of India.**

---

#### 🧠 Core Detection Engine
**Technologies:** `Vanilla JavaScript (ES6+)`, `jsQR (Client-side QR decoding)`

**Impact:**
The core fraud detection logic runs entirely **inside the user's browser**, performing:
* URL heuristic analysis
* Domain pattern validation
* Suspicious link detection
* UPI QR payload extraction

Running these processes on the client side ensures:
* ✅ **Zero backend & Zero data storage**
* ✅ **Runs fully in the browser (Zero-latency verification)**
* ✅ **Privacy-first design (No sensitive student queries stored externally)**

---

### 🚀 Phase 2: Future Roadmap & Production Scale

As ScholarShield evolves, the platform will transition into a **scalable cybersecurity system capable of protecting millions of students across India.**

#### 🌐 Centralized Backend Infrastructure
**Technology Stack:** `MERN Stack Backend` *(MongoDB, Express.js, React.js, Node.js)*, `Government Threat Sync API`

**Impact:**
This backend architecture will enable:
* A **nationwide crowdsourced threat intelligence database**
* Real-time synchronization of newly reported scams
* Scalable infrastructure capable of handling **millions of concurrent users**
* Integration with nodal agencies via Government Threat Sync API

This will transform ScholarShield into a **collaborative cyber defense network built by students, for students.**

---

#### 🤖 AI & Machine Learning Detection
**Technologies:** `Python (FastAPI)`, `TensorFlow`

**Impact:**
Future versions of ScholarShield will integrate **AI-powered phishing detection systems** capable of identifying sophisticated scholarship scams. Using **Computer Vision models**, the system will:
* Detect visually cloned government portals (UI clone detection)
* Identify fake scholarship websites based on visual similarity
* Recognize emerging phishing patterns automatically

This enables ScholarShield to detect **“Zero-Day” phishing websites**, even before they are widely reported.

---

#### 🛡️ Active Defense & Accessibility
**Technologies:** `WhatsApp Cyber Bot`, `Browser Extension`

**Impact:**
To provide omnichannel support, we will deploy a **WhatsApp Cyber Bot** allowing rural students to verify suspicious links via simple chat. Additionally, a lightweight **Browser Extension** will proactively block malicious educational URLs in the background before the page even loads.
## 📐 Detection Flow

```
User Input (URL / QR)
        ↓
Client-Side Parsing Engine
        ↓
Heuristic Validation Layer
        ↓
Threat Score Calculation
        ↓
Visual Feedback (Safe / Warning / Danger)
        ↓
Optional Community Report
```


## ⚙️ Local Setup

```bash
git clone https://github.com/sonukumawat-sde/ScholarShield-CyberSecurity.git
cd ScholarShield-CyberSecurity
```

Open `index.html` in your browser.

No npm install required.

---

## 📁 Project Structure

```
ScholarShield-CyberSecurity/
│
├── index.html
├── README.md
├── LICENSE
│
├── css/
├── js/
├── data/
├── assets/
└── screenshots/
```

---

## 🛡️ Privacy & Security

✅ No backend server  
✅ No data collection  
✅ No tracking  
✅ Fully open-source  
✅ Works offline (after initial load)  

---
# ⚙️ Installation & Testing

ScholarShield is built as a **Zero-Latency Client-Side MVP**. There are no heavy backend servers, databases, or environment variables to configure. 

You can evaluate the project in two ways:

### 🚀 Option 1: Live Interactive Demo (Recommended)
Experience the fully functional prototype directly in your browser without downloading any code:
👉 **[Click Here to Test ScholarShield](https://sonukumawat-sde.github.io/ScholarShield-CyberSecurity/)**

### 💻 Option 2: Run Locally on Your Machine

If you want to review the source code and run it locally, follow these 3 simple steps:

**Step 1: Clone the repository**

```text
git clone https://github.com/sonukumawat-sde/ScholarShield-CyberSecurity.git
```

**Step 2: Navigate to the folder**

```text
cd ScholarShield-CyberSecurity
```

**Step 3: Run the application**

Simply open the `index.html` file in any web browser (Chrome, Edge, Safari). No local server or dependency installation is required!
## 🚀 Future Roadmap: Scaling to a National Level

ScholarShield is architected to evolve from a lightweight MVP into a robust **B2G (Business-to-Government)** security grid.

### 🧠 1. AI & Machine Learning Integration
* **Visual Threat Detection:** Deploying a TensorFlow/Python CNN to analyze the *Visual Similarity Index* of fake domains against official `.gov.in` portals, catching zero-day clones instantly.

### 📱 2. Omnichannel Accessibility
* **WhatsApp Cyber-Bot:** A 24/7 verified WhatsApp bot allowing rural students to forward suspicious links or QR posters for instant verification without needing a web browser.

### ☁️ 3. Cloud Architecture Scalability
* **MERN Microservices:** Upgrading to a dynamic Node.js/MongoDB backend to process thousands of concurrent crowdsourced scam reports and push real-time, localized alerts.

### 🛡️ 4. Proactive End-User Protection
* **Active Browser Extension:** A lightweight background extension for Chrome/Edge that actively blocks malicious educational URLs before the page even fully loads.

### 🏛️ 5. Government Sync (B2G)
* **I4C Threat-Sync API:** Creating a secure data pipeline to funnel verified, crowdsourced scam data directly to the Indian Cyber Crime Coordination Centre (I4C) as a nationwide early-warning system.
# 👥 The Defense Team (GEC Ajmer)


| Name | Role | Core Responsibility |
| :--- | :--- | :--- |
| **Diksha Sharma** | Team Leader | UI/UX Strategy, Product Vision & Threat Research |
| **Sonu Kumawat** | Technical Architect | Security Logic Engine, Regex Parsing & System Design |
| **Shivani Sharma** | Security QA | Frontend Engineering & Payload Verification |

---

<p align="center">
  <i>"Building a zero-trust environment where no student's educational dream is compromised by fraud."</i>
  <br><br>
  ⭐ <b>If you believe in securing digital education, consider giving this project a star on GitHub!</b>
</p>



# 🤝 Feedback & Contributions

As this is an active MVP for **India Innovates 2026**, we highly value feedback from evaluators, mentors, and the developer community. 
If you discover a bypass in our heuristic engine or have a feature request, please feel free to open an **Issue** or submit a **Pull Request**.

# 📄 License & Open Source
