# Power Watch: Appliance Energy Consumption Data Story

## Overview
In this exercise, you will develop a data story based on the TV Energy Consumption dataset. Using the website created in Exercise 0.2, you will extend your work to present a meaningful narrative supported by data visualisations.

Your goal is to communicate insights from the dataset in a clear and engaging way through your website and written explanation.

You must use the Exercise 3 folder in your existing forked repository and reuse the files created in Exercise 0.2.
---

## Target Audience & Story Context
The target audience for this visualisation includes:

Consumers interested in energy-efficient televisions
Policy makers and regulators interested in energy consumption trends
Researchers studying energy efficiency in consumer electronics
These audiences are interested in understanding how television energy consumption varies across models, sizes, and technologies, and how these factors influence overall energy usage.
---

## Key Data Insights & Sections

The data story is broken down into three core analytical sections:
1. **The Screen Size Trade-Off:** Upgrading from a 43-inch model (162 kWh / $40.50) to a massive 75-inch+ screen (764 kWh / $191.00) nearly quadruples annual energy consumption.
2. **Brand Efficiency Showdown:** Compares average energy efficiency star ratings across major manufacturers (featuring Hisense, LG, Kogan, Philips, and Samsung).
3. **Screen Technology & Power Draw:** Explores active mode power and yearly energy consumption across Standard LCD (88W / 334 kWh), LED-Backlit LCD (119W / 455 kWh), and OLED panels (130W / 486 kWh).

---

## About the Data

### Data Source
The dataset is derived from public product registration data provided by the **Exercise 2 TV file**, focusing on registered television appliances and their certified energy specifications.

### Data Processing
* Filtered and cleaned television records to isolate active power draw, star ratings, screen size categories, and display technologies.
* Aggregated data into structured averages by brand and screen class to highlight key trends.
* Estimated yearly running costs using a standardized benchmark electricity rate of **~$0.25/kWh**.

### Privacy
* The dataset consists entirely of commercial appliance registrations and public specifications. 
* It contains **no personally identifiable information (PII)** or private user data.

### Accuracy and Limitations
* **Laboratory Conditions:** Certified energy ratings and power draw numbers are based on standardized test procedures which may differ from real-world usage habits (e.g., user brightness settings, audio levels, and actual daily viewing hours).
* **Sample Size Discrepancies:** Sample sizes across manufacturers vary significantly (e.g., 1,102 registered models for Samsung compared to 126 models for Philips), which can affect direct brand comparisons.

### Ethics
* **Consumer Empowerment:** The project aims to promote transparency and sustainability by helping consumers make informed, energy-conscious purchasing decisions.
* **Transparent Assumptions:** All cost estimates clearly state the underlying electricity rate assumption ($0.25/kWh) to avoid misleading interpretations.

---

## AI Declaration
* **Generative AI Usage:** Generative AI was utilized to assist with HTML/CSS code structuring, layout design, and drafting textual content and documentation.

---

## Project Structure
* `index.html` – Home page
* `televisions.html` – Television appliance catalog/data view
* `about.html` – About Us page
* `datastory.html` – Interactive data story page featuring visual data tables
* `assets/` – Contains stylesheets (`styles.css`), images, and scripts (`script.js`)

---

## Author
* **Author:** Wong Jia Lun (2026)