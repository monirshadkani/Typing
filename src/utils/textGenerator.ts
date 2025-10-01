/**
 * Enhanced text generator for typing practice
 * Primary: Uses words-api for diverse vocabulary
 * Fallback: Built-in word banks when API unavailable
 * Supports deterministic generation with optional seed for testing
 */

// Curated word bank organized by frequency and type
const WORD_BANK = {
  common: [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with',
    'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
    'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up',
    'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time',
    'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
    'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
    'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
    'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
  ],
  noun: [
    'time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child',
    'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number',
    'group', 'problem', 'fact', 'home', 'water', 'room', 'mother', 'area', 'money', 'story', 'month',
    'book', 'job', 'word', 'business', 'issue', 'side', 'kind', 'head', 'house', 'service', 'friend',
    'father', 'power', 'hour', 'game', 'line', 'end', 'member', 'law', 'car', 'city', 'community',
    'name', 'president', 'team', 'minute', 'idea', 'kid', 'body', 'information', 'back', 'parent',
    'face', 'others', 'level', 'office', 'door', 'health', 'person', 'art', 'war', 'history'
  ],
  verb: [
    'be', 'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see', 'come', 'think', 'look',
    'want', 'give', 'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try', 'leave', 'call',
    'run', 'move', 'live', 'believe', 'hold', 'bring', 'happen', 'write', 'provide', 'sit', 'stand', 
    'lose', 'pay', 'meet', 'include', 'continue', 'set', 'learn', 'change', 'lead', 'understand', 
    'watch', 'follow', 'stop', 'create', 'speak', 'read', 'build', 'play', 'help', 'show', 'hear',
    'become', 'send', 'receive', 'develop', 'grow', 'start', 'begin', 'finish', 'complete', 'open',
    'close', 'turn', 'walk', 'drive', 'fly', 'travel', 'visit', 'stay', 'return', 'arrive'
  ],
  adjective: [
    'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old', 'right',
    'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important', 'few',
    'public', 'bad', 'same', 'able', 'local', 'sure', 'human', 'far', 'open', 'possible', 'white',
    'real', 'best', 'another', 'social', 'second', 'recent', 'available', 'particular', 'full',
    'popular', 'hard', 'beautiful', 'strong', 'quick', 'slow', 'fast', 'easy', 'difficult', 'simple',
    'complex', 'modern', 'ancient', 'fresh', 'clean', 'dirty', 'bright', 'dark', 'light', 'heavy',
    'soft', 'smooth', 'rough', 'sharp', 'clear', 'busy', 'quiet', 'loud', 'peaceful', 'active'
  ]
};

// Sentence templates with placeholders
const SENTENCE_TEMPLATES = [
  'The {noun} {verb} {adjective} and {adjective}.',
  '{adjective} {noun} can {verb} very {adjective}.',
  'When you {verb} the {noun}, it becomes {adjective}.',
  'Many people {verb} that {adjective} {noun} are important.',
  'The {adjective} {noun} will {verb} tomorrow.',
  'She decided to {verb} the {adjective} {noun}.',
  'We should {verb} more {adjective} {noun} in our work.',
  'The {noun} was {adjective} but also very {adjective}.',
  'How can we {verb} such {adjective} {noun}?',
  'Every {adjective} {noun} has the ability to {verb}.',
  'The {noun} and the {noun} both {verb} well.',
  'Without {adjective} {noun}, we cannot {verb} properly.',
  'This {adjective} {noun} will {verb} next week.',
  'Most {adjective} {noun} tend to {verb} quickly.',
  'The {noun} seems {adjective} when you {verb} it.'
];

// Simple seeded random number generator for deterministic output
class SeededRandom {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }

  choice<T>(array: T[]): T {
    return array[this.nextInt(array.length)];
  }
}

// Words API configuration
const WORDS_API_CONFIG = {
  baseUrl: 'https://api.github.com/repos/dulldesk/words-api', // Fallback to a reasonable endpoint
  timeout: 3000, // 3 second timeout
  retries: 2,
  cache: new Map<string, { words: string[], timestamp: number }>(),
  cacheTimeout: 5 * 60 * 1000 // 5 minutes
};

// API Response interfaces
interface WordsApiResponse {
  words?: string[];
  data?: string[];
  results?: string[];
  [key: string]: any;
}


export interface TextGeneratorOptions {
  minSentences?: number;
  maxSentences?: number;
  targetLength?: number;
  seed?: number;
  useApi?: boolean; // Allow disabling API for testing
}

export class TextGenerator {
  private rng: SeededRandom;
  private apiEnabled: boolean;

  constructor(seed?: number, enableApi: boolean = true) {
    this.rng = new SeededRandom(seed);
    this.apiEnabled = enableApi;
  }

