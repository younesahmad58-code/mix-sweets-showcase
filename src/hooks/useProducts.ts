import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DBProduct {
  id: string;
  slug: string;
  name_ro: string;
  name_en: string;
  name_ar: string;
  description_ro: string;
  description_en: string;
  description_ar: string;
  category: string;
  images: string[];
  grammage: string;
  badges: string[];
  variants: string[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase.from('products').select('*').order('name_ro');
    if (data) setProducts(data as DBProduct[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return { products, loading, refetch: fetchProducts };
};
