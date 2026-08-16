# Hacker House Goa 2026 — Task 1

## Find Your People

A personalized **Hacker House Goa 2026 Builder ID Card Generator** built for Task 1 of the HH Goa 2026 shortlisting challenge.

The idea goes beyond a basic photo-frame generator: users create a shareable builder identity that communicates **who they are, what they build, what they bring, and who they want to meet** at Hacker House Goa.

## Live Demo

**[hackerhousegoa2026-task1.vercel.app](https://hackerhousegoa2026-task1.vercel.app/)**

## What It Does

The experience is designed around a simple flow:

```text
Upload Photo
     ↓
Tell us about yourself
     ↓
Choose / generate your builder identity
     ↓
Find Your People
     ↓
Generate HH Goa Builder Card
     ↓
Download / Share on X
```

### Builder Profile

Users can provide information such as:

* Name
* What they build
* Stack / role
* People they want to meet
* What they bring
* What they care about

The information is then composed into a branded HH Goa 2026 identity card.

## Design Direction

The visual language follows the HH Goa identity shown in the provided reference material:

* Dark green
* Yellow
* Pink / red accents
* Cream
* Goa-inspired illustrations
* Geometric patterns
* Bold typography
* Event-badge aesthetic
* Builder-focused information hierarchy

The goal was to make the output feel like an **HH Goa artifact**, rather than a generic developer profile card.

## Key Features

### Dynamic Builder Identity

Each generated card contains a unique builder identity including:

* Builder ID
* Builder title
* Personal information
* Stack / role
* Networking interests

### Find Your People

The core concept is the networking layer.

Instead of simply asking:

> "What does this person look like?"

the card answers:

> **"Who is this person, what do they build, and who should they meet?"**

This makes the generated image useful beyond simply being an event badge.

### Real Photo Support

The generator is designed to handle real user photos, including:

* JPG
* PNG
* HEIC
* Portrait images
* Landscape images
* Different aspect ratios

The image is composed into the card without requiring the user to manually crop it beforehand.

### Downloadable Output

The generated card is rendered as an actual image file rather than just being a visual HTML component.

### X Sharing

The generated identity can be shared through a pre-filled X post using:

`#FrameInGoa`

## Tech Stack

```text
React
TypeScript
Vite
Tailwind CSS
Canvas API
Vercel
```

The image-generation pipeline is primarily client-side:

```text
User Photo
    ↓
Image Processing
    ↓
Builder Data
    ↓
Layout Engine
    ↓
Canvas Renderer
    ↓
Generated PNG
```

This keeps generation fast and avoids unnecessary backend infrastructure.

## Project Structure

```text
src/
├── components/
│   ├── UploadZone
│   ├── BuilderForm
│   ├── CardPreview
│   └── ActionButtons
│
├── engine/
│   ├── canvasRenderer
│   ├── imageProcessor
│   └── layoutEngine
│
├── data/
│   └── builderTitles
│
├── utils/
│   ├── builderId
│   ├── image
│   └── share
│
├── assets/
│   └── hhgoa
│
└── App
```

## Why "Find Your People"?

The original task asks for a branded graphic that can be generated and shared on X. The brief also allows a Builder ID Card containing the user's photo, name, stack/role and generated builder title. 

**Find Your People** extends that idea into something more relevant to a builder-focused event:

```text
WHO AM I?
     +
WHAT DO I BUILD?
     +
WHO DO I WANT TO MEET?
     =
MY HH GOA BUILDER IDENTITY
```

The result is not just a profile picture.

It is a **conversation starter**.

## Task Requirements Covered

* [x] Photo upload
* [x] Builder information
* [x] Branded HH Goa graphic
* [x] Fast client-side generation
* [x] Real image output
* [x] Download
* [x] X sharing
* [x] `#FrameInGoa`
* [x] No login/signup
* [x] Mobile-friendly design
* [x] Real-photo aspect-ratio handling
* [x] HH Goa visual identity

The official task specifically requires the upload → generation → download/share flow, support for real photos including HEIC, no signup gate, mobile usability, and a downloadable image output. 

## Built For

**Hacker House Goa 2026**

Task 1 — Frame / ID Card Generator

**#FrameInGoa**
**#HHGOA2026**
