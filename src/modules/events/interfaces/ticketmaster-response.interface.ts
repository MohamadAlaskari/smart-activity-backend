export interface TicketmasterApiResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
}

export interface TicketmasterEvent {
  id: string;
  name: string;
  url: string;

  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
    status: {
      code: string; // e.g. "onsale", "cancelled"
    };
  };

  sales?: {
    public?: {
      startDateTime?: string;
      endDateTime?: string;
    };
  };

  classifications?: {
    segment?: { name: string };
    genre?: { name: string };
    subGenre?: { name: string };
  }[];

  images?: {
    url: string;
    width: number;
    height: number;
    ratio?: string;
  }[];

  priceRanges?: {
    min: number;
    max: number;
    currency: string;
    type?: string;
  }[];

  seatmap?: {
    staticUrl: string;
  };

  info?: string;

  ageRestrictions?: {
    legalAgeEnforced?: boolean;
  };

  _embedded?: {
    venues: {
      name: string;
      address?: {
        line1?: string;
      };
      postalCode?: string;
      city?: {
        name: string;
      };
      state?: {
        name?: string;
      };
      country?: {
        name?: string;
      };
    }[];
  };
}

export interface EventResult {
  id: string;
  title: string;
  url: string;
  date: string;
  time: string;
  venue: string;
  address?: string;
  postalCode?: string;
  city: string;
  category: string;
  genre?: string;
  image?: string;
  status: string;
  seatmapUrl?: string;
  priceMin?: number;
  priceMax?: number;
  currency?: string;
  priceType?: string;
  salesStart?: string;
  salesEnd?: string;
  ageRestriction?: boolean;
  info?: string;
}
