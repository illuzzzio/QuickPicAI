// here i will be creating my reusable utility functions 
import { surprise_ideas } from "../constants";

export function getRandomPrompt(prompt) {
  if (!surprise_ideas.length) return "";

  if (surprise_ideas.length === 1) {
    return surprise_ideas[0];
  }

  let randomPrompt = prompt;

  while (randomPrompt === prompt) {
    const randomIndex = Math.floor(Math.random() * surprise_ideas.length);
    randomPrompt = surprise_ideas[randomIndex];
  }

  return randomPrompt;
}
