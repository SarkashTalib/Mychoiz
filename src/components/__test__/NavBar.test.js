import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import NavBar from '../components/NavBar';
import '@testing-library/jest-dom/extend-expect';



describe('NavBar', () => {
  beforeEach(() => {
  });
  afterEach(() => {
    cleanup();
  })
  it('should render navar', () => {
    const navbar = screen.getByTestId('nav');
    expect(navbar).toBeTruthy();
  });
  it('shoud return logo', () => {
    const logo = screen.getByTestId('logo-tag');
    expect(logo).toBeTruthy();
  });
  it('shoud render a search box', () => {
    const searchbox = screen.getByPlaceholderText("Search")
    const search = screen.getByPlaceholderText("Search")
    expect(searchbox).toBeVisible();
    expect(search).toHaveAttribute("type", "search");

  });

  it('shoud render menu button on small screen', () => {
    const menu = screen.getByTestId("menu");
    const button = screen.getByTestId("menu-icon");
    expect(menu).toBeVisible();
    expect(menu).toContainElement(button);
  });
  it('should have nav items list', () => {
    const items = screen.getAllByTestId("nav-items");
    expect(items).toBeTruthy();
  });
  it('should render popever on small screen', () => {
    const traa = screen.queryByTestId("panel");
    const tag = screen.queryByTestId('popover');
    const button = screen.queryByTestId("popover-button");
    const buttonicon = screen.queryByTestId("popover-button-icon");
    const items = screen.queryAllByTestId("popover-items");

    expect(traa).toBeInTheDocument();
    expect(tag).toHaveProperty('href');
    expect(button).toBeVisible();
    expect(button).toContainElement(buttonicon);
    expect(items).toBeTruthy();
  });
});