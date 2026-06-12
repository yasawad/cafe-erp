/* eslint-disable */
import { useState, useCallback, useEffect } from "react";

const BRAND = "#2D6A4F";
const BRAND_LIGHT = "#52B788";
const BRAND_DARK = "#1B4332";

// ─── INITIAL DATA ────────────────────────────────────────
const INITIAL_MENUS = [
  { id: 1, name: "อเมริกาโน่", cat: "กาแฟ", price: 15000, status: "พร้อมขาย" },
  { id: 2, name: "ลาเต้", cat: "กาแฟ", price: 18000, status: "พร้อมขาย" },
  { id: 3, name: "คาปูชิโน่", cat: "กาแฟ", price: 18000, status: "พร้อมขาย" },
  { id: 4, name: "มอคค่า", cat: "กาแฟ", price: 22000, status: "พร้อมขาย" },
  { id: 5, name: "ชาเขียวลาเต้", cat: "ชา", price: 18000, status: "พร้อมขาย" },
  { id: 6, name: "ชานมไทย", cat: "ชา", price: 15000, status: "พร้อมขาย" },
  { id: 7, name: "ช็อคโกแลต", cat: "เครื่องดื่มอื่น", price: 20000, status: "พร้อมขาย" },
  { id: 8, name: "คุกกี้", cat: "ขนม", price: 10000, status: "พร้อมขาย" },
];

const INITIAL_TABLES = [
  { id: 1, num: "1", seats: 4, status: "occupied" },
  { id: 2, num: "2", seats: 4, status: "free" },
  { id: 3, num: "3", seats: 2, status: "free" },
  { id: 4, num: "4", seats: 6, status: "reserved" },
  { id: 5, num: "5", seats: 4, status: "free" },
  { id: 6, num: "6", seats: 2, status: "occupied" },
];

const INITIAL_STOCKS = [
  { id: 1, name: "เมล็ดกาแฟ", qty: 8, unit: "กิโลกรัม", min: 2 },
  { id: 2, name: "นมสด", qty: 15, unit: "ลิตร", min: 5 },
  { id: 3, name: "น้ำตาล", qty: 3, unit: "กิโลกรัม", min: 2 },
  { id: 4, name: "ชาเขียว", qty: 500, unit: "กรัม", min: 200 },
  { id: 5, name: "ช็อคโกแลตผง", qty: 1.2, unit: "กิโลกรัม", min: 1 },
  { id: 6, name: "แก้วกระดาษ", qty: 80, unit: "ชิ้น", min: 50 },
];

const INITIAL_STAFF = [
  { id: 1, name: "สมชาย ดีมาก", role: "ผู้จัดการ", start: "08:00", end: "17:00" },
  { id: 2, name: "สาวิตรี ใจดี", role: "บาริสต้า", start: "08:00", end: "17:00" },
  { id: 3, name: "ประสิทธิ์ เร็วมาก", role: "แคชเชียร์", start: "10:00", end: "19:00" },
];

const SEED_ORDERS = [
  { id: 1001, tableId: 1, items: [{ name: "ลาเต้", price: 18000, qty: 1 }], total: 19260, time: new Date(Date.now() - 3600000) },
  { id: 1002, tableId: 1, items: [{ name: "มอคค่า", price: 22000, qty: 2 }], total: 47080, time: new Date(Date.now() - 7200000) },
  { id: 1003, tableId: 6, items: [{ name: "อเมริกาโน่", price: 15000, qty: 1 }, { name: "คุกกี้", price: 10000, qty: 2 }], total: 37450, time: new Date(Date.now() - 1800000) },
  { id: 1004, tableId: 2, items: [{ name: "ชานมไทย", price: 15000, qty: 1 }], total: 16050, time: new Date(Date.now() - 900000) },
  { id: 1005, tableId: null, items: [{ name: "ช็อคโกแลต", price: 20000, qty: 1 }], total: 21400, time: new Date(Date.now() - 600000) },
];

// ─── SOP DATA ────────────────────────────────────────────
const SOP_CATEGORIES = [
  { id: "morning", label: "เปิดร้าน", icon: "🌅", time: "07:00–08:30" },
  { id: "daily", label: "ระหว่างวัน", icon: "☀️", time: "ทุก 2 ชม." },
  { id: "cleaning", label: "ทำความสะอาด", icon: "🧹", time: "ตลอดวัน" },
  { id: "equipment", label: "อุปกรณ์บาร์", icon: "⚙️", time: "เช้า/เย็น" },
  { id: "closing", label: "ปิดร้าน", icon: "🌙", time: "19:00–20:00" },
];

const INITIAL_SOP_TASKS = [
  { id: 1, cat: "morning", title: "ล้างมือก่อนเริ่มงาน", desc: "สบู่ + น้ำอุ่น อย่างน้อย 20 วินาที", tools: ["สบู่", "น้ำ"], priority: "high" },
  { id: 2, cat: "morning", title: "เปิดไฟ / แอร์ / เพลง", desc: "ตรวจสอบว่าระบบไฟฟ้าทำงานปกติ", tools: [], priority: "normal" },
  { id: 3, cat: "morning", title: "ทำความสะอาดโต๊ะและเก้าอี้", desc: "เช็ดด้วยผ้าชุบน้ำยาฆ่าเชื้อทุกโต๊ะ ทุกเก้าอี้", tools: ["ผ้าสะอาด", "น้ำยาฆ่าเชื้อ", "ถังน้ำ"], priority: "high" },
  { id: 4, cat: "morning", title: "กวาด/ถูพื้นห้อง", desc: "กวาดก่อน จากหน้าไปหลัง จากนั้นถูด้วยน้ำยาทำความสะอาด", tools: ["ไม้กวาด", "ไม้ถู", "น้ำยาถูพื้น"], priority: "high" },
  { id: 5, cat: "morning", title: "ทำความสะอาดห้องน้ำ", desc: "ขัดชักโครก อ่างล้างมือ กระจก เช็ดพื้น เติมสบู่/กระดาษ", tools: ["น้ำยาล้างห้องน้ำ", "แปรงขัด", "ถุงมือ"], priority: "high" },
  { id: 6, cat: "morning", title: "เตรียมเครื่องชงกาแฟ", desc: "ล้างหัวชงด้วยน้ำร้อน backflush และอุ่นเครื่อง 15 นาที", tools: ["เครื่องชงกาแฟ", "น้ำสะอาด", "ผ้าไมโครไฟเบอร์"], priority: "high" },
  { id: 7, cat: "morning", title: "เช็คสต็อกวัตถุดิบ", desc: "ตรวจนับเมล็ดกาแฟ นม น้ำตาล และวัตถุดิบอื่นๆ บันทึกในระบบ", tools: ["สมุดบันทึก"], priority: "normal" },
  { id: 8, cat: "morning", title: "จัดเตรียมแก้ว/ถาด/ช้อน", desc: "จัดวางให้เป็นระเบียบ เช็คความสะอาดก่อนนำมาใช้", tools: ["แก้ว", "ถาด"], priority: "normal" },
  { id: 9, cat: "daily", title: "เช็ดโต๊ะหลังลูกค้าลุก", desc: "เช็ดโต๊ะทันทีหลังลูกค้าออก เก็บขยะ จัดเก้าอี้ให้เรียบร้อย", tools: ["ผ้าสะอาด", "น้ำยาฆ่าเชื้อ"], priority: "high" },
  { id: 10, cat: "daily", title: "ตรวจสอบห้องน้ำทุก 2 ชม.", desc: "เช็คความสะอาด เติมกระดาษชำระ เติมสบู่ล้างมือ", tools: ["กระดาษชำระ", "สบู่"], priority: "normal" },
  { id: 11, cat: "daily", title: "เก็บถาดและแก้วที่ใช้แล้ว", desc: "เก็บล้างทันที อย่าปล่อยทิ้งไว้บนบาร์นาน", tools: ["ถาดเก็บแก้ว"], priority: "normal" },
  { id: 12, cat: "daily", title: "เช็คหน้าร้านและทางเดิน", desc: "กวาดหน้าร้าน จัดป้าย เช็คความเป็นระเบียบ", tools: ["ไม้กวาด"], priority: "low" },
  { id: 13, cat: "cleaning", title: "ล้างแก้วและภาชนะ", desc: "แยกล้างแก้ว จาน ช้อน ด้วยน้ำยาล้างจาน ล้างน้ำสะอาด 2 รอบ", tools: ["น้ำยาล้างจาน", "ฟองน้ำ"], priority: "high" },
  { id: 14, cat: "cleaning", title: "ทำความสะอาดบาร์กาแฟ", desc: "เช็ดพื้นผิวบาร์ ทำความสะอาดบริเวณรอบเครื่องชง", tools: ["ผ้าไมโครไฟเบอร์", "สเปรย์"], priority: "high" },
  { id: 15, cat: "equipment", title: "ทำความสะอาดหัวชงกาแฟ", desc: "Backflush ทุกเช้าและเย็น ล้างหัวชงด้วยน้ำร้อน", tools: ["ผงล้างเครื่องชง", "แปรงขนาดเล็ก"], priority: "high" },
  { id: 16, cat: "equipment", title: "ล้างถาดรองหยด (Drip Tray)", desc: "ถอดล้างทุกวัน ป้องกันคราบและกลิ่น", tools: ["น้ำยาล้างจาน", "ฟองน้ำ"], priority: "high" },
  { id: 17, cat: "equipment", title: "เช็ดหัวทำโฟมนม (Steam Wand)", desc: "เช็ดด้วยผ้าชื้นทันทีหลังใช้ทุกครั้ง", tools: ["ผ้าไมโครไฟเบอร์"], priority: "high" },
  { id: 18, cat: "closing", title: "ถูพื้นห้องรอบสุดท้าย", desc: "กวาดและถูพื้นทั้งร้าน รวมถึงบริเวณบาร์และห้องน้ำ", tools: ["ไม้กวาด", "ไม้ถู"], priority: "high" },
  { id: 19, cat: "closing", title: "ล้างทำความสะอาดเครื่องชงกาแฟ", desc: "Backflush เต็มรูปแบบ ล้างหัวกรุ๊ป ถอดล้างถาดรอง", tools: ["ผงล้างเครื่องชง", "แปรง"], priority: "high" },
  { id: 20, cat: "closing", title: "ตรวจเช็คแก๊ส/ไฟ/น้ำ/แอร์", desc: "ปิดแก๊ส ปิดน้ำ ปิดแอร์ ปิดไฟทุกจุดก่อนออก", tools: [], priority: "high" },
  { id: 21, cat: "closing", title: "บันทึกยอดขายและสต็อกสิ้นวัน", desc: "กรอกยอดขาย สต็อกที่ใช้ไป และรายงานปัญหาที่พบ", tools: ["สมุดบันทึก"], priority: "normal" },
];

const PRIORITY_CONFIG = {
  high: { label: "สำคัญมาก", color: "#DC2626", bg: "#FEE2E2" },
  normal: { label: "ปกติ", color: "#D97706", bg: "#FEF3C7" },
  low: { label: "ทั่วไป", color: "#2D6A4F", bg: "#D8F3DC" },
};

const statusConfig = {
  free: { label: "ว่าง", bg: "#F0FFF4", border: "#68D391", text: "#276749" },
  occupied: { label: "มีลูกค้า", bg: "#EBF8FF", border: "#63B3ED", text: "#2C5282" },
  reserved: { label: "จอง", bg: "#FFFBEB", border: "#F6AD55", text: "#744210" },
};

const AVATAR_COLORS = [
  { bg: "#D8F3DC", fg: "#1B4332" },
  { bg: "#EDE9FE", fg: "#3B1D8A" },
  { bg: "#FEF3C7", fg: "#78350F" },
  { bg: "#DBEAFE", fg: "#1E3A5F" },
  { bg: "#FCE7F3", fg: "#831843" },
];

