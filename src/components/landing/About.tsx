import { about, mySkills } from '@/config/About';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About(): React.JSX.Element {
  return (
    <section id="about">
      <Container className="mt-16 md:mt-20">
        <SectionHeading subHeading="About" heading="Me" />
        {/* About me */}
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:gap-8">
          <Image
            src="/assets/logo.png"
            alt="About"
            width={100}
            height={100}
            className="border-secondary size-36 shrink-0 self-start rounded-md border-2 bg-blue-300 sm:size-44 md:size-60 dark:bg-yellow-300 mx-auto md:mx-0"
            loading="lazy"
            sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 240px"
          />
          <div className="mt-0 text-center md:text-left">
            <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              {about.name}
            </h3>
            <p className="text-secondary mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base">
              {about.description}
            </p>
            <p className="text-secondary mt-6 font-bold sm:mt-8">Skills</p>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              {mySkills.map((skill) => (
                <Tooltip key={skill.key}>
                  <TooltipTrigger asChild>
                    <div className="size-6 hover:cursor-pointer sm:size-7">
                      {skill}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{skill.key}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
