import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { products, type Product } from "@/lib/shop";
import { coupons } from "@/lib/content";

export type CartLine = { id: string; qty: number };

type ShopState = {
  ready: boolean;
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  coupon: string | null;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  lines: { product: Product; qty: number }[];
};

const ShopContext = createContext<ShopState | null>(null);

const KEY = "minicloud.shop.v1";

type Persisted = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  coupon: string | null;
};

const empty: Persisted = { cart: [], wishlist: [], compare: [], coupon: null };

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...empty, ...(JSON.parse(raw) as Persisted) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const addToCart = useCallback((id: string, qty = 1) => {
    const product = products.find((p) => p.id === id);
    setState((s) => {
      const found = s.cart.find((l) => l.id === id);
      const cart = found
        ? s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
        : [...s.cart, { id, qty }];
      return { ...s, cart };
    });
    toast.success("เพิ่มลงตะกร้าแล้ว", { description: product?.name });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart:
        qty <= 0
          ? s.cart.filter((l) => l.id !== id)
          : s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(99, qty) } : l)),
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((l) => l.id !== id) }));
    toast("นำสินค้าออกจากตะกร้าแล้ว");
  }, []);

  const clearCart = useCallback(() => {
    setState((s) => ({ ...s, cart: [], coupon: null }));
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setState((s) => {
      const has = s.wishlist.includes(id);
      toast(has ? "นำออกจากรายการที่ถูกใจ" : "บันทึกไว้ในรายการที่ถูกใจ");
      return {
        ...s,
        wishlist: has ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
      };
    });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setState((s) => {
      if (s.compare.includes(id)) return { ...s, compare: s.compare.filter((c) => c !== id) };
      if (s.compare.length >= 3) {
        toast.error("เปรียบเทียบได้สูงสุด 3 รายการ");
        return s;
      }
      return { ...s, compare: [...s.compare, id] };
    });
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const found = coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
    if (!found) {
      toast.error("ไม่พบโค้ดส่วนลดนี้");
      return false;
    }
    setState((s) => ({ ...s, coupon: found.code }));
    toast.success(`ใช้โค้ด ${found.code} สำเร็จ`, { description: found.label });
    return true;
  }, []);

  const clearCoupon = useCallback(() => setState((s) => ({ ...s, coupon: null })), []);

  const value = useMemo<ShopState>(() => {
    const lines = state.cart
      .map((l) => {
        const product = products.find((p) => p.id === l.id);
        return product ? { product, qty: l.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];

    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
    const active = coupons.find((c) => c.code === state.coupon);
    const discount = active ? Math.round((subtotal * active.percent) / 100) : 0;

    return {
      ready,
      ...state,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      toggleCompare,
      applyCoupon,
      clearCoupon,
      cartCount: state.cart.reduce((n, l) => n + l.qty, 0),
      lines,
      subtotal,
      discount,
      total: Math.max(0, subtotal - discount),
    };
  }, [
    state,
    ready,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    toggleCompare,
    applyCoupon,
    clearCoupon,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
