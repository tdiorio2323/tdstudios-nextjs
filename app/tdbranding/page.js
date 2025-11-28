'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import styles from './branding.module.css'

const themes = {
    default: {
        name: 'Organic Luxury',
        colors: {
            '--black': '#0a0a0a',
            '--white': '#f5f5f0',
            '--cream': '#e8e4dc',
            '--sage': '#8b9a7d',
            '--sage-dark': '#6b7a5d',
            '--gold': '#c9a227',
            '--charcoal': '#1a1a1a',
            '--gray': '#888888',
            '--light-gray': '#bbbbbb',
        }
    },
    midnight: {
        name: 'Midnight Velvet',
        colors: {
            '--black': '#02040a',
            '--white': '#f0f4f8',
            '--cream': '#e2e8f0',
            '--sage': '#64748b',
            '--sage-dark': '#475569',
            '--gold': '#38bdf8',
            '--charcoal': '#0f172a',
            '--gray': '#94a3b8',
            '--light-gray': '#cbd5e1',
        }
    },
    desert: {
        name: 'Desert Mirage',
        colors: {
            '--black': '#1a0f0a',
            '--white': '#faf5f0',
            '--cream': '#f0e6d6',
            '--sage': '#c17c5f',
            '--sage-dark': '#8a4f3b',
            '--gold': '#e0b06b',
            '--charcoal': '#2e1f18',
            '--gray': '#9c8c84',
            '--light-gray': '#d6c8c0',
        }
    },
    neo: {
        name: 'Neo Tokyo',
        colors: {
            '--black': '#0b0b0b',
            '--white': '#eeeeee',
            '--cream': '#d4d4d4',
            '--sage': '#a78bfa',
            '--sage-dark': '#7c3aed',
            '--gold': '#f472b6',
            '--charcoal': '#18181b',
            '--gray': '#71717a',
            '--light-gray': '#a1a1aa',
        }
    }
}

export default function BrandingPage() {
    const [currentTheme, setCurrentTheme] = useState('default')
    const [colors, setColors] = useState(themes.default.colors)

    useEffect(() => {
        const theme = themes[currentTheme]
        setColors(theme.colors)

        // Apply colors to root
        const root = document.documentElement
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(key, value)
        })
    }, [currentTheme])

    return (
        <main className="min-h-screen bg-[var(--black)]">
            <Navigation />

            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Internal Documentation</span>
                    <h1 className={styles.title}>Brand Identity</h1>
                    <p className={styles.description}>
                        A comprehensive guide to the visual language of TD Studios. This system combines luxury aesthetics with modern functionality, utilizing a refined palette and distinctive typography.
                    </p>
                </div>

                {/* Theme Switcher */}
                <section className={styles.themeSwitcher}>
                    <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem', border: 'none' }}>Theme Preview</h2>
                    <p className={styles.description} style={{ fontSize: '0.9rem' }}>
                        Toggle between different color palettes to visualize how the brand identity adapts to different moods.
                    </p>
                    <div className={styles.themeGrid}>
                        {Object.entries(themes).map(([key, theme]) => (
                            <button
                                key={key}
                                className={`${styles.themeBtn} ${currentTheme === key ? styles.active : ''}`}
                                onClick={() => setCurrentTheme(key)}
                            >
                                <span
                                    className={styles.themePreview}
                                    style={{ background: theme.colors['--gold'] }}
                                />
                                {theme.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Colors */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Color Palette</h2>
                    <div className={styles.grid}>
                        <ColorCard name="Black" variable="--black" hex={colors['--black']} bg="var(--black)" />
                        <ColorCard name="Charcoal" variable="--charcoal" hex={colors['--charcoal']} bg="var(--charcoal)" />
                        <ColorCard name="White" variable="--white" hex={colors['--white']} bg="var(--white)" text="black" />
                        <ColorCard name="Cream" variable="--cream" hex={colors['--cream']} bg="var(--cream)" text="black" />
                        <ColorCard name="Sage" variable="--sage" hex={colors['--sage']} bg="var(--sage)" />
                        <ColorCard name="Sage Dark" variable="--sage-dark" hex={colors['--sage-dark']} bg="var(--sage-dark)" />
                        <ColorCard name="Gold" variable="--gold" hex={colors['--gold']} bg="var(--gold)" />
                        <ColorCard name="Gray" variable="--gray" hex={colors['--gray']} bg="var(--gray)" />
                        <ColorCard name="Light Gray" variable="--light-gray" hex={colors['--light-gray']} bg="var(--light-gray)" text="black" />
                    </div>
                </section>

                {/* Typography */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Typography</h2>

                    <div className={styles.typeGrid}>
                        <div>
                            <span className={styles.label}>Primary Serif</span>
                            <h3 className={`${styles.fontName} ${styles.serif}`}>Instrument Serif</h3>
                            <p className={styles.description}>Used for headlines, titles, and large display text to convey elegance and authority.</p>
                            <div className={`${styles.typeSpecimen} ${styles.serif}`}>
                                <p style={{ fontSize: '4rem', lineHeight: 1 }}>Aa Bb Cc</p>
                                <p style={{ fontSize: '2rem', lineHeight: 1.2 }}>The quick brown fox jumps over the lazy dog.</p>
                            </div>
                        </div>

                        <div>
                            <span className={styles.label}>Primary Sans-Serif</span>
                            <h3 className={`${styles.fontName} ${styles.sans}`} style={{ fontWeight: 700 }}>Syne</h3>
                            <p className={styles.description}>Used for body copy, UI elements, navigation, and labels. Distinctive yet readable.</p>
                            <div className={`${styles.typeSpecimen} ${styles.sans}`}>
                                <p style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}>Aa Bb Cc</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <p style={{ fontWeight: 800 }}>800 Extra Bold</p>
                                    <p style={{ fontWeight: 700 }}>700 Bold</p>
                                    <p style={{ fontWeight: 600 }}>600 Semi Bold</p>
                                    <p style={{ fontWeight: 500 }}>500 Medium</p>
                                    <p style={{ fontWeight: 400 }}>400 Regular</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* UI Elements */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>UI Elements</h2>
                    <div className={styles.uiRow}>
                        <button className={styles.btnPrimary}>
                            Primary Button
                        </button>
                        <button className={styles.btnSecondary}>
                            Secondary Button
                        </button>
                        <span className={styles.label} style={{ marginBottom: 0 }}>
                            Accent Label
                        </span>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    )
}

function ColorCard({ name, variable, hex, bg, text = 'white' }) {
    return (
        <div className={styles.colorCard}>
            <div
                className={styles.swatch}
                style={{ backgroundColor: bg }}
            ></div>
            <div className={styles.colorInfo}>
                <div>
                    <h3 className={styles.colorName}>{name}</h3>
                    <code className={styles.colorVar}>{variable}</code>
                </div>
                <span className={styles.colorHex}>{hex}</span>
            </div>
        </div>
    )
}
