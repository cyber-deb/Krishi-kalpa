import { LanguageCode } from '../types';

export const DYNAMIC_DICTIONARY: Record<LanguageCode, Record<string, string>> = {
  en: {},
  hi: {
    // Headlines & Summary
    "Action Required: Attention Needed on Water & Nutrient Balance": "कार्रवाई आवश्यक: जल और पोषक तत्व संतुलन पर ध्यान दें",
    "Your farm conditions require 1-2 timely agronomic interventions to protect crop yield.": "फसल की पैदावार बचाने के लिए 1-2 कृषि संबंधी उपायों की आवश्यकता है।",
    "Farm Operating in Optimal Health Range": "खेत उत्तम स्वास्थ्य स्थिति में संचालित है",
    "All critical soil, moisture, and microclimate parameters are balanced.": "सभी महत्वपूर्ण मिट्टी, नमी और जलवायु संकेतक संतुलित हैं।",
    "Active Interventions Needed": "तत्काल कार्रवाई की आवश्यकता",
    "Stable & Optimal": "स्थिर और उत्तम",
    "Pending Tasks": "लंबित कार्य",
    "Action Items:": "आवश्यक कार्य:",
    "Current Status:": "वर्तमान स्थिति:",

    // Categories
    "SALINITY MANAGEMENT": "लवणता प्रबंधन",
    "Salinity Management": "लवणता प्रबंधन",
    "SMART IRRIGATION": "स्मार्ट सिंचाई",
    "Smart Irrigation": "स्मार्ट सिंचाई",
    "NUTRIENT MANAGEMENT": "पोषक तत्व प्रबंधन",
    "Nutrient Management": "पोषक तत्व प्रबंधन",
    "SOIL AMENDMENT": "मृदा सुधार",
    "Soil Amendment": "मृदा सुधार",
    "DISEASE PREVENTION": "रोग रोकथाम",
    "Disease Prevention": "रोग रोकथाम",
    "WEATHER PROTECTION": "मौसम सुरक्षा",
    "Weather Protection": "मौसम सुरक्षा",
    "ROUTINE MAINTENANCE": "नियमित देखभाल",
    "Routine Maintenance": "नियमित देखभाल",
    "Water Stress": "जल तनाव",
    "Nutrient Stress": "पोषक तत्व तनाव",
    "Waterlogging Hazard": "जलभराव का खतरा",
    "Degradation Alert": "मृदा क्षरण चेतावनी",
    "Water Conservation": "जल संरक्षण",
    "Over-fertilization": "अत्यधिक खाद",
    "Microclimate Stress": "सूक्ष्म जलवायु तनाव",
    "Compound Stress": "मिश्रित तनाव",
    "Optimal": "आदर्श",
    "Remediated": "उपचारित / संतुलित",
    "Water Conserved": "जल संरक्षित",

    // Priorities & Confidence
    "High Priority": "अति आवश्यक",
    "Medium Priority": "मध्यम प्राथमिकता",
    "Standard": "सामान्य",
    "Routine": "नियमित",
    "All Recommendations": "सभी सिफारिशें",
    "Confidence": "विश्वसनीयता",
    "Agronomic AI Verified": "कृषि AI द्वारा सत्यापित",

    // Action Titles
    "Hold Irrigation — Rain Imminent": "सिंचाई स्थगित रखें — भारी बारिश की संभावना",
    "Irrigate Root Zone Immediately": "जड़ों में तुरंत सिंचाई करें",
    "Apply Targeted Nitrogen Top-Dressing": "लक्षित नाइट्रोजन (यूरिया) का छिड़काव करें",
    "Halt Nitrogen Application (Excess Detected)": "नाइट्रोजन का प्रयोग रोकें (अत्यधिक मात्रा पाई गई)",
    "Supplement Phosphorus for Root Development": "जड़ों के विकास हेतु फॉस्फोरस डालें",
    "Apply Potassium for Stalk Strength": "तने की मजबूती हेतु पोटाश का प्रयोग करें",
    "Treat Soil Acidity with Agricultural Lime": "चूना डालकर मिट्टी का खट्टापन (अम्लता) दूर करें",
    "Apply Gypsum for Soil Alkalinity / Sodic Soil": "जिप्सम डालकर क्षारीय मिट्टी का सुधार करें",
    "Flush Excess Salinity & Improve Drainage": "अतिरिक्त लवणता हटाएं एवं जल निकासी सुधारें",
    "Preventive Bio-Fungicide Spray": "सुरक्षात्मक जैविक फफूंदनाशी का छिड़काव करें",
    "Farm Conditions are Stable & Balanced": "खेत की स्थिति स्थिर एवं संतुलित है",

    // Action Directives
    "Do not turn on irrigation pumps today.": "आज सिंचाई पंप चालू न करें।",
    "Turn ON drip/sprinkler system for 2.5 hours.": "ड्रिप/स्प्रिंकलर सिस्टम 2.5 घंटे के लिए चालू करें।",
    "Apply 25 kg/acre neem-coated urea or enriched vermicompost.": "25 किग्रा/एकड़ नीम लेपित यूरिया या वर्मीकंपोस्ट डालें।",
    "Do not apply any urea or nitrogenous fertilizers.": "कोई भी यूरिया या नाइट्रोजन उर्वरक न डालें।",
    "Apply 40 kg/acre Single Super Phosphate (SSP) near root zones.": "जड़ों के पास 40 किग्रा/एकड़ सिंगल सुपर फॉस्फेट (SSP) डालें।",
    "Foliar spray with 1% potassium sulfate or apply 20 kg/acre MOP.": "1% पोटेशियम सल्फेट का छिड़काव करें या 20 किग्रा/एकड़ MOP डालें।",
    "Broadcast 150 kg/acre agricultural lime (CaCO3) before next rain.": "अगली बारिश से पहले 150 किग्रा/एकड़ कृषि चूना बुरकें।",
    "Apply 100 kg/acre agricultural gypsum with organic FYM.": "100 किग्रा/एकड़ कृषि जिप्सम गोबर की खाद के साथ डालें।",
    "Conduct deep leaching with sweet canal water and clear field drainage ditches.": "मीठे पानी से गहरी सिंचाई कर लवण बहाएं और जल निकासी नालियां साफ करें।",
    "Apply preventive Trichoderma viride or Pseudomonas fluorescens spray.": "ट्राइकोडर्मा विरिडी या स्यूडोमोनास का सुरक्षात्मक छिड़काव करें।",
    "Maintain current irrigation and biological nutrient schedule.": "वर्तमान सिंचाई और जैविक पोषण समय-सारणी बनाए रखें।",

    // Action Impact & Why
    "WHY THIS MATTERS:": "यह क्यों जरूरी है:",
    "Why this matters:": "यह क्यों जरूरी है:",
    "EXPECTED RESULT:": "संभावित परिणाम:",
    "Expected Result:": "संभावित परिणाम:",
    "Saves ~20,000 Litres of groundwater and prevents nutrient wash-off.": "लगभग 20,000 लीटर भूजल की बचत और पोषक तत्वों का बहना रुकता है।",
    "Restores root hydration and prevents permanent grain yield penalty.": "जड़ों को नमी मिलती है और फसल पैदावार का नुकसान रुकता है।",
    "Boosts leaf chlorophyll synthesis and restores healthy green canopy.": "पत्तियों में क्लोरोफिल बढ़ाता है और फसल को हरा-भरा करता है।",
    "Saves ₹1,200/acre in wasted fertilizer and avoids groundwater nitrate pollution.": "₹1,200/एकड़ खाद खर्च बचता है और भूजल प्रदूषण रुकता है।",
    "Strengthens root architecture and boosts fertilizer uptake efficiency.": "जड़ों का ढांचा मजबूत होता है और खाद अवशोषण बढ़ता है।",
    "Reinforces cell wall thickness and improves drought/pest tolerance.": "तने की कोशिकाएं मजबूत होती हैं और कीट प्रतिरोधकता बढ़ती है।",
    "Restores soil pH to 6.5 and unlocks unavailable fertilizer nutrients.": "मिट्टी का pH 6.5 पर आता है और बंद पोषक तत्व खुलते हैं।",
    "Displaces excess sodium, improves soil porosity, and restores micronutrient uptake.": "अतिरिक्त सोडियम हटाता है और मिट्टी को भुरभुरा बनाता है।",
    "Prevents root tip burning and improves water absorption efficiency.": "जड़ों को जलने से बचाता है और जल अवशोषण क्षमता बढ़ाता है।",
    "Protects vegetative canopy from blast lesions with zero toxic residue.": "फसल को बिना किसी रासायनिक अवशेष के फफूंद से बचाता है।",
    "Preserves peak vegetative growth trajectory and maximizes net margin.": "फसल की अधिकतम वृद्धि बनाए रखता है और मुनाफा बढ़ाता है।",

    // Action Buttons
    "Confirm Rain Hold": "बारिश की प्रतीक्षा पुष्टि करें",
    "Start Irrigation Pump": "सिंचाई पंप चालू करें",
    "Mark as Reviewed": "समीक्षा पूर्ण चिह्नित करें",
    "Acknowledge N Halt": "यूरिया रोक स्वीकार करें",
    "View Lime Dosage": "चूने की मात्रा देखें",
    "View Gypsum Plan": "जिप्सम योजना देखें",
    "View P Plan": "फॉस्फोरस योजना देखें",
    "View Drainage Guide": "जल निकासी गाइड देखें",
    "Mark as Sprayed": "छिड़काव पूर्ण चिह्नित करें",
    "Record Routine Check": "नियमित जांच दर्ज करें",
    "Remediate Zone": "क्षेत्र का उपचार करें",
    "Start Irrigation": "सिंचाई शुरू करें",
    "Acknowledge": "स्वीकार करें",
    "Review Fertilizer Plan": "खाद योजना देखें",
    "Halt Application": "प्रयोग रोकें",
    "Flush Drainage": "नालियां साफ करें",
    "All Clear": "सब कुछ ठीक है",

    // Farm Map Labels
    "Spatial Farm Health Map": "डिजिटल खेत स्वास्थ्य मानचित्र",
    "Identified Issue:": "पाई गई समस्या:",
    "Identified Issue": "पाई गई समस्या",
    "Recommended Action:": "सुझाया गया उपाय:",
    "Recommended Action": "सुझाया गया उपाय",
    "Degradation Risk": "मृदा क्षरण जोखिम",
    "Current Moisture": "वर्तमान नमी",
    "Available Nitrogen (N)": "उपलब्ध नाइट्रोजन (N)",
    "Soil pH Reaction": "मिट्टी का pH स्तर",
    "Area": "क्षेत्रफल",
    "Status": "स्थिति",
    "Moisture": "नमी",
    "Optimal moisture and balanced NPK": "आदर्श नमी और संतुलित NPK पोषक तत्व",
    "Maintain regular surveillance": "नियमित निगरानी बनाए रखें",
    "Good soil structure and moisture": "उत्तम मिट्टी संरचना और संतुलित नमी",
    "Routine check": "नियमित जांच",
    "Balanced soil hydration": "संतुलित मृदा आर्द्रता",
    "No action needed": "किसी कार्रवाई की जरूरत नहीं",
    "Initiate drip line irrigation": "ड्रिप सिंचाई चालू करें",
    "Targeted neem-coated urea application": "नीम लेपित यूरिया का लक्षित प्रयोग",
    "Schedule irrigation run": "सिंचाई का समय निर्धारित करें",
    "Apply compost top dressing": "जैविक कंपोस्ट की ऊपरी परत डालें",
    "Clear drainage ditch": "जल निकासी नाली साफ करें",
    "Activate micro-sprinkler": "माइक्रो-स्प्रिंकलर चालू करें",
    "Zone A (North Block - 1.0 Acre)": "ज़ोन A (उत्तरी ब्लॉक - 1.0 एकड़)",
    "Zone B (Central Block - 0.8 Acre)": "ज़ोन B (मध्य ब्लॉक - 0.8 एकड़)",
    "Zone C (South Drainage Block - 0.6 Acre)": "ज़ोन C (दक्षिणी निकास ब्लॉक - 0.6 एकड़)",

    // Crop Types
    "Rice (Paddy)": "धान (चावल)",
    "Wheat": "गेहूं",
    "Cotton": "कपास",
    "Soybean": "सोयाबीन",
    "Maize": "मक्का",
    "Sugarcane": "गन्ना",
    "Tomato": "टमाटर",

    // Economics & Mandis
    "Input Expenditure & Profit Comparison": "लागत खर्च एवं शुद्ध मुनाफे की तुलना",
    "FINANCIAL METRIC": "वित्तीय संकेतक",
    "BENEFIT / IMPACT": "लाभ एवं प्रभाव",
    "Fertilizer & Nutrition Cost": "खाद एवं पोषण खर्च",
    "Water Pumping Electricity": "सिंचाई पंपिंग बिजली खर्च",
    "Labor & Operations": "मजदूरी एवं खेत कार्य",
    "Save": "बचत",
    "reduction": "की कमी",
    "gain": "अतिरिक्त लाभ",
    "Best Realization": "सर्वोत्तम शुद्ध प्राप्ति",
    "Wardha APMC Mandi": "वर्धा APMC मंडी",
    "Hinganghat Commercial APMC": "हिंगणघाट व्यावसायिक APMC",
    "Nagpur Kalamna Grain Terminal": "नागपुर कलमना अनाज टर्मिनल",
    "Amravati Cotton & Grain Mandi": "अमरावती कपास एवं अनाज मंडी",
    "Yavatmal APMC Yard": "यवतमाल APMC यार्ड",

    // Statuses & Weather
    "Scattered Clouds / Humid": "हल्के बादल / नम",
    "Pleasant / Sunny": "सुहावना / धूप",
    "Heavy Monsoon Rain": "भारी मानसूनी बारिश",
    "Heatwave / Dry": "लू / सूखा मौसम",
    "Rain Chance:": "बारिश की संभावना:",
    "Expected": "अनुमानित",
    "Pump: ON": "पंप: चालू (ON)",
    "Pump: OFF": "पंप: बंद (OFF)",
    "Pump: STANDBY": "पंप: स्टैंडबाय",
    "DO NOT IRRIGATE": "सिंचाई न करें",
    "IRRIGATE": "सिंचाई करें",
    "MONITOR": "निगरानी रखें",
    "Good": "अच्छा",
    "Healthy": "स्वस्थ",
    "Excellent": "उत्कृष्ट",
    "Moderate Risk": "मध्यम जोखिम",
    "Low Risk": "कम जोखिम",
    "High Risk": "उच्च जोखिम",
    "Critical Risk": "गंभीर जोखिम",
    "Vegetative": "वानस्पतिक अवस्था",
    "Vegetative Stage": "वानस्पतिक अवस्था",
    "Q / Acre": "क्विंटल / एकड़"
  },
  bn: {
    // Headlines & Summary
    "Action Required: Attention Needed on Water & Nutrient Balance": "জরুরি পদক্ষেপ: জল ও পুষ্টি উপাদানের ভারসাম্যে মনোযোগ দিন",
    "Your farm conditions require 1-2 timely agronomic interventions to protect crop yield.": "ফসলের ফলন সুরক্ষায় এখনই ১-২টি কৃষি সংক্রান্ত পদক্ষেপ নেওয়া প্রয়োজন।",
    "Farm Operating in Optimal Health Range": "জমি আদর্শ স্বাস্থ্য অবস্থায় রয়েছে",
    "All critical soil, moisture, and microclimate parameters are balanced.": "মাটির পুষ্টি, আর্দ্রতা এবং আবহাওয়ার সকল সূচক ভারসাম্যপূর্ণ আছে।",
    "Active Interventions Needed": "জরুরি পদক্ষেপ প্রয়োজন",
    "Stable & Optimal": "স্থির ও চমৎকার",
    "Pending Tasks": "বাকি কাজ",
    "Action Items:": "প্রয়োজনীয় কাজ:",
    "Current Status:": "বর্তমান অবস্থা:",

    // Categories
    "SALINITY MANAGEMENT": "লবণাক্ততা ব্যবস্থাপনা",
    "Salinity Management": "লবণাক্ততা ব্যবস্থাপনা",
    "SMART IRRIGATION": "স্মার্ট সেচ",
    "Smart Irrigation": "স্মার্ট সেচ",
    "NUTRIENT MANAGEMENT": "পুষ্টি ব্যবস্থাপনা",
    "Nutrient Management": "পুষ্টি ব্যবস্থাপনা",
    "SOIL AMENDMENT": "মাটি সংশোধন",
    "Soil Amendment": "মাটি সংশোধন",
    "DISEASE PREVENTION": "রোগ প্রতিরোধ",
    "Disease Prevention": "রোগ প্রতিরোধ",
    "WEATHER PROTECTION": "আবহাওয়া সুরক্ষা",
    "Weather Protection": "আবহাওয়া সুরক্ষা",
    "ROUTINE MAINTENANCE": "নিয়মিত পরিচর্যা",
    "Routine Maintenance": "নিয়মিত পরিচর্যা",
    "Water Stress": "জলের টান",
    "Nutrient Stress": "পুষ্টির ঘাটতি",
    "Waterlogging Hazard": "জলাবদ্ধতার ঝুঁকি",
    "Degradation Alert": "মাটির অবক্ষয় সতর্কতা",
    "Water Conservation": "জল সংরক্ষণ",
    "Over-fertilization": "অতিরিক্ত সার",
    "Microclimate Stress": "ক্ষতিকর জলবায়ু চাপ",
    "Compound Stress": "যৌগিক চাপ",
    "Optimal": "আদর্শ",
    "Remediated": "উপশমিত / নিরাময়কৃত",
    "Water Conserved": "জল সংরক্ষিত",

    // Priorities & Confidence
    "High Priority": "জরুরি অগ্রাধিকার",
    "Medium Priority": "মাঝারি অগ্রাধিকার",
    "Standard": "সাধারণ",
    "Routine": "নিয়মিত",
    "All Recommendations": "সকল পরামর্শ",
    "Confidence": "আস্থা",
    "Agronomic AI Verified": "কৃষি AI দ্বারা যাচাইকৃত",

    // Action Titles
    "Hold Irrigation — Rain Imminent": "সেচ স্থগিত রাখুন — ভারী বৃষ্টির সম্ভাবনা",
    "Irrigate Root Zone Immediately": "শিকড়ে অবিলম্বে সেচ প্রদান করুন",
    "Apply Targeted Nitrogen Top-Dressing": "নাইট্রোজেনের উপরিপ্রয়োগ করুন",
    "Halt Nitrogen Application (Excess Detected)": "ইউরিয়া প্রয়োগ অবিলম্বে বন্ধ করুন (অতিরিক্ত মাত্রা)",
    "Supplement Phosphorus for Root Development": "শিকড় মজবুত করতে ফসফরাস সার দিন",
    "Apply Potassium for Stalk Strength": "গাছের কাণ্ড শক্ত করতে পটাশ সার দিন",
    "Treat Soil Acidity with Agricultural Lime": "চুন প্রয়োগ করে মাটির অম্লত্ব দূর করুন",
    "Apply Gypsum for Soil Alkalinity / Sodic Soil": "জিপসাম দিয়ে ক্ষারীয় মাটির সংস্কার করুন",
    "Flush Excess Salinity & Improve Drainage": "অতিরিক্ত লবণাক্ততা দূর করুন ও নিষ্কাশন ব্যবস্থার উন্নতি করুন",
    "Preventive Bio-Fungicide Spray": "প্রতিরোধক জৈব ছত্রাকনাশক স্প্রে করুন",
    "Farm Conditions are Stable & Balanced": "জমির অবস্থা সম্পূর্ণ স্থিতিশীল ও ভারসাম্যপূর্ণ",

    // Action Directives
    "Do not turn on irrigation pumps today.": "আজ সেচ পাম্প চালু করবেন না।",
    "Turn ON drip/sprinkler system for 2.5 hours.": "ড্রিপ বা স্প্রিংকলার ২.৫ ঘণ্টার জন্য চালু করুন।",
    "Apply 25 kg/acre neem-coated urea or enriched vermicompost.": "২৫ কেজি/একর নিম-কোটেড ইউরিয়া বা কেঁচো সার দিন।",
    "Do not apply any urea or nitrogenous fertilizers.": "কোনো প্রকার ইউরিয়া বা নাইট্রোজেন সার দেবেন না।",
    "Apply 40 kg/acre Single Super Phosphate (SSP) near root zones.": "শিকড়ের কাছে ৪০ কেজি/একর সিঙ্গেল সুপার ফসফেট (SSP) দিন।",
    "Foliar spray with 1% potassium sulfate or apply 20 kg/acre MOP.": "১% পটাশিয়াম সালফেট স্প্রে করুন বা ২০ কেজি/একর MOP দিন।",
    "Broadcast 150 kg/acre agricultural lime (CaCO3) before next rain.": "পরবর্তী বৃষ্টির আগে ১৫০ কেজি/একর কৃষি চুন জমিতে ছিটিয়ে দিন।",
    "Apply 100 kg/acre agricultural gypsum with organic FYM.": "১০০ কেজি/একর কৃষি জিপসাম জৈব সারের সাথে মিশিয়ে দিন।",
    "Conduct deep leaching with sweet canal water and clear field drainage ditches.": "মিষ্টি জলের সাহায্যে গভীর সেচ দিয়ে লবণ ধুয়ে ফেলুন এবং নিকাশী নালা পরিষ্কার করুন।",
    "Apply preventive Trichoderma viride or Pseudomonas fluorescens spray.": "ট্রাইকোডার্মা ভিরিডি বা সিউডোমোনাস স্প্রে করুন।",
    "Maintain current irrigation and biological nutrient schedule.": "বর্তমান সেচ ও পুষ্টি ব্যবস্থাপনা সময়সূচি বজায় রাখুন।",

    // Action Impact & Why
    "WHY THIS MATTERS:": "এটি কেন জরুরি:",
    "Why this matters:": "এটি কেন জরুরি:",
    "EXPECTED RESULT:": "প্রত্যাশিত ফলাফল:",
    "Expected Result:": "প্রত্যাশিত ফলাফল:",
    "Saves ~20,000 Litres of groundwater and prevents nutrient wash-off.": "প্রায় ২০,০০০ লিটার ভূগর্ভস্থ জল বাঁচে ও পুষ্টির অপচয় রোধ হয়।",
    "Restores root hydration and prevents permanent grain yield penalty.": "শিকড়ে আর্দ্রতা ফিরে আসে এবং ফসলের ফলন হ্রাস রোধ হয়।",
    "Boosts leaf chlorophyll synthesis and restores healthy green canopy.": "পাতায় ক্লোরোফিল তৈরি বাড়ায় ও সবুজ পাতার বিস্তার ঘটায়।",
    "Saves ₹1,200/acre in wasted fertilizer and avoids groundwater nitrate pollution.": "একর প্রতি ₹১,২০০ অপচয় বাঁচে এবং ভূগর্ভস্থ জলের দূষণ রোধ হয়।",
    "Strengthens root architecture and boosts fertilizer uptake efficiency.": "শিকড় মজবুত করে এবং সার গ্রহণের ক্ষমতা বৃদ্ধি করে।",
    "Reinforces cell wall thickness and improves drought/pest tolerance.": "কোষের প্রাচীর শক্ত করে খরা ও পোকার আক্রমণ প্রতিরোধ করে।",
    "Restores soil pH to 6.5 and unlocks unavailable fertilizer nutrients.": "মাটির pH ৬.৫-এ ফিরিয়ে আনে এবং আবদ্ধ পুষ্টি উপাদান উন্মুক্ত করে।",
    "Displaces excess sodium, improves soil porosity, and restores micronutrient uptake.": "অতিরিক্ত সোডিয়াম দূর করে মাটির ছিদ্রযুক্ততা ও পুষ্টি গ্রহণ বাড়ায়।",
    "Prevents root tip burning and improves water absorption efficiency.": "শিকড় পোড়া রোধ করে এবং গাছের জল শোষণ ক্ষমতা বৃদ্ধি করে।",
    "Protects vegetative canopy from blast lesions with zero toxic residue.": "গাছপালাকে ক্ষতিকর রাসায়নিক ছাড়াই ব্লাস্ট রোগ থেকে রক্ষা করে।",
    "Preserves peak vegetative growth trajectory and maximizes net margin.": "ফসলের সর্বোচ্চ বৃদ্ধি নিশ্চিত করে এবং সর্বাধিক লাভ এনে দেয়।",

    // Action Buttons
    "Confirm Rain Hold": "বৃষ্টির অপেক্ষায় সেচ বন্ধ রাখুন",
    "Start Irrigation Pump": "সেচ পাম্প চালু করুন",
    "Mark as Reviewed": "পর্যালোচনা সম্পন্ন চিহ্নিত করুন",
    "Acknowledge N Halt": "ইউরিয়া প্রয়োগ স্থগিত রাখুন",
    "View Lime Dosage": "চুনের পরিমাণ দেখুন",
    "View Gypsum Plan": "জিপসাম পরিকল্পনা দেখুন",
    "View P Plan": "ফসফরাস পরিকল্পনা দেখুন",
    "View Drainage Guide": "জল নিষ্কাশন নির্দেশিকা দেখুন",
    "Mark as Sprayed": "স্প্রে সম্পন্ন হয়েছে",
    "Record Routine Check": "নিয়মিত পরীক্ষা লিপিবদ্ধ করুন",
    "Remediate Zone": "অংশের চিকিৎসা করুন",
    "Start Irrigation": "সেচ শুরু করুন",
    "Acknowledge": "স্বীকার করলাম",
    "Review Fertilizer Plan": "সার পরিকল্পনা দেখুন",
    "Halt Application": "প্রয়োগ বন্ধ করুন",
    "Flush Drainage": "নালা পরিষ্কার করুন",
    "All Clear": "সবকিছু ঠিক আছে",

    // Farm Map Labels
    "Spatial Farm Health Map": "জমির ডিজিটাল স্বাস্থ্য মানচিত্র",
    "Identified Issue:": "শনাক্ত সমস্যা:",
    "Identified Issue": "শনাক্ত সমস্যা",
    "Recommended Action:": "প্রস্তাবিত পদক্ষেপ:",
    "Recommended Action": "প্রস্তাবিত পদক্ষেপ",
    "Degradation Risk": "অবক্ষয়ের ঝুঁকি",
    "Current Moisture": "বর্তমান আর্দ্রতা",
    "Available Nitrogen (N)": "উপলব্ধ নাইট্রোজেন (N)",
    "Soil pH Reaction": "মাটির pH প্রতিক্রিয়া",
    "Area": "আয়তন",
    "Status": "অবস্থা",
    "Moisture": "আর্দ্রতা",
    "Optimal moisture and balanced NPK": "আদর্শ আর্দ্রতা ও সুষম NPK পুষ্টি",
    "Maintain regular surveillance": "নিয়মিত নজরদারি বজায় রাখুন",
    "Good soil structure and moisture": "উন্নত মাটির গঠন ও সুষম আর্দ্রতা",
    "Routine check": "নিয়মিত পর্যবেক্ষণ",
    "Balanced soil hydration": "সুষম মাটির আর্দ্রতা",
    "No action needed": "কোনো পদক্ষেপের প্রয়োজন নেই",
    "Initiate drip line irrigation": "ড্রিপ লাইনে সেচ শুরু করুন",
    "Targeted neem-coated urea application": "পরিমিত নিম-লেপিত ইউরিয়া প্রয়োগ করুন",
    "Schedule irrigation run": "সেচের সময়সূচি নির্ধারণ করুন",
    "Apply compost top dressing": "জৈব কম্পোস্টের উপরিপ্রয়োগ করুন",
    "Clear drainage ditch": "নিকাশী নালা পরিষ্কার করুন",
    "Activate micro-sprinkler": "মাইক্রো-স্প্রিংকলার চালু করুন",
    "Zone A (North Block - 1.0 Acre)": "অঞ্চল ক (উত্তর ব্লক - ১.০ একর)",
    "Zone B (Central Block - 0.8 Acre)": "অঞ্চল খ (মধ্য ব্লক - ০.৮ একর)",
    "Zone C (South Drainage Block - 0.6 Acre)": "অঞ্চল গ (দক্ষিণ নিষ্কাশন ব্লক - ০.৬ একর)",

    // Crop Types
    "Rice (Paddy)": "ধান (আমন/বোরো)",
    "Wheat": "গম",
    "Cotton": "তুলা",
    "Soybean": "সয়াবিন",
    "Maize": "ভুট্টা",
    "Sugarcane": "আখ",
    "Tomato": "টমেটো",

    // Economics & Mandis
    "Input Expenditure & Profit Comparison": "খরচ ও নিট মুনাফার তুলনামূলক হিসাব",
    "FINANCIAL METRIC": "আর্থিক সূচক",
    "BENEFIT / IMPACT": "সুবিধা ও প্রভাব",
    "Fertilizer & Nutrition Cost": "সার ও পুষ্টি উপাদান খরচ",
    "Water Pumping Electricity": "সেচের জল পাম্পিং বিদ্যুৎ খরচ",
    "Labor & Operations": "শ্রমিক ও চাষাবাদ খরচ",
    "Save": "সাশ্রয়",
    "reduction": "হ্রাস",
    "gain": "অতিরিক্ত লাভ",
    "Best Realization": "সর্বোচ্চ প্রাপ্তি",
    "Wardha APMC Mandi": "ওয়ার্ধা এপিএমসি মান্ডি",
    "Hinganghat Commercial APMC": "হিঙ্গনঘাট বাণিজ্যিক মান্ডি",
    "Nagpur Kalamna Grain Terminal": "নাগপুর কলমনা শস্য টার্মিনাল",
    "Amravati Cotton & Grain Mandi": "অমরাবতী তুলা ও শস্য মান্ডি",
    "Yavatmal APMC Yard": "যাবতমাল এপিএমসি ইয়ার্ড",

    // Statuses & Weather
    "Scattered Clouds / Humid": "আংশিক মেঘলা / আর্দ্র",
    "Pleasant / Sunny": "মনোরম / রৌদ্রোজ্জ্বল",
    "Heavy Monsoon Rain": "ভারী বর্ষণ",
    "Heatwave / Dry": "তীব্র তাপপ্রবাহ / শুষ্ক",
    "Rain Chance:": "বৃষ্টির সম্ভাবনা:",
    "Expected": "প্রত্যাশিত",
    "Pump: ON": "পাম্প: চালু (ON)",
    "Pump: OFF": "পাম্প: বন্ধ (OFF)",
    "Pump: STANDBY": "পাম্প: স্ট্যান্ডবাই",
    "DO NOT IRRIGATE": "সেচ দেবেন না",
    "IRRIGATE": "সেচ দিন",
    "MONITOR": "পর্যবেক্ষণ করুন",
    "Good": "ভালো",
    "Healthy": "স্বাস্থ্যকর / ভালো",
    "Excellent": "চমৎকার",
    "Moderate Risk": "মাঝারি ঝুঁকি",
    "Low Risk": "কম ঝুঁকি",
    "High Risk": "উচ্চ ঝুঁকি",
    "Critical Risk": "মারাত্মক ঝুঁকি",
    "Vegetative": "বৃদ্ধি পর্যায়",
    "Vegetative Stage": "বৃদ্ধি পর্যায়",
    "Q / Acre": "কুইন্টাল / একর"
  },
  mr: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "तातडीने कृती आवश्यक: पाणी आणि खत व्यवस्थापनावर लक्ष द्या",
    "Your farm conditions require 1-2 timely agronomic interventions to protect crop yield.": "पीक उत्पादन संरक्षणासाठी १-२ तातडीच्या उपाययोजनांची गरज आहे.",
    "Farm Operating in Optimal Health Range": "शेत आदर्श आरोग्य स्थितीत आहे",
    "All critical soil, moisture, and microclimate parameters are balanced.": "जमीन, ओलावा आणि हवामानाचे सर्व घटक संतुलित आहेत.",
    "Active Interventions Needed": "तातडीची कारवाई आवश्यक",
    "Stable & Optimal": "स्थिर व उत्कृष्ट",
    "Pending Tasks": "शिल्लक कामे",
    "Hold Irrigation — Rain Imminent": "पाणी देणे पुढे ढकला — पावसाची दाट शक्यता",
    "Irrigate Root Zone Immediately": "मुळांना तातडीने पाणी द्या",
    "Apply Targeted Nitrogen Top-Dressing": "युरिया खताची मात्रा द्या",
    "Halt Nitrogen Application (Excess Detected)": "युरियाचा वापर थांबवा (अतिरिक्त प्रमाण आढळले)",
    "Flush Excess Salinity & Improve Drainage": "अतिरिक्त क्षार वाहून काढा आणि निचरा सुधारा",
    "Confirm Rain Hold": "पावसामुळे पाणी देणे थांबवा",
    "Start Irrigation Pump": "सिंचन पंप सुरू करा",
    "Mark as Reviewed": "तपासले म्हणून नोंदवा",
    "Spatial Farm Health Map": "डिजिटल शेत आरोग्य नकाशा",
    "Rice (Paddy)": "भात (धान)",
    "Wheat": "गहू",
    "Cotton": "कापूस",
    "Soybean": "सोयाबीन",
    "Maize": "मका",
    "Sugarcane": "ऊस",
    "Tomato": "टोमॅटो",
    "Save": "बचत",
    "reduction": "कमी",
    "gain": "नफा",
    "Good": "उत्तम",
    "Healthy": "निरोगी",
    "Pump: ON": "पंप: चालू (ON)",
    "Pump: OFF": "पंप: बंद (OFF)",
    "DO NOT IRRIGATE": "पाणी देऊ नका",
    "IRRIGATE": "पाणी द्या",
    "Q / Acre": "क्विंटल / एकर"
  },
  te: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "చర్య అవసరం: నీరు మరియు పోషకాల సమతుల్యతపై శ్రద్ధ వహించండి",
    "Your farm conditions require 1-2 timely agronomic interventions to protect crop yield.": "దిగుబడిని కాపాడటానికి 1-2 వ్యవసాయ చర్యలు అవసరం.",
    "Farm Operating in Optimal Health Range": "పొలం సరైన ఆరోగ్య పరిధిలో ఉంది",
    "Active Interventions Needed": "తక్షణ చర్యలు అవసరం",
    "Stable & Optimal": "స్థిరంగా & అద్భుతంగా ఉంది",
    "Hold Irrigation — Rain Imminent": "నీటిపారుదల నిలిపివేయండి — వర్షం సూచన ఉంది",
    "Irrigate Root Zone Immediately": "వేర్లకు వెంటనే నీరు అందించండి",
    "Apply Targeted Nitrogen Top-Dressing": "నత్రజని ఎరువును అందించండి",
    "Halt Nitrogen Application (Excess Detected)": "యూరియా వాడకాన్ని ఆపండి (అధికంగా ఉంది)",
    "Flush Excess Salinity & Improve Drainage": "అదనపు లవణాలను తొలగించి డ్రైనేజీని మెరుగుపరచండి",
    "Confirm Rain Hold": "వర్షం దృష్ట్యా నీరు ఆపండి",
    "Start Irrigation Pump": "పంపు ఆన్ చేయండి",
    "Spatial Farm Health Map": "డిజిటల్ పొలం ఆరోగ్య పటం",
    "Rice (Paddy)": "వరి (వరి ధాన్యం)",
    "Wheat": "గోధుమ",
    "Cotton": "పత్తి",
    "Soybean": "సోయాబీన్",
    "Maize": "మొక్కజొన్న",
    "Sugarcane": "చెరకు",
    "Tomato": "టమోటా",
    "Save": "పొదుపు",
    "reduction": "తగ్గింపు",
    "gain": "లాభం",
    "Healthy": "ఆరోగ్యకరమైనది",
    "Pump: ON": "పంపు: ఆన్ (ON)",
    "Pump: OFF": "పంపు: ఆఫ్ (OFF)",
    "DO NOT IRRIGATE": "నీరు పెట్టవద్దు",
    "IRRIGATE": "నీరు పెట్టండి",
    "Q / Acre": "క్వింటా / ఎకరా"
  },
  ta: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "நடவடிக்கை தேவை: நீர் மற்றும் உர சமநிலையில் கவனம் செலுத்துங்கள்",
    "Your farm conditions require 1-2 timely agronomic interventions to protect crop yield.": "மகசூலைப் பாதுகாக்க 1-2 உடனடி வேளாண் நடவடிக்கைகள் தேவை.",
    "Farm Operating in Optimal Health Range": "பண்ணை சிறந்த ஆரோக்கிய நிலையில் உள்ளது",
    "Hold Irrigation — Rain Imminent": "பாசனத்தை நிறுத்துங்கள் — மழை வரக்கூடும்",
    "Irrigate Root Zone Immediately": "வேர்களுக்கு உடனடியாக நீர் பாய்ச்சவும்",
    "Apply Targeted Nitrogen Top-Dressing": "நைட்ரஜன் உரமிடுங்கள்",
    "Halt Nitrogen Application (Excess Detected)": "யூரியா இடுவதை நிறுத்துங்கள் (அதிக அளவு)",
    "Flush Excess Salinity & Improve Drainage": "உப்புத்தன்மையை அகற்றி வடிகால் வசதியை மேம்படுத்துங்கள்",
    "Confirm Rain Hold": "மழைக்காக பாசனத்தை நிறுத்துங்கள்",
    "Start Irrigation Pump": "மோட்டாரை இயக்கவும்",
    "Spatial Farm Health Map": "டிஜிட்டல் பண்ணை நில வரைபடம்",
    "Rice (Paddy)": "நெல் (நெற்பயிர்)",
    "Wheat": "கோதுமை",
    "Cotton": "பருத்தி",
    "Soybean": "சோயாபீன்",
    "Maize": "மக்காச்சோளம்",
    "Sugarcane": "கரும்பு",
    "Tomato": "தக்காளி",
    "Save": "சேமிப்பு",
    "reduction": "குறைப்பு",
    "gain": "லாபம்",
    "Healthy": "ஆரோக்கியமானது",
    "Pump: ON": "பம்பு: இயங்குகிறது (ON)",
    "Pump: OFF": "பம்பு: நிறுத்தப்பட்டது (OFF)",
    "DO NOT IRRIGATE": "தண்ணீர் பாய்ச்ச வேண்டாம்",
    "IRRIGATE": "தண்ணீர் பாய்ச்சவும்",
    "Q / Acre": "குவிண்டால் / ஏக்கர்"
  },
  gu: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "પગલાં જરૂરી: પાણી અને પોષક તત્વોના સંતુલન પર ધ્યાન આપો",
    "Hold Irrigation — Rain Imminent": "સિંચાઈ મુલતવી રાખો — વરસાદની શક્યતા",
    "Irrigate Root Zone Immediately": "મૂળ વિસ્તારમાં તરત સિંચાઈ કરો",
    "Apply Targeted Nitrogen Top-Dressing": "નાઈટ્રોજન ખાતર આપો",
    "Halt Nitrogen Application (Excess Detected)": "યુરિયા આપવાનું બંધ કરો (વધારે માત્રા)",
    "Flush Excess Salinity & Improve Drainage": "વધારાનો ક્ષાર દૂર કરો અને નિકાલ સુધારો",
    "Confirm Rain Hold": "વરસાદ માટે પાણી રોકો",
    "Start Irrigation Pump": "પંપ શરૂ કરો",
    "Spatial Farm Health Map": "ડિજિટલ ખેતર આરોગ્ય નકશો",
    "Rice (Paddy)": "ડાંગર (ચોખા)",
    "Wheat": "ઘઉં",
    "Cotton": "કપાસ",
    "Soybean": "સોયાબીન",
    "Maize": "મકાઈ",
    "Sugarcane": "શેરડી",
    "Tomato": "ટમેટા",
    "Save": "બચત",
    "reduction": "ઘટાડો",
    "gain": "નફો",
    "Healthy": "તંદુરસ્ત",
    "Pump: ON": "પંપ: ચાલુ (ON)",
    "Pump: OFF": "પંપ: બંધ (OFF)",
    "DO NOT IRRIGATE": "પાણી ન આપવું",
    "IRRIGATE": "પાણી આપો",
    "Q / Acre": "ક્વિન્ટલ / એકર"
  },
  kn: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "ಕ್ರಮ ಅಗತ್ಯವಿದೆ: ನೀರು ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಸಮತೋಲನದ ಕಡೆ ಗಮನ ಕೊಡಿ",
    "Hold Irrigation — Rain Imminent": "ನೀರಾವರಿ ಮುಂದೂಡಿ — ಮಳೆ ಬರುವ ಸಾಧ್ಯತೆ",
    "Irrigate Root Zone Immediately": "ತಕ್ಷಣ ನೀರು ಹಾಯಿಸಿ",
    "Apply Targeted Nitrogen Top-Dressing": "ಸಾರಜನಕ ಗೊಬ್ಬರ ನೀಡಿ",
    "Halt Nitrogen Application (Excess Detected)": "ಯೂರಿಯಾ ನಿಲ್ಲಿಸಿ (ಹೆಚ್ಚಿನ ಪ್ರಮಾಣ)",
    "Flush Excess Salinity & Improve Drainage": "ಹೆಚ್ಚುವರಿ ಲವಣಾಂಶ ತೆಗೆದು ಒಳಚರಂಡಿ ಸರಿಪಡಿಸಿ",
    "Confirm Rain Hold": "ಮಳೆಗಾಗಿ ನೀರು ನಿಲ್ಲಿಸಿ",
    "Start Irrigation Pump": "ಪಂಪ್ ಆನ್ ಮಾಡಿ",
    "Spatial Farm Health Map": "ಡಿಜಿಟಲ್ ಜಮೀನು ಆರೋಗ್ಯ ನಕ್ಷೆ",
    "Rice (Paddy)": "ಭತ್ತ (ಅಕ್ಕಿ)",
    "Wheat": "ಗೋಧಿ",
    "Cotton": "ಹತ್ತಿ",
    "Soybean": "ಸೋಯಾಬೀನ್",
    "Maize": "ಮೆಕ್ಕೆಜೋಳ",
    "Sugarcane": "ಕಬ್ಬು",
    "Tomato": "ಟೊಮೆಟೊ",
    "Save": "ಉಳಿತಾಯ",
    "reduction": "ಇಳಿಕೆ",
    "gain": "ಲಾಭ",
    "Healthy": "ಆರೋಗ್ಯಕರ",
    "Pump: ON": "ಪಂಪ್: ಆನ್ (ON)",
    "Pump: OFF": "ಪಂಪ್: ಆಫ್ (OFF)",
    "DO NOT IRRIGATE": "ನೀರು ಹಾಯಿಸಬೇಡಿ",
    "IRRIGATE": "ನೀರು ಹಾಯಿಸಿ",
    "Q / Acre": "ಕ್ವಿಂಟಾಲ್ / ಎಕರೆ"
  },
  ml: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "നടപടി ആവശ്യം: ജല-പോഷക സന്തുലിതാവസ്ഥയിൽ ശ്രദ്ധിക്കുക",
    "Hold Irrigation — Rain Imminent": "നനയ്ക്കുന്നത് മാറ്റിവെക്കുക — മഴ സാധ്യത",
    "Irrigate Root Zone Immediately": "ഉടൻ നനയ്ക്കുക",
    "Apply Targeted Nitrogen Top-Dressing": "യൂറിയ പ്രയോഗിക്കുക",
    "Halt Nitrogen Application (Excess Detected)": "യൂറിയ ഉപയോഗം നിർത്തുക",
    "Flush Excess Salinity & Improve Drainage": "ഉപ്പുരസം നീക്കി ഡ്രെയിനേജ് മെച്ചപ്പെടുത്തുക",
    "Confirm Rain Hold": "മഴയ്ക്കായി നന നിർത്തുക",
    "Start Irrigation Pump": "പമ്പ് ഓൺ ചെയ്യുക",
    "Spatial Farm Health Map": "ഡിജിറ്റൽ ഫാം ഹെൽത്ത് മാപ്പ്",
    "Rice (Paddy)": "നെല്ല് (അരി)",
    "Wheat": "ഗോതമ്പ്",
    "Cotton": "പരുത്തി",
    "Soybean": "സോയാബീൻ",
    "Maize": "ചോളം",
    "Sugarcane": "കരിമ്പ്",
    "Tomato": "തക്കാളി",
    "Save": "ലാഭം",
    "reduction": "കുറവ്",
    "gain": "ലാഭം",
    "Healthy": "ആരോഗ്യമുള്ളത്",
    "Pump: ON": "പമ്പ്: ഓൺ (ON)",
    "Pump: OFF": "പമ്പ്: ഓഫ് (OFF)",
    "DO NOT IRRIGATE": "നനയ്ക്കരുത്",
    "IRRIGATE": "നനയ്ക്കുക",
    "Q / Acre": "ക്വിന്റൽ / ഏക്കർ"
  },
  pa: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "ਕਾਰਵਾਈ ਜ਼ਰੂਰੀ: ਪਾਣੀ ਅਤੇ ਖਾਦ ਸੰਤੁਲਨ ਵੱਲ ਧਿਆਨ ਦਿਓ",
    "Hold Irrigation — Rain Imminent": "ਪਾਣੀ ਲਗਾਉਣਾ ਰੋਕੋ — ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ",
    "Irrigate Root Zone Immediately": "ਤੁਰੰਤ ਪਾਣੀ ਲਗਾਓ",
    "Apply Targeted Nitrogen Top-Dressing": "ਯੂਰੀਆ ਖਾਦ ਪਾਓ",
    "Halt Nitrogen Application (Excess Detected)": "ਯੂਰੀਆ ਪਾਉਣਾ ਬੰਦ ਕਰੋ",
    "Flush Excess Salinity & Improve Drainage": "ਵਾਧੂ ਖਾਰਾਪਣ ਕੱਢੋ ਅਤੇ ਨਿਕਾਸੀ ਸੁਧਾਰੋ",
    "Confirm Rain Hold": "ਮੀਂਹ ਲਈ ਪਾਣੀ ਰੋਕੋ",
    "Start Irrigation Pump": "ਪੰਪ ਚਲਾਓ",
    "Spatial Farm Health Map": "ਖੇਤ ਦਾ ਡਿਜੀਟਲ ਨਕਸ਼ਾ",
    "Rice (Paddy)": "ਝੋਨਾ (ਚੌਲ)",
    "Wheat": "ਕਣਕ",
    "Cotton": "ਨਰਮਾ/ਕਪਾਹ",
    "Soybean": "ਸੋਇਆਬੀਨ",
    "Maize": "ਮੱਕੀ",
    "Sugarcane": "ਗੰਨਾ",
    "Tomato": "ਟਮਾਟਰ",
    "Save": "ਬਚਤ",
    "reduction": "ਕਮੀ",
    "gain": "ਮੁਨਾਫ਼ਾ",
    "Healthy": "ਸਿਹਤਮੰਦ",
    "Pump: ON": "ਪੰਪ: ਚਾਲੂ (ON)",
    "Pump: OFF": "ਪੰਪ: ਬੰਦ (OFF)",
    "DO NOT IRRIGATE": "ਪਾਣੀ ਨਾ ਲਗਾਓ",
    "IRRIGATE": "ਪਾਣੀ ਲਗਾਓ",
    "Q / Acre": "ਕੁਇੰਟਲ / ਏਕੜ"
  },
  or: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "ତୁରନ୍ତ କାର୍ଯ୍ୟ ଆବଶ୍ୟକ: ଜଳ ଓ ପୋଷକ ସନ୍ତୁଳନ ଉପରେ ଧ୍ୟାନ ଦିଅନ୍ତୁ",
    "Hold Irrigation — Rain Imminent": "ଜଳସେଚନ ବନ୍ଦ ରଖନ୍ତୁ — ବର୍ଷାର ସମ୍ଭାବନା",
    "Irrigate Root Zone Immediately": "ତୁରନ୍ତ ପାଣି ଦିଅନ୍ତୁ",
    "Apply Targeted Nitrogen Top-Dressing": "ୟୁରିଆ ସାର ପ୍ରୟୋଗ କରନ୍ତୁ",
    "Halt Nitrogen Application (Excess Detected)": "ୟୁରିଆ ପ୍ରୟୋଗ ବନ୍ଦ କରନ୍ତୁ",
    "Flush Excess Salinity & Improve Drainage": "ଅଧିକ ଲବଣ ବାହାର କରନ୍ତୁ ଓ ନିଷ୍କାସନ ସୁଧାରନ୍ତୁ",
    "Confirm Rain Hold": "ବର୍ଷା ପାଇଁ ପାଣି ବନ୍ଦ କରନ୍ତୁ",
    "Start Irrigation Pump": "ପମ୍ପ ଚାଲୁ କରନ୍ତୁ",
    "Spatial Farm Health Map": "ଜମିର ଡିଜିଟାଲ୍ ସ୍ୱାସ୍ଥ୍ୟ ମାନଚିତ୍ର",
    "Rice (Paddy)": "ଧାନ",
    "Wheat": "ଗହମ",
    "Cotton": "କପା",
    "Soybean": "ସୋୟାବିନ୍",
    "Maize": "ମକା",
    "Sugarcane": "ଆଖୁ",
    "Tomato": "ବିଲାତି ବାଇଗଣ",
    "Save": "ସଞ୍ଚୟ",
    "reduction": "ହ୍ରାସ",
    "gain": "ଲାଭ",
    "Healthy": "ସ୍ୱସ୍ଥ୍ୟବାନ",
    "Pump: ON": "ପମ୍ପ: ଚାଲୁ (ON)",
    "Pump: OFF": "ପମ୍ପ: ବନ୍ଦ (OFF)",
    "DO NOT IRRIGATE": "ପାଣି ଦିଅନ୍ତୁ ନାହିଁ",
    "IRRIGATE": "ପାଣି ଦିଅନ୍ତୁ",
    "Q / Acre": "କ୍ୱିଣ୍ଟାଲ / ଏକର"
  },
  as: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "জৰুৰী পদক্ষেপ: পানী আৰু সাৰৰ সমতাত মন দিয়ক",
    "Hold Irrigation — Rain Imminent": "পানী দিয়া বন্ধ ৰাখক — বৰষুণৰ সম্ভাৱনা",
    "Irrigate Root Zone Immediately": "ততালিকে পানী দিয়ক",
    "Apply Targeted Nitrogen Top-Dressing": "ইউৰিয়া সাৰ প্ৰয়োগ কৰক",
    "Halt Nitrogen Application (Excess Detected)": "ইউৰিয়া প্ৰয়োগ বন্ধ কৰক",
    "Flush Excess Salinity & Improve Drainage": "অতিৰিক্ত লৱণ বাহিৰ কৰক আৰু নিকাশী ব্যৱস্থা উন্নত কৰক",
    "Confirm Rain Hold": "বৰষুণৰ বাবে পানী বন্ধ ৰাখক",
    "Start Irrigation Pump": "পাম্প চলাওক",
    "Spatial Farm Health Map": "পথাৰৰ ডিজিটেল স্বাস্থ্য মানচিত্ৰ",
    "Rice (Paddy)": "ধান",
    "Wheat": "গম",
    "Cotton": "কপাহ",
    "Soybean": "ছয়াবিন",
    "Maize": "মাকৈ",
    "Sugarcane": "কুঁহিয়াৰ",
    "Tomato": "বিলাহী",
    "Save": "ৰাহি",
    "reduction": "হ্ৰাস",
    "gain": "লাভ",
    "Healthy": "সুস্থ",
    "Pump: ON": "পাম্প: চলি আছে (ON)",
    "Pump: OFF": "পাম্প: বন্ধ (OFF)",
    "DO NOT IRRIGATE": "পানী নিদিব",
    "IRRIGATE": "পানী দিয়ক",
    "Q / Acre": "কুঁইণ্টল / একৰ"
  },
  ur: {
    "Action Required: Attention Needed on Water & Nutrient Balance": "فوری کارروائی: پانی اور کھاد کے توازن پر توجہ دیں",
    "Hold Irrigation — Rain Imminent": "آبپاشی موخر کریں — بارش کا امکان ہے",
    "Irrigate Root Zone Immediately": "فوری طور پر پانی لگائیں",
    "Apply Targeted Nitrogen Top-Dressing": "نائٹروجن کھاد ڈالیں",
    "Halt Nitrogen Application (Excess Detected)": "یوریا کا استعمال روک دیں",
    "Flush Excess Salinity & Improve Drainage": "اضافی نمکیات نکالیں اور نکاسی آب بہتر بنائیں",
    "Confirm Rain Hold": "بارش کے پیش نظر پانی روکیں",
    "Start Irrigation Pump": "پمپ آن کریں",
    "Spatial Farm Health Map": "کھیت کا ڈیجیٹل نقشہ",
    "Rice (Paddy)": "دھان (چاول)",
    "Wheat": "گندم",
    "Cotton": "کپاس",
    "Soybean": "سویا بین",
    "Maize": "مکئی",
    "Sugarcane": "گنا",
    "Tomato": "ٹماٹر",
    "Save": "بچت",
    "reduction": "کمی",
    "gain": "منافع",
    "Healthy": "صحت مند",
    "Pump: ON": "پمپ: آن (ON)",
    "Pump: OFF": "پمپ: آف (OFF)",
    "DO NOT IRRIGATE": "پانی نہ لگائیں",
    "IRRIGATE": "پانی لگائیں",
    "Q / Acre": "کوئنٹل / ایکڑ"
  }
};

