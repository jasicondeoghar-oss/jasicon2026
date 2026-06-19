import React from 'react';
import { FacultyMember, CommitteeMember, ProgramSession, Workshop, ExtendedCommitteeSection } from './types';

export const ADMIN_EMAILS = [
  "jasicon2026@gmail.com",
  "digixea1@gmail.com",
  "jasicondeoghar@gmail.com"
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
  { id: 'c1', name: 'Dr. Jugal Kishore Choudhary', role: 'Organising Chairman', imageUrl: getAssetPath('/assets/Jugal_kishore.png') },
  { id: 'c2', name: 'Dr. Kumar Gourav', role: 'Organising Secretary', imageUrl: getAssetPath('/assets/rajesh.png') },
  { id: 'c3', name: 'Dr. Vijay Kumar', role: 'Organising Treasurer', imageUrl: getAssetPath('/assets/Vijay_kumar.png') },
  { id: 'c4', name: 'Dr. Rajiv Kr. Pandey', role: 'Gen. & Lap. Surgeon (Deoghar)', imageUrl: getAssetPath('/assets/Dr_Rajiv_Kumar_PandeyCircle.png') },
  { id: 'c16', name: 'Dr. Rajesh Kumar', role: 'Reception Committee', imageUrl: getAssetPath('/assets/Dr_Rajesh_Kumar_Reception.png') },
  { id: 'c7', name: 'Dr. Abhinav Prakash Arya', role: 'Assoc. Prof., AIIMS Deoghar', imageUrl: getAssetPath('/assets/Dr_Abhinav Prakash.png') },
  { id: 'c9', name: 'Dr. Chitranjan Pankaj', role: 'Fund Raising Committee', imageUrl: getAssetPath('/assets/Dr_CHITRANJAN_KUMAR.png') },
  { id: 'c11', name: 'Dr. Anil Kumar', role: 'Asst. Prof., Dept. of Neurosurgery, AIIMS Deoghar', imageUrl: getAssetPath('/assets/Dr_Anil_kumar.png') },
  { id: 'c12', name: 'Dr. Amardeep Kumar', role: 'Workshop Committee', imageUrl: getAssetPath('/assets/Dr_Amardeep_Kumar.png') },
  { id: 'c13', name: 'Dr. Jagjivan Murmu', role: 'Catering & Entertainment', imageUrl: getAssetPath('/assets/DR_JAGJIVAN_MURMU_JIVAN_CHHAYA CLINIC_DEOGHAR.png') },
  { id: 'c15', name: 'Dr. Ravi Kumar', role: 'Media & IT', imageUrl: getAssetPath('/assets/Dr_Ravi_Kumar.png') },
  { id: 'c17', name: 'Dr. Rajesh Ranjan', role: 'Scientific Committee', imageUrl: getAssetPath('/assets/Dr_Rajesh_Ranjan_Scientific.png') },
  { id: 'c18', name: 'Dr. Kumar Mrigank Singh', role: 'Scientific Committee', imageUrl: getAssetPath('/assets/Dr_Kumar_Mrigank_Singh.png') },
];

