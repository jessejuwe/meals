import React, { useState } from 'react';

type Props = { children: React.ReactNode };

interface ContextObj {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const FavoritesContext = React.createContext<ContextObj>({
  ids: [],
  addFavorite: id => {},
  removeFavorite: id => {},
});

const FavoritesContextProvider: React.FC<Props> = ({ children }) => {
  const [ids, setIds] = useState<string[]>([]);

  const addFavorite = (id: string) => {
    const foundId = ids.includes(id);

    !foundId && setIds(prevState => [...prevState, id]);
  };

  // prettier-ignore
  const removeFavorite = (id: string) => setIds(prevState => prevState.filter(favId => favId != id));

  const contextValue: ContextObj = { ids, addFavorite, removeFavorite };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
