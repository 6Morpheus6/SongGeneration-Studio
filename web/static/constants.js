// SongGeneration Studio - Constants & Configuration

// React hooks extraction
var { useState, useEffect, useRef, useCallback, useMemo } = React;

// Section type configurations
var SECTION_TYPES = {
    'intro': { name: 'Intro', color: '#8B5CF6', hasLyrics: false, hasDuration: true },
    'verse': { name: 'Verse', color: '#3B82F6', hasLyrics: true, hasDuration: false },
    'chorus': { name: 'Chorus', color: '#F59E0B', hasLyrics: true, hasDuration: false },
    'bridge': { name: 'Bridge', color: '#EC4899', hasLyrics: true, hasDuration: false },
    'inst': { name: 'Inst', color: '#10B981', hasLyrics: false, hasDuration: true },
    'outro': { name: 'Outro', color: '#EAB308', hasLyrics: false, hasDuration: true },
    'prechorus': { name: 'Pre-Chorus', color: '#06B6D4', hasLyrics: true, hasDuration: false },
};

// Model generation time defaults (in seconds) - used as starting point before learning
var MODEL_BASE_TIMES = {
    'songgeneration_base': 180,       // 3:00
    'songgeneration_base_new': 180,   // 3:00
    'songgeneration_base_full': 240,  // 4:00
    'songgeneration_large': 360,      // 6:00
};

// Maximum additional time based on lyrics/sections (in seconds)
var MODEL_MAX_ADDITIONAL = {
    'songgeneration_base': 180,       // +3:00 max = 6:00 total
    'songgeneration_base_new': 180,   // +3:00 max = 6:00 total
    'songgeneration_base_full': 240,  // +4:00 max = 8:00 total
    'songgeneration_large': 360,      // +6:00 max = 12:00 total
};

// Default song sections
var DEFAULT_SECTIONS = [
    { id: '1', type: 'intro-short', lyrics: '' },
    { id: '2', type: 'verse', lyrics: '' },
    { id: '3', type: 'chorus', lyrics: '' },
    { id: '4', type: 'verse', lyrics: '' },
    { id: '5', type: 'outro-short', lyrics: '' },
];

// Duration widths for resizable sections
var DURATION_WIDTHS = { short: 52, medium: 66, long: 80 };

// Suggestion lists
var GENRE_SUGGESTIONS = ['Pop', 'Rock', 'Hip-Hop', 'R&B', 'Electronic', 'Jazz', 'Classical', 'Country', 'Folk', 'Blues', 'Reggae', 'Metal', 'Punk', 'Soul', 'Funk', 'Disco', 'House', 'Techno', 'Ambient', 'Indie', 'Alternative', 'K-Pop', 'Latin', 'Afrobeat'];
var MOOD_SUGGESTIONS = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Melancholic', 'Uplifting', 'Dark', 'Dreamy', 'Aggressive', 'Peaceful', 'Nostalgic', 'Hopeful', 'Intense', 'Playful', 'Mysterious', 'Euphoric', 'Chill', 'Powerful', 'Tender'];
var TIMBRE_SUGGESTIONS = ['Warm', 'Bright', 'Dark', 'Soft', 'Harsh', 'Smooth', 'Gritty', 'Airy', 'Rich', 'Thin', 'Full', 'Hollow', 'Crisp', 'Mellow', 'Punchy', 'Breathy'];
var INSTRUMENT_SUGGESTIONS = ['Piano', 'Guitar', 'Drums', 'Bass', 'Violin', 'Synthesizer', 'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Organ', 'Harp', 'Percussion', 'Strings', 'Brass', 'Woodwinds', 'Electric Guitar', 'Acoustic Guitar', '808'];

// ============ Utility Functions ============

// Format seconds to MM:SS
var formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Parse section type into base and duration
var fromApiType = (type) => {
    const parts = type.split('-');
    if (parts.length === 2 && ['short', 'medium', 'long'].includes(parts[1])) {
        return { base: parts[0], duration: parts[1] };
    }
    return { base: type, duration: null };
};

// Scrollbar style helper
var getScrollStyle = (isHovered) => ({
    scrollbarWidth: 'thin',
    scrollbarColor: isHovered ? '#3a3a3a transparent' : 'transparent transparent',
});

// Button style generator
var btnStyle = (isActive, activeColor = '#10B981') => ({
    flex: 1,
    padding: '10px 16px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s',
    backgroundColor: isActive ? activeColor : '#1e1e1e',
    color: isActive ? '#fff' : '#777',
});
