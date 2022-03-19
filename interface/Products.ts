import { mediaCollectionProps, mediaSingleProps } from ".";

export interface productProps {
  id: number;
  attributes: {
    price: number;
    qty: number;
    title: string;
    description: string;
    details: string;
    thumbnail?: mediaSingleProps;
    Image_collection?: mediaCollectionProps;
  };
}
