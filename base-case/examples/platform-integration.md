# Platform Integration Example - Multi-Platform Publishing

## Overview
This example demonstrates how Dispatch Island handles multi-platform content distribution with platform-specific formatting and scheduling.

## Code Example

```typescript
// Example: Platform integration and content distribution
interface PlatformConfig {
  name: string;
  apiEndpoint: string;
  contentFormat: (content: string) => string;
  maxLength: number;
  requiresMedia: boolean;
}

class PlatformManager {
  private platforms: Map<string, PlatformConfig> = new Map();
  
  constructor() {
    this.initializePlatforms();
  }
  
  private initializePlatforms() {
    // Twitter configuration
    this.platforms.set('twitter', {
      name: 'Twitter / X',
      apiEndpoint: 'https://api.twitter.com/2/tweets',
      contentFormat: (content) => this.formatForTwitter(content),
      maxLength: 280,
      requiresMedia: false
    });
    
    // LinkedIn configuration
    this.platforms.set('linkedin', {
      name: 'LinkedIn',
      apiEndpoint: 'https://api.linkedin.com/v2/ugcPosts',
      contentFormat: (content) => this.formatForLinkedIn(content),
      maxLength: 1300,
      requiresMedia: true
    });
    
    // Medium configuration
    this.platforms.set('medium', {
      name: 'Medium',
      apiEndpoint: 'https://api.medium.com/v1/posts',
      contentFormat: (content) => this.formatForMedium(content),
      maxLength: 0, // No limit
      requiresMedia: false
    });
  }
  
  private formatForTwitter(content: string): string {
    // Add hashtags and optimize for Twitter
    const truncated = content.slice(0, 260);
    return `${truncated} #content #publishing`;
  }
  
  private formatForLinkedIn(content: string): string {
    // Professional formatting for LinkedIn
    return `🌟 ${content}\n\n#ProfessionalContent #IndustryInsights`;
  }
  
  private formatForMedium(content: string): string {
    // Blog-style formatting for Medium
    return `# ${content}\n\n---\n*Published via Dispatch Island*`;
  }
  
  async distributeContent(content: string, selectedPlatforms: string[]): Promise<void> {
    const results = [];
    
    for (const platformId of selectedPlatforms) {
      const platform = this.platforms.get(platformId);
      if (!platform) continue;
      
      try {
        // Format content for platform
        const formattedContent = platform.contentFormat(content);
        
        // Validate content length
        if (platform.maxLength > 0 && formattedContent.length > platform.maxLength) {
          throw new Error(`Content exceeds ${platform.name}'s ${platform.maxLength} character limit`);
        }
        
        // Simulate API call (replace with actual implementation)
        const result = await this.callPlatformAPI(platform.apiEndpoint, formattedContent);
        results.push({ platform: platform.name, success: true, result });
        
      } catch (error) {
        results.push({ platform: platform.name, success: false, error: error.message });
      }
    }
    
    // Save distribution results
    await this.saveDistributionResults(results);
    return results;
  }
  
  private async callPlatformAPI(endpoint: string, content: string): Promise<any> {
    // Simulated API call - replace with actual implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: Math.random().toString(36).substr(2, 9), content });
      }, 1000);
    });
  }
  
  private async saveDistributionResults(results: any[]): Promise<void> {
    // Save to chrome storage
    const timestamp = new Date().toISOString();
    await chrome.storage.local.set({ 
      lastDistribution: { timestamp, results } 
    });
  }
  
  getAvailablePlatforms(): PlatformConfig[] {
    return Array.from(this.platforms.values());
  }
}

// Usage example
const platformManager = new PlatformManager();

// Get available platforms
const availablePlatforms = platformManager.getAvailablePlatforms();
console.log('Available platforms:', availablePlatforms.map(p => p.name));

// Distribute content to selected platforms
const content = "Excited to share our latest insights on content distribution strategies!";
const platformsToPublish = ['twitter', 'linkedin'];

platformManager.distributeContent(content, platformsToPublish)
  .then(results => {
    console.log('Distribution results:', results);
    // Update UI with results
    this.updateDistributionStatus(results);
  })
  .catch(error => {
    console.error('Distribution failed:', error);
  });
```

## Usage Steps

1. **Initialize Platform Manager** - Set up configurations for each platform
2. **Format Content** - Apply platform-specific formatting rules
3. **Validate Constraints** - Check character limits and requirements
4. **Distribute** - Send content to selected platforms
5. **Track Results** - Monitor success/failure and save analytics

## Features Demonstrated

- Platform-specific content formatting
- API integration patterns
- Error handling and validation
- Asynchronous operations
- Results tracking and storage
- Configuration management

## Supported Platforms

- **Twitter/X**: Short-form content with hashtags (280 char limit)
- **LinkedIn**: Professional content with media support
- **Medium**: Long-form blog content with rich formatting
- **Extensible**: Easy to add new platforms through configuration