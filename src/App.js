/* eslint-disable */
import { useState, useCallback } from "react";

const BRAND = "#2D6A4F";
const BRAND_LIGHT = "#52B788"; // eslint-disable-line no-unused-vars

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

// ────────────────────────────────────────────────────────
// SOP DATA
// ────────────────────────────────────────────────────────
const SOP_CATEGORIES = [
  { id: "morning", label: "เปิดร้าน (เช้า)", icon: "🌅", time: "07:00–08:30" },
  { id: "daily", label: "ระหว่างวัน", icon: "☀️", time: "ทุก 2 ชั่วโมง" },
  { id: "cleaning", label: "ทำความสะอาด", icon: "🧹", time: "ตลอดวัน" },
  { id: "equipment", label: "อุปกรณ์บาร์", icon: "⚙️", time: "เช้า/เย็น" },
  { id: "closing", label: "ปิดร้าน (เย็น)", icon: "🌙", time: "19:00–20:00" },
];

const INITIAL_SOP_TASKS = [
  // เปิดร้าน
  { id: 1, cat: "morning", title: "ล้างมือก่อนเริ่มงาน", desc: "สบู่ + น้ำอุ่น อย่างน้อย 20 วินาที", tools: ["สบู่", "น้ำ"], priority: "high" },
  { id: 2, cat: "morning", title: "เปิดไฟ / แอร์ / เพลง", desc: "ตรวจสอบว่าระบบไฟฟ้าทำงานปกติ", tools: [], priority: "normal" },
  { id: 3, cat: "morning", title: "ทำความสะอาดโต๊ะและเก้าอี้", desc: "เช็ดด้วยผ้าชุบน้ำยาฆ่าเชื้อทุกโต๊ะ ทุกเก้าอี้", tools: ["ผ้าสะอาด", "น้ำยาฆ่าเชื้อ", "ถังน้ำ"], priority: "high" },
  { id: 4, cat: "morning", title: "กวาด/ถูพื้นห้อง", desc: "กวาดก่อน จากหน้าไปหลัง จากนั้นถูด้วยน้ำยาทำความสะอาด", tools: ["ไม้กวาด", "ไม้ถู", "น้ำยาถูพื้น", "ถังน้ำ"], priority: "high" },
  { id: 5, cat: "morning", title: "ทำความสะอาดห้องน้ำ", desc: "ขัดชักโครก อ่างล้างมือ กระจก เช็ดพื้น เติมสบู่/กระดาษ", tools: ["น้ำยาล้างห้องน้ำ", "แปรงขัด", "ผ้าถู", "ยางปาดน้ำ", "ถุงมือ"], priority: "high" },
  { id: 6, cat: "morning", title: "เตรียมเครื่องชงกาแฟ", desc: "ล้างหัวชงด้วยน้ำร้อน backflush และอุ่นเครื่อง 15 นาที", tools: ["เครื่องชงกาแฟ", "น้ำสะอาด", "ผ้าไมโครไฟเบอร์"], priority: "high" },
  { id: 7, cat: "morning", title: "เช็คสต็อกวัตถุดิบ", desc: "ตรวจนับเมล็ดกาแฟ นม น้ำตาล และวัตถุดิบอื่นๆ บันทึกในระบบ", tools: ["สมุดบันทึก", "ปากกา"], priority: "normal" },
  { id: 8, cat: "morning", title: "จัดเตรียมแก้ว/ถาด/ช้อน", desc: "จัดวางให้เป็นระเบียบ เช็คความสะอาดก่อนนำมาใช้", tools: ["แก้ว", "ถาด", "ช้อนชา"], priority: "normal" },

  // ระหว่างวัน
  { id: 9, cat: "daily", title: "เช็ดโต๊ะหลังลูกค้าลุก", desc: "เช็ดโต๊ะทันทีหลังลูกค้าออก เก็บขยะ จัดเก้าอี้ให้เรียบร้อย", tools: ["ผ้าสะอาด", "น้ำยาฆ่าเชื้อ"], priority: "high" },
  { id: 10, cat: "daily", title: "ตรวจสอบห้องน้ำทุก 2 ชม.", desc: "เช็คความสะอาด เติมกระดาษชำระ เติมสบู่ล้างมือ", tools: ["กระดาษชำระ", "สบู่", "น้ำยาอเนกประสงค์"], priority: "normal" },
  { id: 11, cat: "daily", title: "เก็บถาดและแก้วที่ใช้แล้ว", desc: "เก็บล้างทันที อย่าปล่อยทิ้งไว้บนบาร์นาน", tools: ["ถาดเก็บแก้ว"], priority: "normal" },
  { id: 12, cat: "daily", title: "เช็คหน้าร้านและทางเดิน", desc: "กวาดหน้าร้าน จัดป้าย เช็คความเป็นระเบียบ", tools: ["ไม้กวาด"], priority: "low" },

  // ทำความสะอาด
  { id: 13, cat: "cleaning", title: "ล้างแก้วและภาชนะ", desc: "แยกล้างแก้ว จาน ช้อน ด้วยน้ำยาล้างจาน ล้างน้ำสะอาด 2 รอบ", tools: ["น้ำยาล้างจาน", "ฟองน้ำ", "ถังน้ำ", "ผ้าเช็ด"], priority: "high" },
  { id: 14, cat: "cleaning", title: "ทำความสะอาดบาร์กาแฟ", desc: "เช็ดพื้นผิวบาร์ ทำความสะอาดบริเวณรอบเครื่องชง เช็ดคราบกาแฟ", tools: ["ผ้าไมโครไฟเบอร์", "น้ำยาทำความสะอาด", "สเปรย์"], priority: "high" },
  { id: 15, cat: "cleaning", title: "ถูพื้นห้องน้ำรอบที่ 2", desc: "ช่วงบ่าย 2 โมง ถูพื้นห้องน้ำอีกครั้ง พร้อมเช็ดอ่างล้างมือ", tools: ["ไม้ถู", "น้ำยาล้างห้องน้ำ", "ถุงมือ"], priority: "normal" },
  { id: 16, cat: "cleaning", title: "ดูดฝุ่นโซฟา/เบาะ (ถ้ามี)", desc: "ดูดฝุ่นทุกวัน เพื่อสุขอนามัยลูกค้า", tools: ["เครื่องดูดฝุ่น"], priority: "low" },
  { id: 17, cat: "cleaning", title: "เช็ดกระจกและหน้าต่าง", desc: "สัปดาห์ละ 2 ครั้ง ใช้น้ำยาเช็ดกระจก เช็ดตามแนวนอน", tools: ["น้ำยาเช็ดกระจก", "ผ้าไมโครไฟเบอร์", "ยางปาด"], priority: "low" },

  // อุปกรณ์บาร์
  { id: 18, cat: "equipment", title: "ทำความสะอาดหัวชงกาแฟ", desc: "Backflush ทุกเช้าและเย็น ล้างหัวชงด้วยน้ำร้อน", tools: ["ผงล้างเครื่องชง", "แปรงขนาดเล็ก", "ผ้าสะอาด"], priority: "high" },
  { id: 19, cat: "equipment", title: "ล้างถาดรองหยด (Drip Tray)", desc: "ถอดล้างทุกวัน ป้องกันคราบและกลิ่น", tools: ["น้ำยาล้างจาน", "ฟองน้ำ"], priority: "high" },
  { id: 20, cat: "equipment", title: "เช็ดหัวทำโฟมนม (Steam Wand)", desc: "เช็ดด้วยผ้าชื้นทันทีหลังใช้ทุกครั้ง และ purge ก่อน/หลังใช้", tools: ["ผ้าไมโครไฟเบอร์"], priority: "high" },
  { id: 21, cat: "equipment", title: "ล้างและเช็คเครื่องบด", desc: "ปัดเศษกาแฟออก เช็ดบริเวณโดยรอบ ตรวจสอบความละเอียดบด", tools: ["แปรงปัดกาแฟ", "ผ้าแห้ง"], priority: "normal" },
  { id: 22, cat: "equipment", title: "ตรวจสอบตู้เย็น/เครื่องทำน้ำแข็ง", desc: "เช็คอุณหภูมิ ทำความสะอาดภายใน เช็คของหมดอายุ", tools: ["เทอร์โมมิเตอร์", "ผ้าสะอาด"], priority: "normal" },

  // ปิดร้าน
  { id: 23, cat: "closing", title: "ถูพื้นห้องรอบสุดท้าย", desc: "กวาดและถูพื้นทั้งร้าน รวมถึงบริเวณบาร์และห้องน้ำ", tools: ["ไม้กวาด", "ไม้ถู", "น้ำยาถูพื้น"], priority: "high" },
  { id: 24, cat: "closing", title: "ล้างทำความสะอาดเครื่องชงกาแฟ", desc: "Backflush เต็มรูปแบบ ล้างหัวกรุ๊ป ถอดล้างถาดรอง", tools: ["ผงล้างเครื่องชง", "แปรง", "ผ้า"], priority: "high" },
  { id: 25, cat: "closing", title: "ล้างแก้วและภาชนะทั้งหมด", desc: "ล้างให้สะอาดทุกชิ้น คว่ำตากให้แห้ง เก็บเข้าที่", tools: ["น้ำยาล้างจาน", "ฟองน้ำ", "ผ้าเช็ด"], priority: "high" },
  { id: 26, cat: "closing", title: "เช็ดและจัดโต๊ะ/เก้าอี้", desc: "เช็ดโต๊ะทุกตัว จัดเก้าอี้ให้เรียบร้อย พร้อมเปิดวันพรุ่งนี้", tools: ["ผ้า", "น้ำยาฆ่าเชื้อ"], priority: "high" },
  { id: 27, cat: "closing", title: "เทขยะและล้างถัง", desc: "เทขยะทุกถัง ใส่ถุงใหม่ ล้างถังขยะสัปดาห์ละครั้ง", tools: ["ถุงขยะ", "น้ำยาล้างถัง"], priority: "normal" },
  { id: 28, cat: "closing", title: "ตรวจเช็คแก๊ส/ไฟ/น้ำ/แอร์", desc: "ปิดแก๊ส ปิดน้ำ ปิดแอร์ ปิดไฟทุกจุดก่อนออก", tools: [], priority: "high" },
  { id: 29, cat: "closing", title: "บันทึกยอดขายและสต็อกสิ้นวัน", desc: "กรอกยอดขาย สต็อกที่ใช้ไป และรายงานปัญหาที่พบ", tools: ["สมุดบันทึก", "ปากกา"], priority: "normal" },
];

