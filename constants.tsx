
import React from 'react';
import { FacultyMember, CommitteeMember, ProgramSession, Workshop, ExtendedCommitteeSection } from './types';

export const ADMIN_EMAILS = [
  "jasicondeoghar@gmail.com",
  "digixea1@gmail.com"
];

export const getAssetPath = (path: string) => {
  return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
};

export const COLORS = {
  bg: '#0B0F14',
  surface: '#121826',
  gold: '#C9A24D',
  teal: '#2EC4B6',
  textPrimary: '#E6EAF0',
  textSecondary: '#9AA4B2',
  border: '#1F2937'
};

export const COMMITTEE: CommitteeMember[] = [
  { id: 'c1', name: 'Dr. Jugal Kishor Choudhary', role: 'Chairman', imageUrl: getAssetPath('/assets/Jugal_kishore.png') },
  { id: 'c2', name: 'Dr. Kumar Gaurav', role: 'Secretary', imageUrl: getAssetPath('/assets/rajesh.png') },
  { id: 'c3', name: 'Dr. Vijay Kumar', role: 'Treasurer', imageUrl: getAssetPath('/assets/Vijay_kumar.png') },
  { id: 'c4', name: 'Dr. Rajiv Kr. Pandey', role: 'Gen. & Lap. Surgeon (Deoghar)', imageUrl: getAssetPath('/assets/Dr_Rajiv_Kumar_PandeyCircle.png') },
  { id: 'c5', name: 'Dr. B. N. Prasad', role: 'Treasurer', imageUrl: getAssetPath('/assets/Dr B N prasad  Treasurer.png') },
  { id: 'c6', name: 'Dr. Ajay Kumar', role: 'Joint Secretary', imageUrl: getAssetPath('/assets/Dr ajay  kumar  joint secretary.png') },
  { id: 'c7', name: 'Dr. Abhinav Prakash Arya', role: 'Assoc. Prof., AIIMS Deoghar', imageUrl: getAssetPath('/assets/Dr_Abhinav Prakash.png') },
  { id: 'c8', name: 'Dr. R. P. Srivastava', role: 'Patron', imageUrl: getAssetPath('/assets/Dr r p srivastava  patron.png') },
  { id: 'c9', name: 'Dr. Chitranjan Kumar Pankaj', role: 'Sudha Hospital, B. Deoghar', imageUrl: getAssetPath('/assets/Dr_CHITRANJAN_KUMAR.png') },
  { id: 'c10', name: 'Dr. Sanjay Kumar', role: 'Chairman, ASI Jharkhand State Chapter', imageUrl: getAssetPath('/assets/Dr sanjay kumar Chairman  ASI Jharkhand State Chapter-modified.png') },
  { id: 'c11', name: 'Dr. Anil Kumar', role: 'Asst. Prof., Dept. of Neurosurgery, AIIMS Deoghar', imageUrl: getAssetPath('/assets/Dr_Anil_kumar.png') },
  { id: 'c12', name: 'Dr. Amardeep Kumar', role: 'Assoc. Prof., Dept. of Gen. Surgery, AIIMS Deoghar', imageUrl: getAssetPath('/assets/Dr_Amardeep_Kumar.png') },
  { id: 'c13', name: 'Dr. Jagjivan Murmu', role: 'Jivan Chhaya Clinic, Deoghar', imageUrl: getAssetPath('/assets/DR_JAGJIVAN_MURMU_JIVAN_CHHAYA CLINIC_DEOGHAR.png') },
  { id: 'c14', name: 'Dr. Rajesh Singh', role: 'Secretary, ASI (Jharkhand)', imageUrl: getAssetPath('/assets/Dr_Rajesh_Kumar_Singh.png') },
  { id: 'c15', name: 'Dr. Ravi Kumar', role: 'Media and IT', imageUrl: getAssetPath('/assets/Dr_Ravi_Kumar.png') },
]


export const EXTENDED_COMMITTEE: ExtendedCommitteeSection[] = [
  {
    title: 'E.C. Member, ASI (Jharkhand)',
    members: ['Dr. Md. Azad']
  },
  {
    title: 'Patron',
    members: ['Dr. K. N. Jha', 'Dr. N. M. Sharma']
  },
  {
    title: 'Advisor-Jharkhand',
    members: [
      'Dr. (Prof.) Majid Alam', 'Dr. M. S. Bhatt', 'Dr. M. P. Jha', 'Dr. N. K. Jha',
      'Dr. D. P. Bhadani', 'Dr. Sridhar Pradhan', 'Dr. Om Prakash', 'Dr. N. K. Choudhary',
      'Dr. Shital Maluwa', 'Dr. Uday Shrivastva', 'Dr. Arunima Verma'
    ]
  },
  {
    title: 'Advisor-Deoghar',
    members: [
      'Dr. Sunil Kr. Singh', 'Dr. Subhash Chandra Choudhary', 'Dr. Ranjan Sinha',
      'Dr. Arun Kr. Gupta', 'Dr. D. Tiwary (National Vice President, IMA)',
      'Dr. N. C. Gandhi', 'Dr. Gauri Shankar'
    ]
  },
  {
    title: 'Reception Committee',
    members: ['Dr. Rajesh Kumar', 'Dr. Devanand Prakash']
  },
  {
    title: 'Scientific Committee',
    members: ['Dr. Rajesh Ranjan', 'Dr. Kumar Mrigank Singh', 'Dr. Satvir', 'Dr. Ashish Kumar']
  },
  {
    title: 'Souvenir Committee',
    members: ['Dr. Abinash Kr. Singh', 'Dr. Saurabh Sultania']
  },
  {
    title: 'Catering & Entertainment',
    members: ['Dr. Vinod Kumar']
  },
];

// Added missing FACULTY constant to resolve import error in Faculty.tsx
export const FACULTY: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Dr. Elizabeth Thorne',
    designation: 'Professor & Head, Fetal Medicine',
    institution: "King's College London, UK",
    imageUrl: 'https://picsum.photos/seed/fac1/600/800',
    category: 'Keynote'
  },
  {
    id: 'f2',
    name: 'Dr. Rajesh Khanna',
    designation: 'Director, Robotic Surgery',
    institution: 'Apollo Hospitals, Hyderabad',
    imageUrl: 'https://picsum.photos/seed/fac2/600/800',
    category: 'International'
  },
  {
    id: 'f3',
    name: 'Dr. Sarah Chen',
    designation: 'Fetal Medicine Specialist',
    institution: 'Mount Sinai Hospital, NYC',
    imageUrl: 'https://picsum.photos/seed/fac3/600/800',
    category: 'National'
  }
];

export const WORKSHOPS: Workshop[] = [];

export const PROGRAM: ProgramSession[] = [
  { id: 's1', time: '09:00 AM', topic: 'Keynote: Future of Fetal Medicine', speaker: 'Dr. Elizabeth Thorne', hall: 'Main Hall A', day: 1 },
  { id: 's2', time: '11:00 AM', topic: 'Debate: Robotic vs Laparoscopic Surgery', speaker: 'Dr. Rajesh Khanna', hall: 'Hall B', day: 2 },
  { id: 's3', time: '02:00 PM', topic: 'Workshop: High-Risk Pregnancy Protocols', speaker: 'Dr. Sarah Chen', hall: 'Hall C', day: 3 }
];
