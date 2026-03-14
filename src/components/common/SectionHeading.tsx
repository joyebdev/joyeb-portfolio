import React from 'react';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps): React.JSX.Element {
  return (
    <div>
      <p className="text-secondary text-sm sm:text-base">{subHeading}</p>
      <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        {heading}
      </h2>
    </div>
  );
}
