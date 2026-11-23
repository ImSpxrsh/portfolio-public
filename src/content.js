// Public-facing facts are grounded in this repository's maintained llms.txt,
// prior portfolio content, and the first-party links below.

export const profile = {
  name: 'Sparsh Roy',
  first: 'Sparsh',
  last: 'Roy',
  brand: 'sparshroy',
  email: 'sparshr@mit.edu',
  location: 'Princeton, New Jersey',
  coordinates: 'eastern time · usa',
  motto: ['question', 'build', 'test', 'learn', 'repeat'],
  links: {
    linkedin: 'https://linkedin.com/in/roysparsh',
    github: 'https://github.com/ImSpxrsh',
    instagram: 'https://www.instagram.com/sparshwyd/',
    research: 'https://sites.mit.edu/sparsh/',
    publications: 'https://sites.mit.edu/sparsh/publications/',
    blog: 'https://sites.mit.edu/sparsh/blog/',
    mantis: 'https://mantis.csail.mit.edu/',
    latest: 'https://arxiv.org/abs/2611.11726',
    aidsense: 'https://www.aidsense.app/',
    dreamit: 'https://dreamit.build/',
    team293: 'https://github.com/Team293/Reefscape',
  },
};

export const nav = [
  { id: 'research-systems', label: 'systems' },
  { id: 'research', label: 'research' },
  { id: 'work', label: 'work' },
  { id: 'field-notes', label: 'notes' },
  { id: 'trajectory', label: 'trajectory' },
  { id: 'contact', label: 'contact' },
];

export const flagship = {
  role: 'researcher & builder',
  since: '2025',
  tagline: 'systems for difficult questions.',
  statement:
    'My research asks where intelligent systems fail, what their measurements really identify, and how to make the evidence strong enough to trust.',
  programs: [
    {
      index: '01 / identification',
      name: 'clinical data',
      kind: 'ehr representations / methodology',
      blurb:
        'Studying what electronic health records can—and cannot—tell us when physiology is entangled with the process of care.',
      specs: [
        { label: 'paper', text: 'dark matter of clinical data' },
        { label: 'team', text: 'mit critical data · lab-mae' },
      ],
      status: 'published',
      url: 'https://arxiv.org/abs/2611.11726',
    },
    {
      index: '02 / evaluation',
      name: 'agent validity',
      kind: 'multi-agent systems / construct validity',
      blurb:
        'Auditing whether role prompts change model behavior in the intended way—and whether the checks can support that conclusion.',
      specs: [
        { label: 'paper', text: 'did the role fire?' },
        { label: 'venue', text: 'aes 2026 · presented' },
      ],
      status: 'published',
      url: '/did-the-role-fire.pdf',
    },
    {
      index: '03 / robustness',
      name: 'adaptive systems',
      kind: 'eeg models / robotic perception',
      blurb:
        'Testing whether model comparisons survive matched inputs, architecture changes, sensor faults and compute contention.',
      specs: [
        { label: 'venues', text: 'ieee big data · mit urtc' },
        { label: 'focus', text: 'robust inference' },
      ],
      status: 'published',
      url: 'https://arxiv.org/abs/2609.23924',
    },
  ],
  flow: [
    {
      step: '01',
      title: 'question / context',
      items: ['define the claim', 'map assumptions', 'choose useful evidence'],
    },
    {
      step: '02',
      title: 'system / experiment',
      items: ['build the instrument', 'run controlled tests', 'track failure modes'],
    },
    {
      step: '03',
      title: 'evidence / use',
      items: ['make results legible', 'publish what holds up', 'ship what helps'],
    },
  ],
};