/**
 * Intelligent Dynamic Text Localizer
 * Translates exact strings, crop names, metric badges, and parameterized patterns with variables.
 */
export function getLocalizedText(englishText: string, lang: LanguageCode): string {
  if (lang === 'en' || !englishText) return englishText;

  const trimmed = englishText.trim();
  const dict = DYNAMIC_DICTIONARY[lang];

  // 1. Direct dictionary match
  if (dict && dict[trimmed]) {
    return dict[trimmed];
  }

  // 2. Hindi fallback if regional translation is absent
  if (DYNAMIC_DICTIONARY.hi && DYNAMIC_DICTIONARY.hi[trimmed]) {
    return DYNAMIC_DICTIONARY.hi[trimmed];
  }

  // 3. Pattern & Template Translations (e.g. dynamic numbers, weather reasons, savings, confidence)

  // Rain hold reason pattern: "Satellite radar detects a 92% chance of 44.2 mm rain within 12 hours."
  const rainMatch = trimmed.match(/Satellite radar detects a (\d+)% chance of ([\d.]+) mm rain within (\d+) hours\.?/i);
  if (rainMatch) {
    const [, prob, mm, hrs] = rainMatch;
    if (lang === 'bn') return `স্যাটেলাইট রাডারে ${hrs} ঘণ্টার মধ্যে ${prob}% সম্ভাবনায় ${mm} মিমি বৃষ্টির পূর্বাভাস পাওয়া গেছে।`;
    if (lang === 'hi') return `उपग्रह रडार से ${hrs} घंटे में ${prob}% संभावना के साथ ${mm} मिमी बारिश का पता चला है।`;
    if (lang === 'mr') return `उपग्रह रडारवरून ${hrs} तासांत ${prob}% शक్యतेसह ${mm} मिमी पावसाचा अंदाज आहे.`;
    if (lang === 'te') return `ఉపగ్రహ రాడార్ ద్వారా ${hrs} గంటల్లో ${prob}% అవకాశంతో ${mm} మి.మీ వర్షం సూచించబడింది.`;
    if (lang === 'ta') return `செயற்கைக்கோள் ரேடார் மூலம் ${hrs} மணி நேரத்தில் ${prob}% வாய்ப்புடன் ${mm} மிமீ மழை எதிர்பார்க்கப்படுகிறது.`;
    return `${prob}% സാധ്യതയിൽ ${mm} মিমি વરસાદની આગાહી (${hrs} કલાક).`;
  }

  // Low moisture reason: "Soil moisture has dropped to 23.0%, below the critical 35% wilting margin for Rice (Paddy)."
  const moistureMatch = trimmed.match(/Soil moisture has dropped to ([\d.]+)%, below the critical (\d+)% wilting margin for (.*?)\.?$/i);
  if (moistureMatch) {
    const [, curM, critM, crop] = moistureMatch;
    const cropName = getLocalizedText(crop, lang);
    if (lang === 'bn') return `মাটির আর্দ্রতা কমে ${curM}% হয়েছে, যা ${cropName} ফসলের জন্য জরুরি ${critM}% সীমার নিচে।`;
    if (lang === 'hi') return `मिट्टी की नमी घटकर ${curM}% हो गई है, जो ${cropName} के लिए आवश्यक ${critM}% सीमा से कम है।`;
    if (lang === 'mr') return `मातीतील ओलावा कमी होऊन ${curM}% झाला आहे, जो ${cropName} पिकाच्या ${critM}% मर्यादेपेक्षा कमी आहे.`;
    return `Moisture: ${curM}% (Threshold: ${critM}%) for ${cropName}`;
  }

  // Low nitrogen reason: "Available soil nitrogen is low at 28.0 mg/kg during active vegetative tillering."
  const lowNMatch = trimmed.match(/Available soil nitrogen is low at ([\d.]+) mg\/kg during active vegetative tillering\.?/i);
  if (lowNMatch) {
    const [, nVal] = lowNMatch;
    if (lang === 'bn') return `সক্রিয় বৃদ্ধি পর্যায়ে মাটিতে উপলব্ধ নাইট্রোজেন কম (${nVal} মিগ্রা/কেজি) রয়েছে।`;
    if (lang === 'hi') return `वानस्पतिक अवस्था में मिट्टी में उपलब्ध नाइट्रोजन कम (${nVal} मिग्रा/किग्रा) है।`;
    if (lang === 'mr') return `वाढीच्या अवस्थेत जमिनीत उपलब्ध नत्र कमी (${nVal} मिग्रॅ/किलो) आहे.`;
  }

  // Excess nitrogen reason: "Soil nitrogen is 135.0 mg/kg (excessive). High N causes crop lodging and attracts sucking pests."
  const excessNMatch = trimmed.match(/Soil nitrogen is ([\d.]+) mg\/kg \(excessive\)\. High N causes crop lodging and attracts sucking pests\.?/i);
  if (excessNMatch) {
    const [, nVal] = excessNMatch;
    if (lang === 'bn') return `মাটিতে নাইট্রোজেনের পরিমাণ ${nVal} মিগ্রা/কেজি (অতিরিক্ত)। এর ফলে ফসল হেলে পড়ে এবং পোকা আক্রমণ করে।`;
    if (lang === 'hi') return `मिट्टी में नाइट्रोजन ${nVal} मिग्रा/किग्रा (अत्यधिक) है। इससे फसल गिरने और कीट लगने का खतरा होता है।`;
    if (lang === 'mr') return `मातीत नत्र ${nVal} मिग्रॅ/किलो (अतिरिक्त) आहे. यामुळे पीक लोळण्याची आणि कीड लागण्याची शक्यता वाढते.`;
  }

  // Phosphorus reason: "Phosphorus is deficient (28.0 mg/kg), restricting early root spread and tillering."
  const pMatch = trimmed.match(/Phosphorus is deficient \(([\d.]+) mg\/kg\), restricting early root spread and tillering\.?/i);
  if (pMatch) {
    const [, pVal] = pMatch;
    if (lang === 'bn') return `ফসফরাসের ঘাটতি (${pVal} মিগ্রা/কেজি) রয়েছে, যা শিকড়ের বিস্তার ও কুশি গঠনে বাধা দিচ্ছে।`;
    if (lang === 'hi') return `फॉस्फोरस की कमी (${pVal} मिग्रा/किग्रा) है, जिससे जड़ों का फैलाव और कल्ले फूटना रुक रहा है।`;
  }

  // Potassium reason: "Potassium level is 30.0 mg/kg, increasing vulnerability to lodging and fungal infection."
  const kMatch = trimmed.match(/Potassium level is ([\d.]+) mg\/kg, increasing vulnerability to lodging and fungal infection\.?/i);
  if (kMatch) {
    const [, kVal] = kMatch;
    if (lang === 'bn') return `পটাশের মাত্রা (${kVal} মিগ্রা/কেজি) কম, ফলে গাছ হেলে পড়া ও ছত্রাকের ঝুঁকি বৃদ্ধি পাচ্ছে।`;
    if (lang === 'hi') return `पोटाश का स्तर (${kVal} मिग्रा/किग्रा) कम है, जिससे फसल गिरने और फफूंद लगने का खतरा बढ़ रहा है।`;
  }

  // Salinity reason: "Electrical conductivity is high at 2.45 dS/m, causing root osmotic stress."
  const ecMatch = trimmed.match(/Electrical conductivity is high at ([\d.]+) dS\/m, causing root osmotic stress\.?/i);
  if (ecMatch) {
    const [, ecVal] = ecMatch;
    if (lang === 'bn') return `বিদ্যুৎ পরিবাহিতা (${ecVal} dS/m) বেশি হওয়ায় শিকড়ের জল শোষণে বাধা সৃষ্টি হচ্ছে।`;
    if (lang === 'hi') return `विद्युत चालकता (${ecVal} dS/m) अधिक होने से जड़ों के जल अवशोषण में बाधा आ रही है।`;
  }

  // Humidity blast reason: "Continuous high humidity (92%) and warm weather create high fungal blast risk."
  const blastMatch = trimmed.match(/Continuous high humidity \((\d+)%\) and warm weather create high fungal blast risk\.?/i);
  if (blastMatch) {
    const [, hVal] = blastMatch;
    if (lang === 'bn') return `টানা উচ্চ আর্দ্রতা (${hVal}%) ও উষ্ণ আবহাওয়ার কারণে ব্লাস্ট রোগের তীব্র ঝুঁকি তৈরি হয়েছে।`;
    if (lang === 'hi') return `लगातार उच्च आर्द्रता (${hVal}%) और गर्म मौसम से ब्लास्ट रोग का गंभीर खतरा है।`;
  }

  // Confidence pattern: "95% Confidence"
  const confMatch = trimmed.match(/^(\d+)%\s+Confidence$/i);
  if (confMatch) {
    const [, pct] = confMatch;
    if (lang === 'bn') return `${pct}% নিশ্চিত`;
    if (lang === 'hi') return `${pct}% विश्वास`;
    if (lang === 'mr') return `${pct}% खात्री`;
    if (lang === 'te') return `${pct}% ఖచ్చితత్వం`;
    if (lang === 'ta') return `${pct}% நம்பிக்கை`;
    return `${pct}% Confidence`;
  }

  // Saved liters pattern: "Saved: 52,800 L"
  const savedMatch = trimmed.match(/^Saved:\s*([\d,]+)\s*L$/i);
  if (savedMatch) {
    const [, liters] = savedMatch;
    if (lang === 'bn') return `সাশ্রয়: ${liters} লিটার`;
    if (lang === 'hi') return `बचत: ${liters} लीटर`;
    if (lang === 'mr') return `बचत: ${liters} लिटर`;
    if (lang === 'te') return `పొదుపు: ${liters} లీటర్లు`;
    if (lang === 'ta') return `சேமிப்பு: ${liters} லி`;
    return `Saved: ${liters} L`;
  }

  // Rating pattern: "Rating: A+" or "Rating: A"
  const ratingMatch = trimmed.match(/^Rating:\s*(.+)$/i);
  if (ratingMatch) {
    const [, score] = ratingMatch;
    if (lang === 'bn') return `রেটিং: ${score}`;
    if (lang === 'hi') return `रेटिंग: ${score}`;
    if (lang === 'mr') return `रेटिंग: ${score}`;
    if (lang === 'te') return `రేటింగ్: ${score}`;
    if (lang === 'ta') return `மதிப்பீடு: ${score}`;
    return `Rating: ${score}`;
  }

  // Gain pattern: "+₹26,213 gain"
  const gainMatch = trimmed.match(/^\+₹([\d,]+)\s+gain$/i);
  if (gainMatch) {
    const [, amt] = gainMatch;
    if (lang === 'bn') return `+₹${amt} অতিরিক্ত লাভ`;
    if (lang === 'hi') return `+₹${amt} अतिरिक्त लाभ`;
    if (lang === 'mr') return `+₹${amt} वाढीव नफा`;
    return `+₹${amt} gain`;
  }

  // Save percentage: "Save 21.7%"
  const savePctMatch = trimmed.match(/^Save\s+([\d.]+)%$/i);
  if (savePctMatch) {
    const [, pct] = savePctMatch;
    if (lang === 'bn') return `সাশ্রয় ${pct}%`;
    if (lang === 'hi') return `बचत ${pct}%`;
    if (lang === 'mr') return `बचत ${pct}%`;
    return `Save ${pct}%`;
  }

  // Zone dynamic issues & actions on Map
  if (trimmed.includes('Soil moisture at')) {
    const mMatch = trimmed.match(/Soil moisture at ([\d.]+)%/i);
    if (mMatch) {
      if (lang === 'bn') return `মাটির আর্দ্রতা ${mMatch[1]}% (স্বল্প)`;
      if (lang === 'hi') return `मिट्टी की नमी ${mMatch[1]}% (कम)`;
    }
  }

  if (trimmed.includes('Available nitrogen at') || trimmed.includes('Nitrogen deficient')) {
    const nMatch = trimmed.match(/(\d+(?:\.\d+)?)\s*mg\/kg/i);
    if (nMatch) {
      if (lang === 'bn') return `নাইট্রোজেনের ঘাটতি (${nMatch[1]} মিগ্রা/কেজি)`;
      if (lang === 'hi') return `नाइट्रोजन की कमी (${nMatch[1]} मिग्रा/किग्रा)`;
    }
  }

  if (trimmed.includes('High moisture') || trimmed.includes('Moisture deficit')) {
    const mMatch = trimmed.match(/(\d+(?:\.\d+)?)\s*%/i);
    if (mMatch) {
      if (lang === 'bn') return `অতিরিক্ত আর্দ্রতা (${mMatch[1]}%)`;
      if (lang === 'hi') return `अधिक नमी (${mMatch[1]}%)`;
    }
  }

  return englishText;
}
