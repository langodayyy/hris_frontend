# 🚀 HRIS - Human Resource Information System

> **"A Collaboration Project Based Learning between JTI Polinema X CMLABS"**

<!-- [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) -->
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](#)
[![AWS](https://custom-icon-badges.demolab.com/badge/AWS-%23FF9900.svg?logo=aws&logoColor=white)](#)
[![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)](https://www.figma.com/design/PUldPysBEi3A0bEf6ekvkx/Kuli-Digital?node-id=0-1&t=klla5dSopCOdjrNh-1)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)
[![Laravel](https://img.shields.io/badge/Laravel-%23FF2D20.svg?logo=laravel&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
[![Contributors](https://img.shields.io/github/contributors/langodayyy/hris_frontend.svg)](https://github.com/langodayyy/hris_frontend/graphs/contributors)

---

## 🎯 Table of Contents

* [🌟 System Description](#-system-description)
* [🧠 Team](#-team)
* [🛠️ Tech Stack](#️-tech-stack)
* [🏗️ System Architecture](#️-system-architecture)
* [🔗 API Documentation](#-api-documentation)
* [🌐 Deployed Web Application](#-deployed-web-application)
* [🚀 How to Set Up (Local Development)](#-how-to-set-up-local-development)
    * [Prerequisites](#prerequisites)
    * [Backend Setup (Laravel)](#backend-setup-laravel)
    * [Frontend Setup (Next.js)](#frontend-setup-nextjs)
    * [Frontend Employee Setup (Next.js)](#frontend-employee-setup-optional)
    * [Running the Applications](#running-the-applications)

---

## 🌟 System Description

Pengembangan produk berupa aplikasi untuk memudahkan aktivitas dan tugas tim HR yang akan dikembangkan dalam versi website. Aplikasi ini berfokus pada fitur utama yaitu manajemen data karyawan seperti data kepegawaian, surat menyurat,  absensi kehadiran, dan lembur serta menambahkan fitur langganan berbayar.

![HRIS Application Screenshot](/public/hris.jpeg)

---

## 🧠 Team

1. Ahmad Mumtaz Haris (2241720136/01)

    [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/mumtazharis/)
2. Lucky Kurniawan Langoday (2241720168/12)

    [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/langodayyy/)
3. Muhammad Kemal Nugraha (2241720044/14)

    [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/mkemaln/)
4. Silfi Nazarina (2241720054/21)

    [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/Silfinazarina/)

---

## 🛠️ Tech Stack

Aplikasi kami dibangun menggunakan tech stack yang modern dan andal untuk memastikan skalabilitas, performa, dan kemudahan pemeliharaan.

**Frontend:**

* **Next.js:** Framework React untuk sisi production, SSR, SSG, dan fitur utama lain.
* **React:** Library JavaScript untuk membangun UI.
* **Tailwind CSS:** Framework CSS berbasis utilitas untuk membangun desain khusus dengan cepat.
* **Shadcn UI:** Library UI modern dengan berbagai component UI. 

**Backend:**

* **Laravel:** Framework PHP yang kuat untuk membangun RestFulAPI aplikasi web.
* **PostgreSQL:** Basis data relasional yang kami gunakan untuk penyimpanan data.
* **Resend:** API Email untuk pengiriman pemberitahuan dari sistem.
* **Xendit:** Payment gateway untuk fitur langganan.

**Alat & Layanan Lainnya:**

* **Git:** Sistem kontrol versi.
* **GitHub:** Untuk menyimpan repositori kami dan pipeline CI/CD.
* **AWS:** Platform Cloud untuk menangani masalah deploy dan penyimpanan data.
 

---

## 🏗️ System Architecture

![HRIS System Architecture](/public/Hris-Architecture.png)

**Repository:**

- [Frontend Main App](https://github.com/langodayyy/hris_frontend.git)
- [Backend API](https://github.com/mumtazharis/hris_backend.git)
- [Frontend Employee App](https://github.com/langodayyy/hris_frontend-employee.git)

---

## 🌐 Deployed Web Application

Coba akses aplikasi kami!

* **Aplikasi:** https://hris.my.id/ 
* **API:** https://api.hris.my.id/api/ (tidak bisa diakses tanpa kredensial token) 

---

## 🚀 How to Set Up (Local Development)

Ikuti langkah berikut untuk menjalankan aplikasi kami di lokal!

### Prerequisites

* **Node.js v20.xx** 
* **npm**
* **PHP v8.3.xx**
* **Composer**
* **PostgreSQL**
* **Git**

### Backend Setup (Laravel)

1.  **Clone Backend Repository:**
    ```bash
    git clone https://github.com/mumtazharis/hris_backend.git
    cd hris_backend
    ```

2.  **Install Composer Dependency:**
    ```bash
    composer install
    ```

3.  **Konfigurasi Environment File:**
    ```bash
    cp .env.example .env
    ```
    Open `.env` and configure your database connection:
    ```dotenv
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=hris
    DB_USERNAME=your_database_user
    DB_PASSWORD=your_database_password
    ```

4.  **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```

5.  **Database Migrations:**
    ```bash
    php artisan migrate
    ```

6.  **Seed Database (Optional):**
    ```bash
    php artisan db:seed
    ```

7.  **Setup API key untuk:**
    ```bash
    GOOGLE_CLIENT_ID=

    XENDIT_SECRET_KEY=
    XENDIT_PUBLIC_KEY=
    XENDIT_WEBHOOK_VERIFICATION_TOKEN=

    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_DEFAULT_REGION=
    AWS_BUCKET=
    AWS_USE_PATH_STYLE_ENDPOINT=
    ```

    dan masukkan kedalam file .env

8.  **Mulai Laravel Development Server:**
    ```bash
    php artisan serve
    ```
    Lebih baik dijalankan pada `http://127.0.0.1:8000`.

### Frontend Setup (Next.js)

1.  **Clone Frontend Repository:**
    ```bash
    git clone https://github.com/langodayyy/hris_frontend.git
    cd hris_frontend
    ```

2.  **Install Node.js Dependency:**
    ```bash
    npm install --force
    ```

3.  **Konfigurasi Environment File pada file .env.local :**
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    NEXT_PUBLIC_APP_URL=http://localhost:3001 
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=
    NEXT_PUBLIC_MAPBOX_KEY=
    ```

4.  **Start Next.js Development Server:**
    ```bash
    npm run dev
    ```
    Lebih baik dijalankan pada `http://localhost:3000`.

### Frontend Employee Setup (Optional)

1.  **Clone Frontend Employee Repository:**
    ```bash
    git clone https://github.com/langodayyy/hris_frontend-employee.git
    cd hris_frontend-employee
    ```

2.  **Install Node.js Dependency:**
    ```bash
    npm install --force
    ```

3.  **Konfigurasi Environment File pada file .env.local :**
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=
    NEXT_PUBLIC_MAPBOX_KEY=
    ```

4.  **Start Next.js Development Server:**
    ```bash
    npm run dev
    ```
    Lebih baik dijalankan pada `http://localhost:3001`.

### Running the Applications

Setelah server pengembangan backend dan frontend berjalan, kamu dapat mengakses aplikasi frontend di browser melalui `http://localhost:3000`. Aplikasi ini akan berkomunikasi dengan API backend agar dapat berfungsi dengan baik.

---