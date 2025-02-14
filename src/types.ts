export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
}

export interface SearchState {
  repositories: Repository[];
  starredRepos: Set<string>;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setRepositories: (repositories: Repository[]) => void;
  setStarredRepos: (starredRepos: Set<string>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateRepositoryStarStatus: (fullName: string) => void;
}