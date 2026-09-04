'use client';

import { ChevronDown, Menu } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteContent } from '@/content/site';

import { Brand } from './brand';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="主导航">
          {siteContent.navigation.map((item, index) => (
            <a href={item.href} key={item.href}>
              {item.label}
              {index < 3 && <ChevronDown size={14} aria-hidden="true" />}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="text-link" href="#resources">文档</a>
          <a className="button button-primary button-small" href="#architecture">开始构建</a>
          <Sheet>
            <SheetTrigger
              render={
                <button className="menu-button" type="button" aria-label="打开导航菜单" />
              }
            >
              <Menu size={23} />
            </SheetTrigger>
            <SheetContent
              className="mobile-sheet"
              side="right"
              aria-describedby="mobile-navigation-description"
            >
              <SheetHeader className="mobile-sheet-header">
                <SheetTitle><Brand /></SheetTitle>
                <SheetDescription id="mobile-navigation-description">
                  {siteContent.brand.product} · {siteContent.brand.description}
                </SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="移动端导航">
                {siteContent.navigation.map((item, index) => (
                  <SheetClose key={item.href} render={<a href={item.href} />}>
                    <span>{item.label}</span>
                    <span className="mobile-nav-index">0{index + 1}</span>
                  </SheetClose>
                ))}
              </nav>
              <div className="mobile-sheet-footer">
                <SheetClose render={<a className="button button-primary" href="#architecture" />}>
                  查看产品架构
                </SheetClose>
                <p>{siteContent.brand.company}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
