
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserShow {
  id: string;
  title: string;
  description: string | null;
  genre: string;
  image_url: string | null;
  venue: string;
  ticket_price: number;
  total_seats: number;
  show_date: string;
  show_time: string;
  duration_minutes: number | null;
  contact_email: string | null;
  contact_phone: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useUserShows = () => {
  const [userShows, setUserShows] = useState<UserShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserShows = async () => {
      try {
        const { data, error } = await supabase
          .from('user_shows')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setUserShows(data || []);
      } catch (err) {
        console.error('Error fetching user shows:', err);
        setError('Failed to fetch shows');
      } finally {
        setLoading(false);
      }
    };

    fetchUserShows();
  }, []);

  return { userShows, loading, error };
};
