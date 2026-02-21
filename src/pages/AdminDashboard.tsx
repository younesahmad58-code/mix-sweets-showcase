import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Package, Mail, Plus, Pencil, Trash2, Eye, Check } from 'lucide-react';

interface ProductRow {
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

interface SubmissionRow {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  language: string;
  read: boolean;
  created_at: string;
}

const emptyProduct: Omit<ProductRow, 'id'> = {
  slug: '', name_ro: '', name_en: '', name_ar: '',
  description_ro: '', description_en: '', description_ar: '',
  category: 'biscuits', images: [], grammage: '', badges: [], variants: [],
};

const AdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<'products' | 'submissions'>('products');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Products state
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [editingProduct, setEditingProduct] = useState<Omit<ProductRow, 'id'> & { id?: string } | null>(null);

  // Submissions state
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin/login');
      else setUser(session.user);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { navigate('/admin/login'); return; }
      setUser(data.session.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data as any);
  }, []);

  const fetchSubmissions = useCallback(async () => {
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (data) setSubmissions(data as any);
  }, []);

  useEffect(() => {
    if (!loading) { fetchProducts(); fetchSubmissions(); }
  }, [loading, fetchProducts, fetchSubmissions]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const saveProduct = async () => {
    if (!editingProduct) return;
    const payload = {
      slug: editingProduct.slug,
      name_ro: editingProduct.name_ro,
      name_en: editingProduct.name_en,
      name_ar: editingProduct.name_ar,
      description_ro: editingProduct.description_ro,
      description_en: editingProduct.description_en,
      description_ar: editingProduct.description_ar,
      category: editingProduct.category,
      images: editingProduct.images,
      grammage: editingProduct.grammage,
      badges: editingProduct.badges,
      variants: editingProduct.variants,
    };

    if (editingProduct.id) {
      await supabase.from('products').update(payload).eq('id', editingProduct.id);
    } else {
      await supabase.from('products').insert(payload);
    }
    setEditingProduct(null);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  const markRead = async (id: string) => {
    await supabase.from('contact_submissions').update({ read: true }).eq('id', id);
    fetchSubmissions();
  };

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></main>;
  }

  const inputCls = "w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-foreground">MIX SWEETS Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
          <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab('products')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'products' ? 'bg-accent text-accent-foreground' : 'bg-muted text-foreground'}`}>
            <Package className="w-4 h-4" /> Products
          </button>
          <button onClick={() => setTab('submissions')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'submissions' ? 'bg-accent text-accent-foreground' : 'bg-muted text-foreground'}`}>
            <Mail className="w-4 h-4" /> Submissions {submissions.filter(s => !s.read).length > 0 && <span className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">{submissions.filter(s => !s.read).length}</span>}
          </button>
        </div>

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div>
            {editingProduct ? (
              <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
                <h2 className="font-display text-lg font-bold text-foreground">{editingProduct.id ? 'Edit Product' : 'Add Product'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className={inputCls} placeholder="Slug (url-friendly)" value={editingProduct.slug} onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})} />
                  <input className={inputCls} placeholder="Category" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} />
                  <input className={inputCls} placeholder="Name (RO)" value={editingProduct.name_ro} onChange={e => setEditingProduct({...editingProduct, name_ro: e.target.value})} />
                  <input className={inputCls} placeholder="Name (EN)" value={editingProduct.name_en} onChange={e => setEditingProduct({...editingProduct, name_en: e.target.value})} />
                  <input className={inputCls} placeholder="Name (AR)" value={editingProduct.name_ar} onChange={e => setEditingProduct({...editingProduct, name_ar: e.target.value})} />
                  <input className={inputCls} placeholder="Grammage" value={editingProduct.grammage} onChange={e => setEditingProduct({...editingProduct, grammage: e.target.value})} />
                </div>
                <textarea className={`${inputCls} min-h-[80px]`} placeholder="Description (RO)" value={editingProduct.description_ro} onChange={e => setEditingProduct({...editingProduct, description_ro: e.target.value})} />
                <textarea className={`${inputCls} min-h-[80px]`} placeholder="Description (EN)" value={editingProduct.description_en} onChange={e => setEditingProduct({...editingProduct, description_en: e.target.value})} />
                <textarea className={`${inputCls} min-h-[80px]`} placeholder="Description (AR)" value={editingProduct.description_ar} onChange={e => setEditingProduct({...editingProduct, description_ar: e.target.value})} />
                <input className={inputCls} placeholder="Image URLs (comma-separated)" value={editingProduct.images.join(', ')} onChange={e => setEditingProduct({...editingProduct, images: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} />
                <input className={inputCls} placeholder="Badges (comma-separated, e.g. new,seasonal)" value={editingProduct.badges.join(', ')} onChange={e => setEditingProduct({...editingProduct, badges: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} />
                <input className={inputCls} placeholder="Variants (comma-separated, e.g. 200g,400g)" value={editingProduct.variants.join(', ')} onChange={e => setEditingProduct({...editingProduct, variants: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} />
                <div className="flex gap-3">
                  <button onClick={saveProduct} className="px-6 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors">Save</button>
                  <button onClick={() => setEditingProduct(null)} className="px-6 py-2 bg-muted text-foreground rounded-lg text-sm font-medium">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-bold text-foreground">Products ({products.length})</h2>
                  <button onClick={() => setEditingProduct({...emptyProduct})} className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors">
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>
                {products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No products yet. Click "Add Product" to create one.</p>
                ) : (
                  <div className="space-y-3">
                    {products.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{p.name_en || p.name_ro}</h3>
                          <p className="text-xs text-muted-foreground">{p.category} · {p.grammage}</p>
                        </div>
                        <div className="flex gap-2">
                          <a href={`/products/${p.slug}`} target="_blank" rel="noopener" className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-4 h-4" /></a>
                          <button onClick={() => setEditingProduct(p)} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => deleteProduct(p.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SUBMISSIONS TAB */}
        {tab === 'submissions' && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-display text-lg font-bold text-foreground mb-6">Contact Submissions ({submissions.length})</h2>
            {submissions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No submissions yet.</p>
            ) : (
              <div className="space-y-3">
                {submissions.map(s => (
                  <div key={s.id} className={`p-4 rounded-lg border ${s.read ? 'bg-background border-border' : 'bg-accent/5 border-accent/20'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground text-sm">{s.name}</h3>
                          {!s.read && <span className="px-1.5 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">New</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{s.company} · {s.email} · {s.phone}</p>
                        <p className="text-sm text-foreground mt-2">{s.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{new Date(s.created_at).toLocaleString()} · {s.language.toUpperCase()}</p>
                      </div>
                      {!s.read && (
                        <button onClick={() => markRead(s.id)} className="p-2 text-muted-foreground hover:text-accent transition-colors shrink-0" title="Mark as read">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
