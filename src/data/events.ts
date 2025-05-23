
export interface Seat {
  id: string;
  status: 'available' | 'booked';
}

export interface Showtime {
  time: string;
  venue: string;
  seats: Seat[][];
}

export interface Event {
  id: string;
  title: string;
  posterUrl: string;
  description: string;
  genre: string;
  duration: string;
  showtimes: Showtime[];
}

export interface LiveEventCategory {
  title: string;
  count: string;
  img: string;
  color: string;
}

export interface PopularEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  venue: string;
  posterUrl: string;
  category: string;
}

export interface ComedyEvent {
  id: string;
  title: string;
  performer: string;
  venue: string;
  date: string;
  type: string;
  posterUrl: string;
}

function generateSeats(rows: number, cols: number, bookedSeats: string[] = []): Seat[][] {
  const seats: Seat[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: Seat[] = [];
    const rowLabel = String.fromCharCode(65 + i);
    for (let j = 0; j < cols; j++) {
      const seatId = `${rowLabel}${j + 1}`;
      row.push({
        id: seatId,
        status: bookedSeats.includes(seatId) ? 'booked' : 'available'
      });
    }
    seats.push(row);
  }
  return seats;
}

export const events: Event[] = [
  {
    id: 'evt1',
    title: 'Cosmic Adventure',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
    description: 'A thrilling journey through space and time, exploring new galaxies and ancient mysteries. Join the crew of the Starship Odyssey as they face unimaginable dangers.',
    genre: 'Sci-Fi',
    duration: '2h 30m',
    showtimes: [
      { time: '3:00 PM', venue: 'Galaxy Hall', seats: generateSeats(5, 8, ['B2', 'C5', 'A1']) },
      { time: '7:00 PM', venue: 'Nova Theatre', seats: generateSeats(6, 10, ['A1', 'D5', 'F8', 'C2', 'C3']) }
    ]
  },
  {
    id: 'evt2',
    title: 'Mystery Manor',
    posterUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop',
    description: 'A classic whodunit set in a creaky old mansion. A detective must solve a baffling murder before the killer strikes again.',
    genre: 'Mystery',
    duration: '1h 55m',
    showtimes: [
      { time: '4:30 PM', venue: 'Crimson Lounge', seats: generateSeats(4, 6, ['A3', 'B1']) },
      { time: '8:00 PM', venue: 'Shadow Room', seats: generateSeats(5, 7, ['C4', 'D2', 'E6']) }
    ]
  },
  {
    id: 'evt3',
    title: 'Laugh Riot Comedy Fest',
    posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    description: 'Get ready for an evening of non-stop laughter with the best comedians in town.',
    genre: 'Comedy Show',
    duration: '2h 00m',
    showtimes: [
      { time: '7:00 PM', venue: 'The Funny Bone', seats: generateSeats(7, 10, ['B5', 'E7', 'F2', 'G9']) },
      { time: '9:30 PM', venue: 'The Funny Bone', seats: generateSeats(7, 10, ['A1', 'C6', 'D4', 'E8']) }
    ]
  }
];

export const liveEventCategories: LiveEventCategory[] = [
  { title: 'COMEDY SHOWS', count: '15+ Events', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', color: 'linear-gradient(to bottom right, #6a3093, #a044ff)' },
  { title: 'KIDS', count: '5 Events', img: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=300&h=300&fit=crop', color: 'linear-gradient(to bottom right, #56ccf2, #2f80ed)' },
  { title: 'MUSIC SHOWS', count: '9 Events', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', color: 'linear-gradient(to bottom right, #aa076b, #61045f)' },
  { title: 'ART & CRAFTS', count: '3 Events', img: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop', color: 'linear-gradient(to bottom right, #ff512f, #dd2476)' },
  { title: 'WORKSHOPS & MORE', count: '6 Events', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop', color: 'linear-gradient(to bottom right, #f09819, #edde5d)' }
];

export const popularEvents: PopularEvent[] = [
  {
    id: 'kids1',
    title: 'Kids Chess Championship',
    type: 'Online',
    date: 'Sat, 24 May onwards',
    venue: 'Your Place and Your Time, India',
    posterUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=600&fit=crop',
    category: 'Kids (5-14)'
  },
  {
    id: 'kids2',
    title: 'Rhyme & Rhythm',
    type: 'Offline',
    date: 'Wed, 28 May onwards',
    venue: 'Magic Beans, Kemps Corner, Mumbai',
    posterUrl: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=400&h=600&fit=crop',
    category: 'RHYME & MAGIC'
  },
  {
    id: 'kids3',
    title: "Solve The Rubik's Cube",
    type: 'Offline',
    date: 'Sun, 25 May',
    venue: 'Happy Skills Events, Ghatkopar',
    posterUrl: 'https://images.unsplash.com/photo-1551802810-7a2e13f5b7d7?w=400&h=600&fit=crop',
    category: 'Sharpen 6 Vital Skills'
  }
];

export const comedyEvents: ComedyEvent[] = [
  {
    id: 'comedy1',
    title: 'Kisi Ko Batana Mat',
    performer: 'Anubhav Singh Bassi',
    venue: 'Kala Mandir Auditorium, Kolkata',
    date: 'Sat, 24 May onwards',
    type: 'Standup Comedy',
    posterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'
  },
  {
    id: 'comedy2',
    title: 'Misfits',
    performer: 'A Standup Comedy Lineup show',
    venue: 'NYX Lounge & Deck, Guwahati',
    date: 'Sun, 25 May',
    type: 'Standup Comedy',
    posterUrl: 'https://images.unsplash.com/photo-1527224538127-2104bb385e51?w=400&h=600&fit=crop'
  },
  {
    id: 'comedy3',
    title: 'Atul Khatri LIVE - WELL TRAINED',
    performer: 'Atul Khatri',
    venue: 'Freshworks Brewworks, Guwahati',
    date: 'Sat, 14 Jun',
    type: 'Standup Comedy',
    posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop'
  }
];

export const premieres = [
  { title: 'Filmlovers!', language: 'French', poster: 'https://images.unsplash.com/photo-1489599063528-a0ba927cea8b?w=400&h=600&fit=crop', tag: 'PREMIERE' },
  { title: 'Juliette in Spring', language: 'French', poster: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop', tag: 'PREMIERE' },
  { title: 'Rita', language: 'Spanish', poster: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop', tag: 'PREMIERE' }
];