export const ASI_JHARKHAND_SECTIONS: ExtendedCommitteeSection[] = [
  {
    title: 'Chief Patron',
    membersWithPhotos: [
      { name: 'Dr. R. P. Srivastava', role: '', imageUrl: getAssetPath('/assets/Dr r p srivastava  patron.png') },
    ]
  },
  {
    title: 'E.C. Member, ASI (Jharkhand)',
    membersWithPhotos: [
      { name: 'Dr. Md. Azad', role: '', imageUrl: getAssetPath('/assets/Dr_Md_Azad_Ec_MEMBER.png') },
      { name: 'Dr. Vijay Kumar', role: '', imageUrl: getAssetPath('/assets/Dr_vijay_kumar_ec_member.png') },
    ]
  },
  {
    title: 'Office Bearer',
    membersWithPhotos: [
      { name: 'Dr. Sanjay Kumar', role: 'Chairman', imageUrl: getAssetPath('/assets/Dr sanjay kumar Chairman  ASI Jharkhand State Chapter-modified.png') },
      { name: 'Dr. Rajesh Kumar Singh', role: 'Secretary', imageUrl: getAssetPath('/assets/Dr_Rajesh_Kumar_Singh.png') },
      { name: 'Dr. Sandip Kr Agarwal', role: 'Past Chairman', imageUrl: getAssetPath('/assets/Dr_sandip_kr_Agrawal_Past_Chairman.png') },
      { name: 'Dr. B. N. Prasad', role: 'Treasurer', imageUrl: getAssetPath('/assets/Dr B N prasad  Treasurer.png') },
      { name: 'Dr. Kumar Nishant Singh', role: 'Joint Secretary', imageUrl: getAssetPath('/assets/Dr_Nishant_Singh_Joint_Secretary_ASI_Jharkhand.png') },
      { name: 'Dr. Ajay Kumar', role: 'Joint Secretary', imageUrl: getAssetPath('/assets/Dr ajay  kumar  joint secretary.png') },
    ]
  },
  {
    title: 'Advisor Jharkhand',
    members: [
      'Dr. (Prof) M Alam',
      'Dr N K Choudhary',
      'Dr. R. N. Singh',
      'Dr. J.K. Choudhary',
      'Dr. (Prof) S. K. Chourasiya',
      'Dr. (Prof) N K Jha',
      'Dr. (Prof) D P Bhadani',
      'Dr. Om Prakash',
      'Dr. (Prof) S Maluwa',
      'Dr. (Prof) D. K. Sinha',
      'Dr. Uday Shrivastava',
      'Dr. (Prof) Pankaj Bodra',
      'Dr. Sandip Kumar',
      'Dr. Arunima Verma'
    ]
  }
];



