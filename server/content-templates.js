export const categories = [
  'Business',
  'Finance',
  'Self-Help',
  'Health',
  'Fitness',
  'Recipes',
  'Study Guides',
  'Workbooks',
  'Templates',
  'Planners',
  'Personal Development',
  'Marketing',
  'Tech & Programming',
  'Motivation',
  'Journals',
  'Mindset',
  'Parenting',
  'Productivity',
  'Real Estate',
  'Trading & Investing'
];

export const pdfTypes = {
  'Business': ['Template', 'Workbook', 'Guide', 'Planner'],
  'Finance': ['Workbook', 'Tracker', 'Guide', 'Cheat Sheet'],
  'Self-Help': ['Workbook', 'Journal', 'Guide', 'Planner'],
  'Health': ['Guide', 'Tracker', 'Planner', 'Workbook'],
  'Fitness': ['Planner', 'Tracker', 'Guide', 'Meal Plan'],
  'Recipes': ['Book', 'Guide', 'Meal Plan', 'Template'],
  'Study Guides': ['Study Guide', 'Cheat Sheet', 'Workbook', 'Summary'],
  'Workbooks': ['Workbook', 'Exercise Book', 'Practice Guide', 'Template'],
  'Templates': ['Template', 'Worksheet', 'Planner', 'Form'],
  'Planners': ['Planner', 'Tracker', 'Organizer', 'Schedule'],
  'Personal Development': ['Workbook', 'Journal', 'Guide', 'Planner'],
  'Marketing': ['Guide', 'Template', 'Workbook', 'Cheat Sheet'],
  'Tech & Programming': ['Guide', 'Cheat Sheet', 'Tutorial', 'Reference'],
  'Motivation': ['Journal', 'Workbook', 'Guide', 'Planner'],
  'Journals': ['Journal', 'Diary', 'Tracker', 'Planner'],
  'Mindset': ['Workbook', 'Journal', 'Guide', 'Exercise Book'],
  'Parenting': ['Guide', 'Planner', 'Tracker', 'Workbook'],
  'Productivity': ['Planner', 'Tracker', 'Workbook', 'Template'],
  'Real Estate': ['Guide', 'Template', 'Workbook', 'Tracker'],
  'Trading & Investing': ['Guide', 'Tracker', 'Workbook', 'Cheat Sheet']
};

