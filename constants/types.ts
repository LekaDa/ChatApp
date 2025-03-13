export interface MessagesRouteParams {
  chatRoom: {
    _id: string,
    name: string,
    _creationTime: string
  }; 
}

export type RootStackParamList = {
  Messages: MessagesRouteParams;
};