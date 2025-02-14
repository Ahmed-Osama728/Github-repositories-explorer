import { create } from "zustand";
import { SearchState } from "../types";

const syncStarredReposWithLocalStorage = (starredRepos: Set<string>) => {
  localStorage.setItem("starredRepos", JSON.stringify(Array.from(starredRepos)));
};

export const useStore = create<SearchState>((set) => ({
  repositories: [],
  starredRepos: new Set<string>(JSON.parse(localStorage.getItem("starredRepos") || "[]")),
  isLoading: false,
  error: null,
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  setRepositories: (repositories) => set({ repositories }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  updateRepositoryStarStatus: (fullName) =>
    set((state) => {
      const newStarredRepos = new Set(state.starredRepos);
      if (newStarredRepos.has(fullName)) {
        newStarredRepos.delete(fullName);
      } else {
        newStarredRepos.add(fullName);
      }
      syncStarredReposWithLocalStorage(newStarredRepos);
      return { starredRepos: newStarredRepos };
    }),
  setStarredRepos: (starredRepos) => {
    syncStarredReposWithLocalStorage(starredRepos);
    set({ starredRepos });
  },
}));
