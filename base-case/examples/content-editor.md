# Content Editor Example - Markdown Editing Features

## Overview
This example demonstrates the rich Markdown editor functionality in Dispatch Island, showcasing real-time preview, syntax highlighting, and platform-specific formatting.

## Code Example

```typescript
// Example: Markdown Editor Component with Real-time Preview
import React, { useState, useEffect } from 'react';
import { marked } from 'marked'; // Markdown parser
import hljs from 'highlight.js'; // Syntax highlighting

interface EditorProps {
  initialContent?: string;
  onContentChange?: (content: string, html: string) => void;
  platform?: string;
}

const MarkdownEditor: React.FC<EditorProps> = ({
  initialContent = '',
  onContentChange,
  platform = 'general'
}) => {
  const [markdown, setMarkdown] = useState(initialContent);
  const [htmlPreview, setHtmlPreview] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Configure marked with syntax highlighting
  marked.setOptions({
    highlight: function(code, language) {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(code, { language }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true
  });

  // Platform-specific formatting presets
  const platformPresets = {
    twitter: {
      maxLength: 280,
      placeholder: 'Share your thoughts (280 characters max)...',
      suggestions: ['#thread 🧵', '💡 Insight:', '🚀 Update:']
    },
    linkedin: {
      maxLength: 1300,
      placeholder: 'Write professional content...',
      suggestions: ['🌟 Professional update:', '📈 Industry insights:', '👥 Networking:']
    },
    medium: {
      maxLength: 0,
      placeholder: 'Write your story...',
      suggestions: ['# ', '## ', '> Quote:', '```code```']
    },
    general: {
      maxLength: 0,
      placeholder: 'Start writing your content...',
      suggestions: ['# Heading', '**Bold**', '*Italic*', '[Link](url)']
    }
  };

  const currentPlatform = platformPresets[platform] || platformPresets.general;

  useEffect(() => {
    // Update preview and metrics
    const updatePreview = async () => {
      try {
        const html = await marked.parse(markdown);
        setHtmlPreview(html);
        
        // Calculate metrics
        const words = markdown.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
        setCharCount(markdown.length);
        
        // Notify parent component
        if (onContentChange) {
          onContentChange(markdown, html);
        }
      } catch (error) {
        console.error('Error parsing markdown:', error);
      }
    };

    updatePreview();
  }, [markdown, onContentChange]);

  const handleFormat = (format: string) => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    
    let formattedText = '';
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](https://)`;
        break;
      case 'code':
        formattedText = `\`\`\`\n${selectedText || 'code here'}\n\`\`\``;
        break;
      case 'quote':
        formattedText = `> ${selectedText || 'quote text'}`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = markdown.substring(0, start) + formattedText + markdown.substring(end);
    setMarkdown(newContent);
  };

  const insertSuggestion = (suggestion: string) => {
    setMarkdown(prev => prev + '\n' + suggestion + ' ');
  };

  return (
    <div className="markdown-editor-container">
      {/* Toolbar */}
      <div className="editor-toolbar">
        <div className="format-buttons">
          <button onClick={() => handleFormat('bold')} title="Bold">B</button>
          <button onClick={() => handleFormat('italic')} title="Italic">I</button>
          <button onClick={() => handleFormat('link')} title="Link">🔗</button>
          <button onClick={() => handleFormat('code')} title="Code">{"</>"}</button>
          <button onClick={() => handleFormat('quote')} title="Quote">❝</button>
        </div>
        
        <div className="platform-suggestions">
          {currentPlatform.suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => insertSuggestion(suggestion)}
              className="suggestion-btn"
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        <div className="editor-metrics">
          <span>Words: {wordCount}</span>
          <span>Chars: {charCount}</span>
          {currentPlatform.maxLength > 0 && (
            <span className={charCount > currentPlatform.maxLength ? 'over-limit' : ''}>
              Limit: {currentPlatform.maxLength}
            </span>
          )}
        </div>
      </div>

      {/* Editor and Preview Split View */}
      <div className="editor-preview-split">
        {/* Markdown Editor */}
        <div className="editor-section">
          <textarea
            id="markdown-editor"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder={currentPlatform.placeholder}
            className="markdown-textarea"
            style={{
              borderColor: currentPlatform.maxLength > 0 && charCount > currentPlatform.maxLength 
                ? '#ff4757' 
                : undefined
            }}
          />
        </div>

        {/* HTML Preview */}
        <div className="preview-section">
          <div 
            className="html-preview"
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
          />
        </div>
      </div>

      {/* Platform-specific warnings */}
      {currentPlatform.maxLength > 0 && charCount > currentPlatform.maxLength && (
        <div className="warning-message">
          ⚠️ Content exceeds {platform} character limit by {charCount - currentPlatform.maxLength} characters
        </div>
      )}
    </div>
  );
};

