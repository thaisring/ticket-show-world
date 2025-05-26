
import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UserSection: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <>
      {user ? (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-[#f84464] text-white text-xs">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm">
            {user.user_metadata?.full_name || user.email}
          </span>
          <Button
            onClick={handleAuthClick}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Sign Out</span>
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleAuthClick}
          className="bg-[#f84464] hover:bg-[#d83454] text-white px-3 py-2 sm:px-4 rounded-md text-sm font-medium transition-colors flex-shrink-0"
        >
          <span className="hidden sm:inline">Sign In</span>
          <User className="h-4 w-4 sm:hidden" />
        </Button>
      )}
    </>
  );
};

export default UserSection;