const PRIORITY_CONFIG = {
  high: { label: "สำคัญมาก", color: "#DC2626", bg: "#FEE2E2" },
  normal: { label: "ปกติ", color: "#D97706", bg: "#FEF3C7" },
  low: { label: "ทั่วไป", color: "#2D6A4F", bg: "#D8F3DC" },
};

// ────────────────────────────────────────────────────────
// SOP PAGE
// ────────────────────────────────────────────────────────
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

  const deleteTask = (id) => {
    setTasks((p) => p.filter((t) => t.id !== id));
    setDone((p) => p.filter((x) => x !== id));
  };

  const resetDay = () => {
    if (window.confirm("รีเซ็ตการทำเครื่องหมายทั้งหมดของวันนี้?")) {
      setDone([]);
      try { localStorage.removeItem(storageKey); } catch {}
    }
  };

  const printSOP = () => {
    const cat = SOP_CATEGORIES.find((c) => c.id === activeTab);
    const catTasks = tasks.filter((t) => t.cat === activeTab);
    const w = window.open("", "_blank", "width=700,height=800");
    w.document.write(`<html><head><title>SOP — ${cat.label}</title>
<style>body{font-family:sans-serif;font-size:13px;padding:28px;color:#111}
h2{font-size:18px;margin-bottom:4px}p.sub{color:#666;font-size:12px;margin:0 0 20px}
.task{border:1px solid #E5E7EB;border-radius:8px;padding:14px;margin-bottom:12px;page-break-inside:avoid}
.task-title{font-weight:700;font-size:14px;margin-bottom:4px;display:flex;align-items:center;gap:8px}
.check{width:18px;height:18px;border:2px solid #D1D5DB;border-radius:4px;display:inline-block;flex-shrink:0}
.task-desc{color:#6B7280;font-size:12px;margin-bottom:8px}
.tools{font-size:11px;color:#374151;background:#F9FAFB;padding:6px 10px;border-radius:6px}
.tools strong{display:block;margin-bottom:3px}
@media print{body{padding:0}.no-print{display:none}}</style></head>
<body>
<h2>☕ CaféERP — SOP ${cat.icon} ${cat.label}</h2>
<p class="sub">พิมพ์วันที่ ${new Date().toLocaleDateString("th-TH")} · เวลา ${cat.time} · ${catTasks.length} งาน</p>
${catTasks.map((t, i) => `
<div class="task">
  <div class="task-title"><span class="check"></span> ${i + 1}. ${t.title}</div>
  ${t.desc ? `<div class="task-desc">${t.desc}</div>` : ""}
  ${t.tools.length ? `<div class="tools"><strong>🧰 อุปกรณ์:</strong>${t.tools.join(" · ")}</div>` : ""}
</div>`).join("")}
<script>window.print();window.close();</script></body></html>`);
    w.document.close();
  };

  const catTasks = tasks.filter((t) => t.cat === activeTab);
  const catDone = catTasks.filter((t) => done.includes(t.id)).length;
  const totalDone = done.length;
  const totalAll = tasks.length;
  const pct = totalAll ? Math.round(totalDone / totalAll * 100) : 0;
  const detailTask = tasks.find((t) => t.id === showDetailId);

  return (
    <div>
      {/* Header summary */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#F9FAFB", borderRadius: 12, padding: "10px 16px", border: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 11, color: "#6B7280" }}>ความคืบหน้าวันนี้</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <div style={{ width: 120, height: 8, background: "#E5E7EB", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#16A34A" : BRAND, borderRadius: 20, transition: "width .4s" }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? "#16A34A" : "#111827" }}>{totalDone}/{totalAll} ({pct}%)</span>
              {pct === 100 && <span style={{ fontSize: 16 }}>🎉</span>}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={resetDay} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#F9FAFB", color: "#6B7280", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>🔄 รีเซ็ตวัน</button>
          <button onClick={printSOP} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#F9FAFB", color: "#374151", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>🖨 พิมพ์ checklist</button>
          <button onClick={() => setShowAddModal(true)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: BRAND, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>+ เพิ่มงาน SOP</button>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {SOP_CATEGORIES.map((c) => {
          const cTasks = tasks.filter((t) => t.cat === c.id);
          const cDone = cTasks.filter((t) => done.includes(t.id)).length;
          const isActive = activeTab === c.id;
          return (
            <button key={c.id} onClick={() => setActiveTab(c.id)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 10, border: "1px solid", cursor: "pointer", fontSize: 12, fontFamily: "inherit", transition: "all .15s",
                background: isActive ? BRAND : "#fff", color: isActive ? "#fff" : "#374151", borderColor: isActive ? BRAND : "#E5E7EB" }}>
              <span>{c.icon}</span>
              <span>{c.label}</span>
              <span style={{ background: isActive ? "rgba(255,255,255,0.25)" : (cDone === cTasks.length && cTasks.length > 0 ? "#D8F3DC" : "#F3F4F6"),
                color: isActive ? "#fff" : (cDone === cTasks.length && cTasks.length > 0 ? "#1B4332" : "#6B7280"),
                padding: "1px 7px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                {cDone}/{cTasks.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Current category header */}
      {(() => {
        const cat = SOP_CATEGORIES.find((c) => c.id === activeTab);
        return (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{cat.icon} {cat.label}</span>
              <span style={{ marginLeft: 10, fontSize: 12, color: "#9CA3AF" }}>⏰ {cat.time}</span>
            </div>
            <span style={{ fontSize: 12, color: "#6B7280" }}>{catDone}/{catTasks.length} เสร็จแล้ว</span>
          </div>
        );
      })()}

      {/* Task list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {catTasks.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF", background: "#F9FAFB", borderRadius: 14, border: "1px dashed #E5E7EB" }}>
            ยังไม่มีงาน SOP ในหมวดนี้ — กด <strong>+ เพิ่มงาน SOP</strong> เพื่อเริ่ม
          </div>
        )}
        {catTasks.map((task) => {
          const isDone = done.includes(task.id);
          const pri = PRIORITY_CONFIG[task.priority];
          return (
            <div key={task.id}
              style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 16, borderRadius: 14, border: `1px solid ${isDone ? "#BBF7D0" : "#E5E7EB"}`,
                background: isDone ? "#F0FFF4" : "#fff", transition: "all .2s" }}>
              {/* Checkbox */}
              <button onClick={() => toggleDone(task.id)}
                style={{ width: 26, height: 26, borderRadius: 8, border: `2px solid ${isDone ? "#16A34A" : "#D1D5DB"}`,
                  background: isDone ? "#16A34A" : "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: "#fff", flexShrink: 0, marginTop: 1, transition: "all .2s" }}>
                {isDone ? "✓" : ""}
              </button>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, textDecoration: isDone ? "line-through" : "none", color: isDone ? "#6B7280" : "#111827" }}>
                    {task.title}
                  </span>
                  <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 20, background: pri.bg, color: pri.color, fontWeight: 600 }}>
                    {pri.label}
                  </span>
                </div>
                {task.desc && (
                  <div style={{ fontSize: 12, color: "#6B7280", marginBottom: task.tools.length ? 8 : 0, lineHeight: 1.6 }}>{task.desc}</div>
                )}
                {task.tools.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>🧰 อุปกรณ์:</span>
                    {task.tools.map((tool) => (
                      <span key={tool} style={{ fontSize: 11, padding: "2px 9px", background: "#F3F4F6", borderRadius: 20, color: "#374151", border: "1px solid #E5E7EB" }}>{tool}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => setShowDetailId(task.id)}
                  style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>📋</button>
                <button onClick={() => deleteTask(task.id)}
                  style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid #FEE2E2", background: "#FEF2F2", cursor: "pointer", fontSize: 12, fontFamily: "inherit", color: "#DC2626" }}>🗑</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: 24, width: 440, maxWidth: "94vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>➕ เพิ่มงาน SOP</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#9CA3AF" }}>×</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>หมวดหมู่</label>
                <select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff", fontFamily: "inherit" }}>
                  {SOP_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>ความสำคัญ</label>
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff", fontFamily: "inherit" }}>
                  <option value="high">🔴 สำคัญมาก</option>
                  <option value="normal">🟡 ปกติ</option>
                  <option value="low">🟢 ทั่วไป</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>ชื่องาน *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="เช่น ทำความสะอาดบาร์กาแฟ"
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>รายละเอียดขั้นตอน</label>
              <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="อธิบายขั้นตอนการทำงาน..." rows={3}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>อุปกรณ์ที่ใช้ (คั่นด้วยจุลภาค)</label>
              <input value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })} placeholder="เช่น ผ้าสะอาด, น้ำยาฆ่าเชื้อ, ถุงมือ"
                style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>ยกเลิก</button>
              <button onClick={addTask} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: BRAND, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>บันทึก</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailTask && (
        <div onClick={(e) => e.target === e.currentTarget && setShowDetailId(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: 24, width: 420, maxWidth: "94vw", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: PRIORITY_CONFIG[detailTask.priority].bg, color: PRIORITY_CONFIG[detailTask.priority].color, fontWeight: 600 }}>
                {PRIORITY_CONFIG[detailTask.priority].label}
              </span>
              <button onClick={() => setShowDetailId(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#9CA3AF" }}>×</button>
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 16, margin: "10px 0 12px" }}>{detailTask.title}</h3>
            {detailTask.desc && (
              <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, background: "#F9FAFB", borderRadius: 10, padding: 14, marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 11, color: "#6B7280", marginBottom: 6 }}>📋 ขั้นตอนการทำงาน</div>
                {detailTask.desc}
              </div>
            )}
            {detailTask.tools.length > 0 && (
              <div style={{ background: "#F9FAFB", borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 11, color: "#6B7280", marginBottom: 10 }}>🧰 อุปกรณ์ที่ต้องใช้</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {detailTask.tools.map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
                      🔧 {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setShowDetailId(null)} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>ปิด</button>
              <button onClick={() => { toggleDone(detailTask.id); setShowDetailId(null); }}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: done.includes(detailTask.id) ? "#6B7280" : BRAND, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>
                {done.includes(detailTask.id) ? "↩ ยกเลิกเสร็จ" : "✓ ทำเสร็จแล้ว"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const AVATAR_COLORS = [
  { bg: "#D8F3DC", fg: "#1B4332" },
  { bg: "#EDE9FE", fg: "#3B1D8A" },
  { bg: "#FEF3C7", fg: "#78350F" },
  { bg: "#DBEAFE", fg: "#1E3A5F" },
  { bg: "#FCE7F3", fg: "#831843" },
];

const statusConfig = {
  free: { label: "ว่าง", bg: "#F0FFF4", border: "#68D391", text: "#276749" },
  occupied: { label: "มีลูกค้า", bg: "#EBF8FF", border: "#63B3ED", text: "#2C5282" },
  reserved: { label: "จอง", bg: "#FFFBEB", border: "#F6AD55", text: "#744210" },
};

function isToday(d) {
  const t = new Date();
  return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
}

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
  if (!open) return null;
  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: 24, width: 400, maxWidth: "94vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#9CA3AF", lineHeight: 1 }}>×</button>
        </div>
        {children}
        {footer && <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>{footer}</div>}
      </div>
    </div>
  );
}

function Btn({ onClick, variant = "secondary", size = "md", children, style = {} }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", borderRadius: 8, fontWeight: 500, transition: "all .15s", border: "none", fontFamily: "inherit" };
  const sizes = { sm: { padding: "5px 12px", fontSize: 12 }, md: { padding: "8px 16px", fontSize: 13 } };
  const variants = {
    primary: { background: BRAND, color: "#fff" },
    secondary: { background: "#F9FAFB", color: "#374151", border: "1px solid #E5E7EB" },
    danger: { background: "#FEE2E2", color: "#7F1D1D" },
  };
  return <button onClick={onClick} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>{children}</button>;
}

function Input({ value, onChange, placeholder, type = "text", style = {} }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type}
      style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box", ...style }} />
  );
}

function Select({ value, onChange, children, style = {} }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, outline: "none", background: "#fff", fontFamily: "inherit", boxSizing: "border-box", ...style }}>
      {children}
    </select>
  );
}

function MetricCard({ label, value, sub }) {
  return (
    <div style={{ background: "#F9FAFB", borderRadius: 12, padding: "14px 16px", border: "1px solid #F3F4F6" }}>
      <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

// ────────────────────────────────────────────────────────
// PAGES
// ────────────────────────────────────────────────────────

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
        <MetricCard label="ยอดขายวันนี้" value={`₭${rev.toLocaleString()}`} sub={`${todayOrders.length} ออเดอร์`} />
        <MetricCard label="โต๊ะที่ใช้งาน" value={occupied} sub={`จาก ${tables.length} โต๊ะ`} />
        <MetricCard label="เมนูยอดนิยม" value={top ? top[0] : "-"} sub={`${top ? top[1] : 0} แก้ว`} />
        <MetricCard label="สต็อกใกล้หมด" value={lowStock} sub="รายการ" />
      </div>
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 12 }}>ออเดอร์ล่าสุด</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["ออเดอร์","โต๊ะ","รายการ","ราคา","สถานะ"].map((h) => (
            <th key={h} style={{ textAlign: "left", padding: "7px 8px", fontSize: 11, fontWeight: 600, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6" }}>{h}</th>
          ))}</tr></thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: 20, color: "#9CA3AF" }}>ยังไม่มีออเดอร์</td></tr>
            ) : [...orders].reverse().slice(0, 6).map((o) => {
              const tbl = tables.find((t) => t.id === o.tableId);
              const names = o.items.map((i) => i.name + (i.qty > 1 ? ` ×${i.qty}` : "")).join(", ");
              return (
                <tr key={o.id}>
                  <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>#{o.id}</td>
                  <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB" }}>{tbl ? `โต๊ะ ${tbl.num}` : "-"}</td>
                  <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{names}</td>
                  <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB" }}>₭{o.total}</td>
                  <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB" }}><Badge type="green">สำเร็จ</Badge></td>
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
    if (!form.num) return;
    setTables((prev) => [...prev, { id: Date.now(), num: form.num, seats: parseInt(form.seats) || 4, status: form.status }]);
    setShowAdd(false);
    setForm({ num: "", seats: "4", status: "free" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {Object.entries(statusConfig).map(([k, v]) => (
            <span key={k} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, background: v.bg, color: v.text, border: `1px solid ${v.border}` }}>● {v.label}</span>
          ))}
        </div>
        <Btn onClick={() => setShowAdd(true)} variant="primary" size="sm">+ เพิ่มโต๊ะ</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 12 }}>
        {tables.map((t) => {
          const cfg = statusConfig[t.status];
          return (
            <div key={t.id} onClick={() => handleAction(t)}
              style={{ borderRadius: 16, padding: "18px 14px", cursor: "pointer", textAlign: "center", background: cfg.bg, border: `1.5px solid ${cfg.border}`, transition: "transform .15s" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = ""}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🪑</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>โต๊ะ {t.num}</div>
              <div style={{ fontSize: 11, color: cfg.text, marginTop: 4 }}>{cfg.label}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{t.seats} ที่นั่ง</div>
            </div>
          );
        })}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="เพิ่มโต๊ะ"
        footer={[<Btn key="c" onClick={() => setShowAdd(false)}>ยกเลิก</Btn>, <Btn key="s" variant="primary" onClick={handleAdd}>บันทึก</Btn>]}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>หมายเลขโต๊ะ</label>
            <Input value={form.num} onChange={(v) => setForm({ ...form, num: v })} placeholder="เช่น 7" /></div>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>จำนวนที่นั่ง</label>
            <Input value={form.seats} onChange={(v) => setForm({ ...form, seats: v })} type="number" placeholder="4" /></div>
        </div>
        <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>สถานะเริ่มต้น</label>
          <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })}>
            <option value="free">ว่าง</option><option value="occupied">มีลูกค้า</option><option value="reserved">จอง</option>
          </Select></div>
      </Modal>
    </div>
  );
}