export const ORGANISING_COMMITTEE_SECTIONS: ExtendedCommitteeSection[] = [
  {
    title: 'Organising Leaders',
    membersWithPhotos: [
      { name: 'Dr. Jugal Kishore Choudhary', role: 'Organising Chairman', imageUrl: getAssetPath('/assets/Jugal_kishore.png') },
      { name: 'Dr. Kumar Gourav', role: 'Organising Secretary', imageUrl: getAssetPath('/assets/rajesh.png') },
      { name: 'Dr. Vijay Kumar', role: 'Organising Treasurer', imageUrl: getAssetPath('/assets/Vijay_kumar.png') },
    ]
  },
  {
    title: 'Patron',
    membersWithPhotos: [
      { name: 'Dr. K. N. Jha', imageUrl: getAssetPath('/assets/Dr. N. K. Jha.png') },
      { name: 'Dr. N. M. Sharma', imageUrl: 'https://ui-avatars.com/api/?name=N+M+Sharma&background=121826&color=C9A24D' },
    ]
  },
  {
    title: 'Reception Committee',
    membersWithPhotos: [
      { name: 'Dr. Rajiv Pandey', imageUrl: getAssetPath('/assets/Dr_Rajiv_Kumar_PandeyCircle.png') },
      { name: 'Dr. Rajesh Kumar', imageUrl: getAssetPath('/assets/Dr_Rajesh_Kumar_Reception.png') },
      { name: 'Dr. Devanand Prakash', imageUrl: getAssetPath('/assets/Dr. Devanand Prakash.png') },
    ]
  },
  {
    title: 'Advisor – Deoghar',
    membersWithPhotos: [
      { name: 'Dr. Sunil Kumar Singh', imageUrl: getAssetPath('/assets/Dr. Sunil Kumar Singh.png') },
      { name: 'Dr. Subhash Chandra Choudhary', imageUrl: 'https://ui-avatars.com/api/?name=Subhash+Chandra+Choudhary&background=121826&color=C9A24D' },
      { name: 'Dr. Ranjan Sinha', imageUrl: getAssetPath('/assets/Dr Ranjan sinha.png') },
      { name: 'Dr. Arun Kumar Gupta', imageUrl: getAssetPath('/assets/Dr. Arun Kumar Gupta.png') },
      { name: 'Dr. D. Tiwari', imageUrl: getAssetPath('/assets/Dr. D. Tiwari.png') },
      { name: 'Dr. N. C. Gandhi', imageUrl: getAssetPath('/assets/Dr. NC Gandhi.png') },
      { name: 'Dr. Gauri Shankar', imageUrl: getAssetPath('/assets/Dr. Gauri Shankar.png') },
    ]
  },
  {
    title: 'Scientific Committee',
    membersWithPhotos: [
      { name: 'Dr. Md. Azad', imageUrl: getAssetPath('/assets/Dr_Md_Azad_Ec_MEMBER.png') },
      { name: 'Dr. (Prof) Hamid Raza Khan', imageUrl: 'https://ui-avatars.com/api/?name=Hamid+Raza+Khan&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. (Prof) K.K. Singh', imageUrl: 'https://ui-avatars.com/api/?name=K+K+Singh&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Mritunjay Mundu', imageUrl: 'https://ui-avatars.com/api/?name=Mritunjay+Mundu&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Nishit Ekka', imageUrl: 'https://ui-avatars.com/api/?name=Nishit+Ekka&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Samir Toppo', imageUrl: 'https://ui-avatars.com/api/?name=Samir+Toppo&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Vibhas Sahay', imageUrl: 'https://ui-avatars.com/api/?name=Vibhas+Sahay&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Ashish Kumar', imageUrl: getAssetPath('/assets/Dr. Ashish Kumar.png') },
      { name: 'Dr. Kumar Nishant Singh', imageUrl: getAssetPath('/assets/Dr_Nishant_Singh_Joint_Secretary_ASI_Jharkhand.png') },
      { name: 'Dr. Ajay Kumar', imageUrl: getAssetPath('/assets/Dr ajay  kumar  joint secretary.png') },
      { name: 'Dr. Rajesh Ranjan', imageUrl: getAssetPath('/assets/Dr_Rajesh_Ranjan_Scientific.png') },
      { name: 'Dr. Satveer', imageUrl: getAssetPath('/assets/Dr. Satvir.png') },
      { name: 'Dr. Kumar Mrigank Singh', imageUrl: getAssetPath('/assets/Dr_Kumar_Mrigank_Singh.png') },
    ]
  },
  {
    title: 'Poster Presentation',
    membersWithPhotos: [
      { name: 'Dr. B. N. Prasad', imageUrl: getAssetPath('/assets/Dr B N prasad  Treasurer.png') },
      { name: 'Dr. Avinash Kumar Singh', imageUrl: getAssetPath('/assets/Dr. Abinash Kr. Singh.png') },
      { name: 'Dr. Anjana Gandhi', imageUrl: 'https://ui-avatars.com/api/?name=Anjana+Gandhi&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Chitranjan Pankaj', imageUrl: getAssetPath('/assets/Dr_CHITRANJAN_KUMAR.png') },
      { name: 'Dr. Niranjan Kumar', imageUrl: getAssetPath('/assets/Dr. Niranjan Kumar.png') },
      { name: 'Dr. Arvind Kumar', imageUrl: getAssetPath('/assets/Dr. Arvind Kumar.png') },
    ]
  },
  {
    title: 'Pg paper comittee',
    membersWithPhotos: [
      { name: 'Dr. Sandip Kumar', imageUrl: getAssetPath('/assets/Dr_sandip_kr_Agrawal_Past_Chairman.png') },
      { name: 'Dr. Aman Shrivastva', imageUrl: 'https://ui-avatars.com/api/?name=Aman+Shrivastva&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Amardeep', imageUrl: getAssetPath('/assets/Dr_Amardeep_Kumar.png') },
      { name: 'Dr. Sujit Raj', imageUrl: 'https://ui-avatars.com/api/?name=Sujit+Raj&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Sushil Kumar Pandey', imageUrl: 'https://ui-avatars.com/api/?name=Sushil+Kumar+Pandey&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Krishna Murari', imageUrl: 'https://ui-avatars.com/api/?name=Krishna+Murari&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Sumegha Rana', imageUrl: 'https://ui-avatars.com/api/?name=Sumegha+Rana&background=121826&color=C9A24D&bold=true' },
      { name: 'Dr. Saurav Sultania', imageUrl: getAssetPath('/assets/Dr Saurabh Sultaniya.png') },
    ]
  },
  {
    title: 'Quiz Committee',
    membersWithPhotos: [
      { name: 'Dr. Rajiv Pandey', imageUrl: getAssetPath('/assets/Dr_Rajiv_Kumar_PandeyCircle.png') },
      { name: 'Dr. Satvir', imageUrl: getAssetPath('/assets/Dr. Satvir.png') },
    ],
    members: ['Dr. Ankit Jaipuriar', 'Dr. Sumegha Rana', 'Dr. Vinay Sah']
  },
  {
    title: 'Workshop Committee',
    membersWithPhotos: [
      { name: 'Dr. (Prof.) Satya Ranjan Patra', imageUrl: getAssetPath('/assets/Dr. ( Prof. ) Satya Ranjan Patra.png') },
      { name: 'Dr. Amardeep Kumar', imageUrl: getAssetPath('/assets/Dr_Amardeep_Kumar.png') },
      { name: 'Dr. Niranjan Kumar', imageUrl: getAssetPath('/assets/Dr. Niranjan Kumar.png') },
      { name: 'Dr. Abhinav Prakash', imageUrl: getAssetPath('/assets/Dr_Abhinav Prakash.png') },
      { name: 'Dr. Nishant Ranjan', imageUrl: getAssetPath('/assets/Dr. Nishant Ranjan.png') },
      { name: 'Dr. Arvind Kumar', imageUrl: getAssetPath('/assets/Dr. Arvind Kumar.png') },
    ]
  },
  {
    title: 'Souvenir Committee',
    membersWithPhotos: [
      { name: 'Dr. Abinash Kr. Singh', imageUrl: getAssetPath('/assets/Dr. Abinash Kr. Singh.png') },
      { name: 'Dr. Saurabh Sultania', imageUrl: getAssetPath('/assets/Dr Saurabh Sultaniya.png') },
    ]
  },
  {
    title: 'Fund Raising Committee',
    membersWithPhotos: [
      { name: 'Dr. Chitranjan Pankaj', imageUrl: getAssetPath('/assets/Dr_CHITRANJAN_KUMAR.png') },
    ]
  },
  {
    title: 'Media and IT',
    membersWithPhotos: [
      { name: 'Dr. Ravi Kumar', imageUrl: getAssetPath('/assets/Dr_Ravi_Kumar.png') },
    ]
  },
  {
    title: 'Catering and Entertainment',
    membersWithPhotos: [
      { name: 'Dr. Jagjivan Murmu', imageUrl: getAssetPath('/assets/DR_JAGJIVAN_MURMU_JIVAN_CHHAYA CLINIC_DEOGHAR.png') },
      { name: 'Dr. Vinod Kumar', imageUrl: getAssetPath('/assets/Dr. Vinod Kumar.png') },
    ]
  },
];

