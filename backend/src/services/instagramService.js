// src/services/instagramService.js
const axios = require('axios');

class InstagramService {
  constructor() {
    this.appId = process.env.INSTAGRAM_APP_ID;
    this.appSecret = process.env.INSTAGRAM_APP_SECRET;
    this.redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
    this.graphVersion = process.env.FACEBOOK_GRAPH_VERSION || 'v23.0';
    this.graphUrl = `https://graph.facebook.com/${this.graphVersion}`;
    this.accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  }

  // Generate OAuth login URL for a specific username (optional parameter)
  getAuthUrl(username = '') {
    const scopes = 'instagram_basic,pages_show_list';
    return `https://api.instagram.com/oauth/authorize?client_id=${this.appId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${scopes}&state=${encodeURIComponent(username)}&response_type=code`;
  }

  // Exchange code for long-lived token and fetch Instagram account ID
  async exchangeCodeForToken(code, state) {
    try {
      // Step 1: Get short-lived token
      const shortTokenResponse = await axios.get(this.accessTokenUrl, {
        params: {
          client_id: this.appId,
          client_secret: this.appSecret,
          redirect_uri: this.redirectUri,
          code,
        },
      });

      const shortToken = shortTokenResponse.data.access_token;

      // Step 2: Exchange for long-lived token
      const longTokenResponse = await axios.get(`${this.graphUrl}/access_token`, {
        params: {
          grant_type: 'fb_exchange_token',
          client_id: this.appId,
          client_secret: this.appSecret,
          fb_exchange_token: shortToken,
        },
      });

      const longToken = longTokenResponse.data.access_token;

      // Step 3: Get Instagram Account ID from Page
      const pageResponse = await axios.get(`${this.graphUrl}/me/accounts`, {
        params: { access_token: longToken },
      });

      if (pageResponse.data.data.length === 0) {
        throw new Error('No Facebook Page found. Link a Page to your Instagram Business account.');
      }

      const pageId = pageResponse.data.data[0].id;
      const igResponse = await axios.get(`${this.graphUrl}/${pageId}`, {
        params: { fields: 'instagram_business_account', access_token: longToken },
      });

      const igAccountId = igResponse.data.instagram_business_account?.id;
      if (!igAccountId) {
        throw new Error('Instagram Business account not linked to Page.');
      }

      return {
        success: true,
        data: {
          accessToken: longToken,
          instagramAccountId: igAccountId,
          username: state, // Passed back from state
        },
      };
    } catch (error) {
      console.error('Token Exchange Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Token exchange failed',
      };
    }
  }

  // Fetch user profile data
  async fetchUserData(accessToken, instagramAccountId) {
    try {
      const fields = 'id,username,account_type,media_count,followers_count,follows_count,biography,profile_picture_url';
      const url = `${this.graphUrl}/${instagramAccountId}?fields=${fields}&access_token=${accessToken}`;
      
      const response = await axios.get(url);
      return {
        success: true,
        data: {
          instagramId: response.data.id,
          username: response.data.username,
          accountType: response.data.account_type,
          followersCount: response.data.followers_count || 0,
          followingCount: response.data.follows_count || 0,
          postsCount: response.data.media_count || 0,
          biography: response.data.biography || '',
          profilePictureUrl: response.data.profile_picture_url || '',
          rawData: response.data,
        },
      };
    } catch (error) {
      console.error('Instagram Graph API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to fetch profile data',
      };
    }
  }

  // Fetch recent media/posts
  async fetchMedia(accessToken, instagramAccountId, limit = 25) {
    try {
      const url = `${this.graphUrl}/${instagramAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&limit=${limit}&access_token=${accessToken}`;
      
      const response = await axios.get(url);
      return {
        success: true,
        data: {
          posts: response.data.data.map(post => ({
            postId: post.id,
            caption: post.caption || '',
            mediaType: post.media_type,
            mediaUrl: post.media_url,
            thumbnailUrl: post.thumbnail_url,
            permalink: post.permalink,
            timestamp: new Date(post.timestamp),
            likesCount: post.like_count || 0,
            commentsCount: post.comments_count || 0,
            rawData: post,
          })),
          paging: response.data.paging,
        },
      };
    } catch (error) {
      console.error('Media Fetch Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Failed to fetch media',
      };
    }
  }
}

module.exports = new InstagramService();