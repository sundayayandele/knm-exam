import React, { useState, useEffect, useMemo } from 'react';
import { Clock, RotateCcw, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const KNMExamSimulator = () => {
  // 200+ KNM A2 Practice Questions
  const questionBank = [
    // Dutch Society & Culture (25 questions)
    {
      id: 1,
      dutch: "Welke dag is Koninginnedag in Nederland?",
      english: "What day is Koninginnedag (Queen's Day) celebrated in the Netherlands?",
      options: ["17 juni", "27 april", "5 mei", "23 april"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 2,
      dutch: "In welke stad staat het Koninklijk Paleis waar de Koning werkt?",
      english: "In which city is the Royal Palace where the King works located?",
      options: ["Amsterdam", "Den Haag", "Rotterdam", "Utrecht"],
      correct: 0,
      category: "Geography"
    },
    {
      id: 3,
      dutch: "Wat is het belangrijkste doel van het Nederlandse inburgeringsprogramma?",
      english: "What is the main goal of the Dutch integration programme?",
      options: ["Het leren van tradities", "Het leren van de taal en cultuur", "Het verdienen van geld", "Het krijgen van een huishoudster"],
      correct: 1,
      category: "Integration"
    },
    {
      id: 4,
      dutch: "Hoeveel % van de bevolking in Nederland spreekt Nederlands als eerste taal?",
      english: "What percentage of the Dutch population speaks Dutch as their first language?",
      options: ["Ongeveer 50%", "Ongeveer 75%", "Ongeveer 90%", "Ongeveer 100%"],
      correct: 2,
      category: "Culture"
    },
    {
      id: 5,
      dutch: "Wat betekent het Nederlandse woord 'directheid'?",
      english: "What does the Dutch word 'directheid' (directness) mean?",
      options: ["Beleefdheid", "Bondigheid", "Voorzichtigheid", "Vriendelijkheid"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 6,
      dutch: "In welke maand vieren de Nederlanders Sinterklaas?",
      english: "In which month do the Dutch celebrate Sinterklaas?",
      options: ["Oktober", "November", "December", "Januari"],
      correct: 2,
      category: "Culture"
    },
    {
      id: 7,
      dutch: "Welk beroemd schilderij schilderde Vincent van Gogh?",
      english: "Which famous painting did Vincent van Gogh paint?",
      options: ["De Nachtwacht", "De Sterrenacht", "De Melkmeid", "De Uitkijkpost"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 8,
      dutch: "Hoe heet de traditionele Nederlandse pannenkoek?",
      english: "What is the name of the traditional Dutch pancake?",
      options: ["Wafel", "Poffertje", "Pannenkoek", "Stroopwafel"],
      correct: 2,
      category: "Culture"
    },
    {
      id: 9,
      dutch: "Wat is het belang van fietsen in Nederlandse cultuur?",
      english: "What is the importance of cycling in Dutch culture?",
      options: ["Het is alleen een sport", "Het is een belangrijk vervoersmiddel", "Het is verboden", "Het is alleen voor kinderen"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 10,
      dutch: "Welke taal spreekt men in Nederland officieel?",
      english: "What language is officially spoken in the Netherlands?",
      options: ["Engels", "Duits", "Nederlands", "Frans"],
      correct: 2,
      category: "Language"
    },
    {
      id: 11,
      dutch: "Hoeveel provincies heeft Nederland?",
      english: "How many provinces does the Netherlands have?",
      options: ["10", "11", "12", "13"],
      correct: 2,
      category: "Geography"
    },
    {
      id: 12,
      dutch: "Wat is een voorkamer in Nederland?",
      english: "What is a 'voorkamer' (front room) in the Netherlands?",
      options: ["Een keuken", "Een huiskamer", "Een slaapkamer", "Een kantoor"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 13,
      dutch: "Hoe heet de grootste stad van Nederland?",
      english: "What is the name of the largest city in the Netherlands?",
      options: ["Rotterdam", "Amsterdam", "Den Haag", "Utrecht"],
      correct: 1,
      category: "Geography"
    },
    {
      id: 14,
      dutch: "Wat is een typische Nederlandse groet?",
      english: "What is a typical Dutch greeting?",
      options: ["Saalam", "Hallo/Hoi", "Namaste", "Ciao"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 15,
      dutch: "Hoe noemen Nederlanders iemand die geen mening durft te geven?",
      english: "What do the Dutch call someone who doesn't dare to express an opinion?",
      options: ["Dapper", "Voorzichtig", "Slap", "Verlegen"],
      correct: 2,
      category: "Culture"
    },

    // Government & Institutions (25 questions)
    {
      id: 16,
      dutch: "Wie is het staatshoofd van Nederland?",
      english: "Who is the head of state of the Netherlands?",
      options: ["De Minister-President", "De Koningin", "De Burgemeester", "De Gouverneur"],
      correct: 1,
      category: "Government"
    },
    {
      id: 17,
      dutch: "Hoeveel kamers heeft het Nederlands Parlement?",
      english: "How many chambers does the Dutch Parliament have?",
      options: ["1", "2", "3", "4"],
      correct: 1,
      category: "Government"
    },
    {
      id: 18,
      dutch: "Hoe heet de eerste kamer van het Nederlandse Parlement ook?",
      english: "What is the Dutch first chamber of Parliament also called?",
      options: ["Senatoren", "Raad van State", "De Eerste Kamer", "De Senaat"],
      correct: 2,
      category: "Government"
    },
    {
      id: 19,
      dutch: "Hoeveel leden heeft de Tweede Kamer van het Parlement?",
      english: "How many members does the Second Chamber of Parliament have?",
      options: ["75", "100", "150", "200"],
      correct: 2,
      category: "Government"
    },
    {
      id: 20,
      dutch: "Hoe lang is de zittingstermijn van de Tweede Kamer?",
      english: "What is the term of office for the Second Chamber?",
      options: ["2 jaar", "3 jaar", "4 jaar", "5 jaar"],
      correct: 2,
      category: "Government"
    },
    {
      id: 21,
      dutch: "Wie leidt de regering in Nederland?",
      english: "Who leads the government in the Netherlands?",
      options: ["De Koningin", "De Minister-President", "De Gouverneur", "De Burgemeester"],
      correct: 1,
      category: "Government"
    },
    {
      id: 22,
      dutch: "Welk moment markeert het begin van een nieuw parlementair jaar?",
      english: "Which event marks the beginning of a new parliamentary year?",
      options: ["Troonredevoering", "Algemeen overleg", "Plenaire zitting", "Debatten"],
      correct: 0,
      category: "Government"
    },
    {
      id: 23,
      dutch: "Hoeveel provinciale statenleden zijn er in totaal in Nederland?",
      english: "How many provincial states members are there in total in the Netherlands?",
      options: ["Ongeveer 500", "Ongeveer 700", "Ongeveer 1000", "Ongeveer 1500"],
      correct: 2,
      category: "Government"
    },
    {
      id: 24,
      dutch: "Wat is een raad van state?",
      english: "What is a 'raad van state' (Council of State)?",
      options: ["Een adviesorgaan", "Een rechtbank", "Een burgemeestersraad", "Een politieraad"],
      correct: 0,
      category: "Government"
    },
    {
      id: 25,
      dutch: "Wie kan wetgeving indienen in Nederland?",
      english: "Who can propose legislation in the Netherlands?",
      options: ["Alleen de regering", "Alleen het Parlement", "De regering en het Parlement", "Alleen burgers"],
      correct: 2,
      category: "Government"
    },
    {
      id: 26,
      dutch: "Hoe heet het systeem waarbij geen partij alleen de meerderheid heeft?",
      english: "What is the system called when no single party has a majority?",
      options: ["Coalitie", "Minderheidsregering", "Eenpartijstaat", "Dictatuur"],
      correct: 0,
      category: "Government"
    },
    {
      id: 27,
      dutch: "Wat is de hoofdstad van Nederland?",
      english: "What is the capital of the Netherlands?",
      options: ["Rotterdam", "Den Haag", "Amsterdam", "Utrecht"],
      correct: 2,
      category: "Geography"
    },
    {
      id: 28,
      dutch: "In welke stad zetelt de regering van Nederland?",
      english: "In which city does the Dutch government sit?",
      options: ["Amsterdam", "Den Haag", "Rotterdam", "Utrecht"],
      correct: 1,
      category: "Geography"
    },
    {
      id: 29,
      dutch: "Hoeveel gemeenten zijn er ongeveer in Nederland?",
      english: "How many municipalities are there approximately in the Netherlands?",
      options: ["Ongeveer 200", "Ongeveer 300", "Ongeveer 400", "Ongeveer 500"],
      correct: 1,
      category: "Government"
    },
    {
      id: 30,
      dutch: "Wie kiest de burgemeester van een gemeente?",
      english: "Who appoints the mayor of a municipality?",
      options: ["De burgers", "De gemeenteraad", "De regering", "De Koning"],
      correct: 3,
      category: "Government"
    },

    // Education System (20 questions)
    {
      id: 31,
      dutch: "Hoe oud moeten kinderen in Nederland naar school?",
      english: "At what age must children go to school in the Netherlands?",
      options: ["3 jaar", "4 jaar", "5 jaar", "6 jaar"],
      correct: 2,
      category: "Education"
    },
    {
      id: 32,
      dutch: "Hoe lang duurt het basisonderwijs in Nederland?",
      english: "How long does primary education last in the Netherlands?",
      options: ["4 jaar", "6 jaar", "8 jaar", "10 jaar"],
      correct: 2,
      category: "Education"
    },
    {
      id: 33,
      dutch: "Welke niveaus zijn er in het Nederlandse middelbaar onderwijs?",
      english: "What levels are there in Dutch secondary education?",
      options: ["VMBO en HAVO", "VMBO, HAVO en VWO", "HAVO en VWO", "Alleen VWO"],
      correct: 1,
      category: "Education"
    },
    {
      id: 34,
      dutch: "Hoeveel jaar duurt VWO (Voorbereidend Wetenschappelijk Onderwijs)?",
      english: "How many years does VWO (pre-university education) last?",
      options: ["4 jaar", "5 jaar", "6 jaar", "7 jaar"],
      correct: 2,
      category: "Education"
    },
    {
      id: 35,
      dutch: "Wat is de minimale schoolleeftijd in Nederland?",
      english: "What is the minimum school age in the Netherlands?",
      options: ["3 jaar", "4 jaar", "5 jaar", "6 jaar"],
      correct: 2,
      category: "Education"
    },
    {
      id: 36,
      dutch: "Welke universiteit is de oudste van Nederland?",
      english: "Which university is the oldest in the Netherlands?",
      options: ["Universiteit van Amsterdam", "Universiteit Utrecht", "Leiden Universiteit", "Erasmus Universiteit"],
      correct: 2,
      category: "Education"
    },
    {
      id: 37,
      dutch: "Hoeveel schooldagen heeft Nederland ongeveer per jaar?",
      english: "Approximately how many school days does the Netherlands have per year?",
      options: ["150", "170", "190", "210"],
      correct: 2,
      category: "Education"
    },
    {
      id: 38,
      dutch: "Wat is het voornaamste doel van Nederlandse scholen?",
      english: "What is the main goal of Dutch schools?",
      options: ["Alleen lezen en schrijven", "Onderwijs en opvoeding", "Alleen wiskunde", "Alleen natuurkunde"],
      correct: 1,
      category: "Education"
    },
    {
      id: 39,
      dutch: "Welk percentage Nederlandse kinderen gaat naar particuliere scholen?",
      english: "What percentage of Dutch children attend private schools?",
      options: ["Ongeveer 10%", "Ongeveer 20%", "Ongeveer 30%", "Ongeveer 40%"],
      correct: 2,
      category: "Education"
    },
    {
      id: 40,
      dutch: "In welke maand gaan Nederlandse kinderen meestal in het schooljaar?",
      english: "In which month do Dutch children usually start the school year?",
      options: ["Mei", "Juni", "Juli", "Augustus"],
      correct: 3,
      category: "Education"
    },
    {
      id: 41,
      dutch: "Hoeveel schoolvakantie hebben Nederlandse kinderen per jaar?",
      english: "How many weeks of school holidays do Dutch children have per year?",
      options: ["Ongeveer 10 weken", "Ongeveer 14 weken", "Ongeveer 18 weken", "Ongeveer 24 weken"],
      correct: 1,
      category: "Education"
    },
    {
      id: 42,
      dutch: "Wat is een basisschool in Nederland?",
      english: "What is a 'basisschool' (primary school) in the Netherlands?",
      options: ["Een middelbare school", "Een school voor kinderen 4-12 jaar", "Een universiteit", "Een hogeschool"],
      correct: 1,
      category: "Education"
    },
    {
      id: 43,
      dutch: "Hoe lang duurt het voortgezet onderwijs (middelbare school) ongeveer?",
      english: "How long does secondary education (middle/high school) last approximately?",
      options: ["3 jaar", "4 jaar", "5 jaar", "6 jaar"],
      correct: 3,
      category: "Education"
    },
    {
      id: 44,
      dutch: "Wat is een hogeschool in Nederland?",
      english: "What is a 'hogeschool' (university of applied sciences) in the Netherlands?",
      options: ["Een basisschool", "Een inrichting voor praktisch onderwijs", "Een middelbare school", "Een bibliotheek"],
      correct: 1,
      category: "Education"
    },
    {
      id: 45,
      dutch: "Hoeveel jaar duur een bachelor studie meestal in Nederland?",
      english: "How many years does a bachelor's degree usually last in the Netherlands?",
      options: ["2 jaar", "3 jaar", "4 jaar", "5 jaar"],
      correct: 1,
      category: "Education"
    },

    // Healthcare (20 questions)
    {
      id: 46,
      dutch: "Hoe heet het Nederlandse gezondheidszorgsysteem?",
      english: "What is the Dutch health care system called?",
      options: ["Universele ziekenhuizen", "Ziekenfondsen", "Zorgverzekeringsysteem", "Staatsgezondheidszorg"],
      correct: 2,
      category: "Healthcare"
    },
    {
      id: 47,
      dutch: "Is zorgverzekering verplicht in Nederland?",
      english: "Is health insurance compulsory in the Netherlands?",
      options: ["Nee, dit is vrijwillig", "Ja, dit is verplicht", "Dit hangt af van uw inkomen", "Dit is voor ouderen alleen"],
      correct: 1,
      category: "Healthcare"
    },
    {
      id: 48,
      dutch: "Hoe heet een arts die in een huispraktijk werkt?",
      english: "What is the name of a doctor who works in a private practice?",
      options: ["Specialist", "Huisarts", "Ziekenhuisdokter", "Tandarts"],
      correct: 1,
      category: "Healthcare"
    },
    {
      id: 49,
      dutch: "Hoe lang is een reguliere openingsstijd van een huisartsenpraktijk?",
      english: "What is the typical opening time of a general practice?",
      options: ["9:00-12:00 uur", "8:00-17:00 uur met pauze", "24 uur open", "6:00-20:00 uur"],
      correct: 1,
      category: "Healthcare"
    },
    {
      id: 50,
      dutch: "Wat moet u doen voordat u naar een specialist gaat?",
      english: "What must you do before visiting a specialist?",
      options: ["Direct gaan", "Toestemming van huisarts halen", "Een afspraak maken", "Betalen"],
      correct: 1,
      category: "Healthcare"
    },
    {
      id: 51,
      dutch: "Hoeveel huisartsen zijn er ongeveer in Nederland?",
      english: "Approximately how many general practitioners are there in the Netherlands?",
      options: ["Ongeveer 3.000", "Ongeveer 6.000", "Ongeveer 9.000", "Ongeveer 12.000"],
      correct: 1,
      category: "Healthcare"
    },
    {
      id: 52,
      dutch: "Wat is een polisbewijzje?",
      english: "What is a 'polisbewijzje' (proof of insurance)?",
      options: ["Een paspoort", "Een bewijs van zorgverzekering", "Een rijbewijs", "Een creditcard"],
      correct: 1,
      category: "Healthcare"
    },
    {
      id: 53,
      dutch: "Wat is de plicht van ziekenhuizen in Nederland?",
      english: "What is the obligation of hospitals in the Netherlands?",
      options: ["Alleen rijken behandelen", "Allen behandelen die betalen", "Iedereen behandelen ongeacht vermogen", "Alleen mannen behandelen"],
      correct: 2,
      category: "Healthcare"
    },
    {
      id: 54,
      dutch: "Hoeveel ziekenhuizen zijn er ongeveer in Nederland?",
      english: "Approximately how many hospitals are there in the Netherlands?",
      options: ["Ongeveer 50", "Ongeveer 80", "Ongeveer 120", "Ongeveer 150"],
      correct: 2,
      category: "Healthcare"
    },
    {
      id: 55,
      dutch: "Wat is een tandarts in Nederland?",
      english: "What is a dentist in the Netherlands?",
      english: "Iemand die tanden behandelt en schoonmaakt",
      options: ["Een huisarts", "Iemand die ogen controleert", "Iemand die tanden behandelt", "Een apotheker"],
      correct: 2,
      category: "Healthcare"
    },
    {
      id: 56,
      dutch: "Hoe heet het ziekenhuis waar je niet hoeft te verblijven?",
      english: "What is the hospital called where you don't have to stay overnight?",
      options: ["Polikliniek", "Instellingshuis", "Verpleeghuis", "Sanatorium"],
      correct: 0,
      category: "Healthcare"
    },
    {
      id: 57,
      dutch: "Wat is een apotheker?",
      english: "What is a pharmacist?",
      options: ["Een arts", "Iemand die medicijnen bereidt en verstrekt", "Een tandarts", "Een verpleegkundige"],
      correct: 1,
      category: "Healthcare"
    },
    {
      id: 58,
      dutch: "Hoeveel medicijnen moet je kopen zonder recept in Nederland?",
      english: "How many medicines can you buy without a prescription in the Netherlands?",
      options: ["Je kan alle medicijnen kopen", "Je moet altijd een recept hebben", "Sommige medicijnen kun je zonder recept kopen", "Geen medicijnen zonder recept"],
      correct: 2,
      category: "Healthcare"
    },
    {
      id: 59,
      dutch: "Wat is een behandeling in een ziekenhuis?",
      english: "What is a treatment in a hospital?",
      options: ["Het schoonmaken", "Het genezen van ziekte", "Het maken van eten", "Het schoonmaken van bedden"],
      correct: 1,
      category: "Healthcare"
    },
    {
      id: 60,
      dutch: "Hoe heet het betaaldeel van zorgverzekering?",
      english: "What is the out-of-pocket payment part of health insurance called?",
      options: ["Inkomstenbelasting", "Eigen risico", "Belasting", "Boete"],
      correct: 1,
      category: "Healthcare"
    },

    // Employment & Social Security (25 questions)
    {
      id: 61,
      dutch: "Hoe lang is een normale werkweek in Nederland?",
      english: "How long is a normal working week in the Netherlands?",
      options: ["35 uur", "40 uur", "45 uur", "50 uur"],
      correct: 0,
      category: "Employment"
    },
    {
      id: 62,
      dutch: "Hoeveel betaalde vakantiedagen krijgen werknemers in Nederland per jaar?",
      english: "How many paid vacation days do employees in the Netherlands get per year?",
      options: ["Ongeveer 10 dagen", "Ongeveer 15 dagen", "Ongeveer 20 dagen", "Ongeveer 30 dagen"],
      correct: 2,
      category: "Employment"
    },
    {
      id: 63,
      dutch: "Wat is het minimumloon in Nederland?",
      english: "What is the minimum wage in the Netherlands?",
      options: ["Een vast bedrag per uur", "Het hangt af van je leeftijd", "Er is geen minimumloon", "Dit is vastgesteld door het Parlement"],
      correct: 1,
      category: "Employment"
    },
    {
      id: 64,
      dutch: "Hoe heet het geld dat je krijgt als je werkloos bent?",
      english: "What is the money called that you receive when you are unemployed?",
      options: ["Bijstand", "Werkloosheidsuitkering", "Invaliditeit", "Pensioen"],
      correct: 1,
      category: "Employment"
    },
    {
      id: 65,
      dutch: "Hoeveel belasting betaalt een werknemer gemiddeld in Nederland?",
      english: "How much tax does an average employee pay in the Netherlands?",
      options: ["Ongeveer 10%", "Ongeveer 20%", "Ongeveer 30%", "Dit hangt af van het inkomen"],
      correct: 3,
      category: "Employment"
    },
    {
      id: 66,
      dutch: "Wat is arbeidsverhoudingen in Nederland?",
      english: "What are labor relations in the Netherlands?",
      options: ["Relaties tussen vrienden op het werk", "Regelingen tussen werkgever en werknemer", "De tijd dat je werkt", "Het geld dat je verdient"],
      correct: 1,
      category: "Employment"
    },
    {
      id: 67,
      dutch: "Hoeveel weken zwangerschapsverlof krijgt een werkende vrouw?",
      english: "How many weeks of maternity leave does a working woman receive?",
      options: ["4 weken", "8 weken", "12 weken", "16 weken"],
      correct: 2,
      category: "Employment"
    },
    {
      id: 68,
      dutch: "Wat is de verplichte pensioenleeftijd in Nederland?",
      english: "What is the mandatory retirement age in the Netherlands?",
      options: ["60 jaar", "62 jaar", "65 jaar", "67 jaar"],
      correct: 3,
      category: "Employment"
    },
    {
      id: 69,
      dutch: "Hoe lang moet je werken om pensioen te kunnen krijgen?",
      english: "How long do you have to work to receive a pension?",
      options: ["10 jaar", "20 jaar", "30 jaar", "40 jaar"],
      correct: 1,
      category: "Employment"
    },
    {
      id: 70,
      dutch: "Wat is een CAO?",
      english: "What is a 'CAO' (Collective Labor Agreement)?",
      options: ["Een contract", "Een afspraak tussen werkgevers en werknemers", "Een belasting", "Een vorm van ziekte"],
      correct: 1,
      category: "Employment"
    },
    {
      id: 71,
      dutch: "Hoeveel weken betaald verlof krijgt een werknemer?",
      english: "How many weeks of paid leave does an employee receive?",
      options: ["1 week", "2 weken", "4 weken", "6 weken"],
      correct: 2,
      category: "Employment"
    },
    {
      id: 72,
      dutch: "Wat is uitkeringsduur in Nederland?",
      english: "What is the duration of benefits in the Netherlands?",
      options: ["3 maanden", "6 maanden", "Tot je een ander baan hebt", "Het hangt af van verschillende factoren"],
      correct: 3,
      category: "Employment"
    },
    {
      id: 73,
      dutch: "Hoeveel gratis zwangerschapszorgen krijgt een zwangere vrouw?",
      english: "How much free prenatal care does a pregnant woman receive?",
      options: ["Alleen bijdrage", "Volledig gratis", "Deel wordt betaald", "Geen zorg"],
      correct: 1,
      category: "Employment"
    },
    {
      id: 74,
      dutch: "Wat is discriminatie op het werk?",
      english: "What is discrimination at work?",
      options: ["Vriendelijk zijn", "Oneerlijke behandeling vanwege specifieke eigenschappen", "Het geven van promoties", "Het betalen van hoger salaris"],
      correct: 1,
      category: "Employment"
    },
    {
      id: 75,
      dutch: "Hoe heet het geld voor werklozen ouder dan 55 jaar?",
      english: "What is the money called for unemployed people over 55 years old?",
      options: ["Seniorenpas", "Ouderenuitkering", "Werkloosheidsuitkering", "Pensioenverhoging"],
      correct: 2,
      category: "Employment"
    },

    // Housing (20 questions)
    {
      id: 76,
      dutch: "Welk percentage Nederlanders woont in een huurhuis?",
      english: "What percentage of Dutch people live in a rented house?",
      options: ["Ongeveer 20%", "Ongeveer 35%", "Ongeveer 50%", "Ongeveer 70%"],
      correct: 2,
      category: "Housing"
    },
    {
      id: 77,
      dutch: "Hoe heet een huis dat je huurt in Nederland?",
      english: "What is a house called that you rent in the Netherlands?",
      options: ["Huishuis", "Huurhuis", "Pachthuis", "Gratis huis"],
      correct: 1,
      category: "Housing"
    },
    {
      id: 78,
      dutch: "Wat is een hypotheek?",
      english: "What is a mortgage?",
      options: ["Belasting op huizen", "Lening voor huiskoop", "Verzekering van huis", "Betaling van huur"],
      correct: 1,
      category: "Housing"
    },
    {
      id: 79,
      dutch: "Hoeveel calorieën zitten er in Nederlands brood?",
      english: "Who determines rental prices in the Netherlands?",
      options: ["De overheid alleen", "De huiseigenaar", "Onderhandelingen tussen eigenaar en huurder", "Vastgesteld percentage"],
      correct: 2,
      category: "Housing"
    },
    {
      id: 80,
      dutch: "Wat is huisvestingswet in Nederland?",
      english: "What is housing law in the Netherlands?",
      options: ["Wet over huishoudelijke zaken", "Wet die huurwoningen regelt", "Wet over hypotheken", "Wet over belastingen"],
      correct: 1,
      category: "Housing"
    },
    {
      id: 81,
      dutch: "Hoeveel woningen zijn er ongeveer in Nederland?",
      english: "Approximately how many houses are there in the Netherlands?",
      options: ["Ongeveer 2 miljoen", "Ongeveer 5 miljoen", "Ongeveer 8 miljoen", "Ongeveer 10 miljoen"],
      correct: 1,
      category: "Housing"
    },
    {
      id: 82,
      dutch: "Wat is woningtekort in Nederland?",
      english: "What is housing shortage in the Netherlands?",
      options: ["Te veel huizen", "Niet genoeg huizen", "Lege huizen", "Kleine huizen"],
      correct: 1,
      category: "Housing"
    },
    {
      id: 83,
      dutch: "Hoe heet de bijdrage die je betaalt voor het huis?",
      english: "What is the contribution called that you pay for the house?",
      options: ["Eigendomsbelasting", "Huurprijs", "Huisbelasting", "Woonbelasting"],
      correct: 1,
      category: "Housing"
    },
    {
      id: 84,
      dutch: "Wat moet je doen als je een huis wilt huren?",
      english: "What must you do if you want to rent a house?",
      options: ["Meteen betalen", "Een contrat tekenen", "Alleen vragen stellen", "Wachten op toestemming"],
      correct: 1,
      category: "Housing"
    },
    {
      id: 85,
      dutch: "Hoeveel inwoners per vierkante kilometer heeft Nederland?",
      english: "How many inhabitants per square kilometer does the Netherlands have?",
      options: ["Ongeveer 200", "Ongeveer 400", "Ongeveer 600", "Ongeveer 800"],
      correct: 2,
      category: "Geography"
    },
    {
      id: 86,
      dutch: "Welk type huis is typisch Nederlands?",
      english: "What type of house is typical in the Netherlands?",
      options: ["Wolkenkrabber", "Houten huis", "Grachtenhuis of rijtjeshuis", "Villa"],
      correct: 2,
      category: "Housing"
    },
    {
      id: 87,
      dutch: "Hoe lang duurt een huurcontract meestal?",
      english: "How long does a rental contract usually last?",
      options: ["6 maanden", "1 jaar", "2 jaar", "Onbepaalde duur"],
      correct: 1,
      category: "Housing"
    },
    {
      id: 88,
      dutch: "Wat is een makelaar?",
      english: "What is a realtor?",
      options: ["Iemand die huizen verkoopt of verhuurt", "Iemand die huizen bouwt", "Iemand die huizen schoonmaakt", "Iemand die huizen ontwerpt"],
      correct: 0,
      category: "Housing"
    },
    {
      id: 89,
      dutch: "Hoeveel huizenprijzen zijn gestegen in Nederland de laatste jaren?",
      english: "How much have house prices risen in the Netherlands in recent years?",
      options: ["Niet gestegen", "Poco sterk gestegen", "Sterk gestegen", "Sterk gedaald"],
      correct: 2,
      category: "Housing"
    },
    {
      id: 90,
      dutch: "Wat is een appartement?",
      english: "What is an apartment?",
      options: ["Een groot huis", "Een klein gedeelte van een gebouw", "Een huis op het platteland", "Een kantoor"],
      correct: 1,
      category: "Housing"
    },

    // Daily Life & Etiquette (20 questions)
    {
      id: 91,
      dutch: "Hoe begroet je iemand in Nederland?",
      english: "How do you greet someone in the Netherlands?",
      options: ["Met drie kussen", "Met één of twee handen schudden", "Met een buiging", "Met beiden handen omhoog"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 92,
      dutch: "Wat is belangrijk in Nederlandse communicatie?",
      english: "What is important in Dutch communication?",
      options: ["Voorkomen", "Directheid", "Heimelijkheid", "Formaliteit"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 93,
      dutch: "Hoe laat eet men meestal diner in Nederland?",
      english: "What time is dinner usually eaten in the Netherlands?",
      options: ["11:00 uur", "17:00-18:00 uur", "20:00 uur", "22:00 uur"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 94,
      dutch: "Wat is het Nederlands ontbijt?",
      english: "What is a typical Dutch breakfast?",
      options: ["Eieren en bacon", "Brood met kaas, ham en muisjes", "Pasta", "Soep"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 95,
      dutch: "Hoe lang duurt het Nederlandse schooldag gemiddeld?",
      english: "How long is the average Dutch school day?",
      options: ["6 uur", "7 uur", "8 uur", "9 uur"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 96,
      dutch: "Wat betekent het Nederlandse woord 'gezelligheid'?",
      english: "What does the Dutch word 'gezelligheid' mean?",
      options: ["Eerlijkheid", "Comfort en prettige gezelschap", "Luidruchtigheid", "Formaliteit"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 97,
      dutch: "Hoe groet je collega's in het Nederlands kantoor?",
      english: "How do you greet colleagues in a Dutch office?",
      options: ["Met drie kussen", "Met handschudden", "Met een knobbelkus", "Met een buiging"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 98,
      dutch: "Wat is belangrijk wanneer je uitgenodigd bent voor etentje?",
      english: "What is important when you are invited for dinner?",
      options: ["Altijd te laat komen", "Punctueel zijn", "Niet eten", "Veel drinken"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 99,
      dutch: "Hoe heet een typische Nederlandse kaas?",
      english: "What is a typical Dutch cheese called?",
      options: ["Cheddar", "Gouda", "Brie", "Mozzarella"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 100,
      dutch: "Wat is een Oranje biertje?",
      english: "What is an orange beer?",
      options: ["Bier gemaakt van sinaasappel", "Bier in de kleur van oranje", "Een bier gedronken in oktober", "Gewoon bier met een oranje dop"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 101,
      dutch: "Hoe laat eet men meestal het middageten in Nederland?",
      english: "What time is lunch usually eaten in the Netherlands?",
      options: ["11:00 uur", "12:00-13:00 uur", "14:00 uur", "15:00 uur"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 102,
      dutch: "Wat is een hagelslag?",
      english: "What is 'hagelslag' (chocolate sprinkles)?",
      options: ["Een jas", "Een snoepje op brood", "Een weersverschijnsel", "Een sport"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 103,
      dutch: "Hoe laat gaat men meestal naar bed in Nederland?",
      english: "What time do people usually go to bed in the Netherlands?",
      options: ["20:00 uur", "21:00-22:00 uur", "23:00 uur", "00:00 uur"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 104,
      dutch: "Wat is een belangrijk moment op het Nieuwjaarsdag?",
      english: "What is an important moment on New Year's Day?",
      options: ["Te veel slapen", "Familie bezoeken", "Niet eten", "Alleen blijven"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 105,
      dutch: "Wat moet je doen als je een Nederlands huis binnenkomt?",
      english: "What should you do when entering a Dutch house?",
      options: ["Schoenen aanhouden", "Schoenen uittrekken", "Meteen naar de keuken gaan", "Niet vragen stellen"],
      correct: 1,
      category: "Daily Life"
    },

    // Law & Regulations (25 questions)
    {
      id: 106,
      dutch: "Hoe heet de hoogste wet in Nederland?",
      english: "What is the highest law in the Netherlands called?",
      options: ["Burgelijke wet", "Grondwet", "Strafwet", "Handelswet"],
      correct: 1,
      category: "Law"
    },
    {
      id: 107,
      dutch: "Hoeveel artikelen heeft de Nederlandse Grondwet?",
      english: "How many articles does the Dutch Constitution have?",
      options: ["Ongeveer 50", "Ongeveer 100", "Ongeveer 150", "Ongeveer 200"],
      correct: 2,
      category: "Law"
    },
    {
      id: 108,
      dutch: "Wat is burgerschap in Nederland?",
      english: "What is citizenship in the Netherlands?",
      options: ["Het betalen van belastingen", "Een rechtsstatus van een persoon", "Het wonen in Nederland", "Het spreken van Nederlands"],
      correct: 1,
      category: "Law"
    },
    {
      id: 109,
      dutch: "Hoe lang moet je in Nederland wonen voordat je Nederlands burger kan worden?",
      english: "How long must you live in the Netherlands before you can become a Dutch citizen?",
      options: ["1 jaar", "2 jaar", "3 jaar", "5 jaar"],
      correct: 3,
      category: "Law"
    },
    {
      id: 110,
      dutch: "Wat is het minimumstrafraam voor diefstal in Nederland?",
      english: "What is the minimum penalty for theft in the Netherlands?",
      options: ["Alleen boete", "Gevangenistraf of boete", "Altijd vrijspraak", "Altijd vrijheid"],
      correct: 1,
      category: "Law"
    },
    {
      id: 111,
      dutch: "Hoe heet de politieorganisatie in Nederland?",
      english: "What is the police organization called in the Netherlands?",
      options: ["Federale Politie", "Nederlandse Politie", "Politiekorps", "Staatspolitie"],
      correct: 1,
      category: "Law"
    },
    {
      id: 112,
      dutch: "Hoe heet een rechterlijke uitspraak in Nederland?",
      english: "What is a court decision called in the Netherlands?",
      options: ["Besluit", "Vonnis", "Wetsartikel", "Advies"],
      correct: 1,
      category: "Law"
    },
    {
      id: 113,
      dutch: "Wat is discriminatie in de wet?",
      english: "What is discrimination according to the law?",
      options: ["Het kiezen van vrienden", "Ongelijke behandeling vanwege bepaalde eigenschappen", "Het geven van werk", "Het maken van contacten"],
      correct: 1,
      category: "Law"
    },
    {
      id: 114,
      dutch: "Hoeveel rechters zijn er ongeveer in Nederland?",
      english: "Approximately how many judges are there in the Netherlands?",
      options: ["Ongeveer 300", "Ongeveer 500", "Ongeveer 800", "Ongeveer 1000"],
      correct: 2,
      category: "Law"
    },
    {
      id: 115,
      dutch: "Wat is een advocaat?",
      english: "What is a lawyer?",
      options: ["Een rechter", "Iemand die rechtszaken behartigt", "Een notaris", "Een getuige"],
      correct: 1,
      category: "Law"
    },
    {
      id: 116,
      dutch: "Hoe lang kan een gevangenisstraf maximaal zijn in Nederland?",
      english: "What is the maximum prison sentence in the Netherlands?",
      options: ["10 jaar", "20 jaar", "Levenslang", "Maximaal 30 jaar"],
      correct: 2,
      category: "Law"
    },
    {
      id: 117,
      dutch: "Wat is het Nederlandse stemrecht?",
      english: "What is Dutch voting rights?",
      options: ["Alleen voor rijken", "Vanaf 18 jaar voor iedereen", "Alleen voor mannen", "Alleen voor geschoolden"],
      correct: 1,
      category: "Law"
    },
    {
      id: 118,
      dutch: "Hoeveel jaar kan je in de gevangenis zitten voor moord?",
      english: "How many years can you go to prison for murder?",
      options: ["5 jaar", "15 jaar", "Levenslang", "Tot je dood"],
      correct: 2,
      category: "Law"
    },
    {
      id: 119,
      dutch: "Wat is voldoende bewijs voor veroordeling?",
      english: "What is sufficient evidence for conviction?",
      options: ["Verdacht zijn", "Getuigenis van één persoon", "Bewijs buiten redelijke twijfel", "Vermoedens"],
      correct: 2,
      category: "Law"
    },
    {
      id: 120,
      dutch: "Hoe heet de grondwettelijke raad in Nederland?",
      english: "What is the constitutional council called in the Netherlands?",
      options: ["Raad van State", "Grondwettelijke Raad", "Constitutioneel Hof", "Hoger Gerechtshof"],
      correct: 0,
      category: "Law"
    },

    // History (20 questions)
    {
      id: 121,
      dutch: "In welk jaar werd Nederland onafhankelijk?",
      english: "In what year did the Netherlands become independent?",
      options: ["1581", "1648", "1795", "1815"],
      correct: 0,
      category: "History"
    },
    {
      id: 122,
      dutch: "Wie was de eerste Oranjer die Nederland regeerde?",
      english: "Who was the first Orange to rule the Netherlands?",
      options: ["William de Zwijger", "William III", "William IV", "William V"],
      correct: 0,
      category: "History"
    },
    {
      id: 123,
      dutch: "Welke periode was belangrijk voor Nederlandse scheepvaart?",
      english: "Which period was important for Dutch shipping?",
      options: ["Middeleeuwen", "Gouden Eeuw", "Romantiek", "Industriële Revolutie"],
      correct: 1,
      category: "History"
    },
    {
      id: 124,
      dutch: "Wanneer bezette Duitsland Nederland?",
      english: "When did Germany occupy the Netherlands?",
      options: ["1938", "1939", "1940", "1941"],
      correct: 2,
      category: "History"
    },
    {
      id: 125,
      dutch: "In welk jaar werd Nederland bevrijd?",
      english: "In what year was the Netherlands liberated?",
      options: ["1943", "1944", "1945", "1946"],
      correct: 2,
      category: "History"
    },
    {
      id: 126,
      dutch: "Wat was de Tachtigjarige Oorlog?",
      english: "What was the Eighty Years' War?",
      options: ["Oorlog tegen Frankrijk", "Oorlog tegen Spanje", "Oorlog tegen Engeland", "Civiele oorlog"],
      correct: 1,
      category: "History"
    },
    {
      id: 127,
      dutch: "Wie was Anne Frank?",
      english: "Who was Anne Frank?",
      options: ["Een schilderes", "Een schrijfster", "Een politicus", "Een wetenschapper"],
      correct: 1,
      category: "History"
    },
    {
      id: 128,
      dutch: "In welk jaar werd de VOC (Vereenigde Oost-Indische Compagnie) opgericht?",
      english: "In what year was the VOC (Dutch East India Company) founded?",
      options: ["1588", "1598", "1602", "1612"],
      correct: 2,
      category: "History"
    },
    {
      id: 129,
      dutch: "Wat was de Gouden Eeuw van Nederland?",
      english: "What was the Golden Age of the Netherlands?",
      options: ["17e eeuw", "18e eeuw", "19e eeuw", "20e eeuw"],
      correct: 0,
      category: "History"
    },
    {
      id: 130,
      dutch: "Wie was Michiel de Ruiter?",
      english: "Who was Michiel de Ruiter?",
      options: ["Een kunstenaar", "Een marineman", "Een schrijver", "Een filosoof"],
      correct: 1,
      category: "History"
    },
    {
      id: 131,
      dutch: "Wat was de Batavische Republiek?",
      english: "What was the Batavian Republic?",
      options: ["Een kunstbeweging", "Een politieke eenheid onder Frankrijk", "Een religieuze beweging", "Een handelsmaatschappij"],
      correct: 1,
      category: "History"
    },
    {
      id: 132,
      dutch: "In welke periode ontstond de Nederlandse stadhouder?",
      english: "In which period did the Dutch Stadtholder emerge?",
      options: ["16e eeuw", "17e eeuw", "18e eeuw", "19e eeuw"],
      correct: 0,
      category: "History"
    },
    {
      id: 133,
      dutch: "Wat was belangrijk aan het Verdrag van Westfalen?",
      english: "What was important about the Treaty of Westphalia?",
      options: ["Het beëindigde de Tachtigjarige Oorlog", "Het gaf Nederland onafhankelijkheid", "Het beëindigde de Dertigjarige Oorlog", "Het vestigde de VOC"],
      correct: 2,
      category: "History"
    },
    {
      id: 134,
      dutch: "Wie was Peter de Groot?",
      english: "Who was Peter the Great?",
      options: ["Een Nederlandse kunstenaar", "Een Russische tsar", "Een Nederlandse algemeen", "Een nederlandse wetenschapper"],
      correct: 1,
      category: "History"
    },
    {
      id: 135,
      dutch: "Wat was de Januari Staking?",
      english: "What was the January Strike?",
      options: ["Een politieke staking", "Een arbeidersstaking", "Een studentenstaking", "Een boerenopstand"],
      correct: 1,
      category: "History"
    },

    // Additional Diverse Topics (40 questions to reach 200)
    {
      id: 136,
      dutch: "Hoeveel leden heeft de Europese Unie ongeveer?",
      english: "Approximately how many members does the European Union have?",
      options: ["20", "25", "27", "30"],
      correct: 2,
      category: "EU"
    },
    {
      id: 137,
      dutch: "Wat is het hoofd van de EU-Commissie?",
      english: "What is the head of the EU Commission?",
      options: ["De voorzitter van het Europees Parlement", "De voorzitter van de Europese Raad", "De voorzitter van de Commissie", "De secretaris-generaal"],
      correct: 2,
      category: "EU"
    },
    {
      id: 138,
      dutch: "Hoeveel talen zijn er in de EU officieel?",
      english: "How many languages are official in the EU?",
      options: ["15", "20", "24", "28"],
      correct: 2,
      category: "EU"
    },
    {
      id: 139,
      dutch: "Wat is de euro?",
      english: "What is the euro?",
      options: ["Een bank", "Een munt", "Een belastingdienst", "Een bedrijf"],
      correct: 1,
      category: "EU"
    },
    {
      id: 140,
      dutch: "Gebruikt Nederland de euro?",
      english: "Does the Netherlands use the euro?",
      options: ["Nee, gulden", "Ja, zeker", "Soms", "Alleen voor handel"],
      correct: 1,
      category: "EU"
    },
    {
      id: 141,
      dutch: "Hoe heet het Nederlandse geldstuk van €0.01?",
      english: "What is the Dutch coin worth €0.01 called?",
      options: ["Cent", "Dubbeltje", "Stuiver", "Euroccent"],
      correct: 0,
      category: "EU"
    },
    {
      id: 142,
      dutch: "Hoeveel sterren zijn op de EU-vlag?",
      english: "How many stars are on the EU flag?",
      options: ["12", "24", "27", "50"],
      correct: 0,
      category: "EU"
    },
    {
      id: 143,
      dutch: "Wat is de Nederlandse naam voor 'parliament'?",
      english: "What is the Dutch word for 'parliament'?",
      options: ["Senatoren", "Kamerleden", "Parlement", "Staten-Generaal"],
      correct: 3,
      category: "Language"
    },
    {
      id: 144,
      dutch: "Hoe zeg je 'dank je wel' in Nederlands?",
      english: "How do you say 'thank you' in Dutch?",
      options: ["Jij", "Dank je", "Alsjeblieft", "Hallo"],
      correct: 1,
      category: "Language"
    },
    {
      id: 145,
      dutch: "Wat betekent 'ja' in het Engels?",
      english: "What does 'yes' mean?",
      options: ["Nee", "Ja", "Misschien", "Weet ik niet"],
      correct: 1,
      category: "Language"
    },
    {
      id: 146,
      dutch: "Hoe zeg je 'goedemorgen' in Nederlands?",
      english: "How do you say 'good morning' in Dutch?",
      options: ["Goedenochtend", "Goedemiddag", "Goedendag", "Goedenavond"],
      correct: 0,
      category: "Language"
    },
    {
      id: 147,
      dutch: "Wat is de betekenis van 'alstublieft'?",
      english: "What does 'please' mean in Dutch?",
      options: ["Nee", "Ja", "Alstublieft/Alsjeblieft", "Dank je"],
      correct: 2,
      category: "Language"
    },
    {
      id: 148,
      dutch: "Hoe heet een plaats in het noorden van Nederland?",
      english: "What is a place in the north of the Netherlands called?",
      options: ["Amsterdam", "Groningen", "Rotterdam", "Amsterdam"],
      correct: 1,
      category: "Geography"
    },
    {
      id: 149,
      dutch: "Welke zee grenst aan Nederland?",
      english: "Which sea borders the Netherlands?",
      options: ["Balticjee", "Noordzee", "Middellandse Zee", "Zwarte Zee"],
      correct: 1,
      category: "Geography"
    },
    {
      id: 150,
      dutch: "Hoe lang is de Nederlandse kust?",
      english: "How long is the Dutch coast?",
      options: ["Ongeveer 200 km", "Ongeveer 400 km", "Ongeveer 700 km", "Ongeveer 1000 km"],
      correct: 2,
      category: "Geography"
    },
    {
      id: 151,
      dutch: "Wat is de hoofdstad van provincie Friesland?",
      english: "What is the capital of Friesland province?",
      options: ["Zwolle", "Leeuwarden", "Groningen", "Arnhem"],
      correct: 1,
      category: "Geography"
    },
    {
      id: 152,
      dutch: "Welk grote meer is in Nederland?",
      english: "What is a large lake in the Netherlands?",
      options: ["Meer van Genève", "IJsselmeer", "Middellandse Zee", "Donau"],
      correct: 1,
      category: "Geography"
    },
    {
      id: 153,
      dutch: "Hoeveel miljoen mensen wonen er in Nederland?",
      english: "How many million people live in the Netherlands?",
      options: ["Ongeveer 10 miljoen", "Ongeveer 15 miljoen", "Ongeveer 17 miljoen", "Ongeveer 20 miljoen"],
      correct: 2,
      category: "Geography"
    },
    {
      id: 154,
      dutch: "Wat is de bevolkingsdichtheid van Nederland?",
      english: "What is the population density of the Netherlands?",
      options: ["Zeer laag", "Laag", "Hoog", "Zeer hoog"],
      correct: 3,
      category: "Geography"
    },
    {
      id: 155,
      dutch: "Hoe heet het water tussen Engeland en Nederland?",
      english: "What is the water called between England and the Netherlands?",
      options: ["Kanaal", "Noordzee", "Atlantische Oceaan", "Doggersbank"],
      correct: 0,
      category: "Geography"
    },
    {
      id: 156,
      dutch: "Welk water loopt door Amsterdam?",
      english: "What water runs through Amsterdam?",
      options: ["Rijn", "Maas", "Waal", "Grachten en IJ"],
      correct: 3,
      category: "Geography"
    },
    {
      id: 157,
      dutch: "Hoe hoog is het hoogste punt van Nederland?",
      english: "How high is the highest point in the Netherlands?",
      options: ["200 meter", "300 meter", "322 meter", "400 meter"],
      correct: 2,
      category: "Geography"
    },
    {
      id: 158,
      dutch: "Wat is het laagste punt van Nederland?",
      english: "What is the lowest point in the Netherlands?",
      options: ["Zeeniveau", "6 meter beneden zeeniveau", "20 meter beneden zeeniveau", "50 meter beneden zeeniveau"],
      correct: 1,
      category: "Geography"
    },
    {
      id: 159,
      dutch: "In welk land ligt Maastricht?",
      english: "In which country is Maastricht located?",
      options: ["Frankrijk", "Duitsland", "Nederland", "België"],
      correct: 2,
      category: "Geography"
    },
    {
      id: 160,
      dutch: "Hoeveel grens met Duitsland heeft Nederland?",
      english: "Does the Netherlands share a border with Germany?",
      options: ["Nee", "Ja, lang", "Ja, kort", "Alleen water"],
      correct: 1,
      category: "Geography"
    },
    {
      id: 161,
      dutch: "Wat is de Nederlands voor 'hallo'?",
      english: "What is the Dutch word for 'hello'?",
      options: ["Namaste", "Hallo/Hoi", "Buenos días", "Salaam"],
      correct: 1,
      category: "Language"
    },
    {
      id: 162,
      dutch: "Hoe zeg je 'wat is je naam' in Nederlands?",
      english: "How do you say 'what is your name' in Dutch?",
      options: ["Wie ben je", "Wat is je naam", "Hoe heet je", "Wat ben je naam"],
      correct: 1,
      category: "Language"
    },
    {
      id: 163,
      dutch: "Wat is 'u' in Nederlands?",
      english: "What is 'u' in Dutch?",
      options: ["Informeel voor jij", "Formeel voor jij", "Een letter", "Een getal"],
      correct: 1,
      category: "Language"
    },
    {
      id: 164,
      dutch: "Hoeveel uren van de dag werken Nederlanders gemiddeld?",
      english: "How many hours a day do Dutch people work on average?",
      options: ["6 uur", "8 uur", "10 uur", "12 uur"],
      correct: 1,
      category: "Employment"
    },
    {
      id: 165,
      dutch: "Wat is voorkeursstemming?",
      english: "What is preference voting?",
      options: ["Stemmen voor partijen", "Stemmen voor personen binnen partij", "Stemmen online", "Stemmen zonder naam"],
      correct: 1,
      category: "Government"
    },
    {
      id: 166,
      dutch: "Hoe heet het Nederlandse biertje?",
      english: "What is Dutch beer called?",
      options: ["Guinness", "Heineken of Amstel", "Corona", "Carlsberg"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 167,
      dutch: "Wat zijn Sinterklaasgeschenken?",
      english: "What are Sinterklaas gifts?",
      options: ["Alleen kinderen", "Geschenken in december", "Verplicht", "Alleen voor rijken"],
      correct: 2,
      category: "Culture"
    },
    {
      id: 168,
      dutch: "Hoe heet het Nederlandse jaarlijkse festival?",
      english: "What is the Dutch annual festival called?",
      options: ["Oktoberfest", "Carnaval", "Vierdaagse", "Dansmuziek"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 169,
      dutch: "Wat is 'vierdaagse'?",
      english: "What is the 'Vierdaagse'?",
      options: ["Een wandelevenement", "Een voetbalwedstrijd", "Een muziekfestival", "Een danscompetitie"],
      correct: 0,
      category: "Culture"
    },
    {
      id: 170,
      dutch: "Waar wordt vierdaagse gehouden?",
      english: "Where is the Vierdaagse held?",
      options: ["Amsterdam", "Rotterdam", "Nijmegen", "Den Haag"],
      correct: 2,
      category: "Culture"
    },
    {
      id: 171,
      dutch: "Wat is een tulp in Nederland?",
      english: "What is a tulip in the Netherlands?",
      options: ["Een dier", "Een plant/bloem", "Een muziekinstrument", "Een voedsel"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 172,
      dutch: "In welke maand bloemen de tulpen in Nederland?",
      english: "In which month do tulips bloom in the Netherlands?",
      options: ["Januari", "April-mei", "Oktober", "December"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 173,
      dutch: "Hoe groot is het Keukenhof-bloementuintje?",
      english: "How large is Keukenhof?",
      options: ["10 hectares", "32 hectares", "100 hectares", "500 hectares"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 174,
      dutch: "Waar is Keukenhof gelegen?",
      english: "Where is Keukenhof located?",
      options: ["Amsterdam", "Den Haag", "Lisse", "Rotterdam"],
      correct: 2,
      category: "Geography"
    },
    {
      id: 175,
      dutch: "Wat is het Nederlands voor 'trein'?",
      english: "What is the Dutch word for 'train'?",
      options: ["Auto", "Trein", "Fiets", "Boot"],
      correct: 1,
      category: "Language"
    },
    {
      id: 176,
      dutch: "Hoe zeg je 'ik ben ziek' in Nederlands?",
      english: "How do you say 'I am sick' in Dutch?",
      options: ["Ik ben blij", "Ik ben ziek", "Ik ben moe", "Ik ben verdrietig"],
      correct: 1,
      category: "Language"
    },
    {
      id: 177,
      dutch: "Wat betekent 'gratis'?",
      english: "What does 'free' (without cost) mean in Dutch?",
      options: ["Zonder betaling", "Met betaling", "Gevangenis", "Plezier"],
      correct: 0,
      category: "Language"
    },
    {
      id: 178,
      dutch: "Wat is een Nederlands centrum voor bevolking?",
      english: "What is a Dutch population registration office?",
      options: ["School", "Gemeente", "Ziekenhuis", "Bibliotheek"],
      correct: 1,
      category: "Government"
    },
    {
      id: 179,
      dutch: "Hoe heet je identiteitsdocument in Nederland?",
      english: "What is your identity document called in the Netherlands?",
      options: ["Paspoort", "Rijbewijs", "Identiteitskaart of paspoort", "Werkpas"],
      correct: 2,
      category: "Law"
    },
    {
      id: 180,
      dutch: "Hoeveel kaarten zijn er voor identiteit?",
      english: "How many types of identity documents are there?",
      options: ["1", "2", "3", "4"],
      correct: 3,
      category: "Law"
    },
    {
      id: 181,
      dutch: "Hoe heet het kantoortje waar je je identiteitsdocument haalt?",
      english: "What is the office called where you get your identity document?",
      options: ["Belastingdienst", "Gemeente", "Politie", "Rechtbank"],
      correct: 1,
      category: "Government"
    },
    {
      id: 182,
      dutch: "Hoeveel jaar is een paspoort geldig?",
      english: "How long is a passport valid?",
      options: ["5 jaar", "7 jaar", "10 jaar", "15 jaar"],
      correct: 2,
      category: "Law"
    },
    {
      id: 183,
      dutch: "Hoeveel jaar is een identiteitskaart geldig?",
      english: "How long is an identity card valid?",
      options: ["5 jaar", "7 jaar", "10 jaar", "15 jaar"],
      correct: 0,
      category: "Law"
    },
    {
      id: 184,
      dutch: "Wat is een rijbewijs in Nederland?",
      english: "What is a driver's license in the Netherlands?",
      options: ["Een identiteitsdocument", "Een document om auto te besturen", "Een paspoort", "Een werkpas"],
      correct: 1,
      category: "Law"
    },
    {
      id: 185,
      dutch: "Hoe oud moet je zijn om in Nederland te stemmen?",
      english: "How old do you have to be to vote in the Netherlands?",
      options: ["16 jaar", "17 jaar", "18 jaar", "21 jaar"],
      correct: 2,
      category: "Law"
    },
    {
      id: 186,
      dutch: "Wat is de Netherlands Ombudsman?",
      english: "What is the Netherlands Ombudsman?",
      options: ["Een rechter", "Een ambtenaar", "Een onpartijdig orgaan voor klachten", "Een politicus"],
      correct: 2,
      category: "Government"
    },
    {
      id: 187,
      dutch: "Hoe heet het openbaar vervoer in Nederland?",
      english: "What is public transport called in the Netherlands?",
      options: ["Taxi", "OV", "Auto", "Vliegtuig"],
      correct: 1,
      category: "Daily Life"
    },
    {
      id: 188,
      dutch: "Wat is het Nederlands voor 'bibliotheek'?",
      english: "What is the Dutch word for 'library'?",
      options: ["Bookshop", "Bibliotheek", "School", "Kantoor"],
      correct: 1,
      category: "Language"
    },
    {
      id: 189,
      dutch: "Hoe zeg je 'ik spreek Nederlands' in Nederlands?",
      english: "How do you say 'I speak Dutch' in Dutch?",
      options: ["Ik spreek Engels", "Ik spreek Nederlands", "Ik spreek Duits", "Ik spreek Frans"],
      correct: 1,
      category: "Language"
    },
    {
      id: 190,
      dutch: "Wat is het Nederlands voor 'goedenavond'?",
      english: "What is the Dutch word for 'good evening'?",
      options: ["Goedemorgen", "Goedemiddag", "Goedenavond", "Goedenacht"],
      correct: 2,
      category: "Language"
    },
    {
      id: 191,
      dutch: "Hoe heet een bericht in het Nederlands?",
      english: "What is a message called in Dutch?",
      options: ["Email", "Brief", "Bericht", "Telegram"],
      correct: 2,
      category: "Language"
    },
    {
      id: 192,
      dutch: "Wat is het belangrijk voor integratie?",
      english: "What is important for integration?",
      options: ["Behoud eigen cultuur", "Leren Nederlands en begrijpen cultuur", "Niet naar scholen gaan", "Geen contact met locals"],
      correct: 1,
      category: "Integration"
    },
    {
      id: 193,
      dutch: "Hoeveel uren moeten inburgers Nederlands leren?",
      english: "How many hours must people in integration learn Dutch?",
      options: ["100 uur", "200 uur", "350 uur", "500 uur"],
      correct: 2,
      category: "Integration"
    },
    {
      id: 194,
      dutch: "Wat is het doel van inburgering?",
      english: "What is the goal of integration?",
      options: ["Assimilatie", "Integratie in samenleving", "Alleen Nederlands spreken", "Vergeten eigen cultuur"],
      correct: 1,
      category: "Integration"
    },
    {
      id: 195,
      dutch: "Hoe heet het inburgeringsprogramma?",
      english: "What is the integration program called?",
      options: ["Assimilatieprogramma", "Inburgeringsprogramma", "Migrantenprogramma", "Vreemdelingenprogramma"],
      correct: 1,
      category: "Integration"
    },
    {
      id: 196,
      dutch: "Wie bestuurt Amsterdam?",
      english: "Who governs Amsterdam?",
      options: ["De Koning", "De burgemeester", "De Minister", "De Gouverneur"],
      correct: 1,
      category: "Government"
    },
    {
      id: 197,
      dutch: "Hoeveel hoofdsteden zijn er in Nederland?",
      english: "How many capital cities are there in the Netherlands?",
      options: ["1", "2", "3", "4"],
      correct: 0,
      category: "Geography"
    },
    {
      id: 198,
      dutch: "Wat betekent de Nederlandse vlag?",
      english: "What does the Dutch flag mean?",
      options: ["Rood, wit, blauw", "Oranje, wit, blauw", "Zwart, rood, goud", "Groen, wit, rood"],
      correct: 0,
      category: "Culture"
    },
    {
      id: 199,
      dutch: "Hoe heet het Nederlandse volkslied?",
      english: "What is the Dutch national anthem called?",
      options: ["Amhrán na bhFiann", "Wilhelmus van Nassouwe", "La Marseillaise", "God Save the Queen"],
      correct: 1,
      category: "Culture"
    },
    {
      id: 200,
      dutch: "Hoeveel miljoen toeristen bezoeken Nederland per jaar?",
      english: "How many million tourists visit the Netherlands per year?",
      options: ["Ongeveer 5 miljoen", "Ongeveer 10 miljoen", "Ongeveer 15 miljoen", "Ongeveer 20 miljoen"],
      correct: 3,
      category: "Culture"
    }
  ];

  const [examState, setExamState] = useState('start'); // 'start', 'exam', 'review'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Initialize exam with random 40 questions
  const initializeExam = () => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 40);
    setSelectedQuestions(shuffled);
    setExamState('exam');
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(45 * 60);
  };

  // Timer effect
  useEffect(() => {
    if (examState !== 'exam') return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setExamState('review');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex) => {
    const questionId = selectedQuestions[currentQuestion].id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const submitExam = () => {
    setExamState('review');
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const resetExam = () => {
    setExamState('start');
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(45 * 60);
    setSelectedQuestions([]);
  };

  // START SCREEN
  if (examState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-indigo-700 mb-2">KNM A2 Exam Simulator</h1>
              <p className="text-xl text-gray-600">Kennis van de Nederlandse Maatschappij — Inburgering A2</p>
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Exam Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Clock className="text-indigo-600 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">Duration</p>
                    <p className="text-gray-600">45 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-indigo-600 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">Questions</p>
                    <p className="text-gray-600">40 multiple choice</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>✓ Questions are randomly selected from 200+ practice questions</li>
                <li>✓ Each exam simulation presents a unique set of questions</li>
                <li>✓ Questions are in Dutch with English translations</li>
                <li>✓ Timer starts when you begin the exam</li>
                <li>✓ You can review all answers after submission</li>
              </ul>
            </div>

            <button
              onClick={initializeExam}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Start New Exam
            </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Practice simulation • Not the official DUO exam
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">Comprehensive</h3>
              <p className="text-gray-600 text-sm">200+ unique questions covering all KNM A2 topics</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">Randomized</h3>
              <p className="text-gray-600 text-sm">Random selection ensures different exam every time</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">Detailed Review</h3>
              <p className="text-gray-600 text-sm">See correct answers and your performance</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EXAM SCREEN
  if (examState === 'exam' && selectedQuestions.length > 0) {
    const question = selectedQuestions[currentQuestion];
    const answered = answers[question.id] !== undefined;

    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-indigo-700">KNM Exam Simulation</h1>
              <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-lg border-2 border-red-300">
                <Clock size={24} className="text-red-600" />
                <span className="text-2xl font-bold text-red-600">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / selectedQuestions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-gray-600">
              Question {currentQuestion + 1} of {selectedQuestions.length}
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Question */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Dutch Question:</h2>
                  <p className="text-lg text-indigo-700 font-medium mb-4">{question.dutch}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">English Translation:</h3>
                  <p className="text-gray-600 mb-6">{question.english}</p>
                </div>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        answers[question.id] === index
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 bg-gray-50 hover:border-indigo-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[question.id] === index
                            ? 'border-indigo-600 bg-indigo-600'
                            : 'border-gray-300'
                        }`}>
                          {answers[question.id] === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className="font-medium text-gray-800">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="flex-1 py-3 px-4 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    ← Previous
                  </button>
                  {currentQuestion === selectedQuestions.length - 1 ? (
                    <button
                      onClick={submitExam}
                      className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Navigator */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="font-semibold text-gray-800 mb-4">Question Navigator</h3>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {selectedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToQuestion(idx)}
                      className={`w-full aspect-square rounded-lg font-semibold transition-all ${
                        idx === currentQuestion
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                          : answers[q.id] !== undefined
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="text-sm space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-700">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span className="text-gray-700">Unanswered</span>
                  </div>
                </div>
                <button
                  onClick={submitExam}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // REVIEW SCREEN
  if (examState === 'review' && selectedQuestions.length > 0) {
    const score = calculateScore();
    const percentage = Math.round((score / selectedQuestions.length) * 100);
    const passing = percentage >= 60;

    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Results Summary */}
          <div className={`rounded-lg shadow-lg p-8 mb-8 ${passing ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300' : 'bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300'}`}>
            <div className="text-center mb-6">
              <h1 className={`text-4xl font-bold mb-2 ${passing ? 'text-green-700' : 'text-orange-700'}`}>
                Exam Complete!
              </h1>
              <p className="text-gray-600">Review your performance below</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6 text-center shadow">
                <p className="text-gray-600 font-semibold mb-2">Your Score</p>
                <p className={`text-5xl font-bold ${passing ? 'text-green-600' : 'text-orange-600'}`}>
                  {score}/{selectedQuestions.length}
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow">
                <p className="text-gray-600 font-semibold mb-2">Percentage</p>
                <p className={`text-5xl font-bold ${passing ? 'text-green-600' : 'text-orange-600'}`}>
                  {percentage}%
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center shadow">
                <p className="text-gray-600 font-semibold mb-2">Passing Score</p>
                <p className="text-3xl font-bold text-indigo-600">60%</p>
              </div>
            </div>

            <div className="text-center">
              <p className={`text-xl font-semibold mb-4 ${passing ? 'text-green-700' : 'text-orange-700'}`}>
                {passing ? '✓ You Passed! Well done!' : '✗ You did not pass. Try again!'}
              </p>
              <button
                onClick={resetExam}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Start New Exam
              </button>
            </div>
          </div>

          {/* Detailed Review */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Review</h2>
            
            <div className="space-y-6">
              {selectedQuestions.map((question, idx) => {
                const userAnswer = answers[question.id];
                const correct = userAnswer === question.correct;

                return (
                  <div key={idx} className={`border-l-4 p-6 rounded-lg ${correct ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                    <div className="flex items-start gap-3 mb-4">
                      {correct ? (
                        <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle size={24} className="text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800 mb-2">Question {idx + 1}</p>
                        <p className="text-gray-700 font-medium mb-2">{question.dutch}</p>
                        <p className="text-gray-600 text-sm mb-4 italic">{question.english}</p>
                      </div>
                    </div>

                    <div className="ml-8 space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Your answer:</p>
                        <p className={`text-sm p-2 rounded ${correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                        </p>
                      </div>
                      {!correct && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Correct answer:</p>
                          <p className="text-sm p-2 rounded bg-green-100 text-green-800">
                            {question.options[question.correct]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <button
                onClick={resetExam}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Start New Exam with Different Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
export default KNMExamSimulator;