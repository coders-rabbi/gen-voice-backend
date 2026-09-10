export type TReplay = {
  name: string;
  email: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TComment = {
  newsId: string;
  name: string;
  email: string;
  comment: string;
  replay: TReplay[];
  isHidden: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
