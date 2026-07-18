import { FaInstagram, FaFacebook, FaLinkedin, FaGithub, FaTelegram, FaGlobe, FaDiscord, FaYoutube, FaReddit, FaTwitch, FaBehance, FaDribbble, FaMedium, FaDev, FaGitlab, FaStackOverflow, } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import ProfileIcon from "../../assets/Profile.png";

const PLATFORM_ICON_MAP = {
  twitter: FaXTwitter,
  x: FaXTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  github: FaGithub,
  telegram: FaTelegram,
  discord: FaDiscord,
  youtube: FaYoutube,
  reddit: FaReddit,
  twitch: FaTwitch,
  behance: FaBehance,
  dribbble: FaDribbble,
  medium: FaMedium,
  dev: FaDev,
  "dev.to": FaDev,
  gitlab: FaGitlab,
  stackoverflow: FaStackOverflow,
  "stack overflow": FaStackOverflow,
  website: FaGlobe,
  portfolio: FaGlobe,
  blog: FaGlobe,
  personal: FaGlobe,
  "personal website": FaGlobe,
};

function getPlatformIcon(platform) {
  if (!platform) return FaGlobe;
  return PLATFORM_ICON_MAP[String(platform).trim().toLowerCase()] || FaGlobe;
}

function getLink(url) {
  if (!url) return "#";
  const value = String(url).trim();
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

const Modern = ({ card }) => {

  const isDark = (card?.theme || "dark") === "dark";
  const t = isDark
    ? {
      page: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white",
      card: "bg-slate-900/70 border-cyan-500/20 backdrop-blur-xl",
      muted: "text-slate-400",
      title: "text-white",
      section: "text-cyan-400",
      chip: "bg-slate-900/60 border-cyan-500/15 hover:bg-slate-800 hover:border-cyan-400/40",
      social: "bg-slate-900/70 border border-cyan-500/15 text-cyan-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,.25)]",
      imageRing: "border-cyan-400/40 ring-cyan-500/10",
      divider: "from-blue-600 to-cyan-400",
    }
    : {
      page: "bg-gradient-to-br from-sky-50 via-white to-cyan-50 text-slate-900",
      card: "bg-white/90 border-cyan-200 backdrop-blur-xl",
      muted: "text-slate-500",
      title: "text-slate-900",
      section: "text-cyan-600",
      chip: "bg-white border-cyan-200 hover:bg-cyan-50 hover:border-cyan-400",
      social: "bg-white border border-cyan-200 text-cyan-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,.20)]",
      imageRing: "border-cyan-500/30 ring-cyan-500/10",
      divider: "from-blue-500 to-cyan-500",
    };

  const socials = [
    { href: card?.instagram, Icon: FaInstagram, label: "Instagram" },
    { href: card?.facebook, Icon: FaFacebook, label: "Facebook" },
    { href: card?.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
    { href: card?.github, Icon: FaGithub, label: "GitHub" },
    { href: card?.telegram, Icon: FaTelegram, label: "Telegram" },
  ].filter((x) => x.href);

  const others = Array.isArray(card?.others)
    ? card.others.filter((x) => x.link)
    : [];

  const handleImageError = (e) => {
    if (e.currentTarget.src !== ProfileIcon) {
      e.currentTarget.src = ProfileIcon;
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${t.page}`}>
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-112 w-md rounded-full bg-blue-600/10 blur-3xl" />
      <div className="relative flex min-h-screen items-center justify-center px-4 py-6">
        <div className={`group w-full max-w-5xl rounded-[34px] border ${t.card} p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,.35)] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_30px_90px_rgba(34,211,238,.15)]`}>
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl transition duration-500 group-hover:scale-125" />
              <img src={card?.image || ProfileIcon} onError={handleImageError} alt="Profile"
                className={`relative h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover border-4 ring-8 transition-all duration-500 group-hover:scale-105 ${t.imageRing}`}
              />
            </div>
            <h1 className={`mt-6 text-4xl sm:text-5xl font-bold tracking-tight transition-all duration-300 ${t.title} group-hover:text-cyan-300`}>
              {card?.name || "Your Name"}
            </h1>
            {card?.headline && (
              <p className={`mt-3 max-w-3xl text-base sm:text-xl font-medium ${t.muted}`}>
                {card.headline}
              </p>
            )}
            <div className={`mx-auto mt-6 h-0.5 w-24 rounded-full bg-linear-to-r ${t.divider} transition-all duration-500 group-hover:w-36`} />
          </div>
          {card?.bio && (
            <div className="mx-auto mt-10 max-w-3xl text-center">
              <div className="mb-5 flex items-center justify-center gap-3">
                <div className="h-0.5 w-10 rounded-full bg-cyan-400" />
                <h2 className={`font-semibold ${t.section}`}>
                  About Me
                </h2>
                <div className="h-0.5 w-10 rounded-full bg-cyan-400" />
              </div>
              <p className="text-base leading-8 sm:text-lg">
                {card.bio}
              </p>
            </div>
          )}
          {(card?.email || card?.phno) && (
            <div className={`mt-10 grid gap-5 ${card?.email && card?.phno ? "grid-cols-1 md:grid-cols-2" : "mx-auto max-w-xl"}`}>
              {card?.email && (
                <a href={`mailto:${card.email}`} className={`group flex items-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${t.chip}`}>
                  <HiOutlineMail className="text-2xl text-cyan-400 transition group-hover:scale-110" />
                  <span className="font-medium break-all">
                    {card.email}
                  </span>
                </a>
              )}
              {card?.phno && (
                <a href={`tel:${card.phno}`} className={`group flex items-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${t.chip}`}>
                  <HiOutlinePhone className="text-2xl text-cyan-400 transition group-hover:scale-110" />
                  <span className="font-medium break-all">
                    {card.phno}
                  </span>
                </a>
              )}
            </div>
          )}
          {(socials.length > 0 || others.length > 0) && (
            <div className="mt-10">
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="h-0.5 w-10 rounded-full bg-cyan-400" />
                <h2 className={`font-semibold ${t.section}`}>
                  Connect
                </h2>
                <div className="h-0.5 w-10 rounded-full bg-cyan-400" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {socials.map(({ href, Icon, label }, index) => (
                  <a key={index} href={getLink(href)} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${t.social}`}
                  >
                    <Icon className="text-xl sm:text-2xl" />
                  </a>
                ))}
                {others.map((item, index) => {
                  const Icon = getPlatformIcon(item.platform);
                  return (
                    <a key={index} href={getLink(item.link)} target="_blank" rel="noopener noreferrer" aria-label={item.platform}
                      className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${t.social}`}
                    >
                      <Icon className="text-xl sm:text-2xl" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modern;