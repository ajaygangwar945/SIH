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

## 🌟 Overview & Mission

The **Ayush FHIR Integration Platform** is a specialized healthcare interoperability solution dedicated to the digital transformation of **Traditional Indian Medicine** (Ayurveda, Yoga, Unani, Siddha, Homoeopathy).

### 🎯 Our Mission

To create a seamless, standardized, and secure bridge between ancient medical wisdom and modern clinical data standards (HL7 FHIR), enabling traditional healthcare practitioners to participate in the global digital health ecosystem while maintaining the unique integrity of Ayush terminology.

---

## 🚀 Key Features

| Feature | Description |
|------|-------------|
| 🔍 **Advanced Search** | High-performance search for NAMASTE terms with fuzzy matching and ICD-11 cross-referencing. |
| 🔄 **FHIR Resource Engine** | Auto-generation of HL7 FHIR CodeSystem and ConceptMap resources from CSV datasets. |
| 🌐 **Translation Hub** | Bidirectional terminology mapping between NAMASTE (Traditional) and ICD-11 TM2 (International). |
| 📊 **Dynamic Analytics** | Real-time monitoring of terminology distribution, search trends, and system health. |
| 🛡️ **Admin Suite** | Comprehensive tools for **User Management**, **System Settings**, and **Secure CSV Data Ingestion**. |
| 📱 **Mobile-First UI** | Fully responsive interface optimized for clinical use on tablets, phones, and desktops. |

---

## 🛠️ Tech Stack

### 🎨 Frontend

- **React 18** & **TypeScript**
- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth UI transitions
- **React Query** for efficient data fetching

### ⚙️ Backend

- **Node.js** & **Express**
- **In-Memory DataStore** with persistent CSV synchronization
- **HL7 FHIR R4** Standardization Logic
- **Jest** for automated API testing

---

## 📂 Project Structure

```text
📦 SIH
 ┣ 📂 api               # Serverless Deployment Bundle
 ┃ ┣ 📂 data            # Standardized CSV Datasets
 ┃ ┗ 📜 index.js        # Vercel Entry Point
 ┣ 📂 frontend          # React + TypeScript Frontend
 ┃ ┣ 📂 public          # Static Media & Icons
 ┃ ┣ 📂 src             # Application Source
 ┃ ┃ ┣ 📂 components    # Layout & Dashboard UI
 ┃ ┃ ┣ 📂 context       # Activity Tracking Context
 ┃ ┃ ┣ 📂 pages         # Core Workflows (Search, Auth, Users, etc.)
 ┃ ┃ ┗ 📂 services      # API Client Utilities
 ┃ ┗ 📜 package.json
 ┣ 📂 src               # Node.js Core Backend
 ┃ ┣ 📂 models          # Data Entity Definitions
 ┃ ┣ 📂 routes          # API Resource Handlers
 ┃ ┣ 📂 services        # FHIR & Mapping Business Logic
 ┃ ┣ 📂 tests           # Verification Suite
 ┃ ┣ 📂 utils           # Shared Utilities
 ┃ ┗ 📜 server.js       # Core API Server
 ┣ 📂 scripts           # Data Utility Scripts
 ┗ 📜 README.md         # Full Documentation
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
