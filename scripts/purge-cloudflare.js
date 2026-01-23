#!/usr/bin/env node
// Purge Cloudflare cache for the configured zone using an API Token.
// Supports passing a JSON array of changed file paths via CHANGED_PATHS env var.
// If no matching URLs can be derived, falls back to purge_everything: true.

const MAX_FILES_PER_REQUEST = 30;

function mapPathToUrl(baseUrl, p) {
  if (!p) return null;
  p = p.replace(/^\.\//, '');
  if (p === 'index.html') return baseUrl.replace(/\/$/, '') + '/';
  if (p.startsWith('public/')) return baseUrl.replace(/\/$/, '') + '/' + p.replace(/^public\//, '');
  if (p.startsWith('src/assets/')) return baseUrl.replace(/\/$/, '') + '/assets/' + p.replace(/^src\/assets\//, '');
  if (p.startsWith('assets/')) return baseUrl.replace(/\/$/, '') + '/' + p.replace(/^assets\//, '');
  // Add more mappings if you have other predictable build outputs
  return null;
}

async function purgeUrls(zone, token, urls) {
  const chunks = [];
  for (let i = 0; i < urls.length; i += MAX_FILES_PER_REQUEST) {
    chunks.push(urls.slice(i, i + MAX_FILES_PER_REQUEST));
  }

  for (const chunk of chunks) {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ files: chunk })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error('Cloudflare purge failed: ' + JSON.stringify(data));
    }
  }
}

async function purgeEverything(zone, token) {
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ purge_everything: true })
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error('Cloudflare purge failed: ' + JSON.stringify(data));
}

async function main() {
  const zone = process.env.CF_ZONE_ID;
  const token = process.env.CF_API_TOKEN;
  const baseUrl = process.env.BASE_URL || 'https://www.furry.ist';
  const changedJson = process.env.CHANGED_PATHS || process.env.INPUT_CHANGED_PATHS;

  if (!zone || !token) {
    console.error('Missing CF_ZONE_ID or CF_API_TOKEN environment variables.');
    process.exit(1);
  }

  try {
    console.log('Cloudflare zone:', zone);
    let urls = [];

    // If explicit URLs are provided (from build output), use them directly
    const purgeUrlsJson = process.env.PURGE_URLS || process.env.INPUT_PURGE_URLS;
    if (purgeUrlsJson) {
      try {
        const provided = JSON.parse(purgeUrlsJson || '[]');
        if (Array.isArray(provided) && provided.length > 0) {
          urls = provided.map(String);
        }
      } catch (e) {
        console.warn('Failed to parse PURGE_URLS, ignoring:', e.message);
      }
    }

    if (changedJson && urls.length === 0) {
      try {
        const paths = JSON.parse(changedJson || '[]');
        for (const p of paths) {
          const url = mapPathToUrl(baseUrl, p);
          if (url) urls.push(url);
        }
        // de-duplicate
        urls = Array.from(new Set(urls));
      } catch (e) {
        console.warn('Failed to parse CHANGED_PATHS, ignoring:', e.message);
      }
    }

    if (urls.length === 0) {
      console.log('No specific URLs derived from changed files — purging everything.');
      await purgeEverything(zone, token);
      console.log('Purge everything succeeded.');
    } else {
      console.log('Purging specific URLs:', urls);
      await purgeUrls(zone, token, urls);
      console.log('Purge specific URLs succeeded.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Error while purging Cloudflare cache:', err);
    process.exit(1);
  }
}

main();
