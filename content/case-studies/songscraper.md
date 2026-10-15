SongScraper is an iOS app that finds the songs in any Instagram reel. You paste or share a reel link, and it finds every song in the clip, whether the song is tagged in the reel's audio, shown as on-screen text, or just audible. I spun it out of Museaic's reel importer as its own app.

## Overview

The reel importer started as one feature inside [Museaic](https://github.com/Techo10n/musicbridge). It answered a complete question by itself ("what song is this?") and needed none of Museaic's account linking, sharing, or social features. So in August 2026 I moved it into a standalone app that can reach people who would never sign up for a music-sharing app. A month later I deleted Museaic's copy, and SongScraper became the only home for the pipeline.

The app does one thing. There are no streaming-service logins and no social features, and you don't need an account: the app starts a guest session, and if you sign up later, your history comes with you. Tapping a song opens it in your own streaming app. The first tap asks whether you use Spotify, Apple Music, or YouTube Music and remembers the answer (long-press a song to choose again). Skipping service logins cuts out the OAuth, token refresh, and reconnect flows, which caused the most complexity and bugs in Museaic.

## What I built

- A paste-a-link home screen, and a banner that appears when a reel link is on your clipboard.
- A native iOS Share Extension, so you can send a reel straight from Instagram's share sheet.
- A ranked list of results that you can save to your history.
- A server-side identification pipeline running as a Supabase Edge Function, so the API keys never ship inside the app.

## How it works

SongScraper collects three kinds of evidence and keeps them in separate buckets instead of merging them early:

1. **Instagram's own metadata:** the reel's music attribution and caption, read from the reel's public embed page. When the attribution is there, it's reliable enough to stand on its own.
2. **Audio fingerprinting:** the reel's audio is scanned in chunks with AudD, and the hits are cleaned up against iTunes.
3. **On-screen text:** the app pulls frames from the video on the device, and Claude Haiku reads song cards off them. It reports a song only when it can read both the title and the artist in the same frame.

The app then ranks all the hits together. A song scores higher when more than one source agrees on it and when it shows up earlier in the reel. Reading frames is the expensive step, so it only runs again when the first results come back thin. It checks late frames first, then the middle, then the beginning, and it stops after several batches in a row find nothing. Very short reels with many songs get a single dense pass over the whole video instead.

## Tech stack

- Expo, React Native, Expo Router, and TypeScript
- Supabase: Postgres, Auth, RLS, and Edge Functions
- AudD audio fingerprinting
- Anthropic Claude Haiku for reading on-screen text
- The iTunes Search API, to clean up song titles and open exact tracks in Apple Music
- A native iOS Share Extension

## What I learned

- **Don't trust one confident source.** Trusting any single source on its own produced a steady stream of false positives. Ranking by agreement between sources is what made the results reliable.
- **The model has to see both halves.** Reading titles alone turned captions, usernames, and playlist labels into "songs," so I removed that path completely. Album art also produced made-up answers.
- **Absence of evidence is the right trigger.** It's tempting to skip frame reading when the audio already found a few songs. But reels packed with several songs often have Instagram audio that has nothing to do with the tracklist on screen.
- **Platforms change under you.** Instagram's anonymous API started rate-limiting every request, so the pipeline now reads the reel's public embed page instead. song.link's API began requiring a key, so songs now open directly in the user's own app.
- **Dense reels need dense sampling.** When each song card is on screen for one or two seconds, sparse frames miss it, and big batches of frames make the model merge several songs into one answer.

## Status

I submitted the first TestFlight build in August 2026. It supports Instagram only. The link parser already recognizes TikTok links, but supporting TikTok means building a second way to pull out the evidence, not flipping a setting. In October 2026 I made accounts optional and moved the app to Expo SDK 57. Next steps are real TestFlight feedback on reels I didn't pick, then TikTok support.
