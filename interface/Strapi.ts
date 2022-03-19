export interface imageProps {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number;
  height: number;
  size: number;
  url: string;
}
export interface mediaProps {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: imageProps;
      medium: imageProps;
      small: imageProps;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface mediaSingleProps {
  data: mediaProps;
}

export interface mediaCollectionProps {
  data: mediaProps[];
}

export interface metaProps {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
