import React, { useState, useEffect } from 'react';
import { Heart, Upload, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';

interface LoveGalleryProps {
  userId: string;
  partnerId: string;
}

interface LovePhoto {
  id: string;
  url: string;
  caption: string;
  created_at: string;
}

export function LoveGallery({ userId, partnerId }: LoveGalleryProps) {
  const [photos, setPhotos] = useState<LovePhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    loadPhotos();
  }, [userId, partnerId]);

  const loadPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('love_photos')
        .select('*')
        .eq('user_id', userId)
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast.error('Failed to load photos');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setUploading(true);
      toast.loading('Uploading photo...');

      // Upload image to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Math.random().toString(36).slice(2)}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('love-photos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('love-photos')
        .getPublicUrl(fileName);

      // Save photo metadata to database
      const { error: dbError } = await supabase
        .from('love_photos')
        .insert({
          user_id: userId,
          partner_id: partnerId,
          url: publicUrl,
          caption: caption || 'Our Love Story',
        });

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw dbError;
      }

      toast.dismiss();
      toast.success('Photo uploaded successfully!');
      setCaption('');
      loadPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.dismiss();
      toast.error('Failed to upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId: string) => {
    try {
      // Get the photo URL first
      const photoToDelete = photos.find(p => p.id === photoId);
      if (!photoToDelete) return;

      // Extract filename from URL
      const fileName = photoToDelete.url.split('/').pop();
      if (!fileName) return;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('love-photos')
        .remove([`${userId}/${fileName}`]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('love_photos')
        .delete()
        .eq('id', photoId);

      if (dbError) throw dbError;

      setPhotos(photos.filter(photo => photo.id !== photoId));
      toast.success('Photo deleted successfully');
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Failed to delete photo');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-rose-500/20 shadow-lg">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Love Gallery</h3>
          <p className="text-gray-300">Cherish your special moments together</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Add a caption to your photo"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white/5 border border-rose-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />

          <label className="block">
            <span className="sr-only">Choose photo</span>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className={`flex items-center justify-center px-6 py-4 border-2 border-dashed border-rose-500/20 rounded-lg transition-colors ${uploading ? 'bg-rose-500/10' : 'hover:border-rose-500/40'}`}>
                <div className="text-center">
                  <Upload className={`mx-auto h-8 w-8 mb-2 ${uploading ? 'text-rose-300 animate-bounce' : 'text-rose-500'}`} />
                  <p className="text-sm text-gray-300">
                    {uploading ? 'Uploading...' : 'Click or drag to upload a photo'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Maximum file size: 5MB
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-rose-500/20 aspect-square"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-medium mb-2">{photo.caption}</p>
                <p className="text-gray-300 text-xs">
                  {new Date(photo.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(photo.id)}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-rose-500/50 mb-4" />
          <p className="text-gray-400">No photos yet. Upload your first memory!</p>
        </div>
      )}
    </div>
  );
} 