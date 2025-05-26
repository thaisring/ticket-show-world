
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ListYourShowPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    venue: '',
    ticket_price: '',
    total_seats: '100',
    show_date: '',
    show_time: '',
    duration_minutes: '',
    contact_email: '',
    contact_phone: '',
    image_url: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to list your show.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('user_shows')
        .insert([
          {
            ...formData,
            user_id: user.id,
            ticket_price: parseFloat(formData.ticket_price),
            total_seats: parseInt(formData.total_seats),
            duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null
          }
        ]);

      if (error) throw error;

      toast({
        title: "Show Listed Successfully!",
        description: "Your show has been submitted for review and will be visible once approved.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        genre: '',
        venue: '',
        ticket_price: '',
        total_seats: '100',
        show_date: '',
        show_time: '',
        duration_minutes: '',
        contact_email: '',
        contact_phone: '',
        image_url: ''
      });

    } catch (error) {
      console.error('Error listing show:', error);
      toast({
        title: "Error",
        description: "Failed to list your show. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">List Your Show</h1>
          <p className="text-gray-600 mb-8">
            Share your event with thousands of potential attendees. Fill out the form below to get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Show Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your show title"
                />
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                  Genre *
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Genre</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Music">Music</option>
                  <option value="Dance">Dance</option>
                  <option value="Theatre">Theatre</option>
                  <option value="Sports">Sports</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your show..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                  Venue *
                </label>
                <Input
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  placeholder="Venue name and address"
                />
              </div>

              <div>
                <label htmlFor="ticket_price" className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Price (₹) *
                </label>
                <Input
                  id="ticket_price"
                  name="ticket_price"
                  type="number"
                  step="0.01"
                  value={formData.ticket_price}
                  onChange={handleInputChange}
                  required
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="show_date" className="block text-sm font-medium text-gray-700 mb-2">
                  Show Date *
                </label>
                <Input
                  id="show_date"
                  name="show_date"
                  type="date"
                  value={formData.show_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="show_time" className="block text-sm font-medium text-gray-700 mb-2">
                  Show Time *
                </label>
                <Input
                  id="show_time"
                  name="show_time"
                  type="time"
                  value={formData.show_time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="duration_minutes" className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <Input
                  id="duration_minutes"
                  name="duration_minutes"
                  type="number"
                  value={formData.duration_minutes}
                  onChange={handleInputChange}
                  placeholder="120"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="total_seats" className="block text-sm font-medium text-gray-700 mb-2">
                  Total Seats *
                </label>
                <Input
                  id="total_seats"
                  name="total_seats"
                  type="number"
                  value={formData.total_seats}
                  onChange={handleInputChange}
                  required
                  placeholder="100"
                />
              </div>

              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Poster Image URL
                </label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/poster.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  type="tel"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#f84464] hover:bg-[#d83454]"
              >
                {loading ? 'Submitting...' : 'List Your Show'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListYourShowPage;
