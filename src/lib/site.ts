// Central place for site-wide contact + brand info.
export const site = {
  name: "ChoraNami",
  tagline: "Creative Education for Young Minds",
  description:
    "ChoraNami inspires creativity, confidence and self-expression in children through engaging art programs across Kenya.",
  phone: "+254 700 000 000",
  whatsapp: "254700000000",
  email: "hello@choranami.co.ke",
  address: "Nairobi, Kenya",
  socials: {
    instagram: "https://instagram.com/choranami",
    facebook: "https://facebook.com/choranami",
    tiktok: "https://tiktok.com/@choranami",
  },
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;
