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
    portfolioo: FaGlobe,
    blog: FaGlobe,
    personal: FaGlobe,
    personalwebsite: FaGlobe,
    "personal website": FaGlobe,
};

function getPlatformIcon(platform) {
    if (!platform) return FaGlobe;
    const key = String(platform).trim().toLowerCase();
    return PLATFORM_ICON_MAP[key] || FaGlobe;
}

function getLink(url) {
    if (!url) return "#";
    const trimmed = String(url).trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

const Minimal = ({ card }) => {

    const isDark = (card?.theme || "dark") === "dark";
    const t = isDark ?
        {
            page: "bg-[#0a0a0a] text-neutral-100",
            card: "bg-[#111111] border-white/10",
            name: "text-neutral-50",
            headline: "text-neutral-400",
            section: "text-neutral-500",
            bio: "text-neutral-300",
            divider: "bg-white/10",
            chip: "bg-white/[0.03] border-white/10 text-neutral-200 hover:bg-white/[0.06]",
            iconBtn: "bg-white/[0.03] border-white/10 text-neutral-200 hover:bg-white/[0.08] hover:text-white",
            ring: "ring-white/10",
        }
        :
        {
            page: "bg-[#fafafa] text-neutral-900",
            card: "bg-white border-black/[0.06]",
            name: "text-neutral-900",
            headline: "text-neutral-500",
            section: "text-neutral-400",
            bio: "text-neutral-700",
            divider: "bg-black/[0.08]",
            chip: "bg-neutral-50 border-black/[0.06] text-neutral-800 hover:bg-neutral-100",
            iconBtn: "bg-neutral-50 border-black/[0.06] text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
            ring: "ring-black/[0.06]",
        };

    const socials = [
        { key: "instagram", href: card?.instagram, Icon: FaInstagram, label: "Instagram" },
        { key: "facebook", href: card?.facebook, Icon: FaFacebook, label: "Facebook" },
        { key: "linkedin", href: card?.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
        { key: "github", href: card?.github, Icon: FaGithub, label: "GitHub" },
        { key: "telegram", href: card?.telegram, Icon: FaTelegram, label: "Telegram" },
    ].filter((s) => s.href && String(s.href).trim() !== "");

    const others = Array.isArray(card?.others) ? card.others.filter((o) => o?.link && String(o.link).trim() !== "") : [];

    const hasBio = card?.bio && card.bio.trim() !== "";
    const hasEmail = card?.email && card.email.trim() !== "";
    const hasPhone = card?.phno && card.phno.trim() !== "";
    const hasContact = hasEmail || hasPhone;
    const hasSocials = socials.length > 0 || others.length > 0;

    const handleImageError = (e) => {
        if (e.currentTarget.src !== ProfileIcon) {
            e.currentTarget.src = ProfileIcon;
        }
    };

    const renderIconLink = (href, label, Icon, key) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
            className={`inline-flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border transition-colors ${t.iconBtn}`}
        >
            <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
        </a>
    );

    return (
        <div className={`h-screen w-full overflow-hidden ${t.page} flex items-center justify-center px-4 py-4 sm:px-6 lg:px-8`}>
            <article className={`group w-full max-w-2xl rounded-3xl border ${t.card} px-6 py-6 sm:px-10 lg:px-14 sm:py-8 text-center transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]`}>
                <div className="flex justify-center">
                    <img src={card?.image || ProfileIcon} onError={handleImageError} alt={card?.name ? `${card.name} profile photo` : "Profile photo"}
                        className={`h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full object-cover ring-1 ${t.ring} transition-all duration-500 group-hover:scale-105 group-hover:ring-2`}
                    />
                </div>
                {card?.name && (
                    <h1 className={`mt-4 text-3xl sm:text-4xl font-semibold tracking-tight wrap-break-word transition-all duration-300 group-hover:tracking-wide ${t.name}`}>
                        {card.name}
                    </h1>
                )}
                {card?.headline && (
                    <p className={`mt-2 text-base sm:text-lg wrap-break-word transition-all duration-300 group-hover:opacity-90 ${t.headline}`}>
                        {card.headline}
                    </p>
                )}
                {hasBio && (
                    <section className="mt-4 text-left">
                        <h2 className={`text-[11px] font-medium uppercase tracking-[0.16em] ${t.section}`}>
                            About
                        </h2>
                        <p className={`mt-2 text-[15px] sm:text-lg leading-relaxed wrap-break-word transition-all duration-300 ${t.bio}`}>
                            {card.bio}
                        </p>
                    </section>
                )}
                {hasContact && (
                    <section className="mt-4 text-left">
                        <h2 className={`text-[11px] font-medium uppercase tracking-[0.16em] ${t.section}`}>
                            Contact
                        </h2>
                        <div className="mt-2 flex flex-col gap-2">
                            {hasEmail && (
                                <a href={card.email} className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg ${t.chip}`}>
                                    <HiOutlineMail className="h-4 w-4 shrink-0 opacity-70" />
                                    <span className="break-all">
                                        {card.email}
                                    </span>
                                </a>
                            )}
                            {hasPhone && (
                                <a href={card.phno} className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg ${t.chip}`}>
                                    <HiOutlinePhone className="h-4 w-4 shrink-0 opacity-70" />
                                    <span className="break-all">
                                        {card.phno}
                                    </span>
                                </a>
                            )}
                        </div>
                    </section>
                )}
                {hasSocials && (
                    <section className="mt-4">
                        <div className={`mx-auto mb-4 h-px w-16 transition-all duration-500 group-hover:w-28 ${t.divider}`} />
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {socials.map(({ key, href, Icon, label }) =>
                                renderIconLink(getLink(href), label, Icon, key),
                            )}
                            {others.map((o, i) => {
                                const Icon = getPlatformIcon(o.platform);
                                const label = o.platform || "Link";

                                return renderIconLink(getLink(o.link), label, Icon, `other-${i}`);
                            })}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
}

export default Minimal;