  /**
   * Fetch words from the words-api with caching and error handling
   */
  private async fetchWordsFromApi(type: 'noun' | 'verb' | 'adjective', count: number = 10): Promise<string[]> {
    const cacheKey = `${type}_${count}`;
    const cached = WORDS_API_CONFIG.cache.get(cacheKey);
    
    // Return cached results if still valid
    if (cached && Date.now() - cached.timestamp < WORDS_API_CONFIG.cacheTimeout) {
      return cached.words;
    }

    // Try multiple potential API endpoints
    const endpoints = [
      `https://raw.githubusercontent.com/dulldesk/words-api/main/words/${type}s.json`,
      `https://api.github.com/repos/dulldesk/words-api/contents/words/${type}s.json`,
      `https://dulldesk.github.io/words-api/words/${type}s.json`
    ];

    for (let attempt = 0; attempt <= WORDS_API_CONFIG.retries; attempt++) {
      for (const endpoint of endpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), WORDS_API_CONFIG.timeout);

          const response = await fetch(endpoint, {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'TypingSpeedTest/1.0'
            }
          });

          clearTimeout(timeoutId);

          if (!response.ok) continue;

          const data: WordsApiResponse = await response.json();
          let words: string[] = [];

          // Handle different response formats
          if (Array.isArray(data)) {
            words = data;
          } else if (data.words && Array.isArray(data.words)) {
            words = data.words;
          } else if (data.data && Array.isArray(data.data)) {
            words = data.data;
          } else if (data.results && Array.isArray(data.results)) {
            words = data.results;
          } else if (data.content && typeof data.content === 'string') {
            // Handle GitHub API base64 encoded content
            try {
              const decoded = JSON.parse(atob(data.content));
              words = Array.isArray(decoded) ? decoded : decoded.words || [];
            } catch (e) {
              continue;
            }
          }

