import type { Question } from "@/types";

// ─── Chapters ──────────────────────────────────────────────────────────────

export const botanyChapters11 = [
  "The Living World",
  "Biological Classification",
  "Plant Kingdom",
  "Morphology of Flowering Plants",
  "Anatomy of Flowering Plants",
  "Cell: The Unit of Life",
  "Cell Cycle and Cell Division",
  "Photosynthesis in Higher Plants",
  "Respiration in Plants",
  "Plant Growth and Development",
];

export const botanyChapters12 = [
  "Sexual Reproduction in Flowering Plants",
  "Principles of Inheritance and Variation",
  "Molecular Basis of Inheritance",
  "Organisms and Populations",
  "Ecosystem",
  "Biodiversity and Conservation",
];

export const zoologyChapters11 = [
  "Animal Kingdom",
  "Structural Organisation in Animals",
  "Biomolecules",
  "Breathing and Exchange of Gases",
  "Body Fluids and Circulation",
  "Excretory Products and Their Elimination",
  "Locomotion and Movement",
  "Neural Control and Coordination",
  "Chemical Coordination and Integration",
];

export const zoologyChapters12 = [
  "Human Reproduction",
  "Reproductive Health",
  "Evolution",
  "Human Health and Disease",
  "Microbes in Human Welfare",
  "Biotechnology: Principles and Processes",
  "Biotechnology and Its Applications",
];

export const chapterQuestionTypes = [
  { id: "ncert", label: "NCERT Line by Line", emoji: "📖" },
  { id: "important", label: "Important Questions", emoji: "⭐" },
  { id: "statement", label: "Statement Based", emoji: "💬" },
  { id: "assertion", label: "Assertion & Reason", emoji: "🧠" },
  { id: "match", label: "Match the Following", emoji: "🔗" },
  { id: "diagram", label: "Diagram Based", emoji: "🖼️" },
  { id: "mixed", label: "Mixed Practice", emoji: "🎲" },
];

export const pyqYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

// ─── Questions ─────────────────────────────────────────────────────────────

export const sampleQuestions: Question[] = [
  {
    id: 1,
    subject: "botany",
    chapter: "The Living World",
    question: "Which of the following is the correct definition of Metabolism?",
    options: [
      "A. Sum of all physical and chemical reactions occurring in an organism",
      "B. Sum of all anabolic reactions only",
      "C. Sum of all catabolic reactions only",
      "D. Sum of all reactions occurring outside the cell",
    ],
    correct: 0,
    explanation:
      "Metabolism refers to the sum total of all physical and chemical reactions occurring in a living organism. It includes both anabolic (building up) and catabolic (breaking down) reactions essential for life.",
    difficulty: "Easy",
    type: "ncert",
    class: "11",
  },
  {
    id: 2,
    subject: "botany",
    chapter: "The Living World",
    question: "The term 'Biodiversity' was popularized by:",
    options: [
      "A. Charles Darwin",
      "B. E.O. Wilson",
      "C. Carl Linnaeus",
      "D. Robert Whittaker",
    ],
    correct: 1,
    explanation:
      "The term 'Biodiversity' was popularized by the sociobiologist Edward O. Wilson in 1986, describing the variety of life on Earth at all levels from genes to ecosystems.",
    difficulty: "Medium",
    type: "pyq",
    class: "11",
    year: 2023,
  },
  {
    id: 3,
    subject: "zoology",
    chapter: "Animal Kingdom",
    question: "Which phylum is characterized by the presence of water canal system?",
    options: [
      "A. Coelenterata",
      "B. Porifera",
      "C. Platyhelminthes",
      "D. Annelida",
    ],
    correct: 1,
    explanation:
      "Porifera (sponges) are characterized by the water canal system (aquiferous system). Water flows through pores, canals, and chambers, allowing the sponge to filter food particles.",
    difficulty: "Easy",
    type: "pyq",
    class: "11",
    year: 2022,
  },
  {
    id: 4,
    subject: "botany",
    chapter: "Cell: The Unit of Life",
    question: "The fluid mosaic model of cell membrane was proposed by:",
    options: [
      "A. Watson and Crick",
      "B. Singer and Nicolson",
      "C. Davson and Danielli",
      "D. Robert Brown",
    ],
    correct: 1,
    explanation:
      "The Fluid Mosaic Model was proposed by S.J. Singer and G.L. Nicolson in 1972. The cell membrane is described as a two-dimensional liquid in which lipid and protein molecules diffuse laterally.",
    difficulty: "Medium",
    type: "pyq",
    class: "11",
    year: 2021,
  },
  {
    id: 5,
    subject: "zoology",
    chapter: "Human Reproduction",
    question: "Fertilization in humans normally occurs in:",
    options: ["A. Uterus", "B. Cervix", "C. Fallopian tube", "D. Ovary"],
    correct: 2,
    explanation:
      "Fertilization normally occurs in the ampulla region of the fallopian tube. The ovum is picked up by the fimbriae and transported through the fallopian tube where it meets the sperm.",
    difficulty: "Easy",
    type: "pyq",
    class: "12",
    year: 2024,
  },
];

// ─── Stats helpers ─────────────────────────────────────────────────────────

export const weakChapters = [
  "Cell Cycle and Cell Division",
  "Molecular Basis of Inheritance",
  "Biotechnology: Principles and Processes",
];
export const strongChapters = [
  "The Living World",
  "Animal Kingdom",
  "Human Reproduction",
];
