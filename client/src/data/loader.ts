import portfolioData from "./githubPortfolio.json";

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepository {
  name: string;
  full_name?: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics?: string[];
  pushed_at?: string;
  private?: boolean;
  fork?: boolean;
}

export interface GitHubPortfolioData {
  profile: GitHubProfile;
  repositoryCount?: number;
  repositories: GitHubRepository[];
  fetchedAt: string;
}

export const getGitHubData = (): GitHubPortfolioData => {
  return portfolioData as unknown as GitHubPortfolioData;
};
