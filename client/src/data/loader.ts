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
  repositoryCount: number;
  repositories: GitHubRepository[];
  fetchedAt: string;
}

type RawGitHubRepository = Omit<GitHubRepository, "stars" | "forks"> & {
  stars?: number;
  forks?: number;
  stargazers_count?: number;
  forks_count?: number;
};

type RawGitHubPortfolioData = Omit<GitHubPortfolioData, "repositoryCount" | "repositories"> & {
  repositoryCount?: number;
  repositories: RawGitHubRepository[];
};

function normalizeRepository(repository: RawGitHubRepository): GitHubRepository {
  return {
    ...repository,
    stars: Number(repository.stars ?? repository.stargazers_count ?? 0),
    forks: Number(repository.forks ?? repository.forks_count ?? 0),
  };
}

export const getGitHubData = (): GitHubPortfolioData => {
  const raw = portfolioData as RawGitHubPortfolioData;
  const repositories = raw.repositories.map(normalizeRepository);
  return {
    ...raw,
    repositoryCount: raw.repositoryCount ?? repositories.length,
    repositories,
  };
};
