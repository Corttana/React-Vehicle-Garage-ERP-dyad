import React, { useState, useEffect, useCallback } from 'react';
import { getChecklistImages, uploadChecklistImage, deleteChecklistImage } from '@/lib/api';
import { ChecklistImage } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { UploadCloud, Trash2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { showLoading, showSuccess, showError, dismissToast } from '@/utils/toast';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';

interface ChecklistImageUploadProps {
  docCode?: string;
  isEditMode: boolean;
}

const ChecklistImageUpload = ({ docCode, isEditMode }: ChecklistImageUploadProps) => {
  const [images, setImages] = useState<ChecklistImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);

  const fetchImages = useCallback(async () => {
    if (!docCode) return;
    setLoading(true);
    const fetchedImages = await getChecklistImages(docCode);
    setImages(fetchedImages);
    setLoading(false);
  }, [docCode]);

  useEffect(() => {
    if (isEditMode && docCode) {
      fetchImages();
    } else {
      setLoading(false);
    }
  }, [isEditMode, docCode, fetchImages]);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || !docCode) return;
    setUploading(true);
    const toastId = showLoading(`Uploading ${files.length} image(s)...`);

    const uploadPromises = Array.from(files).map(file => uploadChecklistImage(docCode, file));
    
    await Promise.all(uploadPromises);
    
    dismissToast(toastId);
    showSuccess('Upload complete!');
    setUploading(false);
    fetchImages(); // Refresh the list
  };

  const handleDeleteClick = (imageId: number) => {
    setImageToDelete(imageId);
  };

  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;
    const toastId = showLoading('Deleting image...');
    const success = await deleteChecklistImage(imageToDelete);
    dismissToast(toastId);
    if (success) {
      showSuccess('Image deleted.');
      setImages(prev => prev.filter(img => img.imageId !== imageToDelete));
    } else {
      showError('Failed to delete image.');
    }
    setImageToDelete(null);
  };

  const dragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const dragEnter = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const dragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const fileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  if (!isEditMode) {
    return (
      <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg text-center text-muted-foreground">
        <AlertCircle className="h-12 w-12 mb-4" />
        <h3 className="text-lg font-semibold">Save to Upload</h3>
        <p>Please save the service reception first to enable image uploads.</p>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}`}
        onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={fileDrop}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          Drag & drop files here, or{' '}
          <label htmlFor="file-upload" className="font-semibold text-primary cursor-pointer hover:underline">
            click to browse
          </label>
        </p>
        <input id="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={(e) => handleFileChange(e.target.files)} disabled={uploading} />
        {uploading && <p className="text-sm text-primary mt-2">Uploading...</p>}
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <Card key={i}>
              <AspectRatio ratio={1 / 1}><Skeleton className="h-full w-full" /></AspectRatio>
              <CardContent className="p-2"><Skeleton className="h-4 w-3/4" /></CardContent>
            </Card>
          ))
        ) : images.length > 0 ? (
          images.map(image => (
            <Dialog key={image.imageId}>
              <Card className="group relative overflow-hidden">
                <DialogTrigger asChild>
                  <AspectRatio ratio={1 / 1} className="cursor-pointer">
                    <img src={image.filePath} alt={image.fileName} className="object-cover w-full h-full transition-transform group-hover:scale-105" />
                  </AspectRatio>
                </DialogTrigger>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteClick(image.imageId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-2 truncate">
                  <p className="text-xs font-medium text-muted-foreground" title={image.fileName}>{image.fileName}</p>
                </CardContent>
              </Card>
              <DialogContent className="sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]">
                <DialogHeader><DialogTitle>{image.fileName}</DialogTitle></DialogHeader>
                <img src={image.filePath} alt={image.fileName} className="w-full h-auto rounded-md" />
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            <ImageIcon className="mx-auto h-12 w-12 mb-4" />
            <p>No images uploaded yet.</p>
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={!!imageToDelete}
        onClose={() => setImageToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Image?"
        description="Are you sure you want to permanently delete this image? This action cannot be undone."
      />
    </div>
  );
};

export default ChecklistImageUpload;