function POS({ menus, tables, orders, setOrders, initialTableId, setInitialTableId }) {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(initialTableId || null);
  const [activeCat, setActiveCat] = useState("ทั้งหมด");
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

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

  const checkout = () => {
    if (!currentOrder.length) return;
    const ord = { id: Math.floor(Math.random() * 90000) + 10000, tableId: selectedTableId, items: currentOrder.map((i) => ({ ...i })), total: grand, time: new Date() };
    setOrders((prev) => [...prev, ord]);
    setLastOrder(ord);
    setCurrentOrder([]);
    setReceiptOpen(true);
  };

  const tbl = selectedTableId ? tables.find((t) => t.id === selectedTableId) : null;

  const printReceipt = (ord) => {
    const t = tables.find((t) => t.id === ord.tableId);
    const s = ord.items.reduce((x, i) => x + i.price * i.qty, 0);
    const v = ord.total - s;
    const w = window.open("", "_blank", "width=380,height=640");
    w.document.write(`<html><head><title>ใบเสร็จ #${ord.id}</title>
<style>body{font-family:monospace;font-size:13px;line-height:2;padding:24px;max-width:300px;margin:auto}
h2{text-align:center;font-size:16px;margin-bottom:2px}p.sub{text-align:center;color:#666;font-size:11px;margin:0 0 8px}
hr{border:none;border-top:1px dashed #ccc;margin:10px 0}
.row{display:flex;justify-content:space-between}.total{font-weight:bold;font-size:15px}
.center{text-align:center;color:#666;font-size:11px;margin-top:8px}</style></head>
<body><h2>☕ CaféERP</h2><p class="sub">ใบเสร็จรับเงิน</p><hr>
<div class="row"><span>ออเดอร์</span><span>#${ord.id}</span></div>
<div class="row"><span>โต๊ะ</span><span>${t ? "โต๊ะ " + t.num : "ไม่ระบุ"}</span></div>
<div class="row"><span>วันที่</span><span>${ord.time.toLocaleDateString("th-TH")}</span></div>
<div class="row"><span>เวลา</span><span>${ord.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</span></div>
<hr>${ord.items.map((i) => `<div class="row"><span>${i.name} ×${i.qty}</span><span>₭${i.price * i.qty}</span></div>`).join("")}
<hr><div class="row"><span>ยอดรวม</span><span>₭${s}</span></div>
<div class="row"><span>VAT 7%</span><span>₭${v}</span></div><hr>
<div class="row total"><span>ยอดสุทธิ</span><span>₭${ord.total}</span></div>
<div class="center">ขอบคุณที่ใช้บริการ 🙏</div>
<script>window.print();window.close();</script></body></html>`);
    w.document.close();
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
      <div>
        <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#6B7280" }}>โต๊ะ:</span>
          <select value={selectedTableId || ""} onChange={(e) => setSelectedTableId(e.target.value ? parseInt(e.target.value) : null)}
            style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, background: "#fff", fontFamily: "inherit" }}>
            <option value="">-- ไม่ระบุโต๊ะ --</option>
            {tables.map((t) => <option key={t.id} value={t.id}>โต๊ะ {t.num} ({statusConfig[t.status].label})</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setActiveCat(c)}
              style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid", fontSize: 12, cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                background: activeCat === c ? BRAND : "transparent", color: activeCat === c ? "#fff" : "#6B7280", borderColor: activeCat === c ? BRAND : "#E5E7EB" }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10 }}>
          {filtered.map((m) => (
            <div key={m.id} onClick={() => add(m.id)}
              style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 14, cursor: "pointer", background: "#fff", transition: "border-color .15s" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = BRAND_LIGHT}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#E5E7EB"}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>{m.cat}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: BRAND }}>₭{m.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#F9FAFB", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 110px)", position: "sticky", top: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>ออเดอร์ {tbl ? <span style={{ fontWeight: 400, fontSize: 12, color: "#6B7280" }}>— โต๊ะ {tbl.num}</span> : <span style={{ fontWeight: 400, fontSize: 12, color: "#9CA3AF" }}>— ไม่ระบุโต๊ะ</span>}</div>
        <div style={{ flex: 1, overflowY: "auto", margin: "12px 0", minHeight: 60 }}>
          {currentOrder.length === 0 ? <div style={{ color: "#9CA3AF", fontSize: 12, textAlign: "center", padding: 20 }}>เพิ่มเมนูจากซ้าย</div>
            : currentOrder.map((it) => (
              <div key={it.id} style={{ display: "flex", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #E5E7EB" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{it.name}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>₭{it.price} × {it.qty}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 8 }}>
                  <button onClick={() => changeQty(it.id, -1)} style={{ width: 22, height: 22, borderRadius: "50%", border: "1px solid #D1D5DB", background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ minWidth: 16, textAlign: "center", fontSize: 13 }}>{it.qty}</span>
                  <button onClick={() => changeQty(it.id, 1)} style={{ width: 22, height: 22, borderRadius: "50%", border: "1px solid #D1D5DB", background: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, minWidth: 44, textAlign: "right" }}>₭{it.price * it.qty}</div>
              </div>
            ))}
        </div>
        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 14 }}>
          {[["ยอดรวม", `₭${sub}`], ["VAT 7%", `₭${vat}`]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginBottom: 5 }}><span>{k}</span><span>{v}</span></div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, margin: "8px 0 14px" }}><span>ยอดสุทธิ</span><span style={{ color: BRAND }}>₭{grand}</span></div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn size="sm" onClick={() => setCurrentOrder([])}>🗑</Btn>
            <Btn size="sm" variant="secondary" onClick={() => { if (currentOrder.length) { setLastOrder({ id: "ตัวอย่าง", tableId: selectedTableId, items: currentOrder, total: grand, time: new Date() }); setReceiptOpen(true); } }}>🧾 preview</Btn>
            <Btn variant="primary" style={{ flex: 1 }} onClick={checkout}>✓ ชำระเงิน</Btn>
          </div>
        </div>
      </div>

      <Modal open={receiptOpen} onClose={() => setReceiptOpen(false)} title="ใบเสร็จรับเงิน"
        footer={[<Btn key="c" onClick={() => setReceiptOpen(false)}>ปิด</Btn>, lastOrder && <Btn key="p" variant="primary" onClick={() => printReceipt(lastOrder)}>🖨 พิมพ์</Btn>]}>
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
              {lastOrder.items.map((i) => <div key={i.id} style={{ display: "flex", justifyContent: "space-between" }}><span>{i.name} ×{i.qty}</span><span>₭{i.price * i.qty}</span></div>)}
              <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280" }}><span>ยอดรวม</span><span>₭{s}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280" }}><span>VAT 7%</span><span>₭{v}</span></div>
              <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15 }}><span>ยอดสุทธิ</span><span>₭{lastOrder.total}</span></div>
              <div style={{ textAlign: "center", color: "#9CA3AF", fontSize: 11, marginTop: 8 }}>ขอบคุณที่ใช้บริการ 🙏</div>
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
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "4px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["ชื่อเมนู","หมวดหมู่","ราคา","สถานะ",""].map((h) => <th key={h} style={{ textAlign: "left", padding: "8px 16px", fontSize: 11, fontWeight: 600, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6" }}>{h}</th>)}</tr></thead>
          <tbody>
            {menus.map((m) => (
              <tr key={m.id}>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>{m.name}</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>{m.cat}</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB", fontWeight: 600, color: BRAND }}>₭{m.price}</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB" }}><Badge type={m.status === "พร้อมขาย" ? "green" : "amber"}>{m.status}</Badge></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB", textAlign: "right" }}>
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
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>ชื่อเมนู</label><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="เช่น ลาเต้" /></div>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>หมวดหมู่</label>
            <Select value={form.cat} onChange={(v) => setForm({ ...form, cat: v })}>{["กาแฟ","ชา","เครื่องดื่มอื่น","ขนม"].map((c) => <option key={c}>{c}</option>)}</Select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>ราคา (₭)</label><Input value={form.price} onChange={(v) => setForm({ ...form, price: v })} type="number" placeholder="15000" /></div>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>สถานะ</label>
            <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })}><option>พร้อมขาย</option><option>หยุดขายชั่วคราว</option></Select></div>
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
        <span style={{ fontSize: 12, color: "#6B7280" }}>วัตถุดิบทั้งหมด {stocks.length} รายการ · ใกล้หมด <span style={{ color: "#DC2626", fontWeight: 600 }}>{low}</span> รายการ</span>
        <Btn variant="primary" size="sm" onClick={() => setShowModal(true)}>+ เพิ่มวัตถุดิบ</Btn>
      </div>
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["วัตถุดิบ","คงเหลือ","หน่วย","ขั้นต่ำ","สถานะ",""].map((h) => <th key={h} style={{ textAlign: "left", padding: "8px 16px", fontSize: 11, fontWeight: 600, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6" }}>{h}</th>)}</tr></thead>
          <tbody>
            {stocks.map((s) => {
              const pct = Math.min(100, Math.round(s.qty / Math.max(s.min * 3, s.qty) * 100));
              const color = s.qty <= s.min ? "#DC2626" : s.qty <= s.min * 1.5 ? "#D97706" : BRAND;
              const type = s.qty <= s.min ? "red" : s.qty <= s.min * 1.5 ? "amber" : "green";
              const label = s.qty <= s.min ? "ใกล้หมด" : s.qty <= s.min * 1.5 ? "ควรสั่ง" : "ปกติ";
              return (
                <tr key={s.id}>
                  <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB" }}>
                    {s.qty}
                    <div style={{ background: "#F3F4F6", borderRadius: 20, height: 5, marginTop: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 20 }} />
                    </div>
                  </td>
                  <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>{s.unit}</td>
                  <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB", color: "#6B7280" }}>{s.min}</td>
                  <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB" }}><Badge type={type}>{label}</Badge></td>
                  <td style={{ padding: "10px 16px", borderBottom: "1px solid #F9FAFB", textAlign: "right" }}>
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
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>ชื่อวัตถุดิบ</label><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="เช่น กาแฟดิบ" /></div>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>หน่วย</label>
            <Select value={form.unit} onChange={(v) => setForm({ ...form, unit: v })}>{["กิโลกรัม","กรัม","ลิตร","มิลลิลิตร","ชิ้น","ถุง"].map((u) => <option key={u}>{u}</option>)}</Select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>จำนวนคงเหลือ</label><Input value={form.qty} onChange={(v) => setForm({ ...form, qty: v })} type="number" /></div>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>จำนวนขั้นต่ำ</label><Input value={form.min} onChange={(v) => setForm({ ...form, min: v })} type="number" /></div>
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

  const printReport = () => {
    const rows = [...orders].reverse().map((o) => {
      const tbl = tables.find((t) => t.id === o.tableId);
      const names = o.items.map((i) => i.name + (i.qty > 1 ? ` ×${i.qty}` : "")).join(", ");
      return `<tr><td>#${o.id}</td><td>${tbl ? "โต๊ะ " + tbl.num : "-"}</td><td>${names}</td><td>₭${o.total}</td><td>${o.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</td></tr>`;
    }).join("");
    const w = window.open("", "_blank", "width=800,height=700");
    w.document.write(`<html><head><title>รายงานยอดขาย</title><style>body{font-family:sans-serif;font-size:13px;padding:28px;color:#111}h2{font-size:18px;margin-bottom:4px}p{color:#666;font-size:12px;margin:0 0 16px}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:9px 12px;border-bottom:1px solid #F3F4F6}th{font-size:11px;font-weight:700;color:#9CA3AF;border-bottom:2px solid #E5E7EB}.total{font-weight:700;font-size:15px;margin-top:20px}@media print{body{padding:0}}</style></head>
<body><h2>☕ CaféERP — รายงานยอดขาย</h2><p>พิมพ์วันที่ ${new Date().toLocaleDateString("th-TH")} · ออเดอร์ทั้งหมด ${orders.length} รายการ</p>
<table><thead><tr><th>ออเดอร์</th><th>โต๊ะ</th><th>รายการ</th><th>ราคา</th><th>เวลา</th></tr></thead><tbody>${rows || "<tr><td colspan='5' style='text-align:center;color:#9CA3AF'>ยังไม่มีข้อมูล</td></tr>"}</tbody></table>
<div class="total">รายได้รวม: ₭${total.toLocaleString()}</div>
<script>window.print();window.close();</script></body></html>`);
    w.document.close();
  };

  const showReceipt = (o) => setReceiptOrder(o);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 16 }}>
        <Btn onClick={exportCSV}>📊 ส่งออก CSV / Excel</Btn>
        <Btn onClick={printReport}>🖨 พิมพ์รายงาน</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 16 }}>
        <MetricCard label="รายได้สัปดาห์นี้" value={`₭${wRev.toLocaleString()}`} />
        <MetricCard label="รายได้ทั้งหมด" value={`₭${total.toLocaleString()}`} />
        <MetricCard label="ออเดอร์ทั้งหมด" value={orders.length} />
        <MetricCard label="เฉลี่ย/ออเดอร์" value={`₭${orders.length ? Math.round(total / orders.length) : 0}`} />
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 12 }}>ยอดขาย 7 วันที่ผ่านมา</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 110 }}>
          {days.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>{v ? `₭${v}` : ""}</span>
              <div style={{ width: "100%", background: BRAND, borderRadius: "3px 3px 0 0", opacity: 0.85, height: Math.max(3, Math.round(v / mx * 100)) }} />
              <span style={{ fontSize: 10, color: "#9CA3AF" }}>{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 12 }}>เมนูขายดี</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["เมนู","จำนวน (แก้ว)","รายได้"].map((h) => <th key={h} style={{ textAlign: "left", padding: "7px 8px", fontSize: 11, fontWeight: 600, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6" }}>{h}</th>)}</tr></thead>
          <tbody>{topList.length ? topList.map(([n, d]) => <tr key={n}><td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB" }}>{n}</td><td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB" }}>{d.qty}</td><td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB", fontWeight: 600, color: BRAND }}>₭{d.rev.toLocaleString()}</td></tr>) : <tr><td colSpan={3} style={{ textAlign: "center", color: "#9CA3AF", padding: 16 }}>ยังไม่มีข้อมูล</td></tr>}</tbody>
        </table>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 12 }}>รายการออเดอร์ทั้งหมด</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr>{["ออเดอร์","โต๊ะ","รายการ","ราคา","เวลา",""].map((h) => <th key={h} style={{ textAlign: "left", padding: "7px 8px", fontSize: 11, fontWeight: 600, color: "#9CA3AF", borderBottom: "1px solid #F3F4F6" }}>{h}</th>)}</tr></thead>
          <tbody>{orders.length ? [...orders].reverse().map((o) => {
            const tbl = tables.find((t) => t.id === o.tableId);
            const names = o.items.map((i) => i.name + (i.qty > 1 ? ` ×${i.qty}` : "")).join(", ");
            return <tr key={o.id}>
              <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>#{o.id}</td>
              <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB" }}>{tbl ? `โต๊ะ ${tbl.num}` : "-"}</td>
              <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{names}</td>
              <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB", fontWeight: 600 }}>₭{o.total}</td>
              <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB", color: "#9CA3AF", fontSize: 11 }}>{o.time.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}</td>
              <td style={{ padding: "9px 8px", borderBottom: "1px solid #F9FAFB" }}><Btn size="sm" onClick={() => showReceipt(o)}>🧾</Btn></td>
            </tr>;
          }) : <tr><td colSpan={6} style={{ textAlign: "center", color: "#9CA3AF", padding: 18 }}>ยังไม่มีออเดอร์</td></tr>}</tbody>
        </table>
      </div>

      <Modal open={!!receiptOrder} onClose={() => setReceiptOrder(null)} title="ใบเสร็จรับเงิน"
        footer={[<Btn key="c" onClick={() => setReceiptOrder(null)}>ปิด</Btn>, receiptOrder && <Btn key="p" variant="primary" onClick={() => { const t = tables.find((x) => x.id === receiptOrder.tableId); const s = receiptOrder.items.reduce((x, i) => x + i.price * i.qty, 0); const v = receiptOrder.total - s; const w = window.open("", "_blank", "width=380,height=600"); w.document.write(`<html><head><title>ใบเสร็จ</title><style>body{font-family:monospace;font-size:13px;line-height:2;padding:24px;max-width:300px;margin:auto}.row{display:flex;justify-content:space-between}hr{border:none;border-top:1px dashed #ccc;margin:10px 0}.center{text-align:center}.bold{font-weight:bold;font-size:15px}</style></head><body><div class="center bold">☕ CaféERP</div><div class="center" style="color:#666;font-size:11px">ใบเสร็จ</div><hr><div class="row"><span>ออเดอร์</span><span>#${receiptOrder.id}</span></div><div class="row"><span>โต๊ะ</span><span>${t ? "โต๊ะ " + t.num : "-"}</span></div><hr>${receiptOrder.items.map((i) => `<div class="row"><span>${i.name} ×${i.qty}</span><span>₭${i.price * i.qty}</span></div>`).join("")}<hr><div class="row"><span>ยอดรวม</span><span>₭${s}</span></div><div class="row"><span>VAT 7%</span><span>₭${v}</span></div><hr><div class="row bold"><span>ยอดสุทธิ</span><span>₭${receiptOrder.total}</span></div><div class="center" style="color:#9CA3AF;font-size:11px;margin-top:8px">ขอบคุณที่ใช้บริการ 🙏</div><script>window.print();window.close();</script></body></html>`); w.document.close(); }}>🖨 พิมพ์</Btn>]}>
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
            {receiptOrder.items.map((i) => <div key={i.id} style={{ display: "flex", justifyContent: "space-between" }}><span>{i.name} ×{i.qty}</span><span>₭{i.price * i.qty}</span></div>)}
            <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280" }}><span>ยอดรวม</span><span>₭{s}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#6B7280" }}><span>VAT 7%</span><span>₭{v}</span></div>
            <hr style={{ border: "none", borderTop: "1px dashed #D1D5DB", margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15 }}><span>ยอดสุทธิ</span><span>₭{receiptOrder.total}</span></div>
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
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "4px 16px" }}>
        {staffs.map((s, i) => {
          const av = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const init = s.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
          const hrs = parseInt(s.end) - parseInt(s.start);
          return (
            <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < staffs.length - 1 ? "1px solid #F9FAFB" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: av.bg, color: av.fg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }}>{init}</div>
                <div><div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div><div style={{ fontSize: 11, color: "#9CA3AF" }}>{s.role}</div></div>
              </div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 11, color: "#9CA3AF" }}>เวลางาน</div><div style={{ fontSize: 13 }}>{s.start}–{s.end}</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 11, color: "#9CA3AF" }}>ชั่วโมง/วัน</div><div style={{ fontSize: 13, fontWeight: 600 }}>{hrs} ชม.</div></div>
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
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>ชื่อ-นามสกุล</label><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="สมชาย ดีใจ" /></div>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>ตำแหน่ง</label>
            <Select value={form.role} onChange={(v) => setForm({ ...form, role: v })}>{["บาริสต้า","แคชเชียร์","ผู้จัดการ","แม่บ้าน"].map((r) => <option key={r}>{r}</option>)}</Select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>เวลาเข้างาน</label><Input value={form.start} onChange={(v) => setForm({ ...form, start: v })} type="time" /></div>
          <div><label style={{ fontSize: 12, color: "#6B7280", display: "block", marginBottom: 4 }}>เวลาออกงาน</label><Input value={form.end} onChange={(v) => setForm({ ...form, end: v })} type="time" /></div>
        </div>
      </Modal>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// APP SHELL
