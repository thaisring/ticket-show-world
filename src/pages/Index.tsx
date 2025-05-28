
import React from 'react';
import Header from '../components/Header';
import AppSidebar from '../components/AppSidebar';
import AppViewRenderer from '../components/AppViewRenderer';
import { useAppState } from '../hooks/useAppState';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { SidebarProvider, SidebarInset } from '../components/ui/sidebar';

const Index = () => {
  const state = useAppState();
  const handlers = useAppNavigation(state);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar 
          onCategorySelect={handlers.handleCategorySelect} 
          selectedCategory={state.selectedCategory}
          onListYourShow={handlers.handleListYourShow}
        />
        <SidebarInset>
          <Header 
            onHomeClick={handlers.handleGoHome} 
            onSearch={handlers.handleSearch}
            searchQuery={state.searchQuery}
          />
          
          <AppViewRenderer 
            currentView={state.currentView}
            state={state}
            handlers={handlers}
          />
          
          <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
            <p>&copy; 2025 BookMyTicket</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
