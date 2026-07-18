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

const Bold = ({ card }) => {

  const isDark = (card?.theme || "dark") === "dark";
  const t = isDark
    ? {
      page: "bg-black text-white",
      card: "bg-neutral-950 border-neutral-800",
      accent: "bg-red-600",
      muted: "text-neutral-400",
      chip: "bg-neutral-900 border-neutral-700 hover:bg-neutral-800",
      social: "bg-white text-black hover:bg-red-600 hover:text-white",
    }
    : {
      page: "bg-neutral-100 text-neutral-900",
      card: "bg-white border-neutral-300",
      accent: "bg-black",
      muted: "text-neutral-500",
      chip: "bg-neutral-100 border-neutral-300 hover:bg-neutral-200",
      social: "bg-neutral-900 text-white hover:bg-red-600",
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
    <div className={`h-screen overflow-hidden ${t.page} flex items-center justify-center px-4 py-4`}>
      <div className={`w-full max-w-5xl rounded-3xl border ${t.card} shadow-2xl p-6 sm:p-8 lg:p-10`}>
        <div className="flex flex-col items-center text-center">
          <img src={card?.image || ProfileIcon} onError={handleImageError} alt="Profile" className="h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover border-4 border-red-500 shadow-xl" />
          <h1 className="mt-5 text-3xl sm:text-5xl font-black uppercase tracking-[0.18em] wrap-break-word">
            {card?.name || "Your Name"}
          </h1>
          {card?.headline && (
            <p className={`mt-3 text-base sm:text-xl font-medium max-w-3xl ${t.muted}`}>
              {card.headline}
            </p>
          )}
        </div>
        {card?.bio && (
          <div className="mt-8 text-center max-w-3xl mx-auto">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-red-500">
              About Me
            </h2>
            <p className="text-base sm:text-lg leading-8 wrap-break-word">
              {card.bio}
            </p>
          </div>
        )}
        {(card?.email || card?.phno) && (
          <div className={`mt-8 grid gap-4 ${card?.email && card?.phno ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-xl mx-auto"}`}>
            {card?.email && (
              <a href={`mailto:${card.email}`} className={`flex items-center gap-3 rounded-2xl border p-4 transition ${t.chip}`}>
                <HiOutlineMail className="text-red-500 text-2xl shrink-0" />
                <span className="break-all font-medium">
                  {card.email}
                </span>
              </a>
            )}
            {card?.phno && (
              <a href={`tel:${card.phno}`} className={`flex items-center gap-3 rounded-2xl border p-4 transition ${t.chip}`}>
                <HiOutlinePhone className="text-red-500 text-2xl shrink-0" />
                <span className="break-all font-medium">
                  {card.phno}
                </span>
              </a>
            )}
          </div>
        )}
        {(socials.length > 0 || others.length > 0) && (
          <div className="mt-8">
            <h2 className="mb-5 text-center text-xs font-bold uppercase tracking-[0.35em] text-red-500">
              Connect
            </h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {socials.map(({ href, Icon, label }, index) => (
                <a key={index} href={getLink(href)} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full transition hover:scale-110 ${t.social}`}
                >
                  <Icon className="text-xl sm:text-2xl" />
                </a>
              ))}
              {others.map((item, index) => {
                const Icon = getPlatformIcon(item.platform);
                return (
                  <a key={index} href={getLink(item.link)} target="_blank" rel="noopener noreferrer" aria-label={item.platform}
                    className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full transition hover:scale-110 ${t.social}`}
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
  );
};

export default Bold;