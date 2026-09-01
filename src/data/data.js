import content from './portfolioContent.json';
import weatherImg from '../assets/weather.jpg';
import driveSmartImg from '../assets/drive_smart.png';
import aiAgentImg from '../assets/AI-Agent.jpg';

const projectImages = { weather: weatherImg, driveSmart: driveSmartImg, aiAgent: aiAgentImg };

export const projectList = content.projectList.map((project) => ({
  ...project,
  image: projectImages[project.image] || project.image,
}));

export const educationList = content.educationList;
export const allSkills = content.allSkills;
export const contactLinks = content.contactLinks;
