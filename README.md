<img src="/frontend/public/Gemini_Generated_Image_k6g886k6g886k6g8.png" height="200" width="100%" align="center">

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

The **Ayush FHIR Integration Platform** is a robust healthcare interoperability solution designed to bridge the gap between **traditional Ayush medical systems** and **modern digital health ecosystems**.

By leveraging **HL7 FHIR (Fast Healthcare Interoperability Resources)**, the platform ensures that Ayush health records are:

- 📄 Standardized  
- 🔐 Secure  
- 🔄 Interoperable  
- 🌍 Exchangeable across healthcare systems  

This enables better continuity of care, data sharing, and integration with national and global health infrastructures.

---

## 🚀 Key Features

| Feature | Description |
|------|-------------|
| 🔄 **FHIR Data Transformation** | Converts legacy Ayush data formats into standard FHIR resources |
| 🛡️ **Secure Authentication** | JWT-based authentication with secure access control |
| 📊 **Analytics Dashboard** | Visual insights into data flow, success rates, and system health |
| 🔍 **Advanced Search** | Efficient querying of patient records and healthcare resources |
| 🌐 **API-First Architecture** | RESTful APIs for seamless system-to-system integration |

---

## 🛠️ Tech Stack

### 🎨 Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

### ⚙️ Backend

![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-API-black?style=flat)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-4EA94B?style=flat&logo=mongodb&logoColor=white)

### 🧬 Standards & APIs

![HL7](https://img.shields.io/badge/HL7-FHIR_R4-orange?style=flat)
![JWT](https://img.shields.io/badge/Auth-JWT-blue?style=flat)

---

## 📂 Project Structure

```
📦 SIH
 ┣ 📂 api               # Vercel Serverless Functions
 ┃ ┣ 📂 data            # Deployment data bundle
 ┃ ┗ 📜 index.js        # Serverless entry point
 ┣ 📂 frontend          # React Frontend
 ┃ ┣ 📂 public          # Static assets
 ┃ ┣ 📂 src             # Source code
 ┃ ┃ ┣ 📂 components    # UI Components
 ┃ ┃ ┣ 📂 pages         # Route Pages
 ┃ ┃ ┣ 📂 services      # API Services
 ┃ ┃ ┗ � context       # React Context
 ┃ ┗ 📜 package.json
 ┣ 📂 src               # Node.js Backend
 ┃ ┣ 📂 models          # Mongoose Models
 ┃ ┣ 📂 routes          # Express Routes
 ┃ ┣ 📂 services        # Business Logic
 ┃ ┗ 📜 server.js       # Backend Entry Point
 ┣ 📂 data              # Sample Data
 ┣ 📜 vercel.json       # Vercel Configuration
 ┗ 📜 README.md         # Documentation
```

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** instance

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
    npm start
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
