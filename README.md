# 🌾 AgriShield AI

### Know your crop. Read the weather. Act at the right time.

AgriShield AI is an AI-powered agriculture and climate resilience web application that helps farmers turn real-world field conditions into clear, actionable crop advisories.

The platform combines **crop image analysis, farmer location, weather conditions, and crop information** to help answer three important questions:

> 🌱 **What's wrong with my crop?**
> 🩺 **What should I do?**
> 🌦️ **When should I act based on the upcoming weather?**

---

## 🎯 Problem

Farmers often need to make crop-management decisions using incomplete or difficult-to-interpret information. Identifying crop problems from visible symptoms and deciding when to take action can become more challenging when weather conditions are changing.

AgriShield AI acts as a real-time bridge between **raw field signals** and **actionable agronomic guidance**.

---

## 💡 Solution

The application follows this workflow:

```text
📸 Crop Photo
      ↓
🤖 AI Crop Analysis
      ↓
📍 Farmer Location
      ↓
🌦️ Weather Conditions
      ↓
🧠 Risk & Advisory Analysis
      ↓
🌱 Actionable Recommendation
      ↓
⏰ Potential Time to Act
```

Instead of simply identifying a possible crop problem, AgriShield AI combines crop conditions with environmental information to provide more context-aware guidance.

---

## ✨ Key Features

### 📸 Crop Health Analysis

Upload a photo of an affected crop leaf and receive an AI-assisted assessment of the possible crop condition.

### 📍 Location Detection

Use the device's location to understand the farmer's local environmental conditions.

### 🌦️ Weather Intelligence

Use current and forecast weather information including:

* Temperature
* Humidity
* Rain probability
* Precipitation
* Wind conditions
* Forecast trends

### 🧠 Weather-Aware Advisory

Combines crop health information with weather conditions to provide contextual recommendations.

### ⏰ Best Time to Act

Identifies potentially favorable, monitoring, or unfavorable periods based on upcoming weather conditions.

### 📊 Climate Risk Indicators

Provides understandable indicators for factors such as:

* Disease risk
* Rain risk
* Heat risk
* Humidity risk
* Wind risk

### 📱 Farmer-Friendly Interface

Designed with a simple and accessible interface so that important information can be understood quickly.

---

## 🛠️ Technology Stack

* **Frontend:** React
* **Language:** TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Charts:** Recharts
* **Icons:** Lucide React
* **AI/ML:** Crop image analysis
* **Weather:** Weather API
* **Location:** Browser Geolocation API

---

## 🏗️ Application Architecture

```text
                 ┌─────────────────┐
                 │     Farmer      │
                 └────────┬────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
        📸 Crop Photo  📍 Location  🌦️ Weather
              │           │           │
              └───────────┼───────────┘
                          ▼
                 ┌─────────────────┐
                 │   AI Analysis   │
                 └────────┬────────┘
                          ▼
                 ┌─────────────────┐
                 │ Advisory Engine │
                 └────────┬────────┘
                          ▼
                 ┌─────────────────┐
                 │ Farmer Advisory │
                 └─────────────────┘
```

---

## 🌱 Example Advisory

A farmer uploads a tomato leaf showing possible disease symptoms.

AgriShield AI can combine:

* Crop information
* Visual crop symptoms
* Current location
* Humidity
* Rain probability
* Upcoming forecast

and produce an advisory such as:

> **Possible Crop Issue:** Early Blight
> **Severity:** Moderate
> **Weather Risk:** Elevated
>
> Inspect affected and nearby plants regularly. Upcoming rainfall may make weather-sensitive field activity less suitable immediately before the expected rain. Reassess field conditions after the weather window and follow locally approved agronomic guidance.

The system is intended to provide **AI-assisted decision support**, not a guaranteed agricultural diagnosis.

---

## 🛡️ Safety & Responsible AI

AgriShield AI does not claim that AI predictions are guaranteed.

Recommendations are presented as decision support and should be considered alongside:

* Local agricultural guidance
* Product labels and locally approved practices
* Field conditions
* Qualified agricultural experts when necessary

The application avoids inventing pesticide dosages or unsupported chemical-treatment instructions.

---

## 🚀 Future Improvements

Potential future enhancements include:

* More crop and disease classes
* Dedicated computer-vision models
* Soil condition integration
* Satellite/remote-sensing data
* Crop-specific disease risk models
* Irrigation recommendations
* Pest detection
* Multilingual farmer support
* Voice-based interaction
* SMS/WhatsApp alerts
* Historical crop-health tracking

---

## 🏆 Hackathon Context

AgriShield AI was developed for the **Agriculture & Climate Resilience** challenge.

The project focuses on building a real-time bridge between:

**Raw field conditions → AI interpretation → weather intelligence → actionable agronomic guidance.**

The primary goal is to help farmers make more informed and better-timed decisions that can contribute to livelihood resilience and food security.

---

## ⚠️ Disclaimer

AgriShield AI provides AI-assisted information and should not be considered a replacement for professional agricultural advice.

Weather forecasts can change, and crop symptoms can have multiple causes. Farmers should verify important treatment decisions with appropriate local agricultural guidance.

---

## 👩‍💻 Project

**AgriShield AI**
AI-powered Agriculture & Climate Resilience Platform

Built using AI-assisted development and modern web technologies.
