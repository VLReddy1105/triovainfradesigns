import { BrandMark } from "@/components/layout/Logo";

const locations = ["Hyderabad", "Vijayawada", "Vizag", "Bangalore"];

export function WallBranding() {
  return (
    <div className="home-wall-branding absolute text-center">
      <BrandMark
        appearance="on-light"
        sizes="120px"
        className="home-wall-logo-frame mx-auto"
      />

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