export const papers = [
  {
    date: 'nov 2026',
    title: 'The Dark Matter of Clinical Data',
    venue: 'arXiv · MIT Critical Data',
    field: 'clinical ml',
    abstract:
      'Formalizes an identification limit in electronic health records: learned representations entangle patient physiology with the care process that decides what is measured, when and for whom.',
    url: 'https://arxiv.org/abs/2611.11726',
  },
  {
    date: 'oct 2026',
    title: 'Credential Farming in the Age of Generative AI',
    venue: 'Nature HSSC · accepted',
    field: 'social epistemology',
    abstract:
      'Argues that generative AI has weakened the link between polished research outputs and demonstrated competence, and proposes relocating trust from outputs to formation inside research communities.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13692582/',
  },
  {
    date: 'oct 2026',
    title: 'Did the Role Fire? Auditing Role-Prompted Multi-Agent Systems',
    venue: 'AES 2026 · presented',
    field: 'agent evaluation',
    abstract:
      'Tests whether role prompts actually produce their intended cognitive operations, then audits the manipulation checks themselves for sensitivity, specificity and construct validity.',
    url: '/did-the-role-fire.pdf',
  },
  {
    date: 'sep 2026',
    title: 'Matched-Input Estimates Differ in Sign Across Architectures',
    venue: 'IEEE Big Data · accepted',
    field: 'eeg foundation models',
    abstract:
      'Audits EEG foundation models under a validation-locked protocol and shows that matched-input estimates can change sign across supervised architectures.',
    url: 'https://arxiv.org/abs/2609.23924',
  },
  {
    date: 'aug 2026',
    title: 'Belief-Space Perception Routing under Coupled Sensor Faults and Compute Contention',
    venue: 'MIT URTC · main track',
    field: 'robotics',
    abstract:
      'Adaptive inference that jointly tracks sensor-fault and compute-contention beliefs, routing perception work to meet deadlines under degraded hardware.',
    url: 'https://arxiv.org/abs/2608.00322',
  },
];

export const work = [
  {
    id: 'aidsense',
    name: 'AidSense',
    field: 'social impact / ai',
    role: 'builder & CFO',
    summary:
      'A Flutter app that turns plain-language questions into nearby food, housing and medical-aid resources across the Tri-State area.',
    url: 'https://www.aidsense.app/',
    art: 'orbit',
  },
  {
    id: 'velvt',
    name: 'Velvt',
    field: 'behavioral ai / privacy',
    role: 'co-founder & COO',
    summary:
      'A local-first behavioral intelligence system that models focus and attention fragmentation on-device.',
    url: 'https://github.com/ImSpxrsh',
    art: 'agents',
  },
  {
    id: 'team293',
    name: 'FRC Team 293',
    field: 'robotics / control systems',
    role: 'software & operations',
    summary:
      'Java robot software, autonomous routines and team infrastructure built under competition deadlines.',
    url: 'https://github.com/Team293/Reefscape',
    art: 'stars',
  },
  {
    id: 'dreamit',
    name: 'DreamIT',
    field: 'ai product / full-stack',
    role: 'founding engineer',
    summary:
      'AI-driven software built end to end across product strategy, frontend and backend.',
    url: 'https://dreamit.build/',
    art: 'molecule',
  },
];

export const trajectory = [
  {
    year: '2024',
    items: [
      { when: 'aug', what: 'Joined FRC Team 293', who: 'Competition robot software in Java', kind: 'engineering' },
    ],
  },
  {
    year: '2025',
    items: [
      { when: 'mar', what: 'MIT Beaver Works', who: 'Cognitive Assistants program', kind: 'program' },
      { when: 'may', what: 'Built AidSense', who: 'AI-assisted access to local aid', kind: 'product' },
      { when: 'nov', what: 'Co-founded DreamIT', who: 'AI product engineering', kind: 'company' },
      { when: '2025', what: 'Congressional App Challenge', who: 'Winner for AidSense', kind: 'recognition', accent: true },
    ],
  },
  {
    year: '2026',
    items: [
      { when: '2026', what: 'Research across AI, health and biology', who: 'MIT · UIUC · UCSC · Vienna', kind: 'research', accent: true },
      { when: 'apr', what: 'Co-founded Velvt', who: 'Local-first behavioral intelligence', kind: 'company' },
      { when: 'aug', what: 'Belief-space routing', who: 'Accepted & presented · MIT URTC main track', kind: 'research' },
      { when: 'sep', what: 'EEG foundation-model audit', who: 'Accepted · IEEE Big Data', kind: 'research' },
      { when: 'oct', what: 'Did the Role Fire?', who: 'Accepted & presented · Agent Evaluation Science', kind: 'research' },
      { when: 'oct', what: 'Credential farming in the age of AI', who: 'Accepted · Nature HSSC', kind: 'research' },
      { when: 'nov', what: 'The Dark Matter of Clinical Data', who: 'MIT Critical Data LAB-MAE team', kind: 'research' },
      { when: '2026', what: 'NJ INNOVATE100', who: 'Named a top innovator', kind: 'recognition' },
    ],
  },
];

export const alongside = [
  { what: 'State executive director', who: 'Minorities in STEM · New Jersey' },
  { what: 'Bronze medalist', who: 'United States Medical Disease Olympiad' },
  { what: '$10,000 raised', who: 'Leukemia & Lymphoma Society' },
];

export const toolkit = ['python', 'typescript', 'java', 'flutter'];

export const domains = ['ai systems', 'health data', 'biology', 'hci', 'robotics'];
