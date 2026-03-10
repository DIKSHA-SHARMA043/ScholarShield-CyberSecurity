# 🛡️ ScholarShield  
### AI-Powered Scholarship Fraud Detection System  
🚀 Official Prototype | India Innovates 2026

---

## 🎯 Project Overview

ScholarShield is an AI-assisted cybersecurity platform designed to protect Indian students from scholarship fraud.

Every year, millions of students apply for government scholarships online.  
With the growth of digital services, phishing websites, fake scholarship portals, and QR-based payment scams have increased rapidly.

ScholarShield acts as a real-time verification layer that helps students instantly verify:

- Scholarship websites
- Payment QR codes
- Suspicious announcements

Before any financial or personal data loss occurs.

---

## 🌍 The Real Problem

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

## 💡 Our Solution

ScholarShield introduces a three-layer cybersecurity protection system:

### 🔍 1. Verification Layer
Instant scanning of URLs and QR codes using heuristic detection.

### 📚 2. Education Layer
Verified scholarship directory containing trusted government portals.

### 🌐 3. Community Defense
Students can report scams to help build a crowdsourced scam intelligence system.

This ensures students verify before they trust.

---

## ✨ Core Features

### 🔎 Heuristic URL Fraud Scanner
- Domain pattern analysis  
- SSL validation  
- Suspicious TLD detection  
- Phishing keyword detection  
- Typosquatting detection using string similarity  

### 📸 QR Code Integrity Validator
- Extracts UPI payment payload  
- Detects private wallet apps  
- Identifies scam fee patterns (₹99, ₹299, ₹499, etc.)  
- Flags suspicious transaction notes  

### 📚 Verified Scholarship Directory
- 24+ Official Central & State Government portals  
- Category filtering  
- Direct verified links  

### 🚩 Community Scam Reporting
- LocalStorage-based reporting  
- Screenshot support  
- Voting system for confirmation  

---

## ⚙️ Technology Stack

### Phase 1 – High-Fidelity MVP (Current)

- HTML5  
- CSS3  
- Vanilla JavaScript (ES6+)  
- jsQR (Client-side QR decoding)  

✅ Zero backend  
✅ Zero data storage  
✅ Runs fully in browser  
✅ Privacy-first design  

---

### Phase 2 – Future Roadmap

- MERN Stack Backend  
- AI-powered phishing detection  
- Computer Vision UI clone detection  
- WhatsApp Cyber Bot  
- Browser Extension  
- Government Threat Sync API  

---

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

---

## 🚀 Live Demo

🌐 https://sonukumawat-sde.github.io/ScholarShield-CyberSecurity/

Runs directly in browser. No installation required.

---

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

## 👥 Team (GEC Ajmer)

| Name | Role |
|------|------|
| Diksha Sharma | Team Leader |
| Sonu Kumawat | Technical Architect |
| Shivani Sharma | Security QA |

---

## 📜 License

This project is licensed under the MIT License.

---

## 🌟 Support the Project

If this project helps protect students:

⭐ Star the repository  
🔄 Share with students  
🚨 Report scams responsibly  

---

**Built with ❤️ by Team GEC Ajmer**  
India Innovates 2026  
Version 1.0.0