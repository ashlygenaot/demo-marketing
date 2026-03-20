# Tracklytics

## Visit The Site

Check it out [here :)](https://tracklytics-one.vercel.app/)

<img width="1904" height="902" alt="Screenshot 2026-03-19 at 8 06 50 PM" src="https://github.com/user-attachments/assets/c2244328-2c35-4ccd-b1fc-0209a63857d7" />



## Introduction

Tracklytics is my first hands-on React project, built as part of my internship at 9Yaps. It's a campaign analytics dashboard that gave me practical experience working with React, TypeScript, Tailwind CSS, and component libraries like shadcn/ui, covering everything from data visualisation and state management to theming and responsive design.


## Features

- **Dashboard:** Overview of all active campaigns showing total impressions, clicks, spend, and average CPC at a glance, alongside a live clicks-over-time chart and active campaign list.

- **Campaigns Page:** Full campaign management table with the ability to add, edit, and delete campaigns. Includes a form dialog for creating new campaigns with platform, spend, conversions, and status fields.
  
- **Analytics Page:** Per-campaign breakdown with detailed metrics including CPC, conversion rate, and daily trends. Select any campaign from the dropdown to drill into its individual performance data.
  
- **Integrated Charts:** Interactive line charts built with Recharts displaying daily clicks and conversions trends. Charts are fully themed to match the purple design system and read CSS variables at runtime for accurate light and dark mode colors.

- **Responsive Layout:** Grid-based layout that adapts across screen sizes, stacking metric cards and charts vertically on smaller screens while displaying side-by-side on larger displays.

- **Dark Mode:** Full dark and light mode support powered by a custom Tailwind v4 CSS variable theme. Toggle between modes using the navbar button — all colors, borders, charts, and dialogs update automatically.
  
  
## Future Features I Would Add

- Date range filtering
- Export To CSV
- API Integration for data
- User Authentication
  

## Technologies Used

- React
- Vite
- Tailwind CSS
- Typescript
- ShadCN UI


## How to run locally
1. **Prerequisites:**

    Install Node.js and npm

   
3. **Clone the repository:**
 ```bash
    git clone https://github.com/ashlygenaot/demo-marketing.git
    cd demo-marketing
 ```

3. **Install Dependencies:**
  ```bash
    npm install
 ```

4. **Start the development server:**
```bash
    npm run dev
 ```

5. **Open the app:**

    The app will open automatically at http://localhost:5173
---

Thanks for reading! If you have any feedback, don't hesitate to reach out.
