# ☕ CaféERP — คู่มือติดตั้งและ Deploy

## โครงสร้างไฟล์ที่ได้รับ
```
cafe-erp/
├── public/
│   └── index.html
├── src/
│   ├── App.js        ← แอปหลัก (ทุกฟีเจอร์อยู่ที่นี่)
│   └── index.js      ← entry point
├── package.json
├── vercel.json
└── .gitignore
```

---

## ขั้นตอนที่ 1 — ติดตั้ง Node.js

1. ไปที่ https://nodejs.org
2. ดาวน์โหลด **LTS version** (แนะนำ)
3. ติดตั้งตามปกติ (Next → Next → Finish)
4. เปิด Terminal / Command Prompt ทดสอบ:
   ```
   node -v
   npm -v
   ```
   ถ้าขึ้นเลขเวอร์ชัน = สำเร็จ ✅

---

## ขั้นตอนที่ 2 — เตรียมโปรเจกต์

1. แตกไฟล์ ZIP ที่ได้รับไปไว้ที่ใดก็ได้ เช่น Desktop
2. เปิด Terminal แล้ว cd เข้าโฟลเดอร์:
   ```
   cd Desktop/cafe-erp
   ```
3. ติดตั้ง dependencies:
   ```
   npm install
   ```
   รอประมาณ 2–3 นาที

---

## ขั้นตอนที่ 3 — ทดสอบบนเครื่อง

```bash
npm start
```

เบราว์เซอร์จะเปิด http://localhost:3000 อัตโนมัติ
ถ้าแอปขึ้น = พร้อม Deploy ✅

---

## ขั้นตอนที่ 4 — สมัคร GitHub (ถ้ายังไม่มี)

1. ไปที่ https://github.com
2. กด **Sign up** → ใส่ email, password, username
3. ยืนยัน email

---

## ขั้นตอนที่ 5 — อัปโหลดโค้ดขึ้น GitHub

```bash
# ติดตั้ง git (ถ้ายังไม่มี: https://git-scm.com)
git init
git add .
git commit -m "first commit: cafe erp"
```

ไปที่ https://github.com/new สร้าง repository ชื่อ `cafe-erp` แล้ว:

```bash
git remote add origin https://github.com/YOUR_USERNAME/cafe-erp.git
git branch -M main
git push -u origin main
```

(เปลี่ยน YOUR_USERNAME เป็นชื่อ GitHub ของคุณ)

---

## ขั้นตอนที่ 6 — Deploy ขึ้น Vercel

### วิธีง่าย (แนะนำ) — ผ่านเว็บ:

1. ไปที่ https://vercel.com
2. กด **Sign Up** → **Continue with GitHub**
3. กด **Add New Project**
4. เลือก repo `cafe-erp` ที่เพิ่งสร้าง
5. กด **Deploy** — รอประมาณ 1 นาที
6. ได้ลิงก์ เช่น `https://cafe-erp-xxxx.vercel.app` ✅

### วิธี CLI:
```bash
npm install -g vercel
vercel
# ตอบ Y, Y, N ตามที่ถาม
```

---

## ฟีเจอร์ทั้งหมดในแอป

| หน้า | ฟีเจอร์ |
|------|---------|
| 📊 ภาพรวม | ยอดขาย, โต๊ะ, เมนูยอดนิยม |
| 🪑 ระบบโต๊ะ | เปิด/ปิดโต๊ะ, สถานะ, จอง |
| 🧾 POS | รับออเดอร์, VAT, ใบเสร็จ |
| ☕ เมนู | เพิ่ม/แก้ไข/ลบเมนู |
| 📦 สต็อก | วัตถุดิบ, แจ้งเตือนใกล้หมด |
| 📈 รายงาน | ยอดขาย, Export CSV/Excel |
| 👥 พนักงาน | เวลาเข้า-ออกงาน |
| 📋 SOP | งานประจำวัน, checklist, อุปกรณ์ |

หน่วยเงิน: **₭ กีบ (LAK)**

---

## ปัญหาที่พบบ่อย

**npm install ติดตั้งไม่ได้**
→ ลองใช้ `npm install --legacy-peer-deps`

**แอปไม่ขึ้นที่ localhost:3000**
→ ลอง `npm start` อีกครั้ง หรือเปิดเบราว์เซอร์แล้วพิมพ์ localhost:3000 เอง

**Vercel build error**
→ ตรวจว่าไฟล์ครบ: src/App.js, src/index.js, public/index.html, package.json

---

## ติดต่อขอความช่วยเหลือ

ถามใน Claude.ai ได้เลย — แชร์ error message มาและจะช่วยแก้ให้ครับ 🙂
