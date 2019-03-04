interface Skill {
  title: string,
  level: number,
  type: string,
  show?: number,
  icon?: string,
}

interface Skills {
  [key: string]: Skill[]
}

interface FetchedSkills {
  [key: string]: Skill
}

type FilterValue = 1 | 0 | -1;

interface SkillsFilter {
  [key: string]: FilterValue; 
}