export const contentTemplates = {
  'Business': {
    titles: [
      'Business Plan Essentials',
      'Startup Strategy Framework',
      'Professional Meeting Templates',
      'Business Growth Planner',
      'Leadership Development Guide'
    ],
    sections: [
      { title: 'Executive Summary', pages: 2 },
      { title: 'Market Analysis', pages: 2 },
      { title: 'Strategy & Planning', pages: 2 },
      { title: 'Implementation Steps', pages: 2 },
      { title: 'Financial Projections', pages: 2 },
      { title: 'Action Items', pages: 2 }
    ]
  },
  'Finance': {
    titles: [
      'Personal Budget Mastery',
      'Investment Tracking System',
      'Debt Elimination Plan',
      'Financial Freedom Blueprint',
      'Money Management Guide'
    ],
    sections: [
      { title: 'Financial Assessment', pages: 2 },
      { title: 'Budget Creation', pages: 2 },
      { title: 'Saving Strategies', pages: 2 },
      { title: 'Investment Basics', pages: 2 },
      { title: 'Debt Management', pages: 2 },
      { title: 'Action Plan', pages: 2 }
    ]
  },
  'Self-Help': {
    titles: [
      'Personal Transformation Journey',
      'Confidence Building Workbook',
      'Life Purpose Discovery',
      'Habit Formation Guide',
      'Self-Improvement Blueprint'
    ],
    sections: [
      { title: 'Self-Assessment', pages: 2 },
      { title: 'Goal Setting', pages: 2 },
      { title: 'Mindset Shifts', pages: 2 },
      { title: 'Daily Practices', pages: 2 },
      { title: 'Overcoming Obstacles', pages: 2 },
      { title: 'Progress Tracking', pages: 2 }
    ]
  },
  'Health': {
    titles: [
      'Wellness Transformation Guide',
      'Healthy Habits Tracker',
      'Nutrition Essentials',
      'Holistic Health Planner',
      'Preventive Care Guide'
    ],
    sections: [
      { title: 'Health Assessment', pages: 2 },
      { title: 'Nutrition Basics', pages: 2 },
      { title: 'Exercise Guidelines', pages: 2 },
      { title: 'Sleep Optimization', pages: 2 },
      { title: 'Stress Management', pages: 2 },
      { title: 'Weekly Tracker', pages: 2 }
    ]
  },
  'Fitness': {
    titles: [
      '30-Day Fitness Challenge',
      'Strength Training Program',
      'Home Workout Guide',
      'Fitness Goal Planner',
      'Exercise Routine Builder'
    ],
    sections: [
      { title: 'Fitness Assessment', pages: 2 },
      { title: 'Workout Plans', pages: 2 },
      { title: 'Exercise Library', pages: 2 },
      { title: 'Progress Tracking', pages: 2 },
      { title: 'Nutrition Tips', pages: 2 },
      { title: 'Weekly Schedule', pages: 2 }
    ]
  },
  'Recipes': {
    titles: [
      'Quick & Easy Meal Guide',
      'Healthy Recipe Collection',
      'Meal Prep Mastery',
      'Family Dinner Planner',
      'Budget-Friendly Recipes'
    ],
    sections: [
      { title: 'Breakfast Recipes', pages: 2 },
      { title: 'Lunch Ideas', pages: 2 },
      { title: 'Dinner Options', pages: 2 },
      { title: 'Snacks & Desserts', pages: 2 },
      { title: 'Shopping Lists', pages: 2 },
      { title: 'Meal Planning', pages: 2 }
    ]
  },
  'Study Guides': {
    titles: [
      'Effective Study Techniques',
      'Exam Preparation Guide',
      'Note-Taking Mastery',
      'Memory Enhancement System',
      'Academic Success Planner'
    ],
    sections: [
      { title: 'Key Concepts', pages: 2 },
      { title: 'Definitions & Terms', pages: 2 },
      { title: 'Examples & Applications', pages: 2 },
      { title: 'Practice Questions', pages: 2 },
      { title: 'Study Tips', pages: 2 },
      { title: 'Quick Reference', pages: 2 }
    ]
  },
  'Workbooks': {
    titles: [
      'Interactive Learning Workbook',
      'Skill Development Exercises',
      'Practice & Progress Journal',
      'Comprehensive Exercise Guide',
      'Step-by-Step Workbook'
    ],
    sections: [
      { title: 'Introduction', pages: 2 },
      { title: 'Module 1 Exercises', pages: 2 },
      { title: 'Module 2 Exercises', pages: 2 },
      { title: 'Module 3 Exercises', pages: 2 },
      { title: 'Self-Assessment', pages: 2 },
      { title: 'Answer Key', pages: 2 }
    ]
  },
  'Templates': {
    titles: [
      'Professional Document Templates',
      'Planning & Organization Forms',
      'Business Templates Collection',
      'Daily Planner Templates',
      'Project Management Forms'
    ],
    sections: [
      { title: 'Template Overview', pages: 2 },
      { title: 'Template Set 1', pages: 2 },
      { title: 'Template Set 2', pages: 2 },
      { title: 'Template Set 3', pages: 2 },
      { title: 'Customization Guide', pages: 2 },
      { title: 'Usage Examples', pages: 2 }
    ]
  },
  'Planners': {
    titles: [
      '90-Day Goal Planner',
      'Daily Productivity Organizer',
      'Weekly Planning System',
      'Monthly Goal Tracker',
      'Life Planning Workbook'
    ],
    sections: [
      { title: 'Goal Setting', pages: 2 },
      { title: 'Monthly Overview', pages: 2 },
      { title: 'Weekly Schedules', pages: 2 },
      { title: 'Daily Planning', pages: 2 },
      { title: 'Progress Tracking', pages: 2 },
      { title: 'Reflection Pages', pages: 2 }
    ]
  },
  'Personal Development': {
    titles: [
      'Growth Mindset Workbook',
      'Character Building Guide',
      'Leadership Development Path',
      'Communication Skills Mastery',
      'Emotional Intelligence Builder'
    ],
    sections: [
      { title: 'Self-Discovery', pages: 2 },
      { title: 'Core Values', pages: 2 },
      { title: 'Skill Development', pages: 2 },
      { title: 'Practice Exercises', pages: 2 },
      { title: 'Growth Tracking', pages: 2 },
      { title: 'Action Plans', pages: 2 }
    ]
  },
  'Marketing': {
    titles: [
      'Social Media Marketing Guide',
      'Content Creation Planner',
      'Brand Strategy Workbook',
      'Marketing Campaign Template',
      'Digital Marketing Essentials'
    ],
    sections: [
      { title: 'Market Research', pages: 2 },
      { title: 'Strategy Development', pages: 2 },
      { title: 'Content Planning', pages: 2 },
      { title: 'Campaign Execution', pages: 2 },
      { title: 'Analytics & Metrics', pages: 2 },
      { title: 'Optimization Tips', pages: 2 }
    ]
  },
  'Tech & Programming': {
    titles: [
      'JavaScript Cheat Sheet',
      'Python Programming Guide',
      'Web Development Reference',
      'Algorithm Study Guide',
      'Code Best Practices'
    ],
    sections: [
      { title: 'Fundamentals', pages: 2 },
      { title: 'Syntax Reference', pages: 2 },
      { title: 'Common Patterns', pages: 2 },
      { title: 'Code Examples', pages: 2 },
      { title: 'Best Practices', pages: 2 },
      { title: 'Quick Reference', pages: 2 }
    ]
  },
  'Motivation': {
    titles: [
      'Daily Motivation Journal',
      'Success Mindset Workbook',
      'Inspiration & Action Guide',
      'Goal Achievement Planner',
      'Positive Habits Builder'
    ],
    sections: [
      { title: 'Morning Motivation', pages: 2 },
      { title: 'Daily Affirmations', pages: 2 },
      { title: 'Goal Visualization', pages: 2 },
      { title: 'Action Steps', pages: 2 },
      { title: 'Progress Celebration', pages: 2 },
      { title: 'Weekly Reflection', pages: 2 }
    ]
  },
  'Journals': {
    titles: [
      'Gratitude Journal',
      'Reflection & Growth Diary',
      'Daily Journaling Guide',
      'Creative Writing Journal',
      'Mindfulness Journal'
    ],
    sections: [
      { title: 'Getting Started', pages: 2 },
      { title: 'Daily Prompts', pages: 2 },
      { title: 'Weekly Themes', pages: 2 },
      { title: 'Monthly Review', pages: 2 },
      { title: 'Reflection Exercises', pages: 2 },
      { title: 'Progress Tracking', pages: 2 }
    ]
  },
  'Mindset': {
    titles: [
      'Growth Mindset Development',
      'Positive Thinking Guide',
      'Mental Resilience Builder',
      'Mindset Transformation',
      'Success Psychology Workbook'
    ],
    sections: [
      { title: 'Mindset Assessment', pages: 2 },
      { title: 'Belief Systems', pages: 2 },
      { title: 'Thought Patterns', pages: 2 },
      { title: 'Reframing Exercises', pages: 2 },
      { title: 'Daily Practices', pages: 2 },
      { title: 'Progress Tracking', pages: 2 }
    ]
  },
  'Parenting': {
    titles: [
      'Positive Parenting Guide',
      'Child Development Tracker',
      'Family Activity Planner',
      'Parenting Strategies Workbook',
      'Kids Routine Organizer'
    ],
    sections: [
      { title: 'Age-Appropriate Tips', pages: 2 },
      { title: 'Communication Skills', pages: 2 },
      { title: 'Behavior Management', pages: 2 },
      { title: 'Activity Ideas', pages: 2 },
      { title: 'Milestone Tracking', pages: 2 },
      { title: 'Family Planning', pages: 2 }
    ]
  },
  'Productivity': {
    titles: [
      'Time Management Mastery',
      'Productivity System Builder',
      'Focus & Efficiency Guide',
      'Task Management Workbook',
      'Peak Performance Planner'
    ],
    sections: [
      { title: 'Productivity Assessment', pages: 2 },
      { title: 'Time Blocking', pages: 2 },
      { title: 'Priority Management', pages: 2 },
      { title: 'Focus Techniques', pages: 2 },
      { title: 'Weekly Planning', pages: 2 },
      { title: 'Habit Tracking', pages: 2 }
    ]
  },
  'Real Estate': {
    titles: [
      'Property Investment Guide',
      'Real Estate Deal Analyzer',
      'Home Buying Checklist',
      'Rental Property Workbook',
      'Market Analysis Template'
    ],
    sections: [
      { title: 'Market Overview', pages: 2 },
      { title: 'Property Analysis', pages: 2 },
      { title: 'Financial Calculations', pages: 2 },
      { title: 'Due Diligence', pages: 2 },
      { title: 'Deal Tracking', pages: 2 },
      { title: 'Investment Strategy', pages: 2 }
    ]
  },
  'Trading & Investing': {
    titles: [
      'Stock Trading Journal',
      'Investment Portfolio Tracker',
      'Trading Strategy Guide',
      'Market Analysis Workbook',
      'Risk Management Planner'
    ],
    sections: [
      { title: 'Market Basics', pages: 2 },
      { title: 'Trading Strategies', pages: 2 },
      { title: 'Technical Analysis', pages: 2 },
      { title: 'Risk Management', pages: 2 },
      { title: 'Trade Tracking', pages: 2 },
      { title: 'Performance Review', pages: 2 }
    ]
  }
};

export function getRandomContent(category) {
  const template = contentTemplates[category];
  if (!template) return null;
  
  const randomTitle = template.titles[Math.floor(Math.random() * template.titles.length)];
  const types = pdfTypes[category];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  return {
    title: randomTitle,
    type: randomType,
    sections: template.sections,
    description: `A comprehensive ${randomType.toLowerCase()} for ${category.toLowerCase()} that helps you achieve your goals with structured guidance and actionable insights.`
  };
}