const CB_INCOME_CATS = ["ขายกาแฟ", "ขายขนม", "รายได้อื่น"];
const CB_EXPENSE_CATS = ["วัตถุดิบ", "ค่าแรง", "ค่าเช่า", "ค่าไฟ/น้ำ", "ค่าซ่อมบำรุง", "อุปกรณ์", "อื่นๆ"];

const PO_STATUS = {
  draft:     { label: "ร่าง",        color: "#374151", bg: "#F3F4F6" },
  sent:      { label: "ส่งแล้ว",     color: "#185FA5", bg: "#DBEAFE" },
  received:  { label: "รับของแล้ว", color: "#1B4332", bg: "#D8F3DC" },
  cancelled: { label: "ยกเลิก",     color: "#7F1D1D", bg: "#FEE2E2" },
};

// ─── HOOKS ───────────────────────────────────────────────
// ✅ Fixed: ใช้ useEffect แทน useState สำหรับ event listener
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 700);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth <= 700);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

function isToday(d) {
  const t = new Date();
  return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
}

// ─── SHARED COMPONENTS ──────────────────────────────────
function Badge({ type, children }) {
  const styles = {
    green: { background: "#D8F3DC", color: "#1B4332" },
    amber: { background: "#FEF3C7", color: "#78350F" },
    red: { background: "#FEE2E2", color: "#7F1D1D" },
    blue: { background: "#DBEAFE", color: "#1E3A5F" },
    gray: { background: "#F3F4F6", color: "#374151" },
  };
  const s = styles[type] || styles.gray;
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, ...s }}>
      {children}
    </span>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  // ✅ Fixed: ล็อค scroll เมื่อ modal เปิด
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div style={{ background: "#fff", borderRadius: 18, padding: 24, width: 420, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#9CA3AF", lineHeight: 1 }}>×</button>
        </div>
        {children}
        {footer && <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>{footer}</div>}
      </div>
    </div>
  );
}

function Btn({ onClick, variant = "secondary", size = "md", children, style = {}, disabled = false }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, cursor: disabled ? "not-allowed" : "pointer", borderRadius: 9, fontWeight: 600, border: "none", fontFamily: "inherit", opacity: disabled ? 0.5 : 1, transition: "opacity .15s" };
  const sizes = { sm: { padding: "5px 12px", fontSize: 12 }, md: { padding: "9px 18px", fontSize: 13 } };
  const variants = {
    primary: { background: BRAND, color: "#fff" },
    secondary: { background: "#F3F4F6", color: "#374151" },
    danger: { background: "#FEE2E2", color: "#7F1D1D" },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>{children}</button>;
}

function Input({ value, onChange, placeholder, type = "text", style = {}, autoFocus = false }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      autoFocus={autoFocus}
      style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid #D1D5DB", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box", ...style }}
    />
  );
}

function Select({ value, onChange, children, style = {} }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid #D1D5DB", fontSize: 13, outline: "none", background: "#fff", fontFamily: "inherit", boxSizing: "border-box", ...style }}
    >
      {children}
    </select>
  );
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div style={{ background: "#F9FAFB", borderRadius: 14, padding: "16px 18px", border: "1px solid #F0F0F0" }}>
      <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: color || "#111827", letterSpacing: "-0.5px" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function FieldLabel({ children }) {
  return <label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 5, fontWeight: 500 }}>{children}</label>;
}

// ─── PAGES ──────────────────────────────────────────────

function Dashboard({ orders, tables, stocks }) {
  const todayOrders = orders.filter((o) => isToday(o.time));
  const rev = todayOrders.reduce((s, o) => s + o.total, 0);
  const topMap = {};
  orders.forEach((o) => o.items.forEach((it) => { topMap[it.name] = (topMap[it.name] || 0) + it.qty; }));
  const top = Object.entries(topMap).sort((a, b) => b[1] - a[1])[0];
  const lowStock = stocks.filter((s) => s.qty <= s.min).length;
  const occupied = tables.filter((t) => t.status === "occupied").length;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 20 }}>
        <MetricCard label="ยอดขายวันนี้" value={`₭${rev.toLocaleString()}`} sub={`${todayOrders.length} ออเดอร์`} color={BRAND} />
        <MetricCard label="โต๊ะที่ใช้งาน" value={occupied} sub={`จาก ${tables.length} โต๊ะ`} />
        <MetricCard label="เมนูยอดนิยม" value={top ? top[0] : "-"} sub={top ? `${top[1]} แก้ว` : ""} />
        <MetricCard label="สต็อกใกล้หมด" value={lowStock} sub="รายการ" color={lowStock > 0 ? "#DC2626" : undefined} />
      </div>
      <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>ออเดอร์ล่าสุด</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              {["ออเดอร์", "โต๊ะ", "รายการ", "ราคา", "สถานะ"].map((h, i) => (
                <th key={h} className={i === 2 ? "hide-mobile" : ""} style={{ textAlign: "left", padding: "7px 10px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: 28, color: "#9CA3AF" }}>ยังไม่มีออเดอร์</td></tr>
            ) : [...orders].reverse().slice(0, 8).map((o) => {
              const tbl = tables.find((t) => t.id === o.tableId);
              const names = o.items.map((i) => i.name + (i.qty > 1 ? ` ×${i.qty}` : "")).join(", ");
              return (
                <tr key={o.id}>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", fontWeight: 700 }}>#{o.id}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}>{tbl ? `โต๊ะ ${tbl.num}` : "-"}</td>
                  <td className="hide-mobile" style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#6B7280" }}>{names}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>₭{o.total.toLocaleString()}</td>
                  <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}><Badge type="green">สำเร็จ</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tables({ tables, setTables, onGoToPOS }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ num: "", seats: "4", status: "free" });

  const handleAction = (t) => {
    if (t.status === "free") {
      if (window.confirm(`เปิดโต๊ะ ${t.num}?`)) {
        setTables((prev) => prev.map((x) => x.id === t.id ? { ...x, status: "occupied" } : x));
      }
    } else if (t.status === "occupied") {
      const ch = window.prompt(`โต๊ะ ${t.num}\n1 = ไปหน้า POS\n2 = ปิดโต๊ะ (เช็คบิล)\n3 = ยกเลิก`);
      if (ch === "1") onGoToPOS(t.id);
      else if (ch === "2") setTables((prev) => prev.map((x) => x.id === t.id ? { ...x, status: "free" } : x));
    } else {
      if (window.confirm(`ยกเลิกการจองโต๊ะ ${t.num}?`)) {
        setTables((prev) => prev.map((x) => x.id === t.id ? { ...x, status: "free" } : x));
      }
    }
  };

  const handleAdd = () => {
    if (!form.num.trim()) return;
    setTables((prev) => [...prev, { id: Date.now(), num: form.num, seats: parseInt(form.seats) || 4, status: form.status }]);
    setShowAdd(false);
    setForm({ num: "", seats: "4", status: "free" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.entries(statusConfig).map(([k, v]) => (
            <span key={k} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: v.bg, color: v.text, border: `1px solid ${v.border}`, fontWeight: 500 }}>● {v.label}</span>
          ))}
        </div>
        <Btn onClick={() => setShowAdd(true)} variant="primary" size="sm">+ เพิ่มโต๊ะ</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 12 }}>
        {tables.map((t) => {
          const cfg = statusConfig[t.status];
          return (
            <div
              key={t.id}
              onClick={() => handleAction(t)}
              style={{ borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "center", background: cfg.bg, border: `1.5px solid ${cfg.border}`, transition: "transform .15s, box-shadow .15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ fontSize: 34, marginBottom: 10 }}>🪑</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>โต๊ะ {t.num}</div>
              <div style={{ fontSize: 12, color: cfg.text, marginTop: 4, fontWeight: 500 }}>{cfg.label}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{t.seats} ที่นั่ง</div>
            </div>
          );
        })}
      </div>
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="เพิ่มโต๊ะ"
        footer={[<Btn key="c" onClick={() => setShowAdd(false)}>ยกเลิก</Btn>, <Btn key="s" variant="primary" onClick={handleAdd}>บันทึก</Btn>]}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><FieldLabel>หมายเลขโต๊ะ</FieldLabel><Input value={form.num} onChange={(v) => setForm({ ...form, num: v })} placeholder="เช่น 7" /></div>
          <div><FieldLabel>จำนวนที่นั่ง</FieldLabel><Input value={form.seats} onChange={(v) => setForm({ ...form, seats: v })} type="number" placeholder="4" /></div>
        </div>
        <div><FieldLabel>สถานะเริ่มต้น</FieldLabel>
          <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })}>
            <option value="free">ว่าง</option><option value="occupied">มีลูกค้า</option><option value="reserved">จอง</option>
          </Select>
        </div>
      </Modal>
    </div>
  );
}

// ─── mPOP Bluetooth ──────────────────────────────────────
const MPOP_SERVICE = "00001101-0000-1000-8000-00805f9b34fb";
const MPOP_CHAR_TX = "00002af1-0000-1000-8000-00805f9b34fb";
const ESC = 0x1b, GS = 0x1d;
const mkCmd = (...b) => new Uint8Array(b);
const PRINTER_INIT = mkCmd(ESC, 0x40);
const PRINTER_CUT = mkCmd(GS, 0x56, 0x42, 0x40);
const ALIGN_CENTER = mkCmd(ESC, 0x61, 0x01);
const ALIGN_LEFT = mkCmd(ESC, 0x61, 0x00);
const BOLD_ON = mkCmd(ESC, 0x45, 0x01);
const BOLD_OFF = mkCmd(ESC, 0x45, 0x00);
const DOUBLE_SIZE = mkCmd(GS, 0x21, 0x10);
const NORMAL_SIZE = mkCmd(GS, 0x21, 0x00);
const LF = mkCmd(0x0a);
const DASHES = "--------------------------------\n";

function encodeForPrinter(text) {
  const buf = [];
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code < 128) { buf.push(code); }
    else { const tis = code - 0x0E00 + 0xA0; buf.push(tis >= 0xA0 && tis <= 0xFF ? tis : 0x3F); }
  }
  return new Uint8Array(buf);
}

function padRow(left, right, width = 32) {
  const sp = width - left.length - right.length;
  return left + " ".repeat(Math.max(1, sp)) + right + "\n";
}

function buildReceiptBytes(ord, tables) {
  const t = tables.find((x) => x.id === ord.tableId);
  const sub = ord.items.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = ord.total - sub;
  const now = ord.time;
  const parts = [
    PRINTER_INIT, ALIGN_CENTER, BOLD_ON, DOUBLE_SIZE,
    encodeForPrinter("CafeERP\n"),
    NORMAL_SIZE, BOLD_OFF, encodeForPrinter("ใบเสร็จรับเงิน\n"), LF, ALIGN_LEFT,
    encodeForPrinter(DASHES),
    encodeForPrinter(padRow("ออเดอร์:", "#" + ord.id)),
    encodeForPrinter(padRow("โต๊ะ:", t ? "โต๊ะ " + t.num : "ไม่ระบุ")),
    encodeForPrinter(padRow("วันที่:", now.toLocaleDateString("th-TH"))),
    encodeForPrinter(padRow("เวลา:", now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }))),
    encodeForPrinter(DASHES),
    ...ord.items.map((i) => encodeForPrinter(padRow(i.name + " x" + i.qty, "K" + (i.price * i.qty).toLocaleString()))),
    encodeForPrinter(DASHES),
    encodeForPrinter(padRow("ยอดรวม", "K" + sub.toLocaleString())),
    encodeForPrinter(padRow("VAT 7%", "K" + vat.toLocaleString())),
    BOLD_ON, encodeForPrinter(padRow("ยอดสุทธิ", "K" + ord.total.toLocaleString())), BOLD_OFF,
    encodeForPrinter(DASHES),
    encodeForPrinter(padRow("รับเงินสด", "K" + (ord.cashReceived || ord.total).toLocaleString())),
    encodeForPrinter(padRow("ทอนเงิน", "K" + (ord.change || 0).toLocaleString())),
    LF, ALIGN_CENTER, encodeForPrinter("ขอบคุณที่ใช้บริการ\n"), LF, LF, LF, PRINTER_CUT,
  ];
  let len = 0;
  for (const p of parts) len += p.length;
  const out = new Uint8Array(len);
  let off = 0;
  for (const p of parts) { out.set(p, off); off += p.length; }
  return out;
}