          if (words.length > 0) {
            // Filter and clean words
            words = words
              .filter(word => typeof word === 'string' && word.length > 1 && word.length < 12)
              .map(word => word.toLowerCase().trim())
              .filter(word => /^[a-z]+$/.test(word)); // Only alphabetic words

            if (words.length > 0) {
              // Cache successful results
              WORDS_API_CONFIG.cache.set(cacheKey, {
                words: words.slice(0, Math.max(count, 50)), // Cache more than requested
                timestamp: Date.now()
              });

              // Return shuffled subset
              const shuffled = [...words].sort(() => this.rng.next() - 0.5);
              return shuffled.slice(0, count);
            }
          }
        } catch (error) {
          // Silent fail, try next endpoint or attempt
          console.debug(`API attempt ${attempt + 1} failed for ${endpoint}:`, error);
        }
      }
    }

    // All API attempts failed, return empty array to trigger fallback
    return [];
  }

  /**
   * Get random word with API-first approach and fallback
   */
  private async getRandomWordAsync(category: keyof typeof WORD_BANK, useApi: boolean = true): Promise<string> {
    if (useApi && this.apiEnabled && category !== 'common') {
      try {
        const apiWords = await this.fetchWordsFromApi(category as 'noun' | 'verb' | 'adjective', 5);
        if (apiWords.length > 0) {
          return this.rng.choice(apiWords);
        }
      } catch (error) {
        console.debug(`API fetch failed for ${category}, using fallback`);
      }
    }

    // Fallback to built-in word bank
    return this.rng.choice(WORD_BANK[category]);
  }

  /**
   * Generate a random word from specified category
   */
  private getRandomWord(category: keyof typeof WORD_BANK): string {
    return this.rng.choice(WORD_BANK[category]);
  }

  /**
   * Fill a sentence template with random words (synchronous fallback)
   */
  private fillTemplate(template: string): string {
    return template.replace(/{(\w+)}/g, (match, category) => {
      if (category in WORD_BANK) {
        return this.getRandomWord(category as keyof typeof WORD_BANK);
      }
      return match;
    });
  }

  /**
   * Fill a sentence template with random words (async with API support)
   */
  private async fillTemplateAsync(template: string, useApi: boolean = true): Promise<string> {
    const placeholders = template.match(/{(\w+)}/g) || [];
    const replacements: { [key: string]: string } = {};

    // Fetch all needed words concurrently
    const wordPromises = placeholders.map(async (placeholder) => {
      const category = placeholder.slice(1, -1) as keyof typeof WORD_BANK;
      if (category in WORD_BANK && !replacements[placeholder]) {
        replacements[placeholder] = await this.getRandomWordAsync(category, useApi);
      }
    });

    await Promise.all(wordPromises);

    // Replace placeholders with fetched words
    return template.replace(/{(\w+)}/g, (match, category) => {
      return replacements[match] || match;
    });
  }

  /**
   * Add punctuation to sentences with realistic probability
   */
  private addPunctuation(sentence: string): string {
    // 70% period, 20% question mark, 10% exclamation
    const rand = this.rng.next();
    if (rand < 0.7) {
      return sentence;
    } else if (rand < 0.9) {
      return sentence.slice(0, -1) + '?';
    } else {
      return sentence.slice(0, -1) + '!';
    }
  }

  /**
   * Capitalize first letter of sentence
   */
  private capitalizeSentence(sentence: string): string {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }

  /**
   * Add commas within sentences occasionally
   */
  private addCommas(sentence: string): string {
    const words = sentence.split(' ');
    if (words.length > 6 && this.rng.next() < 0.3) {
      // Insert comma after 3-5 words
      const commaPos = 3 + this.rng.nextInt(3);
      if (commaPos < words.length - 2) {
        words[commaPos] += ',';
      }
    }
    return words.join(' ');
  }

  /**
   * Generate a single sentence (synchronous fallback)
   */
  private generateSentence(): string {
    const template = this.rng.choice(SENTENCE_TEMPLATES);
    let sentence = this.fillTemplate(template);
    sentence = this.addCommas(sentence);
    sentence = this.capitalizeSentence(sentence);
    sentence = this.addPunctuation(sentence);
    return sentence;
  }

  /**
   * Generate a single sentence (async with API support)
   */
  private async generateSentenceAsync(useApi: boolean = true): Promise<string> {
    const template = this.rng.choice(SENTENCE_TEMPLATES);
    let sentence = await this.fillTemplateAsync(template, useApi);
    sentence = this.addCommas(sentence);
    sentence = this.capitalizeSentence(sentence);
    sentence = this.addPunctuation(sentence);
    return sentence;
  }

  /**
   * Generate a passage of random text (synchronous fallback)
   */
  generatePassage(options: TextGeneratorOptions = {}): string {
    const {
      minSentences = 3,
      maxSentences = 8,
      targetLength = 200
    } = options;

    const sentences: string[] = [];
    let totalLength = 0;

    // Generate minimum number of sentences
    for (let i = 0; i < minSentences; i++) {
      const sentence = this.generateSentence();
      sentences.push(sentence);
      totalLength += sentence.length + 1; // +1 for space
    }

    // Continue adding sentences until we reach target length or max sentences
    while (sentences.length < maxSentences && totalLength < targetLength) {
      const sentence = this.generateSentence();
      sentences.push(sentence);
      totalLength += sentence.length + 1;
    }

    return sentences.join(' ').trim();
  }

  /**
   * Generate a passage of random text (async with API support)
   */
  async generatePassageAsync(options: TextGeneratorOptions = {}): Promise<string> {
    const {
      minSentences = 3,
      maxSentences = 8,
      targetLength = 200,
      useApi = true
    } = options;

    const sentences: string[] = [];
    let totalLength = 0;

    try {
      // Generate minimum number of sentences
      const minSentencePromises = Array.from({ length: minSentences }, () =>
        this.generateSentenceAsync(useApi)
      );
      
      const minSentences_results = await Promise.all(minSentencePromises);
      sentences.push(...minSentences_results);
      totalLength = sentences.join(' ').length;

      // Continue adding sentences until we reach target length or max sentences
      while (sentences.length < maxSentences && totalLength < targetLength) {
        const sentence = await this.generateSentenceAsync(useApi);
        sentences.push(sentence);
        totalLength += sentence.length + 1;
      }

      return sentences.join(' ').trim();
    } catch (error) {
      console.warn('Async text generation failed, falling back to synchronous:', error);
      // Fallback to synchronous generation
      return this.generatePassage(options);
    }
  }

  /**
   * Generate passage with a new seed (synchronous)
   */
  static generateWithSeed(seed: number, options: TextGeneratorOptions = {}): string {
    const generator = new TextGenerator(seed);
    return generator.generatePassage(options);
  }

  /**
   * Generate a completely random passage (synchronous)
   */
  static generateRandom(options: TextGeneratorOptions = {}): string {
    const generator = new TextGenerator();
    return generator.generatePassage(options);
  }

  /**
   * Generate passage with a new seed (async with API support)
   */
  static async generateWithSeedAsync(seed: number, options: TextGeneratorOptions = {}): Promise<string> {
    const generator = new TextGenerator(seed);
    return generator.generatePassageAsync(options);
  }

  /**
   * Generate a completely random passage (async with API support)
   */
  static async generateRandomAsync(options: TextGeneratorOptions = {}): Promise<string> {
    const generator = new TextGenerator();
    return generator.generatePassageAsync(options);
  }

  /**
   * Clear the API cache (useful for testing or memory management)
   */
  static clearCache(): void {
    WORDS_API_CONFIG.cache.clear();
  }

  /**
   * Get cache statistics for monitoring
   */
  static getCacheStats(): { size: number; entries: string[] } {
    return {
      size: WORDS_API_CONFIG.cache.size,
      entries: Array.from(WORDS_API_CONFIG.cache.keys())
    };
  }
}