// Usage Example
const ContentCreationApp: React.FC = () => {
  const [currentContent, setCurrentContent] = useState('');
  const [currentHtml, setCurrentHtml] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('general');

  const handleContentChange = (markdown: string, html: string) => {
    setCurrentContent(markdown);
    setCurrentHtml(html);
  };

  const handleSaveDraft = () => {
    // Save to chrome storage
    chrome.storage.local.set({
      draft: {
        content: currentContent,
        html: currentHtml,
        platform: selectedPlatform,
        lastSaved: new Date().toISOString()
      }
    });
  };

  return (
    <div className="content-creation-app">
      <div className="platform-selector">
        <label>Platform: </label>
        <select 
          value={selectedPlatform} 
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          <option value="general">General</option>
          <option value="twitter">Twitter/X</option>
          <option value="linkedin">LinkedIn</option>
          <option value="medium">Medium</option>
        </select>
        
        <button onClick={handleSaveDraft} className="save-btn">
          💾 Save Draft
        </button>
      </div>

      <MarkdownEditor
        initialContent="# Welcome to Dispatch Island\n\nStart writing your content here..."
        onContentChange={handleContentChange}
        platform={selectedPlatform}
      />

      <div className="action-buttons">
        <button className="preview-btn">👁️ Preview</button>
        <button className="schedule-btn">⏰ Schedule</button>
        <button className="publish-btn">🚀 Publish Now</button>
      </div>
    </div>
  );
};

export default ContentCreationApp;
```

## Usage Steps

1. **Select Platform** - Choose target platform for content optimization
2. **Write Content** - Use the Markdown editor with real-time preview
3. **Apply Formatting** - Use toolbar buttons or keyboard shortcuts
4. **Check Metrics** - Monitor word count and platform-specific limits
5. **Save or Publish** - Save as draft or distribute immediately

## Features Demonstrated

- **Real-time Markdown Preview** - Instant HTML rendering
- **Syntax Highlighting** - Code blocks with proper highlighting
- **Platform-specific Optimization** - Tailored formatting for each platform
- **Rich Text Formatting** - Bold, italic, links, code blocks, quotes
- **Content Metrics** - Word count, character count, limit warnings
- **Quick Insert Suggestions** - Platform-specific content templates
- **Draft Management** - Local storage integration
- **Responsive Design** - Split editor/preview layout

## Keyboard Shortcuts (Optional)

- `Ctrl+B` / `Cmd+B` - Bold selected text
- `Ctrl+I` / `Cmd+I` - Italic selected text
- `Ctrl+K` / `Cmd+K` - Insert link
- `Ctrl+Shift+C` / `Cmd+Shift+C` - Code block

## Platform-specific Features

- **Twitter**: Character limit enforcement (280 chars)
- **LinkedIn**: Professional formatting suggestions
- **Medium**: Blog-style formatting presets
- **General**: Universal Markdown support

This editor provides a comprehensive writing experience optimized for multi-platform content distribution while maintaining the simplicity and power of Markdown.