async function sendToPrinter(char, data) {
  const CHUNK = 200;
  for (let i = 0; i < data.length; i += CHUNK) {
    await char.writeValue(data.slice(i, i + CHUNK));
    await new Promise((r) => setTimeout(r, 30));
  }
}

function POS({ menus, tables, orders, setOrders, initialTableId, setInitialTableId }) {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(initialTableId || null);
  const [activeCat, setActiveCat] = useState("ทั้งหมด");
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [cashOpen, setCashOpen] = useState(false);
  const [cashReceived, setCashReceived] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [printerStatus, setPrinterStatus] = useState("idle");
  const [printerMsg, setPrinterMsg] = useState("");
  const printerCharRef = { current: null };
  const printerDevRef = { current: null };

  // ✅ Fixed: sync initialTableId เมื่อ prop เปลี่ยน
  useEffect(() => {
    if (initialTableId) setSelectedTableId(initialTableId);
  }, [initialTableId]);

  const connectPrinter = async () => {
    if (!navigator.bluetooth) { setPrinterStatus("error"); setPrinterMsg("ไม่รองรับ Web Bluetooth (ใช้ Chrome)"); return; }
    try {
      setPrinterStatus("connecting"); setPrinterMsg("กำลังค้นหา mPOP...");
      const device = await navigator.bluetooth.requestDevice({ filters: [{ namePrefix: "mPOP" }], optionalServices: [MPOP_SERVICE] });
      printerDevRef.current = device;
      device.addEventListener("gattserverdisconnected", () => { setPrinterStatus("idle"); setPrinterMsg("หลุดการเชื่อมต่อ"); printerCharRef.current = null; });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(MPOP_SERVICE);
      const char = await service.getCharacteristic(MPOP_CHAR_TX);
      printerCharRef.current = char;
      setPrinterStatus("connected"); setPrinterMsg("เชื่อมต่อ " + device.name + " สำเร็จ ✓");
    } catch (e) { setPrinterStatus("error"); setPrinterMsg(e.message || "เชื่อมต่อไม่สำเร็จ"); }
  };

  const disconnectPrinter = () => {
    if (printerDevRef.current?.gatt?.connected) printerDevRef.current.gatt.disconnect();
    printerCharRef.current = null; setPrinterStatus("idle"); setPrinterMsg("");
  };

  const printViaBluetooth = async (ord) => {
    if (!printerCharRef.current) { setPrinterMsg("กรุณาเชื่อมต่อเครื่องพิมพ์ก่อน"); return false; }
    try {
      setPrinterStatus("printing"); setPrinterMsg("กำลังพิมพ์...");
      await sendToPrinter(printerCharRef.current, buildReceiptBytes(ord, tables));
      setPrinterStatus("connected"); setPrinterMsg("พิมพ์สำเร็จ ✓"); return true;
    } catch (e) { setPrinterStatus("error"); setPrinterMsg("พิมพ์ไม่สำเร็จ: " + e.message); return false; }
  };

  const cats = ["ทั้งหมด", ...new Set(menus.map((m) => m.cat))];
  const filtered = activeCat === "ทั้งหมด" ? menus.filter((m) => m.status === "พร้อมขาย") : menus.filter((m) => m.cat === activeCat && m.status === "พร้อมขาย");

  const add = (id) => {
    const m = menus.find((m) => m.id === id);
    setCurrentOrder((prev) => {
      const ex = prev.find((i) => i.id === id);
      return ex ? prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { id, name: m.name, price: m.price, qty: 1 }];
    });
  };
  const changeQty = (id, d) => setCurrentOrder((prev) => prev.map((i) => i.id === id ? { ...i, qty: i.qty + d } : i).filter((i) => i.qty > 0));

  const sub = currentOrder.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = Math.round(sub * 0.07);
  const grand = sub + vat;
  const cashAmt = parseFloat(cashReceived) || 0;
  const change = cashAmt - grand;

  const checkout = () => {
    if (!currentOrder.length) return;
    const ord = { id: Math.floor(Math.random() * 90000) + 10000, tableId: selectedTableId, items: currentOrder.map((i) => ({ ...i })), total: grand, cashReceived: cashAmt || grand, change: cashAmt ? change : 0, time: new Date() };
    setOrders((prev) => [...prev, ord]);
    setLastOrder(ord); setCurrentOrder([]); setCashOpen(false); setReceiptOpen(true);
  };

  const printReceipt = (ord) => {
    const t = tables.find((t) => t.id === ord.tableId);
    const s = ord.items.reduce((x, i) => x + i.price * i.qty, 0);
    const v = ord.total - s;
    const w = window.open("", "_blank", "width=380,height=680");
    w.document.write(`<html><head><title>ใบเสร็จ #${ord.id}</title>
<style>body{font-family:monospace;font-size:13px;line-height:2;padding:24px;max-width:300px;margin:auto}
h2{text-align:center;font-size:16px;margin-bottom:2px}p.sub{text-align:center;color:#666;font-size:11px;margin:0 0 8px}
hr{border:none;border-top:1px dashed #ccc;margin:10px 0}
.row{display:flex;justify-content:space-between}.total{font-weight:bold;font-size:15px}
.cash{background:#f0fff4;padding:8px;border-radius:6px;margin-top:4px}
.center{text-align:center;color:#666;font-size:11px;margin-top:8px}</style></head>
<body><h2>☕ CaféERP</h2><p class="sub">ใบเสร็จรับเงิน</p><hr>
<div class="row"><span>ออเดอร์</span><span>#${ord.id}</span></div>
<div class="row"><span>โต๊ะ</span><span>${t ? "โต๊ะ " + t.num : "ไม่ระบุ"}</span></div>
<div class="row"><span>วันที่</span><span>${ord.time.toLocaleDateString("th-TH")}</span></div>
<div class="row"><span>เวลา</span><span>${ord.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</span></div>
<hr>${ord.items.map((i) => `<div class="row"><span>${i.name} ×${i.qty}</span><span>₭${(i.price * i.qty).toLocaleString()}</span></div>`).join("")}
<hr><div class="row"><span>ยอดรวม</span><span>₭${s.toLocaleString()}</span></div>
<div class="row"><span>VAT 7%</span><span>₭${v.toLocaleString()}</span></div><hr>
<div class="row total"><span>ยอดสุทธิ</span><span>₭${ord.total.toLocaleString()}</span></div>
<div class="cash"><div class="row"><span>💵 รับเงินสด</span><span>₭${(ord.cashReceived||ord.total).toLocaleString()}</span></div>
<div class="row total"><span>💰 ทอนเงิน</span><span>₭${(ord.change||0).toLocaleString()}</span></div></div>
<div class="center">ขอบคุณที่ใช้บริการ 🙏</div>
<script>window.print();window.close();</script></body></html>`);
    w.document.close();
  };

  const tbl = selectedTableId ? tables.find((t) => t.id === selectedTableId) : null;
  const quickCash = [20000, 50000, 100000, 200000, 500000];

  return (
    <div className="pos-layout" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
      {/* Left: menu grid */}
      <div>
        <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>โต๊ะ:</span>
          <select value={selectedTableId || ""} onChange={(e) => setSelectedTableId(e.target.value ? parseInt(e.target.value) : null)}
            style={{ padding: "7px 12px", borderRadius: 9, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff", fontFamily: "inherit" }}>
            <option value="">-- ไม่ระบุโต๊ะ --</option>
            {tables.map((t) => <option key={t.id} value={t.id}>โต๊ะ {t.num} ({statusConfig[t.status].label})</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setActiveCat(c)}
              style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid", fontSize: 12, cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                background: activeCat === c ? BRAND : "transparent", color: activeCat === c ? "#fff" : "#6B7280", borderColor: activeCat === c ? BRAND : "#E5E7EB", fontWeight: activeCat === c ? 600 : 400 }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10 }}>
          {filtered.map((m) => (
            <div key={m.id} onClick={() => add(m.id)}
              style={{ border: "1.5px solid #F0F0F0", borderRadius: 14, padding: 14, cursor: "pointer", background: "#fff", transition: "all .15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = BRAND_LIGHT; e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,106,79,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#F0F0F0"; e.currentTarget.style.boxShadow = ""; }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>{m.cat}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: BRAND }}>₭{m.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: cart */}
      <div className="pos-cart-panel" style={{ background: "#F9FAFB", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 110px)", position: "sticky", top: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
          ออเดอร์ {tbl ? <span style={{ fontWeight: 400, fontSize: 12, color: "#6B7280" }}>— โต๊ะ {tbl.num}</span> : <span style={{ fontWeight: 400, fontSize: 12, color: "#9CA3AF" }}>— ไม่ระบุโต๊ะ</span>}
        </div>
        <div style={{ flex: 1, overflowY: "auto", margin: "12px 0", minHeight: 60 }}>
          {currentOrder.length === 0
            ? <div style={{ color: "#9CA3AF", fontSize: 12, textAlign: "center", padding: 24 }}>เพิ่มเมนูจากซ้าย</div>
            : currentOrder.map((it) => (
              <div key={it.id} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #E5E7EB" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{it.name}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>₭{it.price.toLocaleString()} × {it.qty}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 10 }}>
                  <button onClick={() => changeQty(it.id, -1)} style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid #D1D5DB", background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ minWidth: 18, textAlign: "center", fontSize: 13, fontWeight: 600 }}>{it.qty}</span>
                  <button onClick={() => changeQty(it.id, 1)} style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid #D1D5DB", background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, minWidth: 64, textAlign: "right" }}>₭{(it.price * it.qty).toLocaleString()}</div>
              </div>
            ))}
        </div>
        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 14 }}>
          {[["ยอดรวม", `₭${sub.toLocaleString()}`], ["VAT 7%", `₭${vat.toLocaleString()}`]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginBottom: 5 }}><span>{k}</span><span>{v}</span></div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800, margin: "10px 0 14px", color: BRAND }}><span>ยอดสุทธิ</span><span>₭{grand.toLocaleString()}</span></div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn size="sm" onClick={() => setCurrentOrder([])}>🗑</Btn>
            <Btn size="sm" onClick={() => { if (currentOrder.length) { setLastOrder({ id: "preview", tableId: selectedTableId, items: currentOrder, total: grand, cashReceived: grand, change: 0, time: new Date() }); setReceiptOpen(true); } }}>🧾</Btn>
            <Btn variant="primary" style={{ flex: 1 }} onClick={() => { if (!currentOrder.length) return; setCashReceived(""); setCashOpen(true); }}>💵 รับเงินสด</Btn>
          </div>
        </div>
      </div>

      {/* Cash modal */}
      {cashOpen && (
        <div onClick={(e) => e.target === e.currentTarget && setCashOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 18, padding: 24, width: 360, maxWidth: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>💵 รับชำระเงินสด</h3>
            <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6B7280" }}><span>ยอดสุทธิ</span><span style={{ fontWeight: 700, color: "#111" }}>₭{grand.toLocaleString()}</span></div>
            </div>
            <FieldLabel>รับเงินมา (₭)</FieldLabel>
            <input value={cashReceived} onChange={(e) => setCashReceived(e.target.value)} type="number" placeholder={`อย่างน้อย ₭${grand.toLocaleString()}`} autoFocus
              style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `2px solid ${cashAmt >= grand ? BRAND : "#D1D5DB"}`, fontSize: 18, fontWeight: 800, fontFamily: "inherit", boxSizing: "border-box", outline: "none", textAlign: "right", marginBottom: 10 }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {quickCash.map((q) => (
                <button key={q} onClick={() => setCashReceived(String(q))}
                  style={{ padding: "5px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: cashAmt === q ? BRAND : "#F9FAFB", color: cashAmt === q ? "#fff" : "#374151", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 500 }}>
                  ₭{q.toLocaleString()}
                </button>
              ))}
              <button onClick={() => setCashReceived(String(grand))}
                style={{ padding: "5px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: cashAmt === grand ? BRAND : "#F9FAFB", color: cashAmt === grand ? "#fff" : "#374151", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 500 }}>
                พอดี
              </button>
            </div>
            <div style={{ borderRadius: 12, padding: 14, marginBottom: 18, background: cashAmt >= grand ? "#D8F3DC" : "#FEE2E2", transition: "background .2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18 }}>
                <span style={{ color: cashAmt >= grand ? "#1B4332" : "#7F1D1D" }}>{cashAmt >= grand ? "💰 ทอนเงิน" : "⚠️ ขาดอีก"}</span>
                <span style={{ color: cashAmt >= grand ? "#1B4332" : "#7F1D1D" }}>₭{cashAmt > 0 ? Math.abs(change).toLocaleString() : "-"}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setCashOpen(false)} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>ยกเลิก</button>
              <button onClick={checkout} disabled={cashAmt < grand}
                style={{ flex: 2, padding: 10, borderRadius: 10, border: "none", background: cashAmt >= grand ? BRAND : "#D1D5DB", color: "#fff", cursor: cashAmt >= grand ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }}>
                ✓ ยืนยันชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt modal */}
      <Modal open={receiptOpen} onClose={() => setReceiptOpen(false)} title="ใบเสร็จรับเงิน"
        footer={[
          <Btn key="c" onClick={() => setReceiptOpen(false)}>ปิด</Btn>,
          lastOrder && <Btn key="p" onClick={() => printReceipt(lastOrder)}>🖨 พิมพ์</Btn>,
          lastOrder && (printerStatus === "connected" || printerStatus === "printing"
            ? <Btn key="bt" variant="primary" onClick={() => printViaBluetooth(lastOrder)} style={{ background: "#2563EB" }} disabled={printerStatus === "printing"}>{printerStatus === "printing" ? "⏳ กำลังพิมพ์..." : "🔵 พิมพ์ mPOP"}</Btn>
            : <Btn key="bt" variant="primary" onClick={connectPrinter} style={{ background: "#2563EB" }} disabled={printerStatus === "connecting"}>{printerStatus === "connecting" ? "⏳ กำลังเชื่อมต่อ..." : "🔵 เชื่อมต่อ mPOP"}</Btn>),
        ]}>
        {printerMsg && (
          <div style={{ marginBottom: 10, fontSize: 12, padding: "6px 12px", borderRadius: 8,
            background: printerStatus === "error" ? "#FEE2E2" : "#D1FAE5", color: printerStatus === "error" ? "#991B1B" : "#065F46",
            display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>🖨 {printerMsg}</span>
            {printerStatus === "connected" && <button onClick={disconnectPrinter} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#6B7280" }}>ตัดการเชื่อมต่อ</button>}
          </div>
        )}
        {lastOrder && (() => {
          const t = tables.find((x) => x.id === lastOrder.tableId);
          const s = lastOrder.items.reduce((x, i) => x + i.price * i.qty, 0);
          const v = lastOrder.total - s;
          return (
            <div style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 2, background: "#FAFAFA", padding: 18, borderRadius: 10, border: "1px dashed #D1D5DB" }}>
              <div style={{ textAlign: "center", fontWeight: 700, fontSize: 15 }}>☕ CaféERP</div>
              <div style={{ textAlign: "center", color: "#6B7280", fontSize: 11, marginBottom: 8 }}>ใบเสร็จรับเงิน</div>
              <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
              {[["ออเดอร์", `#${lastOrder.id}`], ["โต๊ะ", t ? `โต๊ะ ${t.num}` : "ไม่ระบุ"], ["เวลา", lastOrder.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })]].map(([k, v2]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between" }}><span>{k}</span><span>{v2}</span></div>
              ))}
              <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
              {lastOrder.items.map((i) => <div key={i.id} style={{ display: "flex", justifyContent: "space-between" }}><span>{i.name} ×{i.qty}</span><span>₭{(i.price * i.qty).toLocaleString()}</span></div>)}
              <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280" }}><span>ยอดรวม</span><span>₭{s.toLocaleString()}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280" }}><span>VAT 7%</span><span>₭{v.toLocaleString()}</span></div>
              <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15 }}><span>ยอดสุทธิ</span><span>₭{lastOrder.total.toLocaleString()}</span></div>
              <div style={{ background: "#D8F3DC", borderRadius: 8, padding: "8px 10px", marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>💵 รับเงินสด</span><span>₭{(lastOrder.cashReceived || lastOrder.total).toLocaleString()}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}><span>💰 ทอนเงิน</span><span>₭{(lastOrder.change || 0).toLocaleString()}</span></div>
              </div>
              <div style={{ textAlign: "center", color: "#9CA3AF", fontSize: 11, marginTop: 10 }}>ขอบคุณที่ใช้บริการ 🙏</div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}

function MenuPage({ menus, setMenus }) {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", cat: "กาแฟ", price: "", status: "พร้อมขาย" });

  const open = (m = null) => {
    setEditId(m?.id || null);
    setForm(m ? { name: m.name, cat: m.cat, price: String(m.price), status: m.status } : { name: "", cat: "กาแฟ", price: "", status: "พร้อมขาย" });
    setShowModal(true);
  };
  const save = () => {
    if (!form.name || !form.price) return;
    const entry = { ...form, price: parseFloat(form.price) };
    if (editId) setMenus((p) => p.map((m) => m.id === editId ? { ...m, ...entry } : m));
    else setMenus((p) => [...p, { id: Date.now(), ...entry }]);
    setShowModal(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: "#6B7280" }}>เมนูทั้งหมด {menus.length} รายการ</span>
        <Btn variant="primary" size="sm" onClick={() => open()}>+ เพิ่มเมนู</Btn>
      </div>
      <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["ชื่อเมนู", "หมวดหมู่", "ราคา", "สถานะ", ""].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>
            {menus.map((m) => (
              <tr key={m.id}>
                <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>{m.name}</td>
                <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>{m.cat}</td>
                <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", fontWeight: 700, color: BRAND }}>₭{m.price.toLocaleString()}</td>
                <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB" }}><Badge type={m.status === "พร้อมขาย" ? "green" : "amber"}>{m.status}</Badge></td>
                <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", textAlign: "right" }}>
                  <Btn size="sm" onClick={() => open(m)}>✏️</Btn>{" "}
                  <Btn size="sm" variant="danger" onClick={() => setMenus((p) => p.filter((x) => x.id !== m.id))}>🗑</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editId ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}
        footer={[<Btn key="c" onClick={() => setShowModal(false)}>ยกเลิก</Btn>, <Btn key="s" variant="primary" onClick={save}>บันทึก</Btn>]}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><FieldLabel>ชื่อเมนู</FieldLabel><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="เช่น ลาเต้" /></div>
          <div><FieldLabel>หมวดหมู่</FieldLabel>
            <Select value={form.cat} onChange={(v) => setForm({ ...form, cat: v })}>{["กาแฟ", "ชา", "เครื่องดื่มอื่น", "ขนม"].map((c) => <option key={c}>{c}</option>)}</Select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><FieldLabel>ราคา (₭)</FieldLabel><Input value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" placeholder="15000" /></div>
          <div><FieldLabel>สถานะ</FieldLabel>
            <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })}><option>พร้อมขาย</option><option>หยุดขายชั่วคราว</option></Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function StockPage({ stocks, setStocks }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", qty: "", unit: "กิโลกรัม", min: "" });
  const low = stocks.filter((s) => s.qty <= s.min).length;

  const save = () => {
    if (!form.name || form.qty === "") return;
    setStocks((p) => [...p, { id: Date.now(), name: form.name, qty: parseFloat(form.qty), unit: form.unit, min: parseFloat(form.min) || 0 }]);
    setShowModal(false); setForm({ name: "", qty: "", unit: "กิโลกรัม", min: "" });
  };
  const restock = (id) => {
    const amt = window.prompt("เติมจำนวนเท่าไหร่?");
    const n = parseFloat(amt);
    if (!isNaN(n) && n > 0) setStocks((p) => p.map((s) => s.id === id ? { ...s, qty: s.qty + n } : s));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: "#6B7280" }}>วัตถุดิบทั้งหมด {stocks.length} รายการ · ใกล้หมด <span style={{ color: "#DC2626", fontWeight: 700 }}>{low}</span> รายการ</span>
        <Btn variant="primary" size="sm" onClick={() => setShowModal(true)}>+ เพิ่มวัตถุดิบ</Btn>
      </div>
      <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["วัตถุดิบ", "คงเหลือ", "หน่วย", "ขั้นต่ำ", "สถานะ", ""].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>
            {stocks.map((s) => {
              const pct = Math.min(100, Math.round(s.qty / Math.max(s.min * 3, s.qty) * 100));
              const color = s.qty <= s.min ? "#DC2626" : s.qty <= s.min * 1.5 ? "#D97706" : BRAND;
              const type = s.qty <= s.min ? "red" : s.qty <= s.min * 1.5 ? "amber" : "green";
              const label = s.qty <= s.min ? "ใกล้หมด" : s.qty <= s.min * 1.5 ? "ควรสั่ง" : "ปกติ";
              return (
                <tr key={s.id}>
                  <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB" }}>
                    {s.qty}
                    <div style={{ background: "#F3F4F6", borderRadius: 20, height: 5, marginTop: 5, overflow: "hidden", width: 80 }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 20 }} />
                    </div>
                  </td>
                  <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>{s.unit}</td>
                  <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>{s.min}</td>
                  <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB" }}><Badge type={type}>{label}</Badge></td>
                  <td style={{ padding: "11px 16px", borderBottom: "1px solid #F9FAFB", textAlign: "right" }}>
                    <Btn size="sm" onClick={() => restock(s.id)}>+ เติม</Btn>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="เพิ่มวัตถุดิบ"
        footer={[<Btn key="c" onClick={() => setShowModal(false)}>ยกเลิก</Btn>, <Btn key="s" variant="primary" onClick={save}>บันทึก</Btn>]}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><FieldLabel>ชื่อวัตถุดิบ</FieldLabel><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="เช่น กาแฟดิบ" /></div>
          <div><FieldLabel>หน่วย</FieldLabel>
            <Select value={form.unit} onChange={(v) => setForm({ ...form, unit: v })}>{["กิโลกรัม", "กรัม", "ลิตร", "มิลลิลิตร", "ชิ้น", "ถุง"].map((u) => <option key={u}>{u}</option>)}</Select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><FieldLabel>จำนวนคงเหลือ</FieldLabel><Input value={form.qty} onChange={(v) => setForm({ ...form, qty: v })} type="number" /></div>
          <div><FieldLabel>จำนวนขั้นต่ำ</FieldLabel><Input value={form.min} onChange={(v) => setForm({ ...form, min: v })} type="number" /></div>
        </div>
      </Modal>
    </div>
  );
}

function Report({ orders, tables }) {
  const total = orders.reduce((s, o) => s + o.total, 0);
  const wCut = new Date(); wCut.setDate(wCut.getDate() - 7);
  const wRev = orders.filter((o) => o.time >= wCut).reduce((s, o) => s + o.total, 0);
  const [receiptOrder, setReceiptOrder] = useState(null);

  const days = [], labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(orders.filter((o) => o.time.toDateString() === d.toDateString()).reduce((s, o) => s + o.total, 0));
    labels.push(d.toLocaleDateString("th-TH", { weekday: "short" }));
  }
  const mx = Math.max(...days, 1);

  const topMap = {};
  orders.forEach((o) => o.items.forEach((it) => {
    if (!topMap[it.name]) topMap[it.name] = { qty: 0, rev: 0 };
    topMap[it.name].qty += it.qty; topMap[it.name].rev += it.price * it.qty;
  }));
  const topList = Object.entries(topMap).sort((a, b) => b[1].qty - a[1].qty).slice(0, 5);

  const exportCSV = () => {
    const rows = [["ออเดอร์", "โต๊ะ", "รายการ", "จำนวน", "ราคา(₭)", "วันที่", "เวลา"]];
    orders.forEach((o) => {
      const tbl = tables.find((t) => t.id === o.tableId);
      o.items.forEach((it) => rows.push([`#${o.id}`, tbl ? `โต๊ะ ${tbl.num}` : "-", it.name, it.qty, it.price * it.qty, o.time.toLocaleDateString("th-TH"), o.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })]));
    });
    const csv = "\uFEFF" + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `cafe_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 16 }}>
        <Btn onClick={exportCSV}>📊 Export CSV</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 16 }}>
        <MetricCard label="รายได้สัปดาห์" value={`₭${wRev.toLocaleString()}`} color={BRAND} />
        <MetricCard label="รายได้ทั้งหมด" value={`₭${total.toLocaleString()}`} />
        <MetricCard label="ออเดอร์ทั้งหมด" value={orders.length} />
        <MetricCard label="เฉลี่ย/ออเดอร์" value={`₭${orders.length ? Math.round(total / orders.length).toLocaleString() : 0}`} />
      </div>
      <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>ยอดขาย 7 วันที่ผ่านมา</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120 }}>
          {days.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>{v ? `₭${v.toLocaleString()}` : ""}</span>
              <div style={{ width: "100%", background: BRAND, borderRadius: "4px 4px 0 0", opacity: 0.85, minHeight: 3, height: Math.max(3, Math.round(v / mx * 100)) }} />
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>เมนูขายดี</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["เมนู", "จำนวน", "รายได้"].map((h) => <th key={h} style={{ textAlign: "left", padding: "7px 10px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{topList.length ? topList.map(([n, d]) => <tr key={n}><td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>{n}</td><td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}>{d.qty} แก้ว</td><td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", fontWeight: 700, color: BRAND }}>₭{d.rev.toLocaleString()}</td></tr>) : <tr><td colSpan={3} style={{ textAlign: "center", color: "#9CA3AF", padding: 16 }}>ยังไม่มีข้อมูล</td></tr>}</tbody>
        </table>
      </div>
      <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>รายการออเดอร์ทั้งหมด</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["ออเดอร์", "โต๊ะ", "รายการ", "ราคา", "เวลา", ""].map((h) => <th key={h} style={{ textAlign: "left", padding: "7px 10px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{orders.length ? [...orders].reverse().map((o) => {
            const tbl = tables.find((t) => t.id === o.tableId);
            const names = o.items.map((i) => i.name + (i.qty > 1 ? ` ×${i.qty}` : "")).join(", ");
            return <tr key={o.id}>
              <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", fontWeight: 700 }}>#{o.id}</td>
              <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}>{tbl ? `โต๊ะ ${tbl.num}` : "-"}</td>
              <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#6B7280" }}>{names}</td>
              <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", fontWeight: 700 }}>₭{o.total.toLocaleString()}</td>
              <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", color: "#9CA3AF", fontSize: 11 }}>{o.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</td>
              <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}><Btn size="sm" onClick={() => setReceiptOrder(o)}>🧾</Btn></td>
            </tr>;
          }) : <tr><td colSpan={6} style={{ textAlign: "center", color: "#9CA3AF", padding: 20 }}>ยังไม่มีออเดอร์</td></tr>}</tbody>
        </table>
      </div>
      <Modal open={!!receiptOrder} onClose={() => setReceiptOrder(null)} title="ใบเสร็จรับเงิน"
        footer={[<Btn key="c" onClick={() => setReceiptOrder(null)}>ปิด</Btn>]}>
        {receiptOrder && (() => {
          const t = tables.find((x) => x.id === receiptOrder.tableId);
          const s = receiptOrder.items.reduce((x, i) => x + i.price * i.qty, 0);
          const v = receiptOrder.total - s;
          return <div style={{ fontFamily: "monospace", fontSize: 13, lineHeight: 2, background: "#FAFAFA", padding: 18, borderRadius: 10, border: "1px dashed #D1D5DB" }}>
            <div style={{ textAlign: "center", fontWeight: 700, fontSize: 15 }}>☕ CaféERP</div>
            <div style={{ textAlign: "center", color: "#6B7280", fontSize: 11 }}>ใบเสร็จรับเงิน #{receiptOrder.id}</div>
            <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
            {[["โต๊ะ", t ? `โต๊ะ ${t.num}` : "ไม่ระบุ"], ["เวลา", receiptOrder.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })]].map(([k, vv]) => <div key={k} style={{ display: "flex", justifyContent: "space-between" }}><span>{k}</span><span>{vv}</span></div>)}
            <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
            {receiptOrder.items.map((i, idx) => <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}><span>{i.name} ×{i.qty}</span><span>₭{(i.price * i.qty).toLocaleString()}</span></div>)}
            <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280" }}><span>ยอดรวม</span><span>₭{s.toLocaleString()}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280" }}><span>VAT 7%</span><span>₭{v.toLocaleString()}</span></div>
            <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15 }}><span>ยอดสุทธิ</span><span>₭{receiptOrder.total.toLocaleString()}</span></div>
            <div style={{ textAlign: "center", color: "#9CA3AF", fontSize: 11, marginTop: 8 }}>ขอบคุณที่ใช้บริการ 🙏</div>
          </div>;
        })()}
      </Modal>
    </div>
  );
}

function Staff({ staffs, setStaffs }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", role: "บาริสต้า", start: "08:00", end: "17:00" });
  const save = () => {
    if (!form.name) return;
    setStaffs((p) => [...p, { id: Date.now(), ...form, status: "กำลังทำงาน" }]);
    setShowModal(false); setForm({ name: "", role: "บาริสต้า", start: "08:00", end: "17:00" });
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: "#6B7280" }}>พนักงานทั้งหมด {staffs.length} คน</span>
        <Btn variant="primary" size="sm" onClick={() => setShowModal(true)}>+ เพิ่มพนักงาน</Btn>
      </div>
      <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, padding: "4px 16px" }}>
        {staffs.map((s, i) => {
          const av = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const init = s.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
          const hrs = parseInt(s.end) - parseInt(s.start);
          return (
            <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < staffs.length - 1 ? "1px solid #F9FAFB" : "none", flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "1 1 160px" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: av.bg, color: av.fg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{init}</div>
                <div><div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>{s.role}</div></div>
              </div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 11, color: "#9CA3AF" }}>เวลางาน</div><div style={{ fontSize: 13, fontWeight: 500 }}>{s.start}–{s.end}</div></div>
              <div className="hide-mobile" style={{ textAlign: "center" }}><div style={{ fontSize: 11, color: "#9CA3AF" }}>ชั่วโมง/วัน</div><div style={{ fontSize: 14, fontWeight: 700, color: BRAND }}>{hrs} ชม.</div></div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge type="green">{s.status}</Badge>
                <Btn size="sm" variant="danger" onClick={() => setStaffs((p) => p.filter((x) => x.id !== s.id))}>🗑</Btn>
              </div>
            </div>
          );
        })}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="เพิ่มพนักงาน"
        footer={[<Btn key="c" onClick={() => setShowModal(false)}>ยกเลิก</Btn>, <Btn key="s" variant="primary" onClick={save}>บันทึก</Btn>]}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><FieldLabel>ชื่อ-นามสกุล</FieldLabel><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="สมชาย ดีใจ" /></div>
          <div><FieldLabel>ตำแหน่ง</FieldLabel>
            <Select value={form.role} onChange={(v) => setForm({ ...form, role: v })}>{["บาริสต้า", "แคชเชียร์", "ผู้จัดการ", "แม่บ้าน"].map((r) => <option key={r}>{r}</option>)}</Select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><FieldLabel>เวลาเข้างาน</FieldLabel><Input value={form.start} onChange={(v) => setForm({ ...form, start: v })} type="time" /></div>
          <div><FieldLabel>เวลาออกงาน</FieldLabel><Input value={form.end} onChange={(v) => setForm({ ...form, end: v })} type="time" /></div>
        </div>
      </Modal>
    </div>
  );
}

function CashBook({ cashbook, setCashbook, orders }) {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("all");
  const [form, setForm] = useState({ type: "income", cat: "ขายกาแฟ", desc: "", amount: "" });

  const todayEntries = cashbook.filter((e) => isToday(e.time));
  const totalIncome = todayEntries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const totalExpense = todayEntries.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
  const salesIncome = orders.filter((o) => isToday(o.time)).reduce((s, o) => s + o.total, 0);
  const netCash = totalIncome + salesIncome - totalExpense;
  const filtered = cashbook.filter((e) => tab === "all" ? true : tab === "income" ? e.type === "income" : e.type === "expense");

  const save = () => {
    if (!form.desc || !form.amount) return;
    setCashbook((p) => [...p, { id: Date.now(), type: form.type, cat: form.cat, desc: form.desc, amount: parseFloat(form.amount), time: new Date() }]);
    setShowModal(false); setForm({ type: "income", cat: "ขายกาแฟ", desc: "", amount: "" });
  };

  const exportCSV = () => {
    const rows = [["วันที่", "เวลา", "ประเภท", "หมวด", "รายละเอียด", "จำนวน (₭)"]];
    orders.forEach((o) => rows.push([o.time.toLocaleDateString("th-TH"), o.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }), "รายรับ", "ขาย POS", `ออเดอร์ #${o.id}`, o.total]));
    cashbook.forEach((e) => rows.push([e.time.toLocaleDateString("th-TH"), e.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }), e.type === "income" ? "รายรับ" : "รายจ่าย", e.cat, e.desc, e.type === "income" ? e.amount : -e.amount]));
    const csv = "\uFEFF" + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    a.download = `cashbook_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 18 }}>
        <div style={{ background: "#D8F3DC", borderRadius: 14, padding: "16px 18px" }}><div style={{ fontSize: 11, color: "#1B4332", marginBottom: 4, fontWeight: 500 }}>💵 รายรับ (สด)</div><div style={{ fontSize: 22, fontWeight: 800, color: "#1B4332" }}>₭{totalIncome.toLocaleString()}</div></div>
        <div style={{ background: "#DBEAFE", borderRadius: 14, padding: "16px 18px" }}><div style={{ fontSize: 11, color: "#1E3A5F", marginBottom: 4, fontWeight: 500 }}>🧾 รายรับ POS</div><div style={{ fontSize: 22, fontWeight: 800, color: "#1E3A5F" }}>₭{salesIncome.toLocaleString()}</div></div>
        <div style={{ background: "#FEE2E2", borderRadius: 14, padding: "16px 18px" }}><div style={{ fontSize: 11, color: "#7F1D1D", marginBottom: 4, fontWeight: 500 }}>💸 รายจ่าย</div><div style={{ fontSize: 22, fontWeight: 800, color: "#7F1D1D" }}>₭{totalExpense.toLocaleString()}</div></div>
        <div style={{ background: netCash >= 0 ? "#F0FFF4" : "#FFF5F5", borderRadius: 14, padding: "16px 18px", border: `1px solid ${netCash >= 0 ? "#68D391" : "#FC8181"}` }}><div style={{ fontSize: 11, color: netCash >= 0 ? "#276749" : "#9B2C2C", marginBottom: 4, fontWeight: 500 }}>💰 กำไรสุทธิ</div><div style={{ fontSize: 22, fontWeight: 800, color: netCash >= 0 ? "#276749" : "#9B2C2C" }}>₭{netCash.toLocaleString()}</div></div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[["all", "ทั้งหมด"], ["income", "รายรับ"], ["expense", "รายจ่าย"]].map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)}
              style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: tab === v ? 700 : 400,
                background: tab === v ? BRAND : "transparent", color: tab === v ? "#fff" : "#6B7280", borderColor: tab === v ? BRAND : "#E5E7EB" }}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn size="sm" onClick={exportCSV}>📊 Export CSV</Btn>
          <Btn size="sm" variant="primary" onClick={() => setShowModal(true)}>+ บันทึกรายการ</Btn>
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["เวลา", "ประเภท", "หมวด", "รายละเอียด", "จำนวน (₭)", ""].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>
            {tab !== "expense" && orders.filter((o) => isToday(o.time)).map((o) => (
              <tr key={`pos-${o.id}`}>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB", color: "#9CA3AF", fontSize: 11 }}>{o.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB" }}><Badge type="green">รายรับ</Badge></td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>ขาย POS</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>ออเดอร์ #{o.id}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB", fontWeight: 700, color: BRAND }}>+₭{o.total.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB" }}></td>
              </tr>
            ))}
            {[...filtered].reverse().map((e) => (
              <tr key={e.id}>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB", color: "#9CA3AF", fontSize: 11 }}>{e.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB" }}><Badge type={e.type === "income" ? "green" : "red"}>{e.type === "income" ? "รายรับ" : "รายจ่าย"}</Badge></td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>{e.cat}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB" }}>{e.desc}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB", fontWeight: 700, color: e.type === "income" ? BRAND : "#DC2626" }}>{e.type === "income" ? "+" : "−"}₭{e.amount.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid #F9FAFB" }}><Btn size="sm" variant="danger" onClick={() => setCashbook((p) => p.filter((x) => x.id !== e.id))}>🗑</Btn></td>
              </tr>
            ))}
            {filtered.length === 0 && orders.filter((o) => isToday(o.time)).length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: 24, color: "#9CA3AF" }}>ยังไม่มีรายการ</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 18, padding: 24, width: 400, maxWidth: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>+ บันทึกรายการเงินสด</h3>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#9CA3AF" }}>×</button>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[["income", "💵 รายรับ"], ["expense", "💸 รายจ่าย"]].map(([v, l]) => (
                <button key={v} onClick={() => setForm({ ...form, type: v, cat: v === "income" ? "ขายกาแฟ" : "วัตถุดิบ" })}
                  style={{ flex: 1, padding: 10, borderRadius: 10, border: "2px solid", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit",
                    background: form.type === v ? (v === "income" ? "#D8F3DC" : "#FEE2E2") : "#F9FAFB",
                    color: form.type === v ? (v === "income" ? "#1B4332" : "#7F1D1D") : "#6B7280",
                    borderColor: form.type === v ? (v === "income" ? BRAND : "#DC2626") : "#E5E7EB" }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div><FieldLabel>หมวดหมู่</FieldLabel>
                <select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff", fontFamily: "inherit", boxSizing: "border-box" }}>
                  {(form.type === "income" ? CB_INCOME_CATS : CB_EXPENSE_CATS).map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><FieldLabel>จำนวนเงิน (₭)</FieldLabel><Input value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} type="number" placeholder="50,000" /></div>
            </div>
            <div style={{ marginBottom: 18 }}><FieldLabel>รายละเอียด</FieldLabel><Input value={form.desc} onChange={(v) => setForm({ ...form, desc: v })} placeholder="เช่น ซื้อเมล็ดกาแฟ 2 กก." /></div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>ยกเลิก</button>
              <button onClick={save} style={{ flex: 2, padding: 10, borderRadius: 10, border: "none", background: BRAND, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }}>บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PurchasePage({ stocks, setStocks, purchaseOrders, setPurchaseOrders }) {
  const [tab, setTab] = useState("create");
  const [supplier, setSupplier] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ stockId: "", name: "", qty: "", unit: "กิโลกรัม", pricePerUnit: "" });

  const lowStocks = stocks.filter((s) => s.qty <= s.min * 1.5);
  const suggestQty = (s) => Math.max(s.min * 3 - s.qty, s.min);

  const autoFill = () => {
    setItems(lowStocks.map((s) => ({ id: Date.now() + s.id, stockId: s.id, name: s.name, qty: suggestQty(s), unit: s.unit, pricePerUnit: "" })));
  };

  const addItem = () => {
    if (!newItem.name || !newItem.qty) return;
    setItems((p) => [...p, { id: Date.now(), stockId: newItem.stockId || null, name: newItem.name, qty: parseFloat(newItem.qty), unit: newItem.unit, pricePerUnit: parseFloat(newItem.pricePerUnit) || 0 }]);
    setNewItem({ stockId: "", name: "", qty: "", unit: "กิโลกรัม", pricePerUnit: "" }); setShowAddItem(false);
  };

  const totalCost = items.reduce((s, i) => s + (i.pricePerUnit * i.qty || 0), 0);

  const createPO = (status = "draft") => {
    if (!items.length) return;
    const po = { id: `PO-${Date.now()}`, supplier: supplier || "ไม่ระบุ", note, items: items.map((i) => ({ ...i })), totalCost, status, createdAt: new Date(), receivedAt: null };
    setPurchaseOrders((p) => [po, ...p]);
    setItems([]); setSupplier(""); setNote(""); setTab("history");
  };

  const receivePO = (poId) => {
    const po = purchaseOrders.find((p) => p.id === poId);
    if (!po) return;
    po.items.forEach((item) => {
      if (item.stockId) { setStocks((prev) => prev.map((s) => s.id === item.stockId ? { ...s, qty: s.qty + item.qty } : s)); }
      else { setStocks((prev) => { const ex = prev.find((s) => s.name === item.name); return ex ? prev.map((s) => s.name === item.name ? { ...s, qty: s.qty + item.qty } : s) : [...prev, { id: Date.now(), name: item.name, qty: item.qty, unit: item.unit, min: 0 }]; }); }
    });
    setPurchaseOrders((p) => p.map((x) => x.id === poId ? { ...x, status: "received", receivedAt: new Date() } : x));
    alert(`✅ รับของเรียบร้อย! อัปเดตสต็อก ${po.items.length} รายการแล้ว`);
  };

  const printPO = (po) => {
    const w = window.open("", "_blank", "width=700,height=750");
    w.document.write(`<html><head><title>ใบสั่งซื้อ ${po.id}</title>
<style>body{font-family:sans-serif;font-size:13px;padding:32px;color:#111}h2{font-size:18px;margin:0}p{color:#666;font-size:12px;margin:4px 0}
table{width:100%;border-collapse:collapse;margin-top:16px}th{text-align:left;padding:9px 12px;font-size:11px;font-weight:700;color:#9CA3AF;border-bottom:2px solid #E5E7EB}
td{padding:10px 12px;border-bottom:1px solid #F3F4F6}.total{font-size:15px;font-weight:700;margin-top:16px;text-align:right}
.footer{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:40px}
.sig{border-top:1px solid #333;padding-top:8px;font-size:12px;color:#666;margin-top:40px}@media print{body{padding:0}}</style></head>
<body><div style="display:flex;justify-content:space-between;align-items:flex-start">
<div><h2>☕ CaféERP — ใบสั่งซื้อวัตถุดิบ</h2><p>เลขที่: <strong>${po.id}</strong></p><p>วันที่: ${po.createdAt.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}</p></div>
<div style="text-align:right"><p>ผู้จำหน่าย: <strong>${po.supplier}</strong></p>${po.note ? `<p>หมายเหตุ: ${po.note}</p>` : ""}</div></div>
<table><thead><tr><th>#</th><th>รายการ</th><th>จำนวน</th><th>หน่วย</th><th>ราคา/หน่วย</th><th>รวม</th></tr></thead>
<tbody>${po.items.map((it, i) => `<tr><td>${i + 1}</td><td><strong>${it.name}</strong></td><td>${it.qty}</td><td>${it.unit}</td><td>${it.pricePerUnit ? it.pricePerUnit.toLocaleString() : "-"}</td><td>${it.pricePerUnit ? (it.pricePerUnit * it.qty).toLocaleString() : "-"}</td></tr>`).join("")}</tbody></table>
${po.totalCost > 0 ? `<div class="total">ยอดรวมทั้งสิ้น: ₭${po.totalCost.toLocaleString()}</div>` : ""}
<div class="footer"><div><div class="sig">ผู้สั่งซื้อ</div></div><div><div class="sig">ผู้จำหน่าย / ผู้รับมอบ</div></div></div>
<script>window.print();window.close();</script></body></html>`);
    w.document.close();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[["create", "✏️ สร้างใบสั่งซื้อ"], ["history", "📄 ประวัติใบสั่งซื้อ"]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)}
            style={{ padding: "8px 18px", borderRadius: 10, border: "1px solid", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
              background: tab === v ? BRAND : "#fff", color: tab === v ? "#fff" : "#6B7280", borderColor: tab === v ? BRAND : "#E5E7EB" }}>
            {l}
          </button>
        ))}
      </div>

      {tab === "create" && (
        <div>
          {lowStocks.length > 0 && (
            <div style={{ background: "#FFFBEB", border: "1px solid #F6AD55", borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontWeight: 700, color: "#78350F" }}>⚠️ วัตถุดิบใกล้หมด {lowStocks.length} รายการ: </span><span style={{ fontSize: 13, color: "#92400E" }}>{lowStocks.map((s) => s.name).join(", ")}</span></div>
              <button onClick={autoFill} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#D97706", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>✨ เพิ่มอัตโนมัติ</button>
            </div>
          )}
          <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, padding: 16, marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#9CA3AF", marginBottom: 12, textTransform: "uppercase" }}>ข้อมูลใบสั่งซื้อ</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><FieldLabel>ผู้จำหน่าย</FieldLabel><Input value={supplier} onChange={setSupplier} placeholder="เช่น ร้านกาแฟสด ABC" /></div>
              <div><FieldLabel>หมายเหตุ</FieldLabel><Input value={note} onChange={setNote} placeholder="เช่น ส่งก่อน 9 โมง" /></div>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, padding: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 12, color: "#9CA3AF", textTransform: "uppercase" }}>รายการวัตถุดิบ ({items.length})</span>
              <Btn size="sm" variant="primary" onClick={() => setShowAddItem(true)}>+ เพิ่มรายการ</Btn>
            </div>
            {items.length === 0 ? (
              <div style={{ textAlign: "center", padding: "28px 0", color: "#9CA3AF" }}><div style={{ fontSize: 32, marginBottom: 8 }}>📦</div><div style={{ fontSize: 13 }}>กด <strong>"✨ เพิ่มอัตโนมัติ"</strong> หรือ <strong>"+ เพิ่มรายการ"</strong></div></div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr>{["รายการ", "จำนวน", "หน่วย", "ราคา/หน่วย", "รวม", ""].map((h) => <th key={h} style={{ textAlign: "left", padding: "7px 10px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {items.map((it) => {
                    const stock = stocks.find((s) => s.id === it.stockId);
                    return (
                      <tr key={it.id}>
                        <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}>
                          <div style={{ fontWeight: 600 }}>{it.name}</div>
                          {stock && <div style={{ fontSize: 11, color: "#9CA3AF" }}>คงเหลือ: {stock.qty} {stock.unit}</div>}
                        </td>
                        <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}>
                          <input value={it.qty} type="number" onChange={(e) => setItems((p) => p.map((x) => x.id === it.id ? { ...x, qty: parseFloat(e.target.value) || 0 } : x))}
                            style={{ width: 70, padding: "5px 8px", borderRadius: 7, border: "1px solid #D1D5DB", fontSize: 13, fontFamily: "inherit" }} />
                        </td>
                        <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>{it.unit}</td>
                        <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}>
                          <input value={it.pricePerUnit || ""} type="number" placeholder="0" onChange={(e) => setItems((p) => p.map((x) => x.id === it.id ? { ...x, pricePerUnit: parseFloat(e.target.value) || 0 } : x))}
                            style={{ width: 90, padding: "5px 8px", borderRadius: 7, border: "1px solid #D1D5DB", fontSize: 13, fontFamily: "inherit" }} />
                        </td>
                        <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB", fontWeight: 700, color: BRAND }}>{it.pricePerUnit ? `₭${(it.pricePerUnit * it.qty).toLocaleString()}` : "-"}</td>
                        <td style={{ padding: "10px 10px", borderBottom: "1px solid #F9FAFB" }}>
                          <Btn size="sm" variant="danger" onClick={() => setItems((p) => p.filter((x) => x.id !== it.id))}>🗑</Btn>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {items.length > 0 && totalCost > 0 && <div style={{ textAlign: "right", marginTop: 12, fontWeight: 800, fontSize: 15, color: BRAND }}>ยอดรวม: ₭{totalCost.toLocaleString()}</div>}
          </div>
          {items.length > 0 && (
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Btn onClick={() => createPO("draft")}>💾 บันทึกร่าง</Btn>
              <Btn variant="primary" style={{ background: "#2563EB" }} onClick={() => createPO("sent")}>📤 สร้างและพิมพ์</Btn>
            </div>
          )}
        </div>
      )}

      {tab === "history" && (
        <div>
          {purchaseOrders.length === 0 ? (
            <div style={{ textAlign: "center", padding: 48, color: "#9CA3AF" }}><div style={{ fontSize: 40, marginBottom: 10 }}>🛒</div><div>ยังไม่มีใบสั่งซื้อ</div></div>
          ) : purchaseOrders.map((po) => {
            const cfg = PO_STATUS[po.status];
            return (
              <div key={po.id} style={{ background: "#fff", border: "1px solid #F0F0F0", borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontWeight: 800, fontSize: 15 }}>{po.id}</span>
                      <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontWeight: 700 }}>{cfg.label}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>ผู้จำหน่าย: <span style={{ color: "#374151", fontWeight: 500 }}>{po.supplier}</span> · {po.createdAt.toLocaleDateString("th-TH")}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Btn size="sm" onClick={() => printPO(po)}>🖨 พิมพ์</Btn>
                    {po.status !== "received" && po.status !== "cancelled" && <Btn size="sm" variant="primary" onClick={() => receivePO(po.id)}>✅ รับของแล้ว</Btn>}
                    {po.status === "draft" && <Btn size="sm" variant="danger" onClick={() => setPurchaseOrders((p) => p.map((x) => x.id === po.id ? { ...x, status: "cancelled" } : x))}>ยกเลิก</Btn>}
                  </div>
                </div>
                <div style={{ background: "#F9FAFB", borderRadius: 10, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead><tr style={{ background: "#F3F4F6" }}>{["รายการ", "จำนวน", "หน่วย", "ราคา/หน่วย", "รวม"].map((h) => <th key={h} style={{ textAlign: "left", padding: "7px 12px", fontSize: 11, fontWeight: 700, color: "#9CA3AF" }}>{h}</th>)}</tr></thead>
                    <tbody>{po.items.map((it, i) => <tr key={i}><td style={{ padding: "8px 12px", borderBottom: "1px solid #F3F4F6", fontWeight: 600 }}>{it.name}</td><td style={{ padding: "8px 12px", borderBottom: "1px solid #F3F4F6" }}>{it.qty}</td><td style={{ padding: "8px 12px", borderBottom: "1px solid #F3F4F6", color: "#6B7280" }}>{it.unit}</td><td style={{ padding: "8px 12px", borderBottom: "1px solid #F3F4F6", color: "#6B7280" }}>{it.pricePerUnit ? `₭${it.pricePerUnit.toLocaleString()}` : "-"}</td><td style={{ padding: "8px 12px", borderBottom: "1px solid #F3F4F6", fontWeight: 700, color: BRAND }}>{it.pricePerUnit ? `₭${(it.pricePerUnit * it.qty).toLocaleString()}` : "-"}</td></tr>)}</tbody>
                  </table>
                </div>
                {po.totalCost > 0 && <div style={{ textAlign: "right", marginTop: 10, fontWeight: 800, color: BRAND }}>ยอดรวม: ₭{po.totalCost.toLocaleString()}</div>}
              </div>
            );
          })}
        </div>
      )}

      <Modal open={showAddItem} onClose={() => setShowAddItem(false)} title="+ เพิ่มรายการวัตถุดิบ"
        footer={[<Btn key="c" onClick={() => setShowAddItem(false)}>ยกเลิก</Btn>, <Btn key="a" variant="primary" onClick={addItem}>+ เพิ่มรายการ</Btn>]}>
        <div style={{ marginBottom: 12 }}>
          <FieldLabel>เลือกจากสต็อก (หรือพิมพ์ชื่อใหม่)</FieldLabel>
          <select value={newItem.stockId} onChange={(e) => { const s = stocks.find((x) => x.id === parseInt(e.target.value)); setNewItem(s ? { ...newItem, stockId: s.id, name: s.name, unit: s.unit } : { ...newItem, stockId: "", name: "" }); }}
            style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 8 }}>
            <option value="">-- เลือกจากสต็อก --</option>
            {stocks.map((s) => <option key={s.id} value={s.id}>{s.name} (คงเหลือ: {s.qty} {s.unit})</option>)}
          </select>
          <Input value={newItem.name} onChange={(v) => setNewItem({ ...newItem, name: v })} placeholder="หรือพิมพ์ชื่อวัตถุดิบ" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div><FieldLabel>จำนวน</FieldLabel><Input value={newItem.qty} onChange={(v) => setNewItem({ ...newItem, qty: v })} type="number" placeholder="5" /></div>
          <div><FieldLabel>หน่วย</FieldLabel>
            <select value={newItem.unit} onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              style={{ width: "100%", padding: "9px 10px", borderRadius: 9, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff", fontFamily: "inherit", boxSizing: "border-box" }}>
              {["กิโลกรัม", "กรัม", "ลิตร", "มิลลิลิตร", "ชิ้น", "ถุง"].map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div><FieldLabel>ราคา/หน่วย</FieldLabel><Input value={newItem.pricePerUnit} onChange={(v) => setNewItem({ ...newItem, pricePerUnit: v })} type="number" placeholder="₭" /></div>
        </div>
      </Modal>
    </div>
  );
}

function SOPPage() {
  const today = new Date().toISOString().slice(0, 10);
  const storageKey = `sop_done_${today}`;

  const [tasks, setTasks] = useState(INITIAL_SOP_TASKS);
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; }
  });
  const [activeTab, setActiveTab] = useState("morning");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailId, setShowDetailId] = useState(null);
  const [form, setForm] = useState({ cat: "morning", title: "", desc: "", tools: "", priority: "normal" });

  const toggleDone = (id) => {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    setDone(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  const addTask = () => {
    if (!form.title.trim()) return;
    const toolArr = form.tools.split(",").map((t) => t.trim()).filter(Boolean);
    setTasks((p) => [...p, { id: Date.now(), cat: form.cat, title: form.title, desc: form.desc, tools: toolArr, priority: form.priority }]);
    setShowAddModal(false);
    setForm({ cat: "morning", title: "", desc: "", tools: "", priority: "normal" });
  };

  const deleteTask = (id) => { setTasks((p) => p.filter((t) => t.id !== id)); setDone((p) => p.filter((x) => x !== id)); };

  const resetDay = () => {
    if (window.confirm("รีเซ็ตการทำเครื่องหมายทั้งหมดของวันนี้?")) {
      setDone([]); try { localStorage.removeItem(storageKey); } catch {}
    }
  };

  const catTasks = tasks.filter((t) => t.cat === activeTab);
  const catDone = catTasks.filter((t) => done.includes(t.id)).length;
  const totalDone = done.length;
  const totalAll = tasks.length;
  const pct = totalAll ? Math.round(totalDone / totalAll * 100) : 0;
  const detailTask = tasks.find((t) => t.id === showDetailId);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div style={{ background: "#F9FAFB", borderRadius: 12, padding: "10px 16px", border: "1px solid #F0F0F0" }}>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6, fontWeight: 500 }}>ความคืบหน้าวันนี้</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 110, height: 8, background: "#E5E7EB", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#16A34A" : BRAND, borderRadius: 20, transition: "width .4s" }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: pct === 100 ? "#16A34A" : "#111" }}>{totalDone}/{totalAll} ({pct}%)</span>
            {pct === 100 && <span style={{ fontSize: 16 }}>🎉</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Btn size="sm" onClick={resetDay}>🔄 รีเซ็ต</Btn>
          <Btn size="sm" variant="primary" onClick={() => setShowAddModal(true)}>+ เพิ่มงาน</Btn>
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {SOP_CATEGORIES.map((c) => {
          const cTasks = tasks.filter((t) => t.cat === c.id);
          const cDone = cTasks.filter((t) => done.includes(t.id)).length;
          const isActive = activeTab === c.id;
          return (
            <button key={c.id} onClick={() => setActiveTab(c.id)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, border: "1px solid", cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                background: isActive ? BRAND : "#fff", color: isActive ? "#fff" : "#374151", borderColor: isActive ? BRAND : "#E5E7EB", fontWeight: isActive ? 700 : 400 }}>
              <span>{c.icon}</span><span>{c.label}</span>
              <span style={{ background: isActive ? "rgba(255,255,255,0.25)" : "#F3F4F6", color: isActive ? "#fff" : "#6B7280", padding: "1px 7px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                {cDone}/{cTasks.length}
              </span>
            </button>
          );
        })}
      </div>

      {(() => {
        const cat = SOP_CATEGORIES.find((c) => c.id === activeTab);
        return (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div><span style={{ fontWeight: 700, fontSize: 15 }}>{cat.icon} {cat.label}</span><span style={{ marginLeft: 10, fontSize: 12, color: "#9CA3AF" }}>⏰ {cat.time}</span></div>
            <span style={{ fontSize: 12, color: "#6B7280" }}>{catDone}/{catTasks.length} เสร็จแล้ว</span>
          </div>
        );
      })()}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {catTasks.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF", background: "#F9FAFB", borderRadius: 14, border: "1px dashed #E5E7EB" }}>
            ยังไม่มีงาน SOP ในหมวดนี้ — กด <strong>+ เพิ่มงาน</strong>
          </div>
        )}
        {catTasks.map((task) => {
          const isDone = done.includes(task.id);
          const pri = PRIORITY_CONFIG[task.priority];
          return (
            <div key={task.id} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 16, borderRadius: 14, border: `1px solid ${isDone ? "#BBF7D0" : "#F0F0F0"}`, background: isDone ? "#F0FFF4" : "#fff", transition: "all .2s" }}>
              <button onClick={() => toggleDone(task.id)}
                style={{ width: 28, height: 28, borderRadius: 9, border: `2px solid ${isDone ? "#16A34A" : "#D1D5DB"}`, background: isDone ? "#16A34A" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", flexShrink: 0, marginTop: 1, transition: "all .2s" }}>
                {isDone ? "✓" : ""}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, textDecoration: isDone ? "line-through" : "none", color: isDone ? "#9CA3AF" : "#111827" }}>{task.title}</span>
                  <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 20, background: pri.bg, color: pri.color, fontWeight: 700 }}>{pri.label}</span>
                </div>
                {task.desc && <div style={{ fontSize: 12, color: "#6B7280", marginBottom: task.tools.length ? 8 : 0, lineHeight: 1.6 }}>{task.desc}</div>}
                {task.tools.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>🧰</span>
                    {task.tools.map((tool) => (
                      <span key={tool} style={{ fontSize: 11, padding: "2px 9px", background: "#F3F4F6", borderRadius: 20, color: "#374151", border: "1px solid #E5E7EB" }}>{tool}</span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <Btn size="sm" onClick={() => setShowDetailId(task.id)}>📋</Btn>
                <Btn size="sm" variant="danger" onClick={() => deleteTask(task.id)}>🗑</Btn>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="➕ เพิ่มงาน SOP"
        footer={[<Btn key="c" onClick={() => setShowAddModal(false)}>ยกเลิก</Btn>, <Btn key="s" variant="primary" onClick={addTask}>บันทึก</Btn>]}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><FieldLabel>หมวดหมู่</FieldLabel>
            <Select value={form.cat} onChange={(v) => setForm({ ...form, cat: v })}>{SOP_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}</Select>
          </div>
          <div><FieldLabel>ความสำคัญ</FieldLabel>
            <Select value={form.priority} onChange={(v) => setForm({ ...form, priority: v })}><option value="high">🔴 สำคัญมาก</option><option value="normal">🟡 ปกติ</option><option value="low">🟢 ทั่วไป</option></Select>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}><FieldLabel>ชื่องาน *</FieldLabel><Input value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="เช่น ทำความสะอาดบาร์กาแฟ" /></div>
        <div style={{ marginBottom: 12 }}>
          <FieldLabel>รายละเอียดขั้นตอน</FieldLabel>
          <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="อธิบายขั้นตอน..." rows={3}
            style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1px solid #D1D5DB", fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
        </div>
        <div><FieldLabel>อุปกรณ์ที่ใช้ (คั่นด้วยจุลภาค)</FieldLabel><Input value={form.tools} onChange={(v) => setForm({ ...form, tools: v })} placeholder="เช่น ผ้าสะอาด, น้ำยาฆ่าเชื้อ" /></div>
      </Modal>

      {detailTask && (
        <Modal open={!!detailTask} onClose={() => setShowDetailId(null)} title={detailTask.title}
          footer={[
            <Btn key="c" onClick={() => setShowDetailId(null)}>ปิด</Btn>,
            <Btn key="t" variant="primary" onClick={() => { toggleDone(detailTask.id); setShowDetailId(null); }} style={{ background: done.includes(detailTask.id) ? "#6B7280" : BRAND }}>
              {done.includes(detailTask.id) ? "↩ ยกเลิกเสร็จ" : "✓ ทำเสร็จแล้ว"}
            </Btn>,
          ]}>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: PRIORITY_CONFIG[detailTask.priority].bg, color: PRIORITY_CONFIG[detailTask.priority].color, fontWeight: 700 }}>
            {PRIORITY_CONFIG[detailTask.priority].label}
          </span>
          {detailTask.desc && (
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, background: "#F9FAFB", borderRadius: 10, padding: 14, marginTop: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#6B7280", marginBottom: 6 }}>📋 ขั้นตอนการทำงาน</div>
              {detailTask.desc}
            </div>
          )}
          {detailTask.tools.length > 0 && (
            <div style={{ background: "#F9FAFB", borderRadius: 10, padding: 14, marginTop: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: "#6B7280", marginBottom: 10 }}>🧰 อุปกรณ์ที่ต้องใช้</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {detailTask.tools.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, fontSize: 12, fontWeight: 500 }}>🔧 {t}</div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", icon: "📊", label: "ภาพรวม" },
  { id: "tables",    icon: "🪑", label: "ระบบโต๊ะ" },
  { id: "pos",       icon: "🧾", label: "POS" },
  { id: "menu",      icon: "☕", label: "เมนู" },
  { id: "stock",     icon: "📦", label: "สต็อก" },
  { id: "report",    icon: "📈", label: "รายงาน" },
  { id: "cashbook",  icon: "💰", label: "รายรับ-จ่าย" },
  { id: "purchase",  icon: "🛒", label: "สั่งซื้อ" },
  { id: "staff",     icon: "👥", label: "พนักงาน" },
  { id: "sop",       icon: "📋", label: "SOP" },
];

const BOTTOM_PRIMARY = NAV.slice(0, 4);
const MORE_NAV = NAV.slice(4);

// ─── GLOBAL CSS ──────────────────────────────────────────
const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; }

  .erp-sidebar {
    width: 180px;
    background: #FAFAFA;
    border-right: 1px solid #F0F0F0;
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    flex-shrink: 0;
    overflow-y: auto;
  }
  .erp-bottomnav {
    display: none;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: #fff;
    border-top: 1px solid #F0F0F0;
    z-index: 100;
    padding: 6px 0 env(safe-area-inset-bottom, 6px);
  }
  .erp-moredrawer {
    display: none;
    position: fixed;
    bottom: 64px; left: 0; right: 0;
    background: #fff;
    border-top: 1px solid #F0F0F0;
    border-radius: 20px 20px 0 0;
    z-index: 99;
    padding: 20px;
    box-shadow: 0 -12px 40px rgba(0,0,0,0.12);
  }
  .erp-moredrawer.open { display: block; }
  .erp-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 98; }
  .erp-overlay.open { display: block; }
  .erp-main-content { padding-bottom: 20px; }

  @media (max-width: 700px) {
    .erp-sidebar { display: none !important; }
    .erp-bottomnav { display: flex !important; }
    .erp-main-content { padding-bottom: 84px !important; }
    .pos-layout { grid-template-columns: 1fr !important; }
    .pos-cart-panel {
      position: fixed !important;
      bottom: 64px; left: 0; right: 0;
      max-height: 48vh !important;
      border-radius: 20px 20px 0 0 !important;
      border: none !important;
      border-top: 1px solid #F0F0F0 !important;
      z-index: 50;
      box-shadow: 0 -8px 32px rgba(0,0,0,0.1);
    }
    .hide-mobile { display: none !important; }
    .metric-grid { grid-template-columns: 1fr 1fr !important; }
    table { font-size: 12px !important; }
    th, td { padding: 7px 8px !important; }
  }
  @media (min-width: 701px) {
    .erp-bottomnav { display: none !important; }
    .erp-sidebar { display: flex !important; }
  }
`;

// ─── APP ─────────────────────────────────────────────────
// ─── localStorage helpers ─────────────────────────────────
function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // restore Date objects for orders and cashbook
    if (key === "cafe_orders" || key === "cafe_cashbook") {
      return parsed.map((item) => ({ ...item, time: new Date(item.time) }));
    }
    return parsed;
  } catch { return fallback; }
}

function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function usePersist(key, initial) {
  const [state, setState] = useState(() => loadLS(key, initial));
  const setPersist = useCallback((val) => {
    setState((prev) => {
      const next = typeof val === "function" ? val(prev) : val;
      saveLS(key, next);
      return next;
    });
  }, [key]);
  return [state, setPersist];
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [menus, setMenus] = usePersist("cafe_menus", INITIAL_MENUS);
  const [tables, setTables] = usePersist("cafe_tables", INITIAL_TABLES);
  const [stocks, setStocks] = usePersist("cafe_stocks", INITIAL_STOCKS);
  const [staffs, setStaffs] = usePersist("cafe_staffs", INITIAL_STAFF);
  const [orders, setOrders] = usePersist("cafe_orders", SEED_ORDERS);
  const [cashbook, setCashbook] = usePersist("cafe_cashbook", [
    { id: 1, type: "income", cat: "ขายกาแฟ", desc: "ยอดขายเปิดร้านเช้า", amount: 150000, time: new Date(Date.now() - 7200000) },
    { id: 2, type: "expense", cat: "วัตถุดิบ", desc: "ซื้อเมล็ดกาแฟ", amount: 80000, time: new Date(Date.now() - 5400000) },
    { id: 3, type: "expense", cat: "ค่าแรง", desc: "ค่าจ้างพนักงานรายวัน", amount: 50000, time: new Date(Date.now() - 3600000) },
  ]);
  const [purchaseOrders, setPurchaseOrders] = usePersist("cafe_purchase_orders", []);
  const [posTableId, setPosTableId] = useState(null);
  const [showMoreDrawer, setShowMoreDrawer] = useState(false);

  const goToPOS = useCallback((tableId) => { setPosTableId(tableId); setPage("pos"); }, []);
  const navigate = (id) => { setPage(id); setShowMoreDrawer(false); };

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: 0, border: "1px solid #F0F0F0", borderRadius: 18, overflow: "hidden", fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif", background: "#fff", position: "relative" }}>
      <style>{GLOBAL_CSS}</style>

      {/* Sidebar */}
      <div className="erp-sidebar">
        <div style={{ padding: "2px 16px 18px", borderBottom: "1px solid #F0F0F0", marginBottom: 10 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#111827" }}>☕ CaféERP</div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>ระบบจัดการร้านกาแฟ</div>
        </div>
        {NAV.map((n) => (
          <div key={n.id} onClick={() => navigate(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", cursor: "pointer", fontSize: 13,
              background: page === n.id ? "#fff" : "transparent",
              color: page === n.id ? "#111827" : "#6B7280",
              fontWeight: page === n.id ? 700 : 400,
              borderLeft: page === n.id ? `3px solid ${BRAND}` : "3px solid transparent",
              borderRadius: page === n.id ? "0 8px 8px 0" : 0,
              transition: "all .15s", marginRight: 8 }}>
            <span style={{ fontSize: 16 }}>{n.icon}</span>{n.label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Header */}
        <div style={{ padding: "12px 18px", borderBottom: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", flexShrink: 0 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#111827" }}>{NAV.find((n) => n.id === page)?.label}</h2>
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>{new Date().toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>

        {/* Body */}
        <div className="erp-main-content" style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {page === "dashboard" && <Dashboard orders={orders} tables={tables} stocks={stocks} />}
          {page === "tables"    && <Tables tables={tables} setTables={setTables} onGoToPOS={goToPOS} />}
          {page === "pos"       && <POS menus={menus} tables={tables} orders={orders} setOrders={setOrders} initialTableId={posTableId} setInitialTableId={setPosTableId} />}
          {page === "menu"      && <MenuPage menus={menus} setMenus={setMenus} />}
          {page === "stock"     && <StockPage stocks={stocks} setStocks={setStocks} />}
          {page === "report"    && <Report orders={orders} tables={tables} />}
          {page === "cashbook"  && <CashBook cashbook={cashbook} setCashbook={setCashbook} orders={orders} />}
          {page === "purchase"  && <PurchasePage stocks={stocks} setStocks={setStocks} purchaseOrders={purchaseOrders} setPurchaseOrders={setPurchaseOrders} />}
          {page === "staff"     && <Staff staffs={staffs} setStaffs={setStaffs} />}
          {page === "sop"       && <SOPPage />}
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="erp-bottomnav">
        {BOTTOM_PRIMARY.map((n) => (
          <button key={n.id} onClick={() => navigate(n.id)}
            style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "6px 4px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: page === n.id ? BRAND : "#9CA3AF", fontFamily: "inherit" }}>
            <span style={{ fontSize: 21 }}>{n.icon}</span>
            <span style={{ fontSize: 10, fontWeight: page === n.id ? 800 : 400 }}>{n.label}</span>
            {page === n.id && <span style={{ width: 18, height: 3, borderRadius: 2, background: BRAND, marginTop: 1 }} />}
          </button>
        ))}
        <button onClick={() => setShowMoreDrawer((v) => !v)}
          style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "6px 4px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: showMoreDrawer ? BRAND : "#9CA3AF", fontFamily: "inherit" }}>
          <span style={{ fontSize: 21 }}>☰</span>
          <span style={{ fontSize: 10, fontWeight: showMoreDrawer ? 800 : 400 }}>เพิ่มเติม</span>
        </button>
      </nav>

      {/* More drawer */}
      <div className={`erp-overlay${showMoreDrawer ? " open" : ""}`} onClick={() => setShowMoreDrawer(false)} />
      <div className={`erp-moredrawer${showMoreDrawer ? " open" : ""}`}>
        <div style={{ fontWeight: 700, fontSize: 12, color: "#9CA3AF", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>เมนูทั้งหมด</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {MORE_NAV.map((n) => (
            <button key={n.id} onClick={() => navigate(n.id)}
              style={{ background: page === n.id ? "#D8F3DC" : "#F9FAFB", border: `1.5px solid ${page === n.id ? BRAND : "#F0F0F0"}`,
                borderRadius: 14, padding: "14px 8px", cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 7, fontFamily: "inherit", color: page === n.id ? BRAND : "#374151" }}>
              <span style={{ fontSize: 24 }}>{n.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, textAlign: "center" }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
