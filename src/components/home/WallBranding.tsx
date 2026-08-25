import Image from "next/image";

const locations = ["Hyderabad", "Vijayawada", "Vizag", "Bangalore"];

export function WallBranding() {
  return (
    <div className="home-wall-branding absolute text-center">
      <span className="home-wall-logo-frame relative mx-auto block">
        <Image
          src="/images/logo.png"
          alt=""
          fill
          sizes="120px"
          className="home-wall-logo object-contain"
        />
      </span>

      <p className="home-brand-name text-navy">
        <span className="home-brand-primary">TRIOVA</span>
        <span className="home-brand-secondary">INFRADESIGNS</span>
      </p>

      <p className="home-locations flex flex-wrap items-center justify-center text-navy">
        {locations.map((location, index) => (
          <span key={location} className="inline-flex items-center">
            {index > 0 ? (
              <span aria-hidden="true" className="home-location-separator">
                |
              </span>
            ) : null}
            {location}
          </span>
        ))}
      </p>

      <h1 id="hero-heading" className="home-wall-lettering mx-auto text-navy">
        <span>Transforming Spaces into</span>
        <span>Timeless Luxury</span>
      </h1>
    </div>
  );
}
