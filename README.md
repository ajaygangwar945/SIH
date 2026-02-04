<img src="frontend/public/project_banner.png"  width="100%" height="200" style="object-fit: cover">

<div align="center">

# 🏥 Ayush FHIR Integration Platform  

### 🌿 Bridging Traditional Ayush Systems with Modern Healthcare Standards

![Status](https://img.shields.io/badge/Status-Active-success?style=flat)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat)
![FHIR](https://img.shields.io/badge/HL7-FHIR_R4-orange?style=flat)
![Healthcare](https://img.shields.io/badge/Domain-Healthcare-blueviolet?style=flat)

</div>

---

## 🌟 Overview

The **Ayush FHIR Integration Platform** is a robust healthcare interoperability solution designed to bridge the gap between **traditional Ayush medical systems** (Ayurveda, Yoga, Unani, Siddha, Homoeopathy, Naturopathy) and **modern digital health ecosystems**.

By leveraging **HL7 FHIR (Fast Healthcare Interoperability Resources)**, the platform ensures that Ayush health records are standardized, secure, and exchangeable across global healthcare systems.

---

## 🚀 Key Features

| Feature | Description |
|------|-------------|
| 🔍 **Advanced Search & Browse** | Search terms by **Name**, **ID** (e.g., `AY016`), or **ICD-11 Code**. Supports fuzzy matching and filtering. |
| 🔄 **FHIR Data Transformation** | Converts traditional Ayush terms into standard **FHIR CodeSystem** and **ValueSet** resources. |
| 🌐 **Translation Service** | Bidirectional mapping between **NAMASTE** terms and **ICD-11 TM2** codes. |
| 📊 **Real-time Statistics** | Live dashboard showing Total Terms, Cache Hit Rates, and data distribution. |
| 🕒 **Activity Tracking** | Dynamic "Recent Activity" feed tracking user actions (searches, uploads, downloads) in real-time. |
| 🛡️ **Secure Admin Panel** | CSV ingestion with validation, duplicate detection, and robust error handling. |

---

## 🛠️ Tech Stack

### 🎨 Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

### ⚙️ Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-API-black?style=flat)
![DataStore](https://img.shields.io/badge/Data-In--Memory-green?style=flat)

### 🧬 Standards

![HL7](https://img.shields.io/badge/HL7-FHIR_R4-orange?style=flat)

---

## 📂 Project Structure

```
📦 SIH
 ┣ 📂 api               # Deployment Data Bundle
 ┃ ┗ 📂 data            # CSV Datasets
 ┣ 📂 frontend          # React Frontend
 ┃ ┣ 📂 public          # Static Assets
 ┃ ┣ 📂 src             # Source Code
 ┃ ┃ ┣ 📂 components    # UI Components (Dashboard, Layout)
 ┃ ┃ ┣ 📂 context       # React Context (Activity, Theme)
 ┃ ┃ ┣ 📂 pages         # Route Pages (Search, Admin, FHIR)
 ┃ ┃ ┗ 📂 services      # API Client Services
 ┃ ┗ 📜 package.json
 ┣ 📂 src               # Node.js Backend
 ┃ ┣ 📂 models          # Data Models (NamesteTerm)
 ┃ ┣ 📂 routes          # Express Routes (API Endpoints)
 ┃ ┣ 📂 services        # Business Logic (CSVParser, FHIRService)
 ┃ ┣ 📂 tests           # Unit Tests
 ┃ ┗ 📜 server.js       # Backend Entry Point
 ┗ 📜 README.md         # Documentation
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/ajaygangwar945/SIH.git
    cd SIH
    ```

2. **Install Backend Dependencies**

    ```bash
    npm install
    ```

3. **Install Frontend Dependencies**

    ```bash
    cd frontend
    npm install
    ```

### Running the Application

1. **Start the Backend Server**

    ```bash
    # From the root directory
    npm run dev
    ```

2. **Start the Frontend Development Server**

    ```bash
    # From the frontend directory
    npm start
    ```

   The application should now be running at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

---

## 🌐 Deployment

This project is deployed using **Vercel** for instant updates and global CDN performance.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel)](https://sih-ayush-fhir.vercel.app/)

1. Updates are pushed to **GitHub**.
2. **Vercel** automatically rebuilds and deploys the changes.
3. The live site is updated instantly 🌍 [Visit Live Site](https://sih-ayush-fhir.vercel.app/)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <sub>Built with ❤️ by the Ayush FHIR Team</sub>
</div>
