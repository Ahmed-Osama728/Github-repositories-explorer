import { Star, GitFork } from 'lucide-react';
import { Repository } from '../../types';
import { useStore } from '../../store/store';
import { toggleStar } from '../../services/githubRepos';
import { clsx } from 'clsx';

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { updateRepositoryStarStatus, starredRepos, setError } = useStore();
  const isStarred = starredRepos.has(repository.full_name);
  
  const handleStarClick = async () => {
    try {
      await toggleStar(
        repository.owner.login,
        repository.name,
        isStarred || false
      );
      updateRepositoryStarStatus(repository.full_name);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update star status');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img
              src={repository.owner.avatar_url}
              alt={`${repository.owner.login}'s avatar`}
              className="w-8 h-8 rounded-full"
              loading="lazy"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {repository.name}
              </h3>
              <p className="text-sm text-gray-600">
                by {repository.owner.login}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-700 line-clamp-2">
            {repository.description || 'No description available'}
          </p>
        </div>
        <button
          onClick={handleStarClick}
          className={clsx(
            'flex items-center gap-1 px-3 py-1 rounded-md transition-colors',
            isStarred
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
          aria-label={isStarred ? 'Unstar repository' : 'Star repository'}
        >
          <Star
            className={clsx(
              'w-4 h-4',
              isStarred ? 'fill-yellow-500' : ''
            )}
          />
          <span>{repository.stargazers_count}</span>
        </button>
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          <span>{repository.forks_count} forks</span>
        </div>
      </div>
    </div>
  );
}