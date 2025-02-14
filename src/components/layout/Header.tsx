import { Github } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-3">
      <Github className="w-8 h-8 text-gray-900" />
      <h1 className="text-3xl font-bold text-gray-900">
        GitHub Repository Explorer
      </h1>
    </div>
  );
}