import { Category } from './types'

export const categories: Category[] = [
  {
    id: 'trump-quotes',
    title: 'Trump Quotes',
    description:
      'Test your knowledge of the most outrageous things said by Donald Trump',
    icon: '💬',
    questions: [
      {
        id: 'tq1',
        question: 'Which of these is an actual Trump quote about his IQ?',
        options: [
          "I'm, like, a person who has a very high IQ. I know that high-IQ people struggle with certain things that other people don't struggle with.",
          "My IQ is one of the highest — and you all know it! Please don't feel so stupid or insecure; it's not your fault.",
          "You know, my IQ is through the roof, just tremendous. Scientists can't even measure it properly.",
          "Everyone knows my IQ is beyond genius, beyond Einstein. That's just a fact.",
        ],
        correctAnswer: 1,
      },
      {
        id: 'tq2',
        question:
          'What did Trump say about his hands during a 2016 presidential debate?',
        options: [
          'My hands are normal hands. I have beautiful hands.',
          'Look at those hands, are they small hands?',
          'My hands are the best hands. Everyone says I have the best hands.',
          "My hands are the hands of a hard worker, unlike some people's hands.",
        ],
        correctAnswer: 1,
      },
      {
        id: 'tq3',
        question: "Complete this Trump quote: 'Despite the negative press...'",
        options: [
          '...I remain undefeated.',
          '...media is the enemy of the people.',
          '...covfefe.',
          '...the truth will prevail.',
        ],
        correctAnswer: 2,
      },
      {
        id: 'tq4',
        question:
          'What did Trump claim he would build and make another country pay for?',
        options: ['A wall', 'A bridge', 'A dome', 'A tunnel'],
        correctAnswer: 0,
      },
      {
        id: 'tq5',
        question:
          "What drink did Trump call his 'weakness' despite never drinking alcohol?",
        options: ['Sprite', 'Dr. Pepper', 'Diet Coke', 'Mountain Dew'],
        correctAnswer: 2,
      },
      {
        id: 'tq6',
        question: 'What did Trump say about COVID-19 in February 2020?',
        options: [
          "It's a hoax.",
          "It will disappear. One day, it's like a miracle, it will disappear.",
          'We need to take immediate action.',
          "It's just like the common flu, nothing to worry about.",
        ],
        correctAnswer: 1,
      },
      {
        id: 'tq7',
        question:
          "According to Trump, what does he know more about than 'anyone'?",
        options: ['Campaign finance', 'Drones', 'ISIS', 'All of the above'],
        correctAnswer: 3,
      },
      {
        id: 'tq8',
        question: "Trump once tweeted that he was a 'very stable...'",
        options: ['Leader', 'Genius', 'Businessman', 'President'],
        correctAnswer: 1,
      },
      {
        id: 'tq9',
        question:
          'What did Trump suggest as a potential treatment for COVID-19?',
        options: [
          'Drinking lots of water',
          'Injecting disinfectant',
          'Taking extra vitamins',
          'Staying in the sunlight',
        ],
        correctAnswer: 1,
      },
      {
        id: 'tq10',
        question: "Which country did Trump refer to as a 'sh*thole country'?",
        options: ['Mexico', 'Haiti', 'Nigeria', 'All of the above'],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: 'world-events',
    title: 'World Events',
    description: 'How well do you know major world events throughout history?',
    icon: '🌍',
    questions: [
      {
        id: 'we1',
        question: 'In what year did the Berlin Wall fall?',
        options: ['1987', '1989', '1991', '1993'],
        correctAnswer: 1,
      },
      {
        id: 'we2',
        question: 'Which country was the first to reach the South Pole?',
        options: ['United States', 'Russia', 'Norway', 'United Kingdom'],
        correctAnswer: 2,
      },
      {
        id: 'we3',
        question: 'When did the Chernobyl disaster occur?',
        options: ['1984', '1986', '1988', '1990'],
        correctAnswer: 1,
      },
      {
        id: 'we4',
        question: 'In which year did the COVID-19 pandemic begin?',
        options: ['2018', '2019', '2020', '2021'],
        correctAnswer: 1,
      },
      {
        id: 'we5',
        question:
          "What was the name of the world's first artificial satellite, launched in 1957?",
        options: ['Explorer 1', 'Sputnik 1', 'Telstar 1', 'Vanguard 1'],
        correctAnswer: 1,
      },
      {
        id: 'we6',
        question: 'Which event triggered World War I?',
        options: [
          'Assassination of Archduke Franz Ferdinand',
          'The bombing of Pearl Harbor',
          'The invasion of Poland',
          'The sinking of the Lusitania',
        ],
        correctAnswer: 0,
      },
      {
        id: 'we7',
        question: 'When did the Arab Spring begin?',
        options: ['2009', '2010', '2011', '2012'],
        correctAnswer: 1,
      },
      {
        id: 'we8',
        question: 'Who was the first woman to win a Nobel Prize?',
        options: [
          'Marie Curie',
          'Rosalind Franklin',
          'Dorothy Hodgkin',
          'Irène Joliot-Curie',
        ],
        correctAnswer: 0,
      },
      {
        id: 'we9',
        question: 'Which country hosted the 2016 Summer Olympics?',
        options: ['China', 'United States', 'Brazil', 'United Kingdom'],
        correctAnswer: 2,
      },
      {
        id: 'we10',
        question: 'In what year did the Titanic sink?',
        options: ['1910', '1912', '1914', '1916'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 'weird-facts',
    title: 'Weird Facts',
    description: 'Strange but true facts that will blow your mind',
    icon: '🤯',
    questions: [
      {
        id: 'wf1',
        question: 'How many noses does a slug have?',
        options: ['One', 'Two', 'Four', 'None'],
        correctAnswer: 2,
      },
      {
        id: 'wf2',
        question: 'What creature has the highest blood pressure of any animal?',
        options: ['Blue Whale', 'Giraffe', 'Elephant', 'Hummingbird'],
        correctAnswer: 1,
      },
      {
        id: 'wf3',
        question: 'In ancient Rome, what was used as mouthwash?',
        options: ['Olive oil', 'Wine', 'Urine', 'Honey'],
        correctAnswer: 2,
      },
      {
        id: 'wf4',
        question: "Which of these animals can't jump?",
        options: ['Elephant', 'Rhinoceros', 'Hippopotamus', 'All of the above'],
        correctAnswer: 0,
      },
      {
        id: 'wf5',
        question: 'What is Hippopotomonstrosesquippedaliophobia a fear of?',
        options: ['Hippopotamuses', 'Monsters', 'Long words', 'Horses'],
        correctAnswer: 2,
      },
      {
        id: 'wf6',
        question: 'How long can a snail sleep for?',
        options: ['12 hours', '3 days', '1 week', '3 years'],
        correctAnswer: 3,
      },
      {
        id: 'wf7',
        question: "Which animal's milk is naturally pink?",
        options: ['Flamingo', 'Hippo', 'Strawberry cow', 'Pink river dolphin'],
        correctAnswer: 1,
      },
      {
        id: 'wf8',
        question: "What color is an octopus's blood?",
        options: ['Red', 'Green', 'Blue', 'Transparent'],
        correctAnswer: 2,
      },
      {
        id: 'wf9',
        question: 'What is the only food that never spoils?',
        options: ['Peanut butter', 'Honey', 'White vinegar', 'Dried beans'],
        correctAnswer: 1,
      },
      {
        id: 'wf10',
        question:
          "What percentage of the Earth's oxygen is produced by the Amazon rainforest?",
        options: ['About 5%', 'About 10%', 'About 20%', 'About 50%'],
        correctAnswer: 2,
      },
    ],
  },
]
