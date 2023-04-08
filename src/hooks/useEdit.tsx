import { createContext, PropsWithChildren, useContext, useState } from "react";

interface EditPostData {
  id: string;
  title: string;
  category: string;
  body: string;
}

interface EditPostContextData {
  editPost: EditPostData | null;
  setEditPost: (editPost: EditPostData | null) => void;
}

export const EditPostContext = createContext<EditPostContextData>(
  {} as EditPostContextData
);

export const EditPostProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [editPost, setEditPost] = useState<EditPostData | null>(null);

  return <EditPostContext.Provider value={{editPost, setEditPost}}>{children}</EditPostContext.Provider>
};

export function useEditPost(): EditPostContextData {
  const context = useContext(EditPostContext);

  if (!context) {
    throw new Error('useEditPost must br used within an EditPostProvider');
  }
  return context;
}
