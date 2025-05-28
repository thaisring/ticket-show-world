
import React from 'react';
import { Film, Play, Calendar, Trophy, Activity, Tv, Home, Plus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from './ui/sidebar';

type CategoryType = 'all' | 'movies' | 'stream' | 'events' | 'plays' | 'sports' | 'activities';

interface AppSidebarProps {
  onCategorySelect: (category: CategoryType) => void;
  selectedCategory: CategoryType;
  onListYourShow: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ onCategorySelect, selectedCategory, onListYourShow }) => {
  const menuItems = [
    {
      title: "Home",
      category: "all" as CategoryType,
      icon: Home,
    },
    {
      title: "Movies",
      category: "movies" as CategoryType,
      icon: Film,
    },
    {
      title: "Stream",
      category: "stream" as CategoryType,
      icon: Tv,
    },
    {
      title: "Events",
      category: "events" as CategoryType,
      icon: Calendar,
    },
    {
      title: "Plays",
      category: "plays" as CategoryType,
      icon: Play,
    },
    {
      title: "Sports",
      category: "sports" as CategoryType,
      icon: Trophy,
    },
    {
      title: "Activities",
      category: "activities" as CategoryType,
      icon: Activity,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Browse</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={selectedCategory === item.category}
                  >
                    <button
                      onClick={() => onCategorySelect(item.category)}
                      className="w-full flex items-center gap-2 px-2 py-2 text-left hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={onListYourShow}
                className="w-full flex items-center gap-2 px-2 py-2 text-left hover:bg-gray-100 rounded-md transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>List Your Show</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
