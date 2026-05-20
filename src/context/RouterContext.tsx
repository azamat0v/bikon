import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type Page = '/' | '/about' | '/monitors' | '/laptops' | '/aios' | '/nova' | '/blog' | '/matrix' | '/optima';

interface RouterContextType {
  page: Page;
  blogSlug: string | null;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  page: '/',
  blogSlug: null,
  navigate: () => {},
});

function getPage(path = window.location.pathname): Page {
  if (path === '/about')           return '/about';
  if (path === '/monitors')        return '/monitors';
  if (path === '/laptops')         return '/laptops';
  if (path === '/aios')            return '/aios';
  if (path === '/nova')            return '/nova';
  if (path === '/matrix')          return '/matrix';
  if (path === '/optima')          return '/optima';
  if (path.startsWith('/blog'))    return '/blog';
  return '/';
}

function getBlogSlug(path = window.location.pathname): string | null {
  const m = path.match(/^\/blog\/([^/]+)$/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [page,     setPage]     = useState<Page>(() => getPage());
  const [blogSlug, setBlogSlug] = useState<string | null>(() => getBlogSlug());

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, '', to);
    setPage(getPage(to));
    setBlogSlug(getBlogSlug(to));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const onPop = () => {
      setPage(getPage());
      setBlogSlug(getBlogSlug());
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <RouterContext.Provider value={{ page, blogSlug, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
