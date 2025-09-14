# Basic Usage Example - Popup Functionality

## Overview
This example demonstrates how to use the Dispatch Island extension popup for basic content creation and distribution.

## Code Example

```typescript
// Example: Basic popup interaction
function handleContentCreation() {
  // Get content from input field
  const content = document.getElementById('content-input').value;
  
  // Basic validation
  if (!content.trim()) {
    alert('Please enter some content first!');
    return;
  }
  
  // Prepare content for distribution
  const formattedContent = {
    text: content,
    timestamp: new Date().toISOString(),
    platforms: ['twitter', 'linkedin', 'medium']
  };
  
  // Save to local storage (simulated)
  chrome.storage.local.set({ 'draftContent': formattedContent }, () => {
    console.log('Content saved successfully!');
    
    // Open distribution panel
    chrome.tabs.create({
      url: chrome.runtime.getURL('../tabs/distribution.html')
    });
  });
}

// Event listener for the create button
document.getElementById('create-button').addEventListener('click', handleContentCreation);
```

## Usage Steps

1. **Click the extension icon** to open the popup
2. **Enter your content** in the text input field
3. **Click "Create Content"** to save and prepare for distribution
4. **Review your content** in the distribution panel
5. **Select platforms** and publish

## Features Demonstrated

- Content input and validation
- Local storage management
- Tab navigation
- Basic UI interactions