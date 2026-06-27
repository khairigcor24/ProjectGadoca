import gadocaaLogo from '../assets/gadocaa-logo.png'

const WHATSAPP_NUMBER = '6281288888456'
const WHATSAPP_DISPLAY = '0812-8888-8456'
const ADDRESS =
  'Jl. Harapan Raya No. 45, Rumbai, Pekanbaru, Riau 28265'

const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <path d="M21.8 8.001a2.5 2.5 0 0 0-1.76-1.765C18.254 6 12 6 12 6s-6.254 0-8.04.236A2.5 2.5 0 0 0 2.2 8.001 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .2 3.999 2.5 2.5 0 0 0 1.76 1.765C5.746 18 12 18 12 18s6.254 0 8.04-.236a2.5 2.5 0 0 0 1.76-1.765A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.2-3.999ZM10 15.464V8.536L16 12l-6 3.464Z" />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM17.75 6.5a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <path d="M16 3a5 5 0 0 0 5 5v3.5a8.5 8.5 0 0 1-5-1.6V15a6 6 0 1 1-6-6c.34 0 .67.03 1 .08v3.18a2.82 2.82 0 1 0 2 2.7V3h3Z" />
    ),
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: (
      <path d="M12 2a10 10 0 0 0-8.94 14.53L2 22l5.62-1.47A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.32 12.92l-.35.55-.2.62.36 2.12-2.17-.57-.6-.18-.58.34A8 8 0 1 1 12 4Zm-2.2 3.5c-.12 0-.36.04-.55.2-.19.16-.74.72-.74 1.76s.76 2.04.87 2.18c.11.14 1.47 2.36 3.64 3.21 1.8.7 2.17.56 2.56.53.39-.04 1.26-.52 1.44-1.02.18-.5.18-.93.13-1.02-.05-.09-.19-.14-.4-.25s-1.26-.62-1.45-.69-.34-.1-.48.1-.55.69-.67.83-.25.16-.46.05-.9-.33-1.72-1.05c-.64-.57-1.07-1.27-1.2-1.48s-.01-.33.09-.44c.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.14.04-.26-.02-.37s-.48-1.16-.66-1.58c-.17-.4-.35-.35-.48-.35Z" />
    ),
  },
]

function FooterIcon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {children}
    </svg>
  )
}

function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <img
              src={gadocaaLogo}
              alt=""
              className="site-footer__watermark"
              aria-hidden="true"
            />
            <div className="site-footer__brand-content">
              <div className="site-footer__logo-row">
                <img src={gadocaaLogo} alt="Gadocaa" className="site-footer__logo" />
                <span className="site-footer__brand-name">Gadocaa</span>
              </div>
              <div className="site-footer__legal">
                <p>© 2026 Gadocaa. All rights reserved.</p>
                <div className="site-footer__legal-links">
                  <a href="#syarat-ketentuan">Syarat &amp; Ketentuan</a>
                  <span aria-hidden="true">·</span>
                  <a href="#kebijakan-privasi">Kebijakan Privasi</a>
                </div>
              </div>
            </div>
          </div>

          <div className="site-footer__column">
            <h4>Pusat Pelanggan</h4>
            <div className="site-footer__contact">
              <span className="site-footer__contact-icon">
                <FooterIcon>
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z" />
                </FooterIcon>
              </span>
              <p>{ADDRESS}</p>
            </div>
            <a
              className="site-footer__contact site-footer__contact--link"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="site-footer__contact-icon">
                <FooterIcon>
                  <path d="M12 2a10 10 0 0 0-8.94 14.53L2 22l5.62-1.47A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.32 12.92l-.35.55-.2.62.36 2.12-2.17-.57-.6-.18-.58.34A8 8 0 1 1 12 4Zm-2.2 3.5c-.12 0-.36.04-.55.2-.19.16-.74.72-.74 1.76s.76 2.04.87 2.18c.11.14 1.47 2.36 3.64 3.21 1.8.7 2.17.56 2.56.53.39-.04 1.26-.52 1.44-1.02.18-.5.18-.93.13-1.02-.05-.09-.19-.14-.4-.25s-1.26-.62-1.45-.69-.34-.1-.48.1-.55.69-.67.83-.25.16-.46.05-.9-.33-1.72-1.05c-.64-.57-1.07-1.27-1.2-1.48s-.01-.33.09-.44c.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.14.04-.26-.02-.37s-.48-1.16-.66-1.58c-.17-.4-.35-.35-.48-.35Z" />
                </FooterIcon>
              </span>
              <span>{WHATSAPP_DISPLAY}</span>
            </a>
          </div>

          <div className="site-footer__column site-footer__column--complaint">
            <h4>Informasi Kontak Layanan Pengaduan Konsumen</h4>
            <p>
              Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga Kementerian
              Perdagangan Republik Indonesia
            </p>
            <p className="site-footer__complaint-wa">
              <em>WhatsApp Ditjen PKTN: 0853-1111-1010</em>
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__tagline">Gadocaa Stylee · dibuat dengan hati, setiap hari</p>
          <div className="site-footer__social">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="site-footer__social-link"
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
              >
                <FooterIcon>{item.icon}</FooterIcon>
              </a>
            ))}
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-fab"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi Gadocaa via WhatsApp"
      >
        <FooterIcon>
          <path d="M12 2a10 10 0 0 0-8.94 14.53L2 22l5.62-1.47A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.32 12.92l-.35.55-.2.62.36 2.12-2.17-.57-.57-.6-.18-.58.34A8 8 0 1 1 12 4Zm-2.2 3.5c-.12 0-.36.04-.55.2-.19.16-.74.72-.74 1.76s.76 2.04.87 2.18c.11.14 1.47 2.36 3.64 3.21 1.8.7 2.17.56 2.56.53.39-.04 1.26-.52 1.44-1.02.18-.5.18-.93.13-1.02-.05-.09-.19-.14-.4-.25s-1.26-.62-1.45-.69-.34-.1-.48.1-.55.69-.67.83-.25.16-.46.05-.9-.33-1.72-1.05c-.64-.57-1.07-1.27-1.2-1.48s-.01-.33.09-.44c.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.14.04-.26-.02-.37s-.48-1.16-.66-1.58c-.17-.4-.35-.35-.48-.35Z" />
        </FooterIcon>
      </a>
    </>
  )
}

export default Footer
