
export interface SubscriptionPlan {
  name: string;
  price: string;
  features: string[];
  highlight: boolean;
}

export interface Project {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
}

export interface Service {
  title: string;
  description: string;
}