// ────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", icon: "📊", label: "ภาพรวม" },
  { id: "tables", icon: "🪑", label: "ระบบโต๊ะ" },
  { id: "pos", icon: "🧾", label: "POS / ออเดอร์" },
  { id: "menu", icon: "☕", label: "เมนู & ราคา" },
  { id: "stock", icon: "📦", label: "สต็อก" },
  { id: "report", icon: "📈", label: "รายงาน" },
  { id: "staff", icon: "👥", label: "พนักงาน" },
  { id: "sop", icon: "📋", label: "SOP งานประจำวัน" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [menus, setMenus] = useState(INITIAL_MENUS);
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [stocks, setStocks] = useState(INITIAL_STOCKS);
  const [staffs, setStaffs] = useState(INITIAL_STAFF);
  const [orders, setOrders] = useState(SEED_ORDERS);
  const [posTableId, setPosTableId] = useState(null);

  const goToPOS = useCallback((tableId) => { setPosTableId(tableId); setPage("pos"); }, []);

  const today = new Date().toLocaleDateString("th-TH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: 600, border: "1px solid #E5E7EB", borderRadius: 16, overflow: "hidden", fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif", background: "#fff" }}>
      {/* Sidebar */}
      <div style={{ width: 176, background: "#F9FAFB", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", padding: "16px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 14px 16px", borderBottom: "1px solid #E5E7EB", marginBottom: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>☕ CaféERP</div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>ระบบจัดการร้านกาแฟ</div>
        </div>
        {NAV.map((n) => (
          <div key={n.id} onClick={() => setPage(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", fontSize: 13,
              background: page === n.id ? "#fff" : "transparent",
              color: page === n.id ? "#111827" : "#6B7280",
              fontWeight: page === n.id ? 600 : 400,
              borderLeft: page === n.id ? `2px solid ${BRAND}` : "2px solid transparent",
              transition: "all .15s" }}>
            <span style={{ fontSize: 16 }}>{n.icon}</span>{n.label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <div style={{ padding: "13px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", flexShrink: 0 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{NAV.find((n) => n.id === page)?.label}</h2>
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{today}</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {page === "dashboard" && <Dashboard orders={orders} tables={tables} stocks={stocks} />}
          {page === "tables" && <Tables tables={tables} setTables={setTables} onGoToPOS={goToPOS} />}
          {page === "pos" && <POS menus={menus} tables={tables} orders={orders} setOrders={setOrders} initialTableId={posTableId} setInitialTableId={setPosTableId} />}
          {page === "menu" && <MenuPage menus={menus} setMenus={setMenus} />}
          {page === "stock" && <StockPage stocks={stocks} setStocks={setStocks} />}
          {page === "report" && <Report orders={orders} tables={tables} />}
          {page === "staff" && <Staff staffs={staffs} setStaffs={setStaffs} />}
          {page === "sop" && <SOPPage />}
        </div>
      </div>
    </div>
  );
}
