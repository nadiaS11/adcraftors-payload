'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Zap, ArrowRight, Palette, Rocket } from 'lucide-react'
import { HeroSection } from '@/components/hero-section'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <section className="relative bg-gradient-to-br from-background via-card to-muted section-padding overflow-hidden">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern-light-orange.png')] opacity-50"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container-standard relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            <Zap className="h-4 w-4" />
            Crafting Digital Success Stories
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 animate-fade-in-up leading-tight">
            We Are <span className="text-primary">AdCraftors</span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl text-muted-foreground font-normal">
              Your Digital Growth Partners
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up animation-delay-200 max-w-3xl mx-auto">
            We craft compelling digital experiences that drive real results. From strategic
            campaigns to creative solutions, we turn your vision into measurable success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Button size="lg" className="" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
               asChild
            >
              <Link href="/case-studies">View Our Work</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center animate-fade-in-up animation-delay-600 group">
            <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Palette className="h-10 w-10 text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-serif font-semibold text-xl mb-3">Creative Design</h3>
          </div>

          <div className="text-center animate-fade-in-up animation-delay-700 group">
            <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Rocket className="h-10 w-10 text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-serif font-semibold text-xl mb-3">Digital Strategy</h3>
          </div>

          <div className="text-center animate-fade-in-up animation-delay-800 group">
            <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <Zap className="h-10 w-10 text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-serif font-semibold text-xl mb-3">Performance Marketing</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
