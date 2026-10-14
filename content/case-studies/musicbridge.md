MusicBridge is a cross-platform music sharing app. Someone on Spotify, Apple Music, or YouTube Music sends you a song or a playlist, and MusicBridge recreates it on whichever service you use. It's in TestFlight beta with 20+ users.

## Overview

A link from one streaming service is no use to someone who listens on another. With MusicBridge, the sender shares from their own library and the recipient opens the music in their own app. The tagline is "Any song, to anyone, on any app." It ships under the name Museaic.

Longer term I want it to be a social music platform, with feeds, following, collaborative playlists, and tools for artists.

## What I built

- **Accounts and onboarding.** Passwordless sign-in through Apple, Google, or a six-digit email code. Onboarding asks one question per screen: where you listen, then your profile and username, then people to add, then notifications.
- **Service connections.** OAuth for Spotify and YouTube Music, and native MusicKit authorization for Apple Music through a local Expo module. You get full library access: playlists, saved songs, and followed artists.
- **Sharing.** One share composer: pick a song or playlist, pick friends, add a note, send. You can also drop a song to everyone who follows you. A shared song opens on its own screen with the art, the sender's note, reactions, and a button for each service.
- **Social layer.** A feed, friend requests, a taste match between two people, emoji reactions, and push notifications.
- **Playlist conversion.** A shared playlist becomes a real playlist in the recipient's library, with live progress.

## How it works

There's no custom backend server. The app talks to Supabase for auth, Postgres, row-level security, and Realtime, and it calls the streaming APIs straight from the device with each user's stored OAuth tokens. Only three jobs run server side as Supabase Edge Functions, because they need secrets or a long runtime: playlist conversion, signing the Apple Music developer token, and push delivery.

Converting a track tries the cheapest, most certain step first:

1. **Cache:** someone has already resolved this track.
2. **Carried ID:** the share already names the track on the destination service.
3. **ISRC:** Spotify and Apple Music both expose the recording's ISRC, so between those two services, matching is an exact lookup instead of a guess.
4. **Search:** a scored title-and-artist search, used only when nothing else works. It's also the only step that can be wrong.

Conversion runs as an Edge Function and reports progress through Realtime. A provider sits above the screens, so a conversion keeps running when you navigate away, and a pill above the tab bar shows it until it finishes.

## Tech stack

- Expo, React Native, React 19, and Expo Router
- TypeScript
- Supabase: Postgres, Auth, RLS, Realtime, and Deno Edge Functions
- Spotify Web API, Apple Music API with native MusicKit, and the YouTube Data API
- Jest and React Native Testing Library

## Challenges

- **YouTube has no clean song catalog.** I only store or match a YouTube ID when it comes from an official "Artist - Topic" channel. Anything else could deep-link the recipient to a music video or a reupload. Artist names are pulled out in stages: first the video title, then the description, then the tags, then the cleaned channel name. That way distributor channels that upload other artists' music still resolve to the right artist.
- **Only the sender's ID can be trusted.** The sender holds a token for one service, so a share stores only that service's ID, and the recipient's device resolves the rest. All shares go through one module, because three screens used to write shares separately and drifted apart.
- **Quotas.** A large playlist can use up the Spotify developer quota partway through a conversion. The app reports that as a quota error rather than "no tracks could be matched."

## Status

In TestFlight beta with 20+ users, and in active development. I recently redesigned the whole app around a token-based design system with light and dark modes.
