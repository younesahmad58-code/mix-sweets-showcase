import React, { useState, useRef } from 'react';
import { Pencil, Upload, X, Save, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { DBProduct } from '@/hooks/useProducts';

interface Props {
  product: DBProduct;
  onSaved: () => void;
}

const AdminEditButton: React.FC<Props> = ({ product, onSaved }) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name_ro: product.name_ro,
    name_en: product.name_en,
    name_ar: product.name_ar,
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${product.slug}-${Date.now()}.${ext}`;
    
    const { error } = await supabase.storage.from('product-images').upload(path, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(path);
      const newImages = [...product.images, urlData.publicUrl];
      await supabase.from('products').update({ images: newImages }).eq('id', product.id);
      onSaved();
    }
    setUploading(false);
  };

  const removeImage = async (idx: number) => {
    const newImages = product.images.filter((_, i) => i !== idx);
    await supabase.from('products').update({ images: newImages }).eq('id', product.id);
    onSaved();
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('products').update(form).eq('id', product.id);
    setSaving(false);
    onSaved();
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-6 z-50 bg-accent text-accent-foreground p-3 rounded-full shadow-lg hover:bg-gold-dark transition-colors"
        title="Edit product"
      >
        <Pencil className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">Edit Product</h2>
          <button onClick={() => setOpen(false)} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-3">
          <input className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground" placeholder="Name (RO)" value={form.name_ro} onChange={e => setForm({...form, name_ro: e.target.value})} />
          <input className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground" placeholder="Name (EN)" value={form.name_en} onChange={e => setForm({...form, name_en: e.target.value})} />
          <input className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground" placeholder="Name (AR)" value={form.name_ar} onChange={e => setForm({...form, name_ar: e.target.value})} />
        </div>

        {/* Images */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Images</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {product.images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button onClick={() => removeImage(i)} className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleUpload} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AdminEditButton;
