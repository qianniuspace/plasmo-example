# Storage Management Example - Chrome Storage Integration

## Overview
This example demonstrates how Dispatch Island uses Chrome's storage API for persistent data management, including content drafts, platform configurations, and distribution history.

## Code Example

```typescript
// Example: Comprehensive Storage Management System
interface StorageManager {
  // Content storage
  saveDraft(content: ContentDraft): Promise<void>;
  getDrafts(): Promise<ContentDraft[]>;
  deleteDraft(id: string): Promise<void>;
  
  // Platform configurations
  savePlatformConfig(platform: PlatformConfig): Promise<void>;
  getPlatformConfigs(): Promise<PlatformConfig[]>;
  
  // Distribution history
  saveDistributionResult(result: DistributionResult): Promise<void>;
  getDistributionHistory(): Promise<DistributionResult[]>;
  
  // User preferences
  savePreferences(prefs: UserPreferences): Promise<void>;
  getPreferences(): Promise<UserPreferences>;
}

interface ContentDraft {
  id: string;
  title: string;
  content: string;
  formattedContent: string;
  platforms: string[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'scheduled' | 'published';
  scheduleTime?: Date;
}

interface PlatformConfig {
  id: string;
  name: string;
  type: 'social' | 'blog' | 'newsletter';
  apiKey?: string;
  accessToken?: string;
  isConnected: boolean;
  lastUsed: Date;
  preferences: {
    autoFormat: boolean;
    includeHashtags: boolean;
    addSignature: boolean;
    defaultSchedule: 'immediate' | 'specific';
  };
}

interface DistributionResult {
  id: string;
  contentId: string;
  platform: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: Date;
  response?: any;
  error?: string;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  editor: {
    autoSave: boolean;
    saveInterval: number;
    defaultPlatform: string;
    wordCountGoal: number;
  };
  notifications: {
    onPublish: boolean;
    onError: boolean;
    onSchedule: boolean;
  };
}

class ChromeStorageManager implements StorageManager {
  private readonly storage = chrome.storage.local;
  private readonly keys = {
    drafts: 'content_drafts',
    platforms: 'platform_configs',
    history: 'distribution_history',
    preferences: 'user_preferences'
  };

  // Content Draft Management
  async saveDraft(draft: ContentDraft): Promise<void> {
    const drafts = await this.getDrafts();
    const existingIndex = drafts.findIndex(d => d.id === draft.id);
    
    if (existingIndex >= 0) {
      drafts[existingIndex] = { ...draft, updatedAt: new Date() };
    } else {
      drafts.push({
        ...draft,
        id: draft.id || this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await this.storage.set({ [this.keys.drafts]: drafts });
  }

  async getDrafts(): Promise<ContentDraft[]> {
    const result = await this.storage.get(this.keys.drafts);
    return result[this.keys.drafts] || [];
  }

  async deleteDraft(id: string): Promise<void> {
    const drafts = await this.getDrafts();
    const filtered = drafts.filter(draft => draft.id !== id);
    await this.storage.set({ [this.keys.drafts]: filtered });
  }

  // Platform Configuration Management
  async savePlatformConfig(config: PlatformConfig): Promise<void> {
    const configs = await this.getPlatformConfigs();
    const existingIndex = configs.findIndex(c => c.id === config.id);
    
    if (existingIndex >= 0) {
      configs[existingIndex] = { ...config, lastUsed: new Date() };
    } else {
      configs.push({
        ...config,
        id: config.id || this.generateId(),
        lastUsed: new Date()
      });
    }
    
    await this.storage.set({ [this.keys.platforms]: configs });
  }

  async getPlatformConfigs(): Promise<PlatformConfig[]> {
    const result = await this.storage.get(this.keys.platforms);
    return result[this.keys.platforms] || [];
  }

  // Distribution History Management
  async saveDistributionResult(result: DistributionResult): Promise<void> {
    const history = await this.getDistributionHistory();
    history.unshift({
      ...result,
      id: result.id || this.generateId(),
      timestamp: new Date()
    });
    
    // Keep only last 100 entries to prevent storage bloat
    const trimmedHistory = history.slice(0, 100);
    await this.storage.set({ [this.keys.history]: trimmedHistory });
  }

  async getDistributionHistory(): Promise<DistributionResult[]> {
    const result = await this.storage.get(this.keys.history);
    return result[this.keys.history] || [];
  }

  // User Preferences Management
  async savePreferences(prefs: UserPreferences): Promise<void> {
    await this.storage.set({ [this.keys.preferences]: prefs });
  }

  async getPreferences(): Promise<UserPreferences> {
    const result = await this.storage.get(this.keys.preferences);
    return result[this.keys.preferences] || this.getDefaultPreferences();
  }

  // Utility Methods
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private getDefaultPreferences(): UserPreferences {
    return {
      theme: 'auto',
      editor: {
        autoSave: true,
        saveInterval: 30000, // 30 seconds
        defaultPlatform: 'twitter',
        wordCountGoal: 500
      },
      notifications: {
        onPublish: true,
        onError: true,
        onSchedule: false
      }
    };
  }

  // Advanced Storage Operations
  async exportData(): Promise<string> {
    const data = await this.storage.get(null);
    return JSON.stringify(data, null, 2);
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      await this.storage.set(data);
    } catch (error) {
      throw new Error('Invalid JSON data for import');
    }
  }

  async clearAllData(): Promise<void> {
    await this.storage.clear();
  }

  async getStorageUsage(): Promise<number> {
    return new Promise((resolve) => {
      this.storage.getBytesInUse(null, resolve);
    });
  }
}

// Usage Examples

// Initialize storage manager
const storageManager = new ChromeStorageManager();

// Example 1: Saving a content draft
async function createNewDraft() {
  const draft: ContentDraft = {
    title: 'My First Post',
    content: '# Welcome to Dispatch Island\n\nThis is my first content draft!',
    formattedContent: '<h1>Welcome to Dispatch Island</h1><p>This is my first content draft!</p>',
    platforms: ['twitter', 'linkedin'],
    status: 'draft'
  };

  await storageManager.saveDraft(draft);
  console.log('Draft saved successfully!');
}

// Example 2: Managing platform configurations
async function setupTwitterPlatform() {
  const twitterConfig: PlatformConfig = {
    name: 'Twitter / X',
    type: 'social',
    apiKey: 'your-api-key-here', // In real implementation, use secure storage
    isConnected: true,
    preferences: {
      autoFormat: true,
      includeHashtags: true,
      addSignature: false,
      defaultSchedule: 'immediate'
    }
  };

  await storageManager.savePlatformConfig(twitterConfig);
  console.log('Twitter configuration saved!');
}

// Example 3: Tracking distribution results
async function trackDistribution(contentId: string, platform: string) {
  const result: DistributionResult = {
    contentId,
    platform,
    status: 'success',
    response: { postId: '12345', url: 'https://twitter.com/status/12345' }
  };

  await storageManager.saveDistributionResult(result);
  console.log('Distribution tracked!');
}

// Example 4: Managing user preferences
async function updateUserTheme(theme: UserPreferences['theme']) {
  const currentPrefs = await storageManager.getPreferences();
  const updatedPrefs: UserPreferences = {
    ...currentPrefs,
    theme
  };

  await storageManager.savePreferences(updatedPrefs);
  console.log('Theme preference updated!');
}

// Example 5: Auto-save functionality
function setupAutoSave(editor: any, interval: number = 30000) {
  let saveTimeout: NodeJS.Timeout;

  const autoSave = async () => {
    if (editor.hasUnsavedChanges()) {
      const draft = editor.getCurrentDraft();
      await storageManager.saveDraft(draft);
      console.log('Auto-saved draft');
    }
  };

  // Start auto-save interval
  const startAutoSave = () => {
    saveTimeout = setInterval(autoSave, interval);
  };

  // Stop auto-save
  const stopAutoSave = () => {
    if (saveTimeout) {
      clearInterval(saveTimeout);
    }
  };

  return { startAutoSave, stopAutoSave };
}

// Advanced Usage: Data migration and cleanup
async function performStorageMaintenance() {
  const usage = await storageManager.getStorageUsage();
  console.log(`Current storage usage: ${usage} bytes`);
  
  if (usage > 5000000) { // 5MB threshold
    console.log('Performing storage cleanup...');
    
    // Clean up old distribution history
    const history = await storageManager.getDistributionHistory();
    const recentHistory = history.slice(0, 50); // Keep only 50 most recent
    await storageManager.storage.set({ 
      [storageManager.keys.history]: recentHistory 
    });
    
    console.log('Storage cleanup completed');
  }
}

// Error Handling Wrapper
async function withStorageErrorHandling<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error(`Storage operation failed (${operationName}):`, error);
    
    // Check if it's a quota exceeded error
    if (error.message.includes('QUOTA_BYTES')) {
      console.warn('Storage quota exceeded, performing cleanup...');
      await performStorageMaintenance();
      
      // Retry the operation
      return await operation();
    }
    
    throw error;
  }
}

// Usage with error handling
async function safeSaveDraft(draft: ContentDraft) {
  return withStorageErrorHandling(
    () => storageManager.saveDraft(draft),
    'saveDraft'
  );
}
```

## Usage Steps

1. **Initialize Storage Manager** - Create instance of ChromeStorageManager
2. **Save Content Drafts** - Store Markdown content with metadata
3. **Manage Platform Configs** - Save API keys and platform preferences
4. **Track Distribution** - Record publishing results and errors
5. **Handle User Preferences** - Store theme, auto-save settings, etc.

## Features Demonstrated

- **Content Draft Management** - CRUD operations for content drafts
- **Platform Configuration** - Secure storage of API credentials
- **Distribution History** - Tracking of publishing results
- **User Preferences** - Persistent settings storage
- **Error Handling** - Robust error management and quota handling
- **Data Migration** - Storage maintenance and cleanup
- **Export/Import** - Data backup and restoration
- **Auto-save** - Background content preservation

## Storage Quota Considerations

- Chrome extensions have ~5MB local storage limit
- Implement automatic cleanup of old data
- Use compression for large content if needed
- Handle quota exceeded errors gracefully

## Security Notes

- API keys should be stored securely
- Consider encryption for sensitive data
- Implement proper error handling for storage operations
- Regularly backup important data

This storage system provides a robust foundation for managing all persistent data in the Dispatch Island extension, ensuring reliable operation and excellent user experience.