export const EXTENDED_COMMITTEE: ExtendedCommitteeSection[] = [
  {
    title: 'Workshop Committee',
    members: [
      'Dr. (Prof.) Satya Ranjan Patra', 'Dr. Niranjan Kumar', 'Dr. Abhinav Kumar',
      'Dr. Nishit Ranjan', 'Dr. Arvind Kumar', 'Dr. Amardeep Kumar'
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
    members: ['Dr. Devanand Prakash', 'Dr. Rajiv Pandey', 'Dr. Rajesh Kumar']
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
    members: ['Dr. Vinod Kumar', 'Dr. Jagjivan Murmu']
  },
  {
    title: 'Fund Rasing Committee',
    members: ['Dr. Chitranjan Pankaj']
  },
];
export const FACULTY: FacultyMember[] = [];

export const WORKSHOPS: Workshop[] = [];

export const PROGRAM: ProgramSession[] = [];

export const ASI_CENTRAL: CommitteeMember[] = [
  { id: 'ac1', name: 'Dr. D. Maruthu Pandian', role: 'President 2026', imageUrl: getAssetPath('/assets/Dr_D_Maruthu_Pandian.png') },
  { id: 'ac2', name: 'Dr. Pratapsinh A. Varute', role: 'Vice President 2026', imageUrl: getAssetPath('/assets/Dr_Pratapsinh_A_Varute.jpg') },
  { id: 'ac3', name: 'Dr. Pravin R. Suryawanshi', role: 'Immediate Past President', imageUrl: getAssetPath('/assets/Dr_Pravin_R_Suryawanshi.jpg') },
  { id: 'ac4', name: 'Dr. Gaddi Diwakar', role: 'Secretary', imageUrl: getAssetPath('/assets/Dr_Gaddi_Diwakar.jpg') },
  { id: 'ac5', name: 'Dr. Madhumita Mukhopadhyay', role: 'Treasurer', imageUrl: getAssetPath('/assets/Dr_Madhumita_Mukhopadhyay.png') },
];
