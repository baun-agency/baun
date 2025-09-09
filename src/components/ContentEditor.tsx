import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './ImageUpload';
import { Image as ImageIcon } from 'lucide-react';

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  postSlug?: string;
  placeholder?: string;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ 
  value, 
  onChange, 
  postSlug, 
  placeholder = "Write your blog post content..." 
}) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleImageUploaded = (url: string) => {
    const imageMarkdown = `\n\n![Image](${url})\n\n`;
    const newContent = value.slice(0, cursorPosition) + imageMarkdown + value.slice(cursorPosition);
    onChange(newContent);
    setShowImageUpload(false);
  };

  const handleInsertImage = () => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    if (textarea) {
      setCursorPosition(textarea.selectionStart);
    }
    setShowImageUpload(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Content</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleInsertImage}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>
      
      {showImageUpload && (
        <div className="space-y-2">
          <ImageUpload 
            onImageUploaded={handleImageUploaded} 
            postSlug={postSlug}
            className="max-w-md mx-auto"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowImageUpload(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      )}
      
      <Textarea
        name="content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[300px] font-mono text-sm"
        onSelect={(e) => {
          const target = e.target as HTMLTextAreaElement;
          setCursorPosition(target.selectionStart);
        }}
      />
      
      <div className="text-xs text-muted-foreground">
        Supports Markdown formatting. Images will be inserted at cursor position.
      </div>
    </div>
  );
};