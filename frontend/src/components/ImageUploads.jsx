import React, { useState, useRef } from 'react';
import { Upload, Camera, Link as LinkIcon, X, Image, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { validateImage, fileToBase64, resizeImage, handleImageError } from '../utils/imageUtils';

const ImageUpload = ({ value, onChange, placeholder = "Upload product image" }) => {
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validation = validateImage(file);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    try {
      setUploading(true);
      const base64Image = await fileToBase64(file);
      setPreview(base64Image);
      onChange(base64Image);
      
    } catch (error) {
      toast.error('Failed to process image');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="relative">
          <input
            type="url"
            value={value || ''}
            onChange={handleUrlChange}
            className="w-full pl-8 pr-4 py-2.5 border-2 border-violet-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 bg-white text-slate-700 placeholder-violet-400/70 text-sm"
            placeholder="Paste your image URL here..."
          />
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
            <LinkIcon className="w-3 h-3 text-violet-500" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={uploading}
            className={`group relative w-full h-32 border-2 border-dashed rounded-lg transition-all duration-300 ${
              uploading
                ? 'border-violet-300 bg-violet-50/50 cursor-not-allowed'
                : 'border-violet-300 hover:border-violet-500 hover:bg-violet-50'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-2">
              {uploading ? (
                <div className="text-center">
                  <div className="relative mb-2">
                    <div className="w-6 h-6 border-2 border-violet-200 rounded-full animate-spin mx-auto">
                      <div className="absolute inset-0.5 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-violet-600">Processing...</span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-slate-700 font-medium mb-1">Drop image here</div>
                  <div className="text-xs text-slate-500">or click to browse</div>
                </div>
              )}
            </div>
          </button>
        </div>
        <div>
          <div className="relative w-full h-32">
            {preview ? (
              <div className="relative group w-full h-full">
                <div className="relative overflow-hidden rounded-lg border-2 border-violet-200 bg-white w-full h-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
                
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 shadow-lg"
                  title="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-full h-full bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                  <p className="text-xs text-slate-500">No image</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-violet-50 rounded-lg p-3 border border-violet-200/50">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-violet-600" />
          <span className="text-xs font-semibold text-slate-700">Guidelines</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            <span>High quality images</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-500" />
            <span>Square format best</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-purple-500" />
            <span>800x800px ideal</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-pink-500" />
            <span>JPG, PNG, GIF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;