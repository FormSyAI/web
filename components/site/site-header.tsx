'use client';

import { Menu } from 'lucide-react';

import { useI18n } from '@/components/i18n/i18n-provider';
import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Brand } from './brand';

export function SiteHeader() {
  const { content } = useI18n();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label={content.ui.navigationLabel}>
          {content.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <a className="text-link" href="#resources">
            {content.ui.docs}
          </a>
          <a
            className="button button-primary button-small"
            href="#architecture"
          >
            {content.ui.startBuilding}
          </a>
          <Sheet>
            <SheetTrigger
              render={
                <button
                  className="menu-button"
                  type="button"
                  aria-label={content.ui.openMenu}
                >
                  <Menu size={23} />
                </button>
              }
            />
            <SheetContent
              className="mobile-sheet"
              side="right"
              aria-describedby="mobile-navigation-description"
            >
              <SheetHeader className="mobile-sheet-header">
                <SheetTitle>
                  <Brand />
                </SheetTitle>
                <SheetDescription id="mobile-navigation-description">
                  {content.brand.product} · {content.brand.description}
                </SheetDescription>
              </SheetHeader>
              <nav
                className="mobile-nav"
                aria-label={content.ui.mobileNavigationLabel}
              >
                {content.navigation.map((item, index) => (
                  <SheetClose
                    key={item.href}
                    render={
                      <a href={item.href}>
                        <span>{item.label}</span>
                        <span className="mobile-nav-index">0{index + 1}</span>
                      </a>
                    }
                  />
                ))}
              </nav>
              <div className="mobile-sheet-footer">
                <LanguageSwitcher compact />
                <SheetClose
                  render={
                    <a className="button button-primary" href="#architecture">
                      {content.ui.viewProductArchitecture}
                    </a>
                  }
                />
                <p>{content.brand